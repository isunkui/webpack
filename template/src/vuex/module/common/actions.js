/**
 * actions
 *
 * @author isunkui
 * @date 2018/1/29
 */
import api from '../../../common/service/axios'
import {
  hasAuthCache,
  handleWechatLogin,
  handleQqLogin,
  getQueryParams,
  getWechatCurrentUrl,
  getQqCurrentUrl
} from '../../../common/service/wechat'
import * as types from './constants'
const Promise = require('es6-promise').Promise

export const fetchQqUserInfo = ({ commit }, { code, forceAuth = false }) => {
  return new Promise((resolve, reject) => {
    commit(types.LOADING_START)
    const query = 'login/fetchQqUserInfo'
    if (!forceAuth && hasAuthCache()) {
      reject(new Error('缓存中获取'))
      return
    }

    const result = handleQqLogin({ code, forceAuth })
    if (result) {
      reject(new Error('跳转授权页面.'))
      return
    }

    const redirectUri = getQqCurrentUrl()
    api.post(query, { code, redirectUri, setCommonParams: true }).then(({ token, user, wechatUser, qqUserInfo }) => {
      window.localStorage.setItem('token', token)
      window.localStorage.setItem('user', JSON.stringify(user))
      if (user && user.uid) window.localStorage.setItem('uid', user.uid)
      if (wechatUser) {
        window.localStorage.setItem('wechatUser', JSON.stringify(wechatUser))
      }
      if (qqUserInfo) {
        window.localStorage.setItem('wechatUser', JSON.stringify(qqUserInfo))
      }
      commit(types.LOADING_DONE)
      resolve({ token, user, wechatUser, qqUserInfo })
    }).catch((err) => {
      reject(err)
      commit(types.LOADING_DONE)
    })
  })
}

export const fetchWechatUserInfo = ({ commit }, { forceAuth = false }) => {
  return new Promise((resolve, reject) => {
    commit(types.LOADING_START)
    const query = 'login/fetchWechatUserInfo'
    if (!forceAuth && hasAuthCache()) {
      reject(new Error('缓存中获取'))
      return
    }
    // 微信拼接的参数，放在cdn通过hash的模式访问，在 $route.query 中获取不到.
    const code = getQueryParams('code')
    const result = handleWechatLogin(forceAuth)
    if (result) {
      reject(new Error('跳转授权页面.'))
      return
    }
    api.post(query, { code, setCommonParams: true }).then(({ token, user, wechatUser, qqUserInfo }) => {
      window.localStorage.setItem('token', token)
      if (user && user.uid) window.localStorage.setItem('uid', user.uid)
      window.localStorage.setItem('user', JSON.stringify(user))
      if (wechatUser) {
        window.localStorage.setItem('wechatUser', JSON.stringify(wechatUser))
      }
      if (qqUserInfo) {
        window.localStorage.setItem('wechatUser', JSON.stringify(qqUserInfo))
      }
      commit(types.LOADING_DONE)
      resolve({ token, user, wechatUser, qqUserInfo })
    }).catch((err) => {
      reject(err)
      commit(types.LOADING_DONE)
    })
  })
}

export const handleWechatShare = ({ commit }, {
  title = '邀请你一起玩麻花语音',
  desc = '聆听他人故事，还能赚零花钱哟',
  imgUrl = 'http://static.doufan.tv/v2/fixed-img/logo.png',
  link = getWechatCurrentUrl()
}) => {
  const shareData = {
    title, desc, imgUrl, link
  }
  // 替换掉包含code的query，微信授权后自动添加的。
  shareData.link = getWechatCurrentUrl()
  const params = {
    url: window.location.href
  }
  const shareUrl = 'wechat/fetchJsApiSignature'
  api.post(shareUrl, params).then((data) => {
    if (window.wx) {
      window.wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: data.appId, // 必填，公众号的唯一标识
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
      window.wx.ready(() => {
        // alert('分享事件注册成功')
        window.wx.onMenuShareAppMessage(shareData)
        window.wx.onMenuShareQQ(shareData)
        window.wx.onMenuShareTimeline(shareData)
        window.wx.onMenuShareWeibo(shareData)
        window.wx.onMenuShareQZone(shareData)
      })
    }
  })
}
