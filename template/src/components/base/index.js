/**
 * index
 *
 * @author isunkui
 * @date 2017/11/30
 */
import DfScroll from './scroll.vue'
import DfLoading from './loading.vue'

const install = function (Vue) {
  if (install.installed) return

  Vue.component(DfScroll.name, DfScroll)
  Vue.component(DfLoading.name, DfLoading)
}

// auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  DfScroll,
  DfLoading
}
