<template>
  <transition name="slide">
    <div class="menu">
      <ul>
        <router-link tag="li" class="menu-item" to="/home">
          首页
        </router-link>
        <router-link tag="li" class="menu-item" to="/energy-cost">
          能源消耗总览
        </router-link>
        <router-link tag="li" class="menu-item" to="/statistics-analyze">
          能源统计分析
        </router-link>
        <router-link tag="li" class="menu-item" to="/indicator-analyze">
          能源指标分析
        </router-link>
        <router-link tag="li" class="menu-item" to="/energy-manage">
          设备能效管理
        </router-link>
        <router-link tag="li" class="menu-item" to="/energy-warning">
          能源预测/预警
        </router-link>
        <router-link tag="li" class="menu-item" to="/sys-energy-manage">
          系统能源管理
        </router-link>
      </ul>
    </div>
  </transition>
</template>
<script>
export default {
  methods: {
    hideMenu() {
      this.$emit('hide-menu')
    }
  }
}
</script>
<style scoped lang="stylus">
  @import "~common/stylus/mixin.styl"
  @import "~common/stylus/variable"
  .menu
    flex: 0 0 220px
    background: #354052
    overflow: hidden
    color: #fff
    &.slide-enter-active, &.slide-leave-active
      transition: all 0.3s
    &.slide-enter, &.slide-leave-to
      flex: 0 0 0px
    .menu-item:hover
      background: $color-sub-theme
    .menu-item
      height: 60px
      line-height: 60px
      padding-left: 25px
      width: 220px
      margin-top: 2px
      no-wrap()
      box-sizing: border-box
      cursor: pointer
      &.router-link-active
        background: $color-sub-theme
</style>
