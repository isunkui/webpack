{{#if_eq lintConfig "airbnb"}}
/* eslint no-param-reassign:
 ["error", { "props": true, "ignorePropertyModificationsFor": ["state"] }] */
{{/if_eq}}
import * as actions from './actions'
import * as types from './constants'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}

const moduleState = {
  loading: false{{#if_eq lintConfig "airbnb"}},{{/if_eq}}
}{{#if_eq lintConfig "airbnb"}};{{/if_eq}}

const mutations = {
  [types.LOADING_START]{{#unless_eq lintConfig "airbnb"}} {{/unless_eq}}(state) {
    state.loading = true{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
  },
  [types.LOADING_DONE]{{#unless_eq lintConfig "airbnb"}} {{/unless_eq}}(state) {
    state.loading = false{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
  }{{#if_eq lintConfig "airbnb"}},{{/if_eq}}
}{{#if_eq lintConfig "airbnb"}};{{/if_eq}}

export default {
  state: moduleState,
  actions,
  mutations{{#if_eq lintConfig "airbnb"}},{{/if_eq}}
}{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
