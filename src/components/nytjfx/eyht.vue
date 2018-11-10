<template>
  <div class="info-container">
    <div class="info">
      <div class="col-box">
        <select-title title1="用能单位" title2="选择时间" title3="能源类型" @search="onSearch" :showSearch="true">
          <el-select
            slot="title1"
            v-model="system_id"
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
            v-model="year"
            type="year"
            size="mini"
            value-format="yyyy"
            placeholder="选择年">
          </el-date-picker>
          <el-select
            slot="title3"
            v-model="lx"
            placeholder="请选择"
            size="mini">
            <el-option
              v-for="item in options2"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </select-title>
      </div>
      <div class="col-box-left-right-bottom">
        <div class="panel-box" v-loading="loading">
          <div class="row">
            <div class="col-lg-8 col-md-12 table-box">
              <div class="row">
                <chart-bar-line class="chart-box"
                                :legendData="legendData"
                                :series="seriesData"
                                :xAxisData="xAxisData"
                                :yAxis="yAxis"
                                :titleText="chartTitle"></chart-bar-line>
              </div>
              <div class="row">
                <el-table
                  :data="filterTableData"
                  border
                  height="100%"
                  header-cell-class-name="header-cell-class-name"
                  style="width: 99%">
                  <el-table-column
                    prop="projectName"
                    min-width="200"
                    label="项目名称">
                    <template slot-scope="scope">
                      <span class="department-block" :style="departmentStyle(scope.$index)"></span>
                      <span>{{ scope.row.projectName }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    v-for="item in rData.xAxisData"
                    :key="item"
                    :prop="item + 'yue'"
                    :label="item + '月'">
                  </el-table-column>
                </el-table>
              </div>
            </div>
            <div class="col-lg-4 col-md-12 table-box box-right">
              <data-panel-title title="分析结果" :noBorder="noBorder"></data-panel-title>
              <el-table
                :data="rData.zf"
                border
                height="calc(100% - 50px)"
                header-cell-class-name="header-cell-class-name"
                style="width: 99%">
                <el-table-column
                  prop="yue"
                  label="月">
                </el-table-column>
                <el-table-column
                  prop="clhbzf"
                  label="产量环比增幅">
                </el-table-column>
                <el-table-column
                  prop="cltbzf"
                  label="产量同比增幅">
                </el-table-column>
                <el-table-column
                  v-if="lx !== 'dtan'"
                  prop="tanhbzf"
                  label="碳环比增幅">
                </el-table-column>
                <el-table-column
                  v-if="lx !== 'dtan'"
                  prop="tantbzf"
                  label="碳同比增幅">
                </el-table-column>
                <el-table-column
                  v-if="lx === 'dtan'"
                  prop="dtanhbzf"
                  label="单车碳环比增幅">
                </el-table-column>
                <el-table-column
                  v-if="lx === 'dtan'"
                  prop="dtantbzf"
                  label="单车碳同比增幅">
                </el-table-column>
              </el-table>
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
  import {orgIdDic, lxTanDic} from 'utils/dic'
  import {tableDataFilter} from 'utils/filter'
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
        options1: orgIdDic,
        options2: lxTanDic,
        tableData: [],
        colors: ['#066090', '#1196de', '#7ed2ff', '#ff8e06', '#666666', '#2436e3'],
        noBorder: true,
        system_id: '',
        year: '',
        rData: {},
        lx: 'tan',
        legendData: ['实际碳', '同期碳', '上月碳', '产量', '同期产量', '上月产量'],
        seriesData: [],
        y: [{name: '辆'}, {name: '亿元'}]
      }
    },
    computed: {
      yAxis() {
        if (this.lx === 'tan') {
          return [{name: '二氧化碳（吨CO2）'}, {name: '产量（辆）'}]
        } else if (this.lx === 'dtan') {
          return [{name: '吨CO2/辆'}, {name: '产量（辆）'}]
        } else {
          return []
        }
      },
      chartTitle() {
        let orgId = this.options1.findIndex((item) => {
          return this.system_id === item.value
        })
        let orgName = orgId >= 0 ? this.options1[orgId].label : ''
        let lxId = this.options2.findIndex((item) => {
          return this.lx === item.value
        })
        let lxName = lxId >= 0 ? this.options2[lxId].label : ''
        if (this.year && orgName && lxName) {
          return orgName + this.year + '年产量与' + lxName + '排放量分析'
        } else {
          return ''
        }
      },
      xAxisData() {
        if (this.rData.xAxisData && this.rData.xAxisData.length > 0) {
          let copyArr = JSON.parse(JSON.stringify(this.rData.xAxisData))
          return copyArr.map((item) => {
            return item + '月'
          })
        } else {
          return []
        }
      },
      filterTableData() {
        return tableDataFilter(this.tableData)
      }
    },
    methods: {
      departmentStyle(index) {
        return `background: ${this.colors[index]}`
      },
      onSearch() {
        this.loading = true
        fetch('get', api.tanfx, {id: this.system_id, year: this.year}).then((res) => {
          this.tableData = []
          let series = []
          if (res.data.tan && res.data.tan.length > 0) {
            series.push({
              name: '实际碳',
              type: 'bar',
              data: res.data.tan
            })
            let obj = {}
            obj.projectName = '实际碳'
            for (let i = 0; i < res.data.tan.length; i++) {
              let key = res.data.xAxisData[i] + 'yue'
              obj[key] = res.data.tan[i]
            }
            this.tableData.push(obj)
          }
          if (res.data.tqtan && res.data.tqtan.length > 0) {
            series.push({
              name: '同期碳',
              type: 'bar',
              data: res.data.tqtan
            })
            let obj = {}
            obj.projectName = '同期碳'
            for (let i = 0; i < res.data.tqtan.length; i++) {
              let key = res.data.xAxisData[i] + 'yue'
              obj[key] = res.data.tqtan[i]
            }
            this.tableData.push(obj)
          }
          if (res.data.sytan && res.data.sytan.length > 0) {
            series.push({
              name: '上月碳',
              type: 'bar',
              data: res.data.sytan
            })
            let obj = {}
            obj.projectName = '上月碳'
            for (let i = 0; i < res.data.sytan.length; i++) {
              let key = res.data.xAxisData[i] + 'yue'
              obj[key] = res.data.sytan[i]
            }
            this.tableData.push(obj)
          }
          if (res.data.cl && res.data.cl.length > 0) {
            series.push({
              name: '产量',
              type: 'line',
              data: res.data.cl
            })
            let obj = {}
            obj.projectName = '产量'
            for (let i = 0; i < res.data.cl.length; i++) {
              let key = res.data.xAxisData[i] + 'yue'
              obj[key] = res.data.cl[i]
            }
            this.tableData.push(obj)
          }
          if (res.data.tqcl && res.data.tqcl.length > 0) {
            series.push({
              name: '同期产量',
              type: 'line',
              data: res.data.tqcl
            })
            let obj = {}
            obj.projectName = '同期产量'
            for (let i = 0; i < res.data.tqcl.length; i++) {
              let key = res.data.xAxisData[i] + 'yue'
              obj[key] = res.data.tqcl[i]
            }
            this.tableData.push(obj)
          }
          if (res.data.sycl && res.data.sycl.length > 0) {
            series.push({
              name: '上月产量',
              type: 'line',
              data: res.data.sycl
            })
            let obj = {}
            obj.projectName = '上月产量'
            for (let i = 0; i < res.data.sycl.length; i++) {
              let key = res.data.xAxisData[i] + 'yue'
              obj[key] = res.data.sycl[i]
            }
            this.tableData.push(obj)
          }
          this.seriesData = series
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
            height: calc(100% - 350px)
      .chart-box
        min-height: 350px
        border-radius: 0px
</style>
