{{#if_eq build "standalone"}}
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
{{/if_eq}}
import Vue from 'vue'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
import App from './App'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
{{#router}}
import router from './router'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
{{/router}}
{{#vuex}}
import store from './vuex'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
{{/vuex}}
// import './components/mint-ui'
import DfBaseComponents from './components/base'
// import filters from './common/filters'
// import dlMixin from './common/mixins/dl'
// import commonMixin from './common/mixins/common'

Vue.use(DfBaseComponents)
Vue.config.productionTip = false{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
// Vue.prototype.$filters = filters
// Vue.mixin(dlMixin)
// Vue.mixin(commonMixin)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  {{#vuex}}
  store,
  {{/vuex}}
  {{#router}}
  router,
  {{/router}}
  {{#if_eq build "runtime"}}
  render: h => h(App){{#if_eq lintConfig "airbnb"}},{{/if_eq}}
  {{/if_eq}}
  {{#if_eq build "standalone"}}
  template: '<App/>',
  components: { App }{{#if_eq lintConfig "airbnb"}},{{/if_eq}}
  {{/if_eq}}
}){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
