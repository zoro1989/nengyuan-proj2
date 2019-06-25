<template>
  <div class="data-panel">
    <span class="row data-title" @click="titleClick">{{title}}</span>
    <div class="row data-content">
      <span class="row-item"><span class="big" :class="isLinear ? 'linear' : ''">{{dataText}}</span><span v-html="unitTxt"></span></span>
    </div>
    <template v-if="showType === 'row' && showBi === 'show'">
      <div class="row bili">
        <span class="row-item bi">同比<span :class="tongbiStatus">&nbsp;<i :class="tongbiStatusCls"></i>&nbsp;</span>{{Math.abs(tongbiData || 0)}}%</span>
        <span class="row-item bi">&nbsp;&nbsp;&nbsp;环比<span :class="huanbiStatus">&nbsp;<i :class="huanbiStatusCls"></i>&nbsp;</span>{{Math.abs(huanbiData || 0)}}%</span>
      </div>
    </template>
    <template v-if="showType === 'column' && showBi === 'show'">
      <div class="row bili">
        <span class="row-item bi">同比<span :class="tongbiStatus">&nbsp;<i :class="tongbiStatusCls"></i>&nbsp;</span>{{Math.abs(tongbiData || 0)}}%</span>
      </div>
      <div class="row bili">
        <span class="row-item bi">环比<span :class="huanbiStatus">&nbsp;<i :class="huanbiStatusCls"></i>&nbsp;</span>{{Math.abs(huanbiData || 0)}}%</span>
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
    huanbiData: {
      type: Number,
      default: 0
    },
    showType: {
      type: String,
      default: 'row'
    },
    showBi: {
      type: String,
      default: 'show'
    },
    isMathRound: {
      type: Boolean,
      default: false
    },
    isLinear: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    unitTxt() {
      return '  ' + this.unit
    },
    dataText() {
      if (Number.isNaN(this.data)) {
        return 0
      } else {
        if (this.isMathRound) {
          return Math.round(this.data)
        } else {
          return this.data
        }
      }
    },
    huanbiStatus() {
      return (this.huanbiData || 0) > 0 ? 'up' : 'down'
    },
    tongbiStatus() {
      return (this.tongbiData || 0) > 0 ? 'up' : 'down'
    },
    tongbiStatusCls() {
      return 'fa fa-long-arrow-' + ((this.tongbiData || 0) > 0 ? 'up' : 'down')
    },
    huanbiStatusCls() {
      return 'fa fa-long-arrow-' + ((this.huanbiData || 0) > 0 ? 'up' : 'down')
    }
  },
  methods: {
    titleClick() {
      this.$emit('titleClick')
    }
  }
}
</script>
<style lang="stylus" scoped>
  @import "~common/stylus/variable.styl"
  .data-panel
    color: $color-sub-text
    padding: 5px
    height: 100%
    display: flex
    flex: 1
    width: 100%
    flex-direction: column
    &.data-content-simple
      .data-content
        min-height: auto!important
    &.border-right
      border-right: 1px solid $color-theme
    &.border-left
      border-left: 1px solid $color-theme
    &.border-bottom
      border-bottom: 1px solid $color-theme
    .row
      justify-content: center
      overflow: hidden
      text-overflow: ellipsis
      &.data-title
        min-height: 40px
        align-items: center
      &.data-content
        min-height: 40px
        align-items: flex-start
      &.bili
        min-height: 35px
        align-items: center
      &.xiazuan:hover
        color: $color-theme
      .row-item
        .sub
          font-size: 10px
        .big
          font-size: $font-size-large-x-x
          color: $color-text
          &.linear
            background-image: linear-gradient(to bottom, #00ff7e 0%, #00d3fc 100%);
            -webkit-background-clip: text
            background-clip: text
            color: transparent
        .big2
          font-size: $font-size-large-x
        .down
          color: #41dd51
        .up
          color: #ff2620
</style>
