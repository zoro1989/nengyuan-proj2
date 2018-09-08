<template>
  <div class="data-panel">
    <div class="row title">光伏发电实时量(小时)</div>
    <div class="row">
      <span class="row-item">
        <span class="big">
          <flip :data="flipData"></flip>
        </span>
      </span>
    </div>
  </div>
</template>
<script>
import Flip from 'base/flip/flip'
export default {
  props: {
    title: {
      type: String,
      default: '标题'
    }
  },
  components: {
    Flip
  },
  data() {
    return {
      flipData: []
    }
  },
  methods: {
    toggleCard() {
      if (this.flipData.length === 0) {
        this.flipData.push(0)
      } else {
        this.flipData.push(Math.round(Math.random() * 1000))
      }
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.toggleCard()
      }, 3600 * 1000)
    }
  },
  mounted() {
    this.toggleCard()
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
    &.border-bottom
      border-bottom: 1px solid $color-sub-text
    .row
      justify-content: center
      height: 40px
      line-height: 40px
      .row-item
        color: #888
        .big
          font-size: $font-size-large-x-x
          color: $color-theme
</style>
