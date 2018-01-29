export const getQueryParams = function (name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
  var r = window.location.search.substr(1).match(reg);
  if (r != null) {
    return unescape(r[ 2 ]);
  }
  return null;
};

export const getCacheWechatUser = () => {
  const wechatUser = JSON.parse(window.localStorage.getItem('wechatUser'));
  return wechatUser;
};

export const handleClearCache = () => {
  window.localStorage.removeItem('token');
  window.localStorage.removeItem('uid');
  window.localStorage.removeItem('user');
  window.localStorage.removeItem('wechatUser');
  window.localStorage.removeItem('qqUser');
};

const getBaseUrl = (env) => {
  const url = env === 'test' ? 'http://static.doufan.tv/weixin/debug' : 'http://static.doufan.tv/weixin/live';
  return url;
};

/**
 * 截取掉微信拼接的code参数，history 模式需单独处理，目前支持cdn，hash访问部署.
 * @return {string} url
 */
export const getCurrentUrl = () => {
  return `${window.location.origin}${window.location.pathname ? window.location.pathname : '/'}${!window.location.search.includes('code=') ? window.location.search : ''}${window.location.hash}`
}

export const handleWechatLogin = (forceAuth) => {
  handleClearCache();
  const code = getQueryParams('code');
  if (!forceAuth && code) return false;
  let currentUrl = getCurrentUrl();
  const redirect = encodeURIComponent(currentUrl);
  window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx3850aacb43249c67&redirect_uri=${redirect}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`;
  return true;
};

export const handleQqLogin = (env) => {
  handleClearCache();
  if (window.localStorage.token || window.location.href.indexOf('code=') !== -1) return;
  let currentUrl = window.location.href.split('&code=')[ 0 ];
  const redirect = encodeURIComponent(currentUrl);
  window.location.href = `${getBaseUrl(env)}/qq-login.html?t=${Date.now()}&redirect=${redirect}`;
};

export default {
  getCurrentUrl,
  getQueryParams,
  getCacheWechatUser,
  handleWechatLogin,
  handleQqLogin,
  handleClearCache
};
