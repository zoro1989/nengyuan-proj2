<template>
  <transition name="slide">
    <div class="header">
      <div class="left">
        <span class="title">中国一汽集团能源管理分析系统</span>
      </div>
      <div class="setting">
        <span class="item"><i class="fa fa-gear"></i></span>
        <span class="item"><i class="fa fa-user"></i></span>
        <span class="item"><i class="fa fa-refresh"></i></span>
        <span class="item"><i class="fa fa-question-circle"></i></span>
        <span class="item" @click="onLogout"><i class="fa fa-power-off"></i></span>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  methods: {
    onLogout() {
      this.$router.replace('login')
    }
  }
}
</script>
<style scoped lang="stylus">
  @import "~common/stylus/variable.styl"
  @import "~common/stylus/mixin.styl"
  .header
    background: url(bg.png) $color-theme-d no-repeat
    background-size:cover
    background-position: right
    height: 70px
    display: flex
    justify-content: space-between
    align-items: center
    overflow: hidden
    &.slide-enter-active, &.slide-leave-active
      transition: all 0.3s
    &.slide-enter, &.slide-leave-to
        height: 0
    .left
      margin-left: 50px
      display: flex
      align-items: center
      .title
        color: #f5f4f4
        font-size: 25px
        padding-left: 100px
        overflow: hidden
    .setting
      padding-right: 15px
      display: flex
      align-items: center
      color: #ffffff
      font-size: 20px
      text-align: right
      .item
        cursor: pointer
        padding: 10px
</style>
