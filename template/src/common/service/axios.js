import axios from 'axios';
const Promise = require('es6-promise').Promise;
import qs from 'qs';
import Vue from 'vue';
import { page, app } from '../utils';
import wechatUtils from './wechat';
import { sharedState } from '../mixins/common';

// 使用库提供的配置默认值创建实例
export const api = axios.create();
const DEBUG_BASE_API_URL = 'https://tests.mahuatalk.com/web/';
const BASE_API_URL = 'https://apis.mahuatalk.com/web/';

// 请求将在超时前等待5秒
api.defaults.timeout = 5000;
api.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
api.defaults.baseURL = (process.env.NODE_ENV === 'production') ? BASE_API_URL : DEBUG_BASE_API_URL;

// 请求拦截器
api.interceptors.request.use((config) => {
  if (!config.data) config.data = {};
  if (!config.params) config.params = {};

  // 设置 api 请求环境参数
  config.data.env = sharedState.env;
  config.params.env = sharedState.env;

  // 设置 api CommonParams
  if (config.method === 'get' && config.data.setCommonParams) {
    config.params[ 'clientType' ] = app.clientType
  } else if (config.method === 'post' && config.data.setCommonParams) {
    config.data['clientType'] = app.clientType
  }

  // 打开全局加载动画
  if (config.data.loading || config.params.loading) {
    Vue.prototype.$me.Indicator.open({
      text: '加载中...',
      spinnerType: 'snake'
    });
  }

  // 存在微信缓存，将用户信息上传.
  if (window.localStorage) {
    const wechatUser = wechatUtils.getCacheWechatUser();
    if (wechatUser) {
      config.data['uid'] = window.localStorage.uid;
      config.data['token'] = window.localStorage.token;
      config.data['openid'] = wechatUser.unionid || wechatUser.openid || '';
      if (config.method === 'get') {
        config.params['uid'] = window.localStorage.uid;
        config.params['token'] = window.localStorage.token;
        config.params['openid'] = wechatUser.unionid || wechatUser.openid || '';
      }
    }
  }

  // POST传参序列化
  if (config.method === 'post') {
    config.data = qs.stringify(config.data);
  };

  return config;
}, (error) => {
  console.log('拦截器异常：', error)
  Vue.prototype.$me.Toast({
    message: error.message,
    position: 'bottom'
  });
  Vue.prototype.$me.Indicator.close();
  return Promise.reject(error);
});

// 响应拦截器
api.interceptors.response.use((res) => {
  Vue.prototype.$me.Indicator.close();
  let data = res.data;
  const config = res.config;
  // 拦截本地缓存 token 失效(token 不正确，token 失效).
  if (data.status === -1003 || data.status === -1004) {
    wechatUtils.handleClearCache();
    let env = config && config.baseURL && config.baseURL.includes('test.api.doufan.tv') ? 'test' : '';
    if (page.infos().isWechat) {
      wechatUtils.handleWechatLogin(env);
    } else {
      wechatUtils.handleQqLogin(env);
    }
    return;
  } else if (data.status !== 0) {
    const message = data.message ? data.message : '服务器繁忙.';
    Vue.prototype.$me.Toast({
      message: message,
      position: 'bottom'
    });
    return Promise.reject(new Error(message));
  }
  return data.data;
}, (error) => {
  console.log('response error:', error)
  Vue.prototype.$me.Indicator.close();
  Vue.prototype.$me.Toast({
    message: error.message,
    position: 'bottom'
  });
  return Promise.reject(error);
});

api.setBaseUrl = (env) => {
  api.defaults.baseURL = env !== 'test' ? BASE_API_URL : DEBUG_BASE_API_URL;
};

export default api;
