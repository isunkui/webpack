/**
 * index
 *
 * @author isunkui
 * @date 2017/11/29
 */
import Vue from 'vue'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
import Vuex from 'vuex'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
import modules from './module'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
import createLogger from 'vuex/logger'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}

Vue.use(Vuex){{#if_eq lintConfig "airbnb"}};{{/if_eq}}

export default new Vuex.Store({
  // state: {},
  // can not judge run time environment
  plugins: process.env.NODE_ENV !== 'production' ? [createLogger()] : [],
  modules,
  strict: false{{#if_eq lintConfig "airbnb"}},{{/if_eq}}
}){{#if_eq lintConfig "airbnb"}};{{/if_eq}}