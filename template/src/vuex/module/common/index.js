// import actions from './actions';
import * as types from './constants'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}

const state = {
  loading: false{{#if_eq lintConfig "airbnb"}},{{/if_eq}}
}{{#if_eq lintConfig "airbnb"}};{{/if_eq}}

const mutations = {
  [types.LOADING_START](state) {
    state.loading = true{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
  },
  [types.LOADING_DONE](state) {
    state.loading = false{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
  }{{#if_eq lintConfig "airbnb"}},{{/if_eq}}
}{{#if_eq lintConfig "airbnb"}};{{/if_eq}}

export default {
  state,
  // actions,
  mutations{{#if_eq lintConfig "airbnb"}},{{/if_eq}}
}{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
