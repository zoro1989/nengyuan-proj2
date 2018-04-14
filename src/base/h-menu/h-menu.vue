<template>
  <transition name="slide">
    <div class="h-menu">
      <ul class="menu-group">
        <router-link tag="li" class="group-title" to="/home">
          <div class="menu-item" @click="toggleMenuItemShow(0)"><i class="arrow fa fa-caret-right"></i>首页</div>
        </router-link>
        <li class="group-title">
          <div class="menu-item" @click="toggleMenuItemShow(1)">能源综合分析<i class="angle fa" :class="selectMenuIndex === 1 ? 'fa-angle-up': 'fa-angle-down'"></i></div>
          <transition name="slide">
            <ul class="item-group h3" v-show="selectMenuIndex === 1">
              <router-link tag="li" to="/energy-cost-structure"><div class="item">能源消耗结构</div></router-link>
              <router-link tag="li" to="/energy-fee-structure" ><div class="item">能源费用结构</div></router-link>
              <router-link tag="li" to="/co2-distribute" ><div class="item">二氧化碳分布</div></router-link>
            </ul>
          </transition>
        </li>
        <li class="group-title">
          <div class="menu-item" @click="toggleMenuItemShow(2)">能源统计分析<i class="angle fa" :class="selectMenuIndex === 2 ? 'fa-angle-up': 'fa-angle-down'"></i></div>
          <transition name="slide">
            <ul class="item-group h5" v-show="selectMenuIndex === 2">
              <router-link tag="li" to="/energy-cost-analyze"><div class="item">能源用量分析</div></router-link>
              <router-link tag="li" to="/energy-fee-analyze"><div class="item">能源费用分析</div></router-link>
              <router-link tag="li" to="/co2-analyze"><div class="item">二氧化碳排放分析</div></router-link>
              <router-link tag="li" to="/energy-load-analyze"><div class="item">能源负荷分析</div></router-link>
              <router-link tag="li" to="/elec-fee-analyze"><div class="item">电价分析</div></router-link>
            </ul>
          </transition>
        </li>
        <li class="group-title">
          <div class="menu-item" @click="toggleMenuItemShow(3)">能源绩效分析<i class="angle fa" :class="selectMenuIndex === 3 ? 'fa-angle-up': 'fa-angle-down'"></i></div>
          <transition name="slide">
            <ul class="item-group h3" v-show="selectMenuIndex === 3">
              <router-link tag="li" to="/kpi-indicator-analyze"><div class="item">KPI指标分析</div></router-link>
              <router-link tag="li" to="/const-indicator-analyze"><div class="item">定额指标分析</div></router-link>
              <router-link tag="li" to="/kpi-indicator-examine"><div class="item">绩效指标考核</div></router-link>
            </ul>
          </transition>
        </li>
        <router-link tag="li" to="/device-effic-analyze" class="group-title">
          <div class="menu-item">设备能效分析<i class="angle fa" :class="selectMenuIndex === 2 ? 'fa-angle-up': 'fa-angle-down'"></i></div>
        </router-link>
      </ul>
      <div class="bg-cover" @click="hideMenu"></div>
    </div>
  </transition>
</template>
<script>
export default {
  data() {
    return {
      selectMenuIndex: 0
    }
  },
  methods: {
    hideMenu() {
      this.$emit('hide-menu')
    },
    toggleMenuItemShow(index) {
      if (this.selectMenuIndex === index) {
        this.selectMenuIndex = -1
        return
      }
      this.selectMenuIndex = index
    }
  }
}
</script>
<style scoped lang="stylus">
  @import "~common/stylus/mixin.styl"
  @import "~common/stylus/variable"
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s
  .slide-enter, .slide-leave-to
    transform: translate3d(0, 100%, 0)
  .h-menu
    position: fixed
    top: 130px
    right: 0
    left: 0
    bottom: 0
    z-index: 997
    color: #fff
    .bg-cover
      position: fixed
      top: 130px
      right: 0
      left: 0
      bottom: 0
      z-index: 997
      background-color: $color-background-d
    .menu-group
      position: fixed
      top: 130px
      bottom: 0
      left: 0
      z-index: 998
      width: 170px
      background: #002f67
      overflow: hidden
      .group-title
        overflow: hidden
        &.router-link-active
          background: $color-sub-theme
        .menu-item:hover
          background: $color-sub-theme
        .menu-item
          height: 30px
          line-height: 30px
          display: flex
          align-items: center
          padding-left: 15px
          width: 170px
          position: relative
          no-wrap()
          box-sizing: border-box
          cursor: pointer
          .arrow
            position: absolute
            left: 0
            color: #fff
            font-size: $font-size-large-x
            font-weight: bold
          .angle
            color: #ff6600
            padding-left: 5px
            font-size: $font-size-large-x
            font-weight: bold
        .item-group
          &.slide-enter-active, &.slide-leave-active
            transition: all 0.3s
          &.slide-enter, &.slide-leave-to
            &.h3
              height: 0
            &.h5
              height: 0
          &.h3
            height: 90px
          &.h5
            height: 150px
          .router-link-active
            .item
              background: $color-sub-theme
          .item
            font-size: $font-size-medium
            padding-left: 30px
            height: 30px
            line-height: 30px
            cursor: pointer
          .item:hover
            background: $color-sub-theme
</style>
