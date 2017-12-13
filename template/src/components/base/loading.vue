<style scoped type="text/less">
.df-loading {
  width: 100%;
  text-align: center;
  &__desc {
    font-size: 12Px;
    color: rgba(255, 255, 255, 0.5);
  }
}
</style>

<template>
  <div class="df-loading">
    <img width="24" height="24" src="./loading.gif">
    <p class="df-loading__desc" v-text="title"></p>
  </div>
</template>

<script>
  export default {
    name: 'DfLoading',
    props: {
      title: {
        type: String,
        default: '正在载入...'
      }
    }
  }
</script>
