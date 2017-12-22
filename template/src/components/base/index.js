/**
 * index
 *
 * @author isunkui
 * @date 2017/11/30
 */
import DfScroll from './scroll.vue'
import DfLoading from './loading.vue'
import DfNullTips from './null-tips.vue'

const install = function (Vue) {
  if (install.installed) return

  Vue.component(DfScroll.name, DfScroll)
  Vue.component(DfLoading.name, DfLoading)
  Vue.component(DfNullTips.name, DfNullTips)
}

// auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  DfScroll,
  DfLoading,
  DfNullTips
}
