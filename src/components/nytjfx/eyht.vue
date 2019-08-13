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
            @change="lxChange"
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
            <div class="col-lg-12 col-md-12 table-box">
              <div class="row">
                <chart-bar-line class="chart-box"
                                :legendData="legendData"
                                :series="seriesData"
                                :xAxisData="xAxisData"
                                :yAxis="yAxis"
                                :titleText="chartTitle"></chart-bar-line>
              </div>
              <report-table class="row" className="table1" reportName="二氧化碳分析">
                <el-table
                  slot="table"
                  :data="filterTableData"
                  border
                  header-cell-class-name="header-cell-class-name"
                  style="width: 99%">
                  <el-table-column
                    header-align="center"
                    prop="projectName"
                    min-width="120"
                    label="项目名称">
                    <template slot-scope="scope">
                      <span class="department-block" :style="departmentStyle(scope.$index)"></span>
                      <span>{{ scope.row.projectName }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    align="center"
                    v-for="item in rData.xAxisData"
                    :key="item"
                    :prop="item + 'yue'"
                    :label="item + '月'">
                  </el-table-column>
                </el-table>
              </report-table>
            </div>
          </div>
          <div class="row">
            <report-table class="col-lg-12 col-md-12 table-box box-bottom" className="table2" reportName="二氧化碳分析结果">
              <data-panel-title slot="title" title="分析结果" :noBorder="noBorder"></data-panel-title>
              <el-table
                slot="table"
                :data="tableDataFilter2(rData.zfl, 100)"
                border
                header-cell-class-name="header-cell-class-name"
                style="width: 99%">
                <el-table-column
                  align="center"
                  prop="zl"
                  label="月">
                </el-table-column>
                <el-table-column
                  align="center"
                  v-for="(item, index) in rData.zf"
                  :key="index"
                  :prop="'zf' + index"
                  :label="item.yue + '月'">
                </el-table-column>
              </el-table>
            </report-table>
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
  import {orgIdDic, lxTanDic, chartColors} from 'utils/dic'
  import {tableDataFilter, tableDataFilter2} from 'utils/filter'
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
      this.onSearch()
    },
    data() {
      return {
        loading: false,
        pieRadius: ['13%', '60%'],
        options1: orgIdDic,
        options2: lxTanDic,
        tableData: [],
        colors: chartColors,
        noBorder: true,
        system_id: '3',
        year: moment().format('YYYY') || '',
        rData: {},
        lx: 'tan',
        legendData: ['本期碳', '同期碳', '上月碳', '本期产量', '同期产量', '上月产量'],
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
      tableDataFilter2,
      departmentStyle(index) {
        return `background: ${this.colors[index]}`
      },
      lxChange() {
        if (this.system_id && this.year) {
          this.onSearch()
        }
      },
      onSearch() {
        this.loading = true
        fetch('get', api.tanfx, {id: this.system_id, year: this.year}).then((res) => {
          this.rData = res.data
          this.makeData()
          this.loading = false
        }).catch(() => {
          this.rData = {}
          this.tableData = []
          this.loading = false
        })
      },
      makeData() {
        this.tableData = []
        let series = []
        if (this.lx === 'tan') {
          this.legendData = ['本期碳', '同期碳', '上月碳', '本期产量', '同期产量', '上月产量']
          if (this.rData.tan && this.rData.tan.length > 0) {
            series.push({
              name: '本期碳',
              type: 'bar',
              data: this.rData.tan
            })
            let obj = {}
            obj.projectName = '本期碳'
            for (let i = 0; i < this.rData.tan.length; i++) {
              let key = this.rData.xAxisData[i] + 'yue'
              obj[key] = this.rData.tan[i]
            }
            this.tableData.push(obj)
          }
          if (this.rData.tqtan && this.rData.tqtan.length > 0) {
            series.push({
              name: '同期碳',
              type: 'bar',
              data: this.rData.tqtan
            })
            let obj = {}
            obj.projectName = '同期碳'
            for (let i = 0; i < this.rData.tqtan.length; i++) {
              let key = this.rData.xAxisData[i] + 'yue'
              obj[key] = this.rData.tqtan[i]
            }
            this.tableData.push(obj)
          }
          if (this.rData.sytan && this.rData.sytan.length > 0) {
            series.push({
              name: '上月碳',
              type: 'bar',
              data: this.rData.sytan
            })
            let obj = {}
            obj.projectName = '上月碳'
            for (let i = 0; i < this.rData.sytan.length; i++) {
              let key = this.rData.xAxisData[i] + 'yue'
              obj[key] = this.rData.sytan[i]
            }
            this.tableData.push(obj)
          }
        } else if (this.lx === 'dtan') {
          this.legendData = ['本期单碳', '同期单碳', '上月单碳', '本期产量', '同期产量', '上月产量']
          if (this.rData.dtan && this.rData.dtan.length > 0) {
            series.push({
              name: '本期单碳',
              type: 'bar',
              data: this.rData.dtan
            })
            let obj = {}
            obj.projectName = '本期单碳'
            for (let i = 0; i < this.rData.dtan.length; i++) {
              let key = this.rData.xAxisData[i] + 'yue'
              obj[key] = this.rData.dtan[i]
            }
            this.tableData.push(obj)
          }
          if (this.rData.dtqtan && this.rData.dtqtan.length > 0) {
            series.push({
              name: '同期单碳',
              type: 'bar',
              data: this.rData.dtqtan
            })
            let obj = {}
            obj.projectName = '同期单碳'
            for (let i = 0; i < this.rData.dtqtan.length; i++) {
              let key = this.rData.xAxisData[i] + 'yue'
              obj[key] = this.rData.dtqtan[i]
            }
            this.tableData.push(obj)
          }
          if (this.rData.dsytan && this.rData.dsytan.length > 0) {
            series.push({
              name: '上月单碳',
              type: 'bar',
              data: this.rData.dsytan
            })
            let obj = {}
            obj.projectName = '上月单碳'
            for (let i = 0; i < this.rData.dsytan.length; i++) {
              let key = this.rData.xAxisData[i] + 'yue'
              obj[key] = this.rData.dsytan[i]
            }
            this.tableData.push(obj)
          }
        }
        if (this.rData.cl && this.rData.cl.length > 0) {
          series.push({
            name: '本期产量',
            type: 'line',
            data: this.rData.cl
          })
          let obj = {}
          obj.projectName = '本期产量'
          for (let i = 0; i < this.rData.cl.length; i++) {
            let key = this.rData.xAxisData[i] + 'yue'
            obj[key] = this.rData.cl[i]
          }
          this.tableData.push(obj)
        }
        if (this.rData.tqcl && this.rData.tqcl.length > 0) {
          series.push({
            name: '同期产量',
            type: 'line',
            data: this.rData.tqcl
          })
          let obj = {}
          obj.projectName = '同期产量'
          for (let i = 0; i < this.rData.tqcl.length; i++) {
            let key = this.rData.xAxisData[i] + 'yue'
            obj[key] = this.rData.tqcl[i]
          }
          this.tableData.push(obj)
        }
        if (this.rData.sycl && this.rData.sycl.length > 0) {
          series.push({
            name: '上月产量',
            type: 'line',
            data: this.rData.sycl
          })
          let obj = {}
          obj.projectName = '上月产量'
          for (let i = 0; i < this.rData.sycl.length; i++) {
            let key = this.rData.xAxisData[i] + 'yue'
            obj[key] = this.rData.sycl[i]
          }
          this.tableData.push(obj)
        }
        this.seriesData = series
        let zfl1 = {}
        let zfl2 = {}
        let zfl3 = {}
        let zfl4 = {}
        zfl1.zl = '产量环比增幅(%)'
        zfl2.zl = '产量同比增幅(%)'
        if (this.lx === 'tan') {
          zfl3.zl = '碳环比增幅(%)'
          zfl4.zl = '碳同比增幅(%)'
        } else if (this.lx === 'dtan') {
          zfl3.zl = '单车碳环比增幅(%)'
          zfl4.zl = '单车碳同比增幅(%)'
        }
        this.rData.zf && this.rData.zf.forEach((item, i) => {
          zfl1['zf' + i] = (item.clhbzf)
          zfl2['zf' + i] = (item.cltbzf)
          if (this.lx === 'tan') {
            zfl3['zf' + i] = (item.tanhbzf)
            zfl4['zf' + i] = (item.tantbzf)
          } else if (this.lx === 'dtan') {
            zfl3['zf' + i] = (item.dtanhbzf)
            zfl4['zf' + i] = (item.dtantbzf)
          }
        })
        this.rData.zfl = [zfl1, zfl2, zfl3, zfl4]
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
      .date-type
        width: 60px
      .department-block
        display: inline-block
        width: 25px
        height: 10px
      .table-box > .row:last-child
        min-height: calc(100vh - 510px)
      .chart-box
        min-height: 350px
        border-radius: 0px
</style>
