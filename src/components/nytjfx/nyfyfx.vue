<template>
  <div class="info-container">
    <div class="info">
      <div class="col-box">
        <select-title title1="用能单位" title2="选择时间" title3="费用类型" @search="onSearch" :showSearch="true">
          <el-select
            slot="title1"
            v-model="system_id"
            @change="systemChange"
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
            @change="lxChange"
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
            <div class="col-lg-12 col-md-12 table-box">
              <div class="row">
                <chart-bar-line class="chart-box"
                                :legendData="legendData"
                                :series="seriesData"
                                :xAxisData="xAxisData"
                                :yAxis="yAxis"
                                :titleText="chartTitle"></chart-bar-line>
              </div>
              <report-table class="row" className="table1" reportName="能源费用分析">
                <el-table
                  slot="table"
                  :data="filterTableData"
                  border
                  header-cell-class-name="header-cell-class-name"
                  style="width: 99%">
                  <el-table-column
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
            <report-table class="col-lg-12 col-md-12 table-box box-bottom" className="table2" reportName="费用分析结果">
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
  import {orgIdDic, lxfyDic, lxfyNoCarDic, chartColors} from 'utils/dic'
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
        options2: lxfyDic,
        tableData: [],
        colors: chartColors,
        noBorder: true,
        system_id: '3',
        year: moment().format('YYYY') || '',
        lx: '33',
        rData: {},
        legendData: ['本期费用', '同期费用', '上月费用', '本期产量', '同期产量', '上月产量'],
        seriesData: [],
        y: [{name: '辆'}, {name: '亿元'}]
      }
    },
    computed: {
      yAxis() {
        return [{name: '费用(万元)'}, {name: '产量(辆)'}]
//        if (this.lx === '33') {
//          return [{name: '万元'}, {name: '万千瓦时'}]
//        } else if (this.lx === '00') {
//          return [{name: '万元'}, {name: '吨'}]
//        } else if (this.lx === '32') {
//          return [{name: '万元'}, {name: '吉焦'}]
//        } else if (this.lx === '15') {
//          return [{name: '万元'}, {name: '万立方米'}]
//        } else if (this.lx === '40') {
//          return [{name: '万元'}, {name: '万吨标煤'}]
//        } else if (this.lx === '33_d') {
//          return [{name: '万元'}, {name: '万千瓦时'}]
//        } else if (this.lx === '00_d') {
//          return [{name: '万元'}, {name: '吨'}]
//        } else if (this.lx === '32_d') {
//          return [{name: '万元'}, {name: '吉焦'}]
//        } else if (this.lx === '15_d') {
//          return [{name: '万元'}, {name: '万立方米'}]
//        } else if (this.lx === '40_d') {
//          return [{name: '万元'}, {name: '万吨标煤'}]
//        } else {
//          return []
//        }
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
          return orgName + this.year + '年产量与' + lxName + '对比分析'
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
      lxChange() {
        if (this.system_id && this.year) {
          this.onSearch()
        }
      },
      tableDataFilter2,
      systemChange(value) {
        this.lx = ''
        if (value === '1') {
          this.options2 = lxfyDic
        } else {
          this.options2 = lxfyNoCarDic
        }
      },
      departmentStyle(index) {
        return `background: ${this.colors[index]}`
      },
      onSearch() {
        let lxInput = this.lx.split('_').length > 0 ? this.lx.split('_')[0] : ''
        this.loading = true
        fetch('get', api.nyfyfx, {id: this.system_id, year: this.year, lx: lxInput}).then((res) => {
          this.tableData = []
          let series = []
          if (res.data.fy && res.data.fy.length > 0) {
            series.push({
              name: '本期费用',
              type: 'bar',
              data: res.data.fy
            })
            let obj = {}
            obj.projectName = '本期费用'
            for (let i = 0; i < res.data.fy.length; i++) {
              let key = res.data.xAxisData[i] + 'yue'
              obj[key] = res.data.fy[i]
            }
            this.tableData.push(obj)
          }
          if (res.data.tqfy && res.data.tqfy.length > 0) {
            series.push({
              name: '同期费用',
              type: 'bar',
              data: res.data.tqfy
            })
            let obj = {}
            obj.projectName = '同期费用'
            for (let i = 0; i < res.data.tqfy.length; i++) {
              let key = res.data.xAxisData[i] + 'yue'
              obj[key] = res.data.tqfy[i]
            }
            this.tableData.push(obj)
          }
          if (res.data.syfy && res.data.syfy.length > 0) {
            series.push({
              name: '上月费用',
              type: 'bar',
              data: res.data.syfy
            })
            let obj = {}
            obj.projectName = '上月费用'
            for (let i = 0; i < res.data.syfy.length; i++) {
              let key = res.data.xAxisData[i] + 'yue'
              obj[key] = res.data.syfy[i]
            }
            this.tableData.push(obj)
          }
          if (res.data.cl && res.data.cl.length > 0) {
            series.push({
              name: '本期产量',
              type: 'line',
              data: res.data.cl
            })
            let obj = {}
            obj.projectName = '本期产量'
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
          let zfl1 = {}
          let zfl2 = {}
          let zfl3 = {}
          let zfl4 = {}
          zfl1.zl = '费用环比增幅(%)'
          zfl2.zl = '产量环比增幅(%)'
          zfl3.zl = '费用同比增幅(%)'
          zfl4.zl = '产量同比增幅(%)'
          this.rData.zf && this.rData.zf.forEach((item, i) => {
            zfl1['zf' + i] = (item.fyhbzf)
            zfl2['zf' + i] = (item.clhbzf)
            zfl3['zf' + i] = (item.fytbzf)
            zfl4['zf' + i] = (item.cltbzf)
          })
          this.rData.zfl = [zfl1, zfl2, zfl3, zfl4]
          this.loading = false
        }).catch(() => {
          this.rData = {}
          this.tableData = []
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
