<template>
  <div class="info-container">
    <div class="info">
      <div class="col-box">
        <select-title ref="select" title1="用能单位" title2="选择时间" @search="onSearch" :showSearch="true">
          <el-select
            slot="title1"
            v-model="system_id"
            class="multiple-org"
            multiple
            @change="selectChange"
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
            v-model="selectDate"
            type="month"
            size="mini"
            value-format="yyyy-MM"
            placeholder="请选择">
          </el-date-picker>
        </select-title>
      </div>
      <div class="col-box-left-right-bottom">
        <div class="panel-box" v-loading="loading">
          <report-table class="row" ref="row" className="table1" reportName="部门用能分析">
            <el-table
              slot="table"
              :data="filterRData"
              border
              header-cell-class-name="header-cell-class-name"
              style="width: 99%">
              <el-table-column
                prop="org"
                align="center"
                min-width="150"
                label="用能单位">
              </el-table-column>
              <el-table-column
                align="center"
                label="产值综合能耗（标煤/万元）">
                <el-table-column
                  align="center"
                  prop="czzhnh"
                  label="实际值">
                </el-table-column>
                <el-table-column
                  align="center"
                  prop="tqczzhnh"
                  label="同期值">
                </el-table-column>
              </el-table-column>
              <el-table-column
                align="center"
                label="产值耗水（吨/万元）">
                <el-table-column
                  align="center"
                  prop="s"
                  label="实际值">
                </el-table-column>
                <el-table-column
                  align="center"
                  prop="tqs"
                  label="同期值">
                </el-table-column>
              </el-table-column>
              <el-table-column
                align="center"
                label="能源消耗总量（吨标煤）">
                <el-table-column
                  align="center"
                  prop="zhnh"
                  label="实际值">
                </el-table-column>
                <el-table-column
                  align="center"
                  prop="tqzhnh"
                  label="同期值">
                </el-table-column>
              </el-table-column>
              <el-table-column
                align="center"
                label="单车综合能耗（吨标煤/辆）">
                <el-table-column
                  align="center"
                  prop="dczzhnh"
                  label="实际值">
                </el-table-column>
                <el-table-column
                  align="center"
                  prop="tqdczzhnh"
                  label="同期值">
                </el-table-column>
              </el-table-column>
            </el-table>
          </report-table>
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
  import {tableDataBMFilter} from 'utils/filter'
  import ReportTable from 'base/report-table/report-table'
  let moment = require('moment')
  moment.locale('zh-cn')
  export default {
    components: {
      SelectTitle,
      ChartPie,
      DataPanelTitle,
      ChartBarLine,
      ReportTable
    },
    created() {
    },
    data() {
      return {
        loading: false,
        pieRadius: ['13%', '60%'],
        options1: orgIdSimpleDic,
        tableData: [],
        colors: ['#066090', '#1196de', '#7ed2ff', '#ff8e06', '#666666', '#2436e3'],
        noBorder: true,
        system_id: '',
        selectDate: '',
        year: '',
        month: '',
        rData: [],
        legendData: ['用量', '同期用量', '上月用量', '产量', '同期产量', '上月产量'],
        seriesData: [],
        y: [{name: '辆'}, {name: '亿元'}]
      }
    },
    computed: {
      filterRData() {
        return tableDataBMFilter(this.rData)
      }
    },
    methods: {
      onSearch() {
        let dateArr = this.selectDate.split('-')
        if (dateArr.length > 0) {
          this.year = dateArr[0]
          this.month = dateArr[1]
        }
        this.loading = true
        fetch('get', api.bumenyongnengfx, {id: this.system_id.join(','), year: this.year, month: this.month}).then((res) => {
          this.rData = res.data
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
      },
      selectChange() {
        setTimeout(() => {
          this.$refs.row.style['min-height'] = 'calc(100vh - 110px - ' + this.$refs.select.$el.getBoundingClientRect().height + 'px)'
        }, 100)
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
      .multiple-org
        width: 400px
      .date-type
        width: 60px
      .department-block
        display: inline-block
        width: 25px
        height: 10px
      .panel-box > .row
        min-height: calc(100vh - 160px)
</style>
