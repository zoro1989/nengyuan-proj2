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
            placeholder="选择年">
          </el-date-picker>
        </select-title>
      </div>
      <div class="col-box-left-right-bottom">
        <!--<div class="panel-box" v-loading="loading">-->
        <div class="panel-box" ref="panel">
          <div class="row">
            <div class="table-box">
              <div class="row">
                <chart-bar-line class="chart-box"
                                :legendData="legendData"
                                :series="seriesData"
                                :xAxisData="rData.chart && rData.chart.xAxisData"
                                :yAxis="y"
                                :titleText="chartTitle"></chart-bar-line>
              </div>
              <report-table class="row" className="table1" reportName="电价分析">
                <el-table
                  slot="table"
                  :data="tableDataFilter2(rData.list, 1000)"
                  border
                  header-cell-class-name="header-cell-class-name">
                  <el-table-column
                    align="center"
                    prop="org"
                    label="用能部门">
                  </el-table-column>
                  <el-table-column
                    align="center"
                    prop="df"
                    label="电费(万元)">
                  </el-table-column>
                  <el-table-column
                    align="center"
                    prop="dj"
                    label="电价(元/千瓦时)">
                  </el-table-column>
                  <el-table-column
                    align="center"
                    prop="d"
                    label="电量(万千瓦时)">
                  </el-table-column>
                </el-table>
              </report-table>
            </div>
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
  import ReportTable from 'base/report-table/report-table'
  import {tableDataFilter2} from 'utils/filter'
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
      this.onSearch()
    },
    data() {
      return {
        loading: false,
        pieRadius: ['13%', '60%'],
        options1: orgIdSimpleDic,
        tableData: [],
        colors: ['#066090', '#1196de', '#7ed2ff', '#ff8e06', '#666666', '#2436e3'],
        noBorder: true,
        system_id: ['1', '35', '15', '3', '4', '10', '16', '17', '19', '25', '26', '34', '32', '33'],
        selectDate: moment().format('DD') * 1 <= 10 ? moment().subtract(2, 'months').format('YYYY-MM') : moment().subtract(1, 'months').format('YYYY-MM'),
        rData: {},
        year: '',
        month: '',
        legendData: ['电价'],
        seriesData: [],
        y: [{name: '元/千瓦时'}]
      }
    },
    computed: {
      chartTitle() {
        let orgId = this.options1.findIndex((item) => {
          return this.system_id === item.value
        })
        let orgName = orgId >= 0 ? this.options1[orgId].label : ''
        if (this.selectDate && orgName) {
          let monthText = moment(this.selectDate).format('YYYY年MM月')
          return orgName + monthText + '本期电价分析'
        } else {
          return ''
        }
      }
    },
    methods: {
      tableDataFilter2,
      onSearch() {
        let dateArr = this.selectDate.split('-')
        if (dateArr.length > 0) {
          this.year = dateArr[0]
          this.month = dateArr[1]
        }
        this.loading = true
        fetch('get', api.dianjiafenxi, {id: this.system_id.join(','), year: this.year, month: this.month}).then((res) => {
          this.seriesData = [{
            name: '电价',
            data: res.data.chart ? res.data.chart.data : [],
            type: 'bar'
          }]
          this.rData = res.data
          this.loading = false
        }).catch(() => {
          this.rData = {}
          this.loading = false
        })
      },
      selectChange() {
        setTimeout(() => {
          this.$refs.panel.style['min-height'] = 'calc(100vh - 140px - ' + this.$refs.select.$el.getBoundingClientRect().height + 'px)'
        }, 100)
      },
      mounted() {
        setTimeout(() => {
          this.$refs.panel.style['min-height'] = 'calc(100vh - 140px - ' + this.$refs.select.$el.getBoundingClientRect().height + 'px)'
        }, 100)
      }
    }
  }
</script>
<style lang="stylus" scoped>
  @import "~common/stylus/variable.styl"
  @import "~common/stylus/mixin.styl"
  .info-container
    .info
      background-color: $color-background-sub
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
      .chart-box
        min-height: 250px
        border-radius: 0px
</style>
