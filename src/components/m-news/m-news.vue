<template>
  <div class="notice">
    <div class="n-left">
      <i class="fa fa-caret-left" ref="navicon"></i><i class="pc fa fa-navicon" @click="toggleMenu"></i><i class="mobile fa fa-navicon" @click="toggleHMenu"></i>
      <span class="news">公告:系统服务电话:15519911107;QQ:121256722.v1.0.5版本更新内容</span>
    </div>
    <div class="n-right">
      <span class="time">{{time}}</span>
      <span class="date">{{date}}</span>
      <span class="week">{{week}}</span>
      <span class="location">您的位置:首页</span>
    </div>
  </div>
</template>
<script>
import { prefixStyle } from 'common/js/dom'
const transform = prefixStyle('transform')
const transitionDuration = prefixStyle('transitionDuration')
export default {
  data() {
    return {
      time: '',
      date: '',
      week: '',
      showFlag: true
    }
  },
  created() {
    this.getLongDate()
  },
  methods: {
    toggleMenu() {
      this.toggle()
      this.$emit('toggle-menu')
    },
    toggleHMenu() {
      this.toggle()
      this.$emit('toggle-hmenu')
    },
    toggle() {
      this.showFlag = !this.showFlag
      if (!this.showFlag) {
        this.$refs.navicon.style[transform] = 'rotate(180deg)'
        this.$refs.navicon.style[transitionDuration] = '300ms'
      } else {
        this.$refs.navicon.style[transitionDuration] = '300ms'
        this.$refs.navicon.style[transform] = 'rotate(0deg)'
      }
    },
    getLongDate() {
      // 表示当前系统时间的Date对象
      let dateObj = new Date()
      // 当前系统时间的完整年份值
      let year = dateObj.getFullYear()
      // 当前系统时间的月份值
      let month = dateObj.getMonth() + 1
      // 当前系统时间的月份中的日
      let date = dateObj.getDate()
      // 当前系统时间中的星期值
      let day = dateObj.getDay()
      let weeks = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
      // 根据星期值，从数组中获取对应的星期字符串
      let week = weeks[day]
      // 当前系统时间的小时值
      let hour = dateObj.getHours()
      // 当前系统时间的分钟值
      let minute = dateObj.getMinutes()
      // 当前系统时间的秒钟值
      let second = dateObj.getSeconds()
      // 如果月、日、小时、分、秒的值小于10，在前面补0
      if (month < 10) {
        month = '0' + month
      }
      if (date < 10) {
        date = '0' + date
      }
      if (hour < 10) {
        hour = '0' + hour
      }
      if (minute < 10) {
        minute = '0' + minute
      }
      if (second < 10) {
        second = '0' + second
      }
      this.time = hour + ':' + minute
      this.date = year + '/' + month + '/' + date
      this.week = week
      setTimeout(this.getLongDate, 60000)
    }
  }
}
</script>
<style scoped lang="stylus">
  @import "~common/stylus/variable.styl"
  @import "~common/stylus/mixin.styl"
  .notice
    height: 60px
    line-height: 60px
    display: flex
    justify-content: space-between
    border-bottom: 3px solid $color-sub-text
    .n-left
      display: flex
      align-items: center
      max-width: 100%
      .fa-caret-left
        color: $color-theme
        font-size: 16px
        margin-left: 30px
      .fa-navicon
        color: #7b8594
        font-size: 26px
        margin: 5px
        cursor: pointer
        padding: 0 20px 0 0
        &.mobile
          display: none
      .news
        no-wrap()
        font-size: 14px
        color: #8b8f8b
        padding-left: 15px
        border-left: 3px solid $color-sub-text
    .n-right
      display: flex
      align-items: center
      color: $color-text
      display: table-cell
      vertical-align: bottom
      .time
        font-size: $font-size-large-x-x
        padding: 0 8px
      .date, .week
        font-size: $font-size-large
        padding: 0 8px
      .location
        padding-right: 8px
</style>
