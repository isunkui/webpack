<style scoped type="text/less">
  .df-avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    overflow: hidden;
    box-shadow: 0 1Px 5Px rgba(0, 0, 0, .2), 0 2Px 2Px rgba(0, 0, 0, .14), 0 3Px 1Px -2Px rgba(0, 0, 0, .12);
  }
</style>

<template>
  <img v-lazy="$filters.cdnImg(src, size)" class="df-avatar">
</template>

<script>
  export default {
    name: 'DfAvatar',
    props: {
      src: {
        type: String,
        default: 'http://avatar.doufan.tv/default/avatar_default.jpg'
      },
      size: {
        type: Number,
        default: 80
      }
    }
  }
</script>
