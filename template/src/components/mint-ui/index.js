/**
 * index
 *
 * @author isunkui
 * @date 2017/11/30
 */
/* eslint no-duplicate-imports: ["error", { "includeExports": true }] */
import Vue from 'vue'
import Mint from 'mint-ui'
// import 'mint-ui/lib/style.css'
const { Toast, Indicator, MessageBox, Lazyload } = Mint

Vue.use(Lazyload, {
  preLoad: 1.3,
  loading: require('../../assets/img/common/avatar_default.png'),
  listenEvents: ['scroll', 'wheel', 'mousemove', 'mousewheel', 'resize', 'animationend', 'transitionend', 'webkitAnimationend', 'webkitTransitionend', 'touchmove'],
  attempt: 3
})
Vue.use(Mint)
Vue.prototype.$me = {
  Toast,
  Indicator,
  MessageBox
}
