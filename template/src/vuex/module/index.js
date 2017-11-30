/**
 * index
 *
 * @author isunkui
 * @date 2017/11/30
 */
'use strict'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}

import common from './common'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}

export default {
  common{{#if_eq lintConfig "airbnb"}},{{/if_eq}}
}{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
