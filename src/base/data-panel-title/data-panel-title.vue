<template>
  <div class="data-panel-title xiazuan">
    {{title}}
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: '标题'
    }
  }
}
</script>
<style lang="stylus" scoped>
  @import "~common/stylus/variable.styl"
  .data-panel-title
    text-align: center
    height: 50px
    line-height: 50px
    background: $color-background
    cursor: pointer
    border-bottom: 1px solid $color-sub-text
    &.xiazuan:hover
      color: #fc3507
</style>
