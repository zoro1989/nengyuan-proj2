<template>
  <div class="data-panel">
    <div class="row data-content">{{title}}</div>
    <div class="row data-content">
      <span class="row-item"><span class="big">{{data}}</span>&nbsp;&nbsp;{{unit}}</span>
    </div>
    <template v-if="showType === 'row' && showBi === 'show'">
      <div class="row bili">
        <span class="row-item bi">同比<span :class="tongbiStatus">&nbsp;<i :class="tongbiStatusCls"></i>&nbsp;</span>{{tongbiData}}</span>
        <span class="row-item bi">&nbsp;环比<span :class="huanbiStatus">&nbsp;<i :class="huanbiStatusCls"></i>&nbsp;</span>{{huanbiData}}</span>
      </div>
    </template>
    <template v-if="showType === 'column' && showBi === 'show'">
      <div class="row bili">
        <span class="row-item bi">同比<span :class="tongbiStatus">&nbsp;<i :class="tongbiStatusCls"></i>&nbsp;</span>{{tongbiData}}</span>
      </div>
      <div class="row bili">
        <span class="row-item bi">环比<span :class="huanbiStatus">&nbsp;<i :class="huanbiStatusCls"></i>&nbsp;</span>{{huanbiData}}</span>
      </div>
    </template>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: '标题'
    },
    data: {
      type: Number,
      default: 0
    },
    unit: {
      type: String,
      default: '单位'
    },
    tongbiData: {
      type: Number,
      default: 0
    },
    tongbiStatus: {
      type: String,
      default: 'up'
    },
    huanbiData: {
      type: Number,
      default: 0
    },
    huanbiStatus: {
      type: String,
      default: 'up'
    },
    showType: {
      type: String,
      default: 'row'
    },
    showBi: {
      type: String,
      default: 'show'
    }
  },
  computed: {
    tongbiStatusCls() {
      return 'fa fa-long-arrow-' + this.tongbiStatus
    },
    huanbiStatusCls() {
      return 'fa fa-long-arrow-' + this.huanbiStatus
    }
  }
}
</script>
<style lang="stylus" scoped>
  @import "~common/stylus/variable.styl"
  .data-panel
    cursor: pointer
    background: $color-background
    color: #333
    padding: 5px
    height: 100%
    display: flex
    flex-direction: column
    &.border-right
      border-right: 1px solid $color-sub-text
    &.border-left
      border-left: 1px solid $color-sub-text
    &.border-bottom
      border-bottom: 1px solid $color-sub-text
    .row
      justify-content: center
      overflow: hidden
      text-overflow: ellipsis
      &.data-content
        height: 40px
        line-height: 40px
      &.bili
        min-height: 35px
        line-height: 35px
      &.xiazuan:hover
        color: $color-theme
      .row-item
        color: #888
        .big
          font-size: $font-size-large-x-x
          color: $color-theme
        .big2
          font-size: $font-size-large-x
        .down
          color: #08ae5e
        .up
          color: #ef3d14
        &.bi
          color: $color-sub-text
    .subtitle
      color: #ffffff
</style>
