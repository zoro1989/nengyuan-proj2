<template>
  <div class="data-panel-title xiazuan">
    <template v-if="!!link"><router-link :to="link">{{title}}</router-link></template>
    <template v-else>{{title}}</template>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: '标题'
    },
    link: {
      type: String,
      default: ''
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
    a
      color: $color-text
    &.xiazuan:hover
      a
        color: #fc3507
</style>
