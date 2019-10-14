<template>
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
            <report-table class="row" className="table1" reportName="集团用量">
              <el-table
                :data="filterTableData"
                slot="table"
                border
                header-cell-class-name="header-cell-class-name"
                style="width: 99%">
                <el-table-column
                  header-align="center"
                  prop="projectName"
                  min-width="135"
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
          <report-table class="col-lg-12 col-md-12 table-box box-bottom" className="table2" reportName="集团用量分析结果">
            <data-panel-title slot="title" title="分析结果" :noBorder="noBorder">
            </data-panel-title>
            <el-table
              slot="table"
              v-if="lx.split('_').length !== 2"
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
            <el-table
              slot="table"
              :data="tableDataFilter2(rData.zfl, 100)"
              v-if="lx.split('_').length === 2"
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
</template>
<script>
  import SelectTitle from 'base/select-title/select-title'
  import DataPanelTitle from 'base/data-panel-title/data-panel-title'
  import ChartPie from 'base/chart-pie/chart-pie'
  import ChartBarLine from 'base/chart-bar-line/chart-bar-line'
  import { api } from '@/config'
  import fetch from 'utils/fetch'
  import {orgIdDic, lxdDic, getYAxis, chartColors} from 'utils/dic'
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
        options2: lxdDic,
        tableData: [],
        colors: chartColors,
        noBorder: true,
        system_id: '3',
        year: moment().format('YYYY') || '',
        lx: '33',
        rData: {},
        legendData: ['本期用量', '同期用量', '上月用量', '本期产量', '同期产量', '上月产量'],
        seriesData: []
      }
    },
    computed: {
      yAxis() {
        return getYAxis(this.lx, this.system_id)
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
          if (lxName.indexOf('量') === lxName.length - 1) {
            lxName = lxName.substring(0, lxName.length - 2)
          }
          return orgName + this.year + '年产量与' + lxName + '量趋势分析'
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
      lxChange(lx) {
        if (this.system_id && this.year) {
          this.onSearch()
        }
      },
      makeData() {
        this.tableData = []
        let series = []
        if (this.lx.split('_').length === 2) {
          this.legendData = ['本期单车用量', '同期单车用量', '上月单车用量', '本期产量', '同期产量', '上月产量']
          if (this.rData.dyl && this.rData.dyl.length > 0) {
            series.push({
              name: '本期单车用量',
              type: 'bar',
              data: this.rData.dyl
            })
            let obj = {}
            obj.projectName = '本期单车用量'
            for (let i = 0; i < this.rData.dyl.length; i++) {
              let key = this.rData.xAxisData[i] + 'yue'
              obj[key] = this.rData.dyl[i]
            }
            this.tableData.push(obj)
          }
          if (this.rData.dtqyl && this.rData.dtqyl.length > 0) {
            series.push({
              name: '同期单车用量',
              type: 'bar',
              data: this.rData.dtqyl
            })
            let obj = {}
            obj.projectName = '同期单车用量'
            for (let i = 0; i < this.rData.dtqyl.length; i++) {
              let key = this.rData.xAxisData[i] + 'yue'
              obj[key] = this.rData.dtqyl[i]
            }
            this.tableData.push(obj)
          }
          if (this.rData.dsyyl && this.rData.dsyyl.length > 0) {
            series.push({
              name: '上月单车用量',
              type: 'bar',
              data: this.rData.dsyyl
            })
            let obj = {}
            obj.projectName = '上月单车用量'
            for (let i = 0; i < this.rData.dsyyl.length; i++) {
              let key = this.rData.xAxisData[i] + 'yue'
              obj[key] = this.rData.dsyyl[i]
            }
            this.tableData.push(obj)
          }
          let zfl1 = {}
          let zfl2 = {}
          let zfl3 = {}
          let zfl4 = {}
          zfl1.zl = '单车环比增幅(%)'
          zfl2.zl = '产量环比增幅(%)'
          zfl3.zl = '单车同比增幅(%)'
          zfl4.zl = '产量同比增幅(%)'
          this.rData.zf && this.rData.zf.forEach((item, i) => {
            zfl1['zf' + i] = (item.dylhbzf)
            zfl2['zf' + i] = (item.clhbzf)
            zfl3['zf' + i] = (item.dyltbzf)
            zfl4['zf' + i] = (item.cltbzf)
          })
          this.rData.zfl = [zfl1, zfl2, zfl3, zfl4]
        } else {
          this.legendData = ['本期用量', '同期用量', '上月用量', '本期产量', '同期产量', '上月产量']
          if (this.rData.yl && this.rData.yl.length > 0) {
            series.push({
              name: '本期用量',
              type: 'bar',
              data: this.rData.yl
            })
            let obj = {}
            obj.projectName = '本期用量'
            for (let i = 0; i < this.rData.yl.length; i++) {
              let key = this.rData.xAxisData[i] + 'yue'
              obj[key] = this.rData.yl[i]
            }
            this.tableData.push(obj)
          }
          if (this.rData.tqyl && this.rData.tqyl.length > 0) {
            series.push({
              name: '同期用量',
              type: 'bar',
              data: this.rData.tqyl
            })
            let obj = {}
            obj.projectName = '同期用量'
            for (let i = 0; i < this.rData.tqyl.length; i++) {
              let key = this.rData.xAxisData[i] + 'yue'
              obj[key] = this.rData.tqyl[i]
            }
            this.tableData.push(obj)
          }
          if (this.rData.syyl && this.rData.syyl.length > 0) {
            series.push({
              name: '上月用量',
              type: 'bar',
              data: this.rData.syyl
            })
            let obj = {}
            obj.projectName = '上月用量'
            for (let i = 0; i < this.rData.syyl.length; i++) {
              let key = this.rData.xAxisData[i] + 'yue'
              obj[key] = this.rData.syyl[i]
            }
            this.tableData.push(obj)
          }
          let zfl1 = {}
          let zfl2 = {}
          let zfl3 = {}
          let zfl4 = {}
          zfl1.zl = '用量环比增幅(%)'
          zfl2.zl = '产量环比增幅(%)'
          zfl3.zl = '用量同比增幅(%)'
          zfl4.zl = '产量同比增幅(%)'
          this.rData.zf && this.rData.zf.forEach((item, i) => {
            zfl1['zf' + i] = (item.ylhbzf)
            zfl2['zf' + i] = (item.clhbzf)
            zfl3['zf' + i] = (item.yltbzf)
            zfl4['zf' + i] = (item.cltbzf)
          })
          this.rData.zfl = [zfl1, zfl2, zfl3, zfl4]
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
      },
      onSearch() {
        let lxInput = this.lx.split('_').length > 0 ? this.lx.split('_')[0] : ''
        this.loading = true
        fetch('get', api.nyylfxJituan, {id: this.system_id, year: this.year, lx: lxInput}).then((res) => {
          this.rData = res.data
          this.makeData()
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
      min-height: calc(100vh - 566px)
    .chart-box
      min-height: 350px
      border-radius: 0px
</style>
