<template>
  <div class="info-container">
    <div class="info">
      <div class="col-box">
        <select-title title1="用能单位" title2="开始时间" title3="结束时间" @search="onSearch" :showSearch="true">
          <el-select
            slot="title1"
            v-model="system_id"
            class="multiple-org"
            placeholder="请选择"
            size="mini">
            <el-option
              v-for="item in options1"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-date-picker
            slot="title2"
            v-model="begin_time"
            type="month"
            size="mini"
            value-format="yyyy-MM"
            placeholder="请选择">
          </el-date-picker>
          <el-date-picker
            slot="title3"
            v-model="end_time"
            type="month"
            size="mini"
            value-format="yyyy-MM"
            placeholder="请选择">
          </el-date-picker>
        </select-title>
      </div>
      <div class="col-box-left-right-bottom">
        <div class="panel-box" v-loading="loading">
          <div class="row">
            <el-table
              :data="tableData"
              border
              header-cell-class-name="header-cell-class-name"
              style="width: 99%">
              <el-table-column
                prop="org"
                label="报警部门">
              </el-table-column>
              <el-table-column
                prop="dj"
                label="报警等级">
              </el-table-column>
              <el-table-column
                label="报警时间">
                <template slot-scope="scope">
                  <span>{{scope.row.nian}}年{{scope.row.yue}}月</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="mc"
                label="报警名称">
              </el-table-column>
              <el-table-column
                prop="nr"
                label="报警内容">
              </el-table-column>
              <el-table-column
                prop="yczb"
                label="异常指标">
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import SelectTitle from 'base/select-title/select-title'
  import DataPanelTitle from 'base/data-panel-title/data-panel-title'
  import ChartPie from 'base/chart-pie/chart-pie'
  import ChartBarLine from 'base/chart-bar-line/chart-bar-line'
  import { api } from '@/config'
  import fetch from 'utils/fetch'
  import {orgIdSimpleDic} from 'utils/dic'
//  import {tableDataBMFilter} from 'utils/filter'
  let moment = require('moment')
  moment.locale('zh-cn')
  export default {
    components: {
      SelectTitle,
      ChartPie,
      DataPanelTitle,
      ChartBarLine
    },
    created() {
    },
    data() {
      return {
        loading: false,
        pieRadius: ['13%', '60%'],
        options1: orgIdSimpleDic,
        tableData: [],
        noBorder: true,
        system_id: '',
        begin_time: '',
        end_time: ''
      }
    },
    methods: {
      onSearch() {
        this.loading = true
        this.loading = true
        fetch('get', api.ycFind, {id: this.system_id, begin_time: this.begin_time, end_time: this.end_time}).then((res) => {
          this.tableData = res.data
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
      }
    }
  }
</script>
<style lang="stylus" scoped>
  @import "~common/stylus/variable.styl"
  @import "~common/stylus/mixin.styl"
  .info-container
    overflow: auto
    -webkit-overflow-scrolling: touch
    position: absolute
    top: 0
    left: 0
    right: 0
    bottom: 0
    .info
      background: $color-sub-text
      display: flex
      flex-direction: column
      min-width: 600px
      .date-type
        width: 60px
      .department-block
        display: inline-block
        width: 25px
        height: 10px
      .panel-box > .row
        min-height: calc(100vh - 160px)
</style>
