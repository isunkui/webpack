/**
 * vue.resource.config
 * get(url, [options])
 * head(url, [options])
 * delete(url, [options])
 * jsonp(url, [options])
 * post(url, [body], [options])
 * put(url, [body], [options])
 * patch(url, [body], [options])
 * https://github.com/pagekit/vue-resource/blob/develop/docs/http.md
 * @author isunkui
 * @date 2017/5/25
 */
'use strict';
import Vue from 'vue';
import VueResource from 'vue-resource';
import { Toast } from 'mint-ui';
import { page } from '../utils';
import * as wechatUtils from './wechat';

Vue.use(VueResource);

const DEBUG_BASE_API_URL = 'http://test.api.doufan.tv/';
// const DEBUG_BASE_API_URL = 'http://nvpu.doufan.tv/';
// const BASE_API_URL = 'http://test.api.doufan.tv/';
const BASE_API_URL = 'http://nvpu.doufan.tv/';

export const API_ROOT = (process.env.NODE_ENV === 'production') ? BASE_API_URL : DEBUG_BASE_API_URL;

// HTTP相关
Vue.http.options.crossOrigin = true;
Vue.http.options.credentials = false;
// 将application/json转换成application/x-www-form-urlencoded
Vue.http.options.emulateJSON = true;
// 将put和delete请求转换成post
Vue.http.options.emulateHTTP = true;

Vue.http.interceptor.before = function(request, next) {
  // 自动补充前缀.
  if (!request.url.includes('http')) {
    let index = request.url.indexOf('/');
    if (index === 0) {
      let shortUrl = request.url.substr(1, request.url.length);
      request.url = API_ROOT + shortUrl;
    } else {
      request.url = API_ROOT + request.url;
    }
  }
  // override before interceptor
  if (window.localStorage) {
    const token = window.localStorage.getItem('token');
    const uid = window.localStorage.getItem('uid');
    const clientType = page.infos().isIOS ? 1 : 2;
    if (request.method === 'JSONP' || request.method === 'GET' || request.method === 'HEAD') {
      if (request.params === undefined) request.params = {};
      if (request.params.filter !== false) {
        request.params.token = token;
        request.params.uid = uid;
      }
      request.params.clientType = clientType;
    } else {
      request.body.token = token;
      request.body.uid = uid;
      request.body.clientType = clientType;
    }
  }
  next();
};

Vue.http.interceptors.push(function(request, next) {
  // continue to next interceptor
  next(function(response) {
    const { data } = response;
    if (!data || data.status === undefined) {
      Toast({
        message: 'Api 请求失败.',
        position: 'bottom'
      });
      response.data = {
        status: -10086,
        message: 'Api 请求失败.',
        data: null
      };
      return;
    }

    // 拦截本地缓存 token 失效(token 不正确，token 失效).
    if (data.status === -1003 || data.status === -1004) {
      window.localStorage.removeItem('token');
      window.localStorage.removeItem('uid');
      window.localStorage.removeItem('user');
      window.localStorage.removeItem('openid');
      window.localStorage.removeItem('wechatUser');
      if (page.infos().isWechat) {
        wechatUtils.handleWechatLogin();
      } else {
        wechatUtils.handleQqLogin();
      }
      return;
    } else if(data.status !== 0) {
      Toast({
        message: data.message,
        position: 'bottom',
      });
    }
  });
});