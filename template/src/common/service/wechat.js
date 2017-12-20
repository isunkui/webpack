import api from './axios';

export const getQueryParams = function (name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
  var r = window.location.search.substr(1).match(reg);
  if (r != null) {
    return unescape(r[2]);
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

export const handleWechatLogin = (env) => {
  handleClearCache();
  if (window.localStorage.token || window.location.href.indexOf('code=') !== -1) return;
  let currentUrl = window.location.href.split('&code=')[0];
  const redirect = encodeURIComponent(currentUrl);
  window.location.href = `${getBaseUrl(env)}/wechat-login.html?t=${Date.now()}&redirect=${redirect}`;
};

export const handleQqLogin = (env) => {
  handleClearCache();
  if (window.localStorage.token || window.location.href.indexOf('code=') !== -1) return;
  let currentUrl = window.location.href.split('&code=')[0];
  const redirect = encodeURIComponent(currentUrl);
  window.location.href = `${getBaseUrl(env)}/qq-login.html?t=${Date.now()}&redirect=${redirect}`;
};

export const handleShare = (context, shareData) => {
  const params = {
    url: window.location.href.split('&code=')[0],
    filter: true
  }
  const shareUrl = 'http://nvpu.doufan.tv/web/wxJsConfigReturn';
  api.post(shareUrl, params).then((data) => {
    if (window.wx) {
      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: 'wx3850aacb43249c67', // 必填，公众号的唯一标识
        timestamp: data.timestamp, // 必填，生成签名的时间戳
        nonceStr: data.nonceStr, // 必填，生成签名的随机串
        signature: data.signature, // 必填，签名，见附录1
        jsApiList: [
          'checkJsApi',
          'onMenuShareTimeline',
          'onMenuShareAppMessage',
          'onMenuShareQQ',
          'onMenuShareWeibo',
          'onMenuShareQZone',
          'hideMenuItems',
          'showMenuItems',
          'hideAllNonBaseMenuItem',
          'showAllNonBaseMenuItem',
          'translateVoice',
          'startRecord',
          'stopRecord',
          'onVoiceRecordEnd',
          'playVoice',
          'onVoicePlayEnd',
          'pauseVoice',
          'stopVoice',
          'uploadVoice',
          'downloadVoice',
          'chooseImage',
          'previewImage',
          'uploadImage',
          'downloadImage',
          'getNetworkType',
          'openLocation',
          'getLocation',
          'hideOptionMenu',
          'showOptionMenu',
          'closeWindow',
          'scanQRCode',
          'chooseWXPay',
          'openProductSpecificView',
          'addCard',
          'chooseCard',
          'openCard'
        ]
      })
      // wx.checkJsApi({
      //   jsApiList: [
      //     'getNetworkType',
      //     'previewImage',
      //     'onMenuShareAppMessage',
      //     'onMenuShareTimeline'
      //   ],
      //   success: function (res) {
      //     alert(JSON.stringify(res))
      //   }
      // })
      wx.ready(() => {
        // alert('分享事件注册成功')
        wx.onMenuShareAppMessage(shareData)
        wx.onMenuShareQQ(shareData)
        wx.onMenuShareTimeline(shareData)
        wx.onMenuShareWeibo(shareData)
        wx.onMenuShareQZone(shareData)
      })
    }
  })
};

export default {
  getQueryParams,
  getCacheWechatUser,
  handleWechatLogin,
  handleQqLogin,
  handleShare,
  handleClearCache
};
