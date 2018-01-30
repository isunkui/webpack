import qs from 'qs'

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

export const hasAuthCache = () => {
  return window.localStorage.getItem('token') && window.localStorage.getItem('uid') && window.localStorage.getItem('user')
}

export const handleClearCache = () => {
  window.localStorage.removeItem('token');
  window.localStorage.removeItem('uid');
  window.localStorage.removeItem('user');
  window.localStorage.removeItem('wechatUser');
  window.localStorage.removeItem('qqUser');
};

/**
 * 截取掉微信拼接的code参数，history 模式需单独处理，目前支持cdn，hash访问部署.
 * @return {string} url
 */
export const getWechatCurrentUrl = () => {
  return `${window.location.origin}${window.location.pathname ? window.location.pathname : '/'}${!window.location.search.includes('code=') ? window.location.search : ''}${window.location.hash}`
}

export const getQqCurrentUrl = () => {
  const hashAndQuerys = window.location.hash.split('?')
  let hash
  let query
  if (hashAndQuerys.length === 1) {
    hash = hashAndQuerys[0]
  } else if (hashAndQuerys.length === 2) {
    hash = hashAndQuerys[0]
    const queryParams = qs.parse(hashAndQuerys[1])
    delete queryParams.code
    if (queryParams.state === 'qq') {
      delete queryParams.state
    }
    query = qs.stringify(queryParams)
  }
  if (query) query = `?${query}`
  return `${window.location.origin}${window.location.pathname ? window.location.pathname : '/'}${!window.location.search.includes('code=') ? window.location.search : ''}${hash}${query}`
}

export const handleWechatLogin = (forceAuth) => {
  handleClearCache();
  const code = getQueryParams('code');
  if (!forceAuth && code) return false;
  let currentUrl = getWechatCurrentUrl();
  const redirect = encodeURIComponent(currentUrl);
  window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx3850aacb43249c67&redirect_uri=${redirect}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`;
  return true;
};

export const handleQqLogin = ({ code, forceAuth = false }) => {
  handleClearCache();
  if (!forceAuth && code) return false;
  let currentUrl = getQqCurrentUrl();
  const redirect = encodeURIComponent(currentUrl);
  window.location.href = `https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=101406871&redirect_uri=${redirect}&state=qq&display=mobile`;
  return true;
};

export default {
  getWechatCurrentUrl,
  getQqCurrentUrl,
  getQueryParams,
  hasAuthCache,
  getCacheWechatUser,
  handleWechatLogin,
  handleQqLogin,
  handleClearCache
};
