<template>
  <div class="no-result">
    <div class="no-result-icon"></div>
    <p class="no-result-text">{{title}}</p>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      title: {
        type: String,
        default: '暂无数据'
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .no-result
    text-align: center
    position: absolute
    top: 50%
    left: 50%
    transform: translate3d(-50%, -50%, 0)
    .no-result-icon
      width: 77px
      height: 50px
      margin: 0 auto
      background-image: url("no-data.png")
      background-size: 77px 50px
    .no-result-text
      margin-top: 30px
      font-size: $font-size-medium
      color: rgba(136, 136, 136, 0.5)
</style>
