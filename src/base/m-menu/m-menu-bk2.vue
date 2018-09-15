<template>
  <transition name="slide">
    <div class="menu">
      <el-menu
        default-active="0"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#005d8f"
        text-color="#fff"
        :unique-opened="uniqueOpened"
        active-text-color="#fff">
        <el-menu-item index="0" @click="changeRoute('/home')">首页</el-menu-item>
        <el-submenu index="1">
          <template slot="title">
            <span>能源综合分析</span>
          </template>
          <el-submenu index="1-1">
            <template slot="title">能源消耗结构</template>
            <el-menu-item index="1-1-1">能源种类分析</el-menu-item>
            <el-menu-item index="1-1-2">能源部门分析</el-menu-item>
          </el-submenu>
          <el-submenu index="1-2">
            <template slot="title">能源费用结构</template>
            <el-menu-item index="1-2-1">能源种类分析</el-menu-item>
            <el-menu-item index="1-2-2">能源部门分析</el-menu-item>
          </el-submenu>
          <el-menu-item index="1-3">二氧化碳量分布</el-menu-item>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <span>能源统计分析</span>
          </template>
          <el-menu-item index="2-1">能源用量分析</el-menu-item>
          <el-menu-item index="2-2">能源费用分析</el-menu-item>
          <el-menu-item index="2-3">二氧化碳排放量分析</el-menu-item>
          <el-menu-item index="2-4">部门用能分析</el-menu-item>
          <el-menu-item index="2-5">能源负荷分析</el-menu-item>
          <el-menu-item index="2-6">电价分析</el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <span>KPI指标分析</span>
          </template>
          <el-menu-item index="3-1">产值综合能耗分析</el-menu-item>
          <el-menu-item index="3-2">产值耗水量分析</el-menu-item>
          <el-menu-item index="3-3">能源消耗总量分析</el-menu-item>
          <el-menu-item index="3-4">单车综合能耗分析</el-menu-item>
          <el-menu-item index="3-5">KPI评价考核表</el-menu-item>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">
            <span>设备能效分析</span>
          </template>
          <el-menu-item index="4-1">变压器</el-menu-item>
          <el-menu-item index="4-2">空压机</el-menu-item>
          <el-menu-item index="4-3">风机</el-menu-item>
          <el-menu-item index="4-4">水泵</el-menu-item>
        </el-submenu>
        <el-submenu index="5">
          <template slot="title">
            <span>设备能效分析</span>
          </template>
          <el-menu-item index="5-1">工业炉窑台账</el-menu-item>
          <el-menu-item index="5-2">锅炉台账</el-menu-item>
          <el-menu-item index="5-3">空压机台账</el-menu-item>
          <el-menu-item index="5-4">空调台账</el-menu-item>
          <el-menu-item index="5-5">通风机台账</el-menu-item>
          <el-menu-item index="5-6">水泵台账</el-menu-item>
          <el-menu-item index="5-7">变压器台账</el-menu-item>
          <el-menu-item index="5-8">其他台账</el-menu-item>
        </el-submenu>
        <el-menu-item index="6">能源预警报警</el-menu-item>
      </el-menu>
    </div>
  </transition>
</template>
<script>
export default {
  data() {
    return {
      selectMenuIndex: 0,
      showsMenu: [],
      uniqueOpened: true
    }
  },
  methods: {
    hideMenu() {
      this.$emit('hide-menu')
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    },
    changeRoute(path) {
      this.$router.replace(path)
    }
  }
}
</script>
<style scoped lang="stylus">
  @import "~common/stylus/mixin.styl"
  @import "~common/stylus/variable"
  .menu
    position: fixed
    top: 70px
    left: 0
    width: 180px
    bottom: 0
    background: #005d8f
    color: #fff
    &.slide-enter-active, &.slide-leave-active
      transition: all 0.3s
    &.slide-enter, &.slide-leave-to
      flex: 0 0 0px
</style>
