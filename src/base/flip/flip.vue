<template>
  <div class="flip" ref="flip">
    <div class="flip-group" ref="flipGroup">
      <span v-for="(item, index) in data" v-bind:key="index" class="flip-item" ref="flipItem">
        {{item}}<span class="flip-txt">&nbsp;&nbsp;千瓦时</span>
      </span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll'
export default {
  name: 'flip',
  props: {
    data: null
  },
  data() {
    return {
      transformDis: 0
    }
  },
  mounted() {
    setTimeout(() => {
      this._initFlip()
    }, 20)
  },
  methods: {
    refresh() {
      if (this.flip) {
        this.flip.refresh()
      }
    },
    _initFlip() {
      this.flip = new BScroll(this.$refs.flip, {
        scrollX: false,
        scrollY: true,
        momentum: false,
        snap: {
          loop: false,
          threshold: 0.3,
          speed: 400
        }
      })
    }
  },
  watch: {
    data(newVal) {
      if (newVal.length > 3) {
        this.$refs.flipGroup.removeChild(this.$refs.flipGroup.childNodes[0])
        setTimeout(() => {
          this.flip.scrollTo(0, 0)
          this.refresh()
        }, 20)
      }
      setTimeout(() => {
        this.flip.next()
      }, 20)
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .flip
    min-height: 1px
    height: 40px
    overflow: hidden
    .flip-group
      position: relative
      overflow: hidden
      white-space: nowrap
      .flip-item
        box-sizing: border-box
        overflow: hidden
        text-align: center
        display: block
        height: 40px
        line-height: 40px
        .flip-txt
          color: #888
          font-size: 16px
</style>
