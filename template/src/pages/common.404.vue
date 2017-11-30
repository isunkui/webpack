<template>
  <section>
    <div class="bg"></div>
    <p>无法打开网页</p>
  </section>
</template>
<script>
import { page } from '../common/utils'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}

export default {
  created{{#unless_eq lintConfig "airbnb"}} {{/unless_eq}}() {
    page.single(){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
  }{{#if_eq lintConfig "airbnb"}},{{/if_eq}}
}{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
</script>

<style scoped type="text/less">
html {
  -webkit-user-select:none;
  overflow: hidden;
}
section {
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-content: center;
  align-items: center;
  justify-content: center;
  font-size: 32px;
}
.bg {
  width: 374px;
  height: 94px;
  background: url("../assets/img/common/404.jpg") no-repeat;
  background-size: 100% 100%;
}
p {
  margin-top: 80px;
}
</style>
