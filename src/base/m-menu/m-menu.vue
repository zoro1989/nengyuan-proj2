<template>
  <transition name="slide">
    <div class="menu">
      <ul class="menu-group">
        <router-link tag="li" class="group-title" :class="{active: selectMenuIndex === 0}" to="/home">
          <!--<div class="menu-item" @click="toggleMenuItemShow(0)"><i class="arrow fa fa-caret-right"></i>首页</div>-->
          <div class="menu-item" @click="toggleMenuItemShow(0)">首页</div>
        </router-link>
        <li class="group-title" :class="{active: selectMenuIndex === 1}">
          <div class="menu-item" @click="toggleMenuItemShow(1)">能源综合分析<i class="angle fa" :class="menuIsShow(1) ? 'fa-angle-up': 'fa-angle-down'"></i></div>
          <transition name="slide">
          <ul class="item-group h3" v-show="menuIsShow(1)">
            <router-link tag="li" to="/energy-cost-structure"><div class="item">能源消耗结构</div></router-link>
            <router-link tag="li" to="/energy-fee-structure" ><div class="item">能源费用结构</div></router-link>
            <router-link tag="li" to="/co2-distribute" ><div class="item">二氧化碳分布</div></router-link>
          </ul>
          </transition>
        </li>
        <li class="group-title" :class="{active: selectMenuIndex === 2}">
          <div class="menu-item" @click="toggleMenuItemShow(2)">能源统计分析<i class="angle fa" :class="menuIsShow(2) ? 'fa-angle-up': 'fa-angle-down'"></i></div>
          <transition name="slide">
          <ul class="item-group h5" v-show="menuIsShow(2)">
            <router-link tag="li" to="/energy-cost-analyze"><div class="item">能源用量分析</div></router-link>
            <router-link tag="li" to="/energy-fee-analyze"><div class="item">能源费用分析</div></router-link>
            <router-link tag="li" to="/co2-analyze"><div class="item">二氧化碳排放分析</div></router-link>
            <router-link tag="li" to="/energy-load-analyze"><div class="item">能源负荷分析</div></router-link>
            <router-link tag="li" to="/elec-fee-analyze"><div class="item">电价分析</div></router-link>
          </ul>
          </transition>
        </li>
        <li class="group-title" :class="{active: selectMenuIndex === 3}">
          <div class="menu-item" @click="toggleMenuItemShow(3)">能源绩效分析<i class="angle fa" :class="menuIsShow(3) ? 'fa-angle-up': 'fa-angle-down'"></i></div>
          <transition name="slide">
          <ul class="item-group h3" v-show="menuIsShow(3)">
            <router-link tag="li" to="/kpi-indicator-analyze"><div class="item">KPI指标分析</div></router-link>
            <router-link tag="li" to="/const-indicator-analyze"><div class="item">定额指标分析</div></router-link>
            <router-link tag="li" to="/kpi-indicator-examine"><div class="item">绩效指标考核</div></router-link>
          </ul>
          </transition>
        </li>
        <li class="group-title" :class="{active: selectMenuIndex === 4}">
          <div class="menu-item" @click="toggleMenuItemShow(4)">设备能效分析<i class="angle fa" :class="menuIsShow(4) ? 'fa-angle-up': 'fa-angle-down'"></i></div>
          <transition name="slide">
            <ul class="item-group h3" v-show="menuIsShow(4)">
              <router-link tag="li" to="/device-effic-analyze"><div class="item">设备能效分析</div></router-link>
              <router-link tag="li" to="/realtime-tripping"><div class="item">实时下钻</div></router-link>
              <router-link tag="li" to="/cost-info"><div class="item">能耗信息</div></router-link>
            </ul>
          </transition>
        </li>
      </ul>
    </div>
  </transition>
</template>
<script>
export default {
  data() {
    return {
      selectMenuIndex: 0,
      showsMenu: []
    }
  },
  methods: {
    hideMenu() {
      this.$emit('hide-menu')
    },
    menuIsShow(param) {
      var fIndex = this.showsMenu.findIndex((i) => {
        return i === param
      })
      return fIndex >= 0
    },
    toggleMenuItemShow(index) {
      var fIndex = this.showsMenu.findIndex((i) => {
        return i === index
      })
      if (fIndex < 0) {
        this.showsMenu.push(index)
      } else {
        this.showsMenu.splice(fIndex, 1)
      }
      console.log(this.showsMenu)
      this.selectMenuIndex = index
    }
  }
}
</script>
<style scoped lang="stylus">
  @import "~common/stylus/mixin.styl"
  @import "~common/stylus/variable"
  .menu
    flex: 0 0 180px
    background: #005d8f
    overflow: hidden
    color: #fff
    &.slide-enter-active, &.slide-leave-active
      transition: all 0.3s
    &.slide-enter, &.slide-leave-to
      flex: 0 0 0px
    .menu-group
      .group-title
        overflow: hidden
        &.active
          border-left: 3px solid #06e56d
          .menu-item
            border-top: 2px solid #2b87b7
            border-bottom: 2px solid #083f60
            .angle
              right: 13px
          .item-group
            .item
              background: #004d75
        &.router-link-active
          background: $color-sub-theme
        .menu-item:hover
          background: $color-sub-theme
        .menu-item
          height: 40px
          line-height: 40px
          display: flex
          align-items: center
          padding-left: 15px
          width: 180px
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
            color: #06e56d
            position: absolute
            right: 10px
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
