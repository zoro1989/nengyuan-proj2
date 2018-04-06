<template>
  <transition name="slide">
    <div class="header">
      <span class="title">|&nbsp;中国一汽集团能源管理分析系统</span>
      <div class="setting">
        <div class="items">
          <span class="item"><i class="fa fa-refresh"></i></span>
          <span class="item"><i class="fa fa-gear"></i></span>
          <span class="item"><i class="fa fa-question-circle"></i></span>
        </div>
        <div>
          <select>
            <option>一月</option>
            <option>二月</option>
            <option>三月</option>
            <option>四月</option>
            <option>五月</option>
            <option>六月</option>
            <option>七月</option>
            <option>八月</option>
            <option>九月</option>
            <option>十月</option>
            <option>十一月</option>
            <option>十二月</option>
          </select>
          <img class="avatar" src="../../../static/head.jpg" >
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {}
</script>
<style scoped lang="stylus">
  @import "~common/stylus/variable.styl"
  @import "~common/stylus/mixin.styl"
  .header
    background: $color-theme-d url(hometitle.png) no-repeat
    height: 90px
    display: flex
    align-items: center
    justify-content: space-between
    overflow: hidden
    &.slide-enter-active, &.slide-leave-active
      transition: all 0.3s
    &.slide-enter, &.slide-leave-to
        height: 0
    .title
      color: #f5f4f4
      font-size: 25px
      padding-left: 320px
      overflow: hidden
    .setting
      padding-right: 15px
      display: flex
      flex-direction: column
      color: #ffffff
      text-align: right
      .items
        margin-bottom: 5px
        .item
          padding: 5px
      .avatar
        width: 50px
        height: 50px
        border-radius: 50%
        margin-left: 10px
      .pack
        cursor: pointer
</style>
