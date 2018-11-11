<template>
  <div class="info-container">
    <div class="info">
      <div class="col-box">
        <select-title title1="用能单位" title2="选择时间" @search="onSearch" :showSearch="true">
          <el-select
            slot="title1"
            v-model="system_id"
            class="multiple-org"
            multiple
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
        <div class="panel-box" v-loading="loading">
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
              <div class="row">
                <el-table
                  :data="rData.list"
                  border
                  height="100%"
                  header-cell-class-name="header-cell-class-name"
                  style="width: 99%">
                  <el-table-column
                    prop="org"
                    label="用能部门">
                  </el-table-column>
                  <el-table-column
                    prop="df"
                    label="电费(千元)">
                  </el-table-column>
                  <el-table-column
                    prop="dj"
                    label="电价(元/千瓦时)">
                  </el-table-column>
                  <el-table-column
                    prop="d"
                    label="电量(万千瓦时)">
                  </el-table-column>
                </el-table>
              </div>
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
        colors: ['#066090', '#1196de', '#7ed2ff', '#ff8e06', '#666666', '#2436e3'],
        noBorder: true,
        system_id: '',
        selectDate: '',
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
          return orgName + monthText + '实际电价分析'
        } else {
          return ''
        }
      }
    },
    methods: {
      departmentStyle(index) {
        return `background: ${this.colors[index]}`
      },
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
      height: 100%
      min-width: 600px
      .col-box
        display: block
      .multiple-org
        width: 400px
      .date-type
        width: 60px
      .department-block
        display: inline-block
        width: 25px
        height: 10px
      .col-box-left-right-bottom
        height: 100%
        .panel-box >.row
          height: 100%
          .table-box > .row:last-child
            height: calc(100% - 250px)
      .chart-box
        min-height: 250px
        border-radius: 0px
</style>
