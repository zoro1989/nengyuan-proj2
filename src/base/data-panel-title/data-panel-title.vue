<template>
  <div class="data-panel-title xiazuan" :class="noBorder ? 'no-border' : ''">
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
    },
    noBorder: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style lang="stylus" scoped>
  @import "~common/stylus/variable.styl"
  .data-panel-title
    text-align: center
    height: 50px
    display: flex
    align-items: center
    justify-content: center
    border-bottom: 1px solid $color-theme
    &.no-border
      border-bottom: none
    a
      color: $color-text
      text-decoration: underline
    &.xiazuan:hover
      a
        color: $color-sub-text
</style>
