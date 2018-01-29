/**
 * index
 *
 * @author isunkui
 * @date 2017/11/30
 */
import DfAvatar from './avatar.vue'
import DfScroll from './scroll.vue'
import DfSlider from './slider.vue'
import DfLoading from './loading.vue'
import DfNullTips from './null.tips.vue'
import DfPageLoading from './page.loading.vue'

const install = function (Vue) {
  if (install.installed) return

  Vue.component(DfAvatar.name, DfAvatar)
  Vue.component(DfScroll.name, DfScroll)
  Vue.component(DfSlider.name, DfSlider)
  Vue.component(DfLoading.name, DfLoading)
  Vue.component(DfNullTips.name, DfNullTips)
  Vue.component(DfPageLoading.name, DfPageLoading)
}

// auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  DfAvatar,
  DfScroll,
  DfSlider,
  DfLoading,
  DfNullTips,
  DfPageLoading
}
