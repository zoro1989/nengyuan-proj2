<template>
  <div class="menu">
    <el-menu
      router
      :default-active="$route.path"
      class="el-menu-demo"
      background-color="#d0e9f7"
      text-color="#80848f"
      active-text-color="#003365"
      mode="horizontal"
      @select="handleSelect">
      <el-menu-item index="/home/ss"><i class="fa fa-home"></i><span>&nbsp;首页</span></el-menu-item>
      <el-submenu index="1">
        <template slot="title"><i class="fa fa-battery-half"></i><span>&nbsp;能源综合分析</span></template>
        <el-menu-item index="/home/nyzlfx/nh"><i class="fa fa-list"></i><span>&nbsp;各类能耗占比分析</span></el-menu-item>
        <el-menu-item index="/home/nybmfx/nh"><i class="fa fa-institution"></i><span>&nbsp;用能单位能耗占比分析</span></el-menu-item>
        <el-menu-item index="/home/nyzlfx/fy"><i class="fa fa-list"></i><span>&nbsp;各类能耗费用占比分析</span></el-menu-item>
        <el-menu-item index="/home/nybmfx/fy"><i class="fa fa-institution"></i><span>&nbsp;用能单位能耗费用占比分析</span></el-menu-item>
        <el-menu-item index="/home/eyhtfx"><i class="fa fa-pie-chart"></i><span>&nbsp;碳排放量占比分析</span></el-menu-item>
      </el-submenu>
      <el-submenu index="2" v-if="role">
        <template slot="title"><i class="fa fa-edit"></i><span>&nbsp;能源统计分析</span></template>
        <el-menu-item index="/home/nyylfx"><i class="fa fa-bar-chart"></i><span>&nbsp;能源用量分析</span></el-menu-item>
        <el-menu-item index="/home/nyfyfx"><i class="fa fa-yen"></i><span>&nbsp;能源费用分析</span></el-menu-item>
        <el-menu-item index="/home/tjeyhtfx"><i class="fa fa-envira"></i><span>&nbsp;二氧化碳排放量分析</span></el-menu-item>
        <el-menu-item index="/home/bmynfx"><i class="fa fa-institution"></i><span>&nbsp;用能单位对标分析</span></el-menu-item>
        <el-menu-item index="/home/nyfhfx"><i class="fa fa-bell-o"></i><span>&nbsp;能源负荷分析</span></el-menu-item>
        <el-menu-item index="/home/djfx"><i class="fa fa-flash"></i><span>&nbsp;电价分析</span></el-menu-item>
      </el-submenu>
      <el-submenu index="3" v-if="role">
        <template slot="title"><i class="fa fa-line-chart"></i><span>&nbsp;KPI指标分析</span></template>
        <el-menu-item index="/home/kpi1"><i class="fa fa-hourglass-start"></i><span>&nbsp;产值综合能耗分析</span></el-menu-item>
        <el-menu-item index="/home/kpi2"><i class="fa fa-tint"></i><span>&nbsp;产值耗水量分析</span></el-menu-item>
        <el-menu-item index="/home/kpi3"><i class="fa fa-battery-half"></i><span>&nbsp;能源消耗总量分析</span></el-menu-item>
        <el-menu-item index="/home/kpi4"><i class="fa fa-truck"></i><span>&nbsp;单车综合能耗分析</span></el-menu-item>
        <el-menu-item index="/home/kpi5"><i class="fa fa-trophy"></i><span>&nbsp;KPI评价考核表</span></el-menu-item>
      </el-submenu>
      <el-submenu index="4" v-if="role">
        <template slot="title"><i class="fa fa-gears"></i><span>&nbsp;设备能效分析</span></template>
        <el-menu-item index="/home/nxbyq"><i class="fa fa-plug"></i><span>&nbsp;变压器</span></el-menu-item>
        <el-menu-item index="/home/nxkyj"><i class="fa fa-industry"></i><span>&nbsp;空压机</span></el-menu-item>
        <el-menu-item index="/home/nxfj"><i class="fa fa-cloud"></i><span>&nbsp;风机</span></el-menu-item>
        <el-menu-item index="/home/nxsb"><i class="fa fa-tint"></i><span>&nbsp;水泵</span></el-menu-item>
      </el-submenu>
      <el-submenu index="5" v-if="role">
        <template slot="title"><i class="fa fa-book"></i><span>&nbsp;设备台账</span></template>
        <el-menu-item index="/home/tz1-ly" ><i class="fa fa-file-text-o"></i><span>&nbsp;工业炉窑台账</span></el-menu-item>
        <el-menu-item index="/home/tz2-gl"><i class="fa fa-file-text-o"></i><span>&nbsp;锅炉台账</span></el-menu-item>
        <el-menu-item index="/home/tz3-kyj"><i class="fa fa-file-text-o"></i><span>&nbsp;空压机台账</span></el-menu-item>
        <el-menu-item index="/home/tz5-tfj"><i class="fa fa-file-text-o"></i><span>&nbsp;通风机台账</span></el-menu-item>
        <el-menu-item index="/home/tz6-sb"><i class="fa fa-file-text-o"></i><span>&nbsp;水泵台账</span></el-menu-item>
        <el-menu-item index="/home/tz7-byq"><i class="fa fa-file-text-o"></i><span>&nbsp;变压器台账</span></el-menu-item>
        <el-menu-item index="/home/tz8-qt"><i class="fa fa-file-text-o"></i><span>&nbsp;其他台账</span></el-menu-item>
        <el-menu-item index="/home/tz9-tj"><i class="fa fa-file-text-o"></i><span>&nbsp;设备统计</span></el-menu-item>
      </el-submenu>
      <el-menu-item index="/home/waning"><i class="fa fa-bell-o"></i><span>&nbsp;能源预警报警</span></el-menu-item>
      <el-submenu index="7" v-if="role">
        <template slot="title"><i class="fa fa-i-cursor"></i><span>&nbsp;设备录入</span></template>
        <el-menu-item index="/home/byq"><i class="fa fa-plug"></i><span>&nbsp;变压器</span></el-menu-item>
        <el-menu-item index="/home/kyj"><i class="fa fa-industry"></i><span>&nbsp;空压机</span></el-menu-item>
        <el-menu-item index="/home/dj"><i class="fa fa-flash"></i><span>&nbsp;电机</span></el-menu-item>
      </el-submenu>
      <el-menu-item index="/home/jhdr"><i class="fa fa-paper-plane"></i><span>&nbsp;计划值导入</span></el-menu-item>
      <el-submenu index="9" v-if="role">
        <template slot="title"><i class="fa fa-user-o"></i><span>&nbsp;系统管理</span></template>
        <el-menu-item index="/home/yhgl"><i class="fa fa-user-o"></i><span>&nbsp;用户管理</span></el-menu-item>
        <el-menu-item index="/home/zzjggl"><i class="fa fa-sitemap"></i><span>&nbsp;组织机构管理</span></el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
  import {getRole} from 'common/js/cache'
  export default {
    computed: {
      role() {
        return getRole() === '1'
      }
    }
  }
</script>
<style scoped lang="stylus">
  @import "~common/stylus/variable"
  .menu
    width: 100%
    position: fixed
    z-index: 10
    top: 70px
    left: 0
    height: 40px
</style>
