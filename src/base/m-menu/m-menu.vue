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
      <el-menu-item index="/home/ss">首页</el-menu-item>
      <el-submenu index="1">
        <template slot="title">能源综合分析</template>
        <el-menu-item index="/home/nyzlfx/nh">各类能耗占比分析</el-menu-item>
        <el-menu-item index="/home/nybmfx/nh">部门能耗占比分析</el-menu-item>
        <el-menu-item index="/home/nyzlfx/fy">各类能耗费用占比分析</el-menu-item>
        <el-menu-item index="/home/nybmfx/fy">部门能耗费用占比分析</el-menu-item>
        <el-menu-item index="/home/eyhtfx">碳排放量占比分析</el-menu-item>
      </el-submenu>
      <el-submenu index="2" v-if="role">
        <template slot="title">能源统计分析</template>
        <el-menu-item index="/home/nyylfx">能源用量分析</el-menu-item>
        <el-menu-item index="/home/nyfyfx">能源费用分析</el-menu-item>
        <el-menu-item index="/home/tjeyhtfx">二氧化碳排放量分析</el-menu-item>
        <el-menu-item index="/home/bmynfx">部门用能分析</el-menu-item>
        <el-menu-item index="/home/nyfhfx">能源负荷分析</el-menu-item>
        <el-menu-item index="/home/djfx">电价分析</el-menu-item>
      </el-submenu>
      <el-submenu index="3" v-if="role">
        <template slot="title">KPI指标分析</template>
        <el-menu-item index="/home/kpi1">产值综合能耗分析</el-menu-item>
        <el-menu-item index="/home/kpi2">产值耗水量分析</el-menu-item>
        <el-menu-item index="/home/kpi3">能源消耗总量分析</el-menu-item>
        <el-menu-item index="/home/kpi4">单车综合能耗分析</el-menu-item>
        <el-menu-item index="/home/kpi5">KPI评价考核表</el-menu-item>
      </el-submenu>
      <el-submenu index="4" v-if="role">
        <template slot="title">设备能效分析</template>
        <el-menu-item index="/home/nxbyq">变压器</el-menu-item>
        <el-menu-item index="/home/nxkyj">空压机</el-menu-item>
        <el-menu-item index="/home/nxfj">风机</el-menu-item>
        <el-menu-item index="/home/nxsb">水泵</el-menu-item>
      </el-submenu>
      <el-submenu index="5" v-if="role">
        <template slot="title">设备台账</template>
        <el-menu-item index="/home/tz1-ly" >工业炉窑台账</el-menu-item>
        <el-menu-item index="/home/tz2-gl">锅炉台账</el-menu-item>
        <el-menu-item index="/home/tz3-kyj">空压机台账</el-menu-item>
        <el-menu-item index="/home/tz5-tfj">通风机台账</el-menu-item>
        <el-menu-item index="/home/tz6-sb">水泵台账</el-menu-item>
        <el-menu-item index="/home/tz7-byq">变压器台账</el-menu-item>
        <el-menu-item index="/home/tz8-qt">其他台账</el-menu-item>
      </el-submenu>
      <el-menu-item index="/home/waning">能源预警报警</el-menu-item>
      <el-submenu index="7" v-if="role">
        <template slot="title">设备录入</template>
        <el-menu-item index="/home/byq">变压器</el-menu-item>
        <el-menu-item index="/home/kyj">空压机</el-menu-item>
        <el-menu-item index="/home/dj">电机</el-menu-item>
      </el-submenu>
      <el-menu-item index="/home/jhdr">计划导入</el-menu-item>
      <el-submenu index="9" v-if="role">
        <template slot="title">系统管理</template>
        <el-menu-item index="/home/yhgl">用户管理</el-menu-item>
        <el-menu-item index="/home/zzjggl">组织机构管理</el-menu-item>
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
