<style scoped type="text/less">
  .df-null-tips {
    width: 200px;
    height: 200px;
    padding-top: 220px;
    margin: 0 auto;
    text-align: center;
    background: #fff url(../../assets/img/common/bg-null.png) no-repeat center center;
    background-size: 200px 200px;
  }
</style>

<template>
  <section class="df-null-tips">
    <span v-text="content"></span>
  </section>
</template>

<script>
  export default {
    name: 'DfNullTips',
    props: {
      content: {
        type: String,
        default: '暂无内容'
      }
    }
  }
</script>
