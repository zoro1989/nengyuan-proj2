<template>
  <div class="select-title">
    <div class="title-l">
      <span class="picker-txt">{{title1}}</span>
      <slot name="title1"></slot>
      <span class="picker-txt">{{title2}}</span>
      <slot name="title2"></slot>
    </div>
    <div class="title-r">
      <span @click="onClose" class="ripple"><i class="fa fa-times"></i></span>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      title1: {
        type: String,
        default: ''
      },
      title2: {
        type: String,
        default: ''
      }
    },
    methods: {
      onClose() {
        this.$router.replace('/home')
      }
    }
  }
</script>
<style scoped lang="stylus">
  .select-title
    padding: 0 10px
    height: 40px
    line-height: 40px
    width: 100%
    background: #fff
    border-radius: 5px
    color: #333
    display: flex
    justify-content: space-between
    .title-r
      .fa
        margin: 0 5px
        color: #899eb6
        font-size: $font-size-large
        cursor: pointer
    .picker-txt
      padding: 0 5px 0 15px
</style>
