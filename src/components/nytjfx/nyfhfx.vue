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
          <span slot="title2">
          <el-date-picker
            v-model="year"
            class="date-year"
            size="mini"
            type="year"
            value-format="yyyy"
            placeholder="选择年">
          </el-date-picker>
          <el-select
            v-model="month"
            class="date-month"
            placeholder="选择月"
            clearable
            size="mini">
            <el-option
              v-for="item in options3"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </span>
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
        <!--<div class="panel-box" v-loading="loading">-->
        <div class="panel-box">
          <div class="row">
            <div class="table-box">
              <div class="row">
                <chart-bar-line class="chart-box"
                                :legendData="legendData"
                                :series="seriesData"
                                :xAxisData="xAxisData"
                                :yAxis="yAxis"
                                :titleText="chartTitleShow"></chart-bar-line>
              </div>
              <div class="row">
                <div style="height: 40px; line-height: 40px;">
                  <span>最大值：{{maxVal}}</span>
                  <span>最小值：{{minVal}}</span>
                  <span>平均值：{{avgVal}}</span>
                </div>
              </div>
              <report-table class="row" v-if="rData.xAxisData && rData.xAxisData.length > 0" className="table1" reportName="能源负荷分析">
                <el-table
                  slot="table"
                  :data="tableData"
                  border
                  header-cell-class-name="header-cell-class-name">
                  <el-table-column
                    header-align="center"
                    prop="projectName"
                    min-width="12.9%"
                    label="项目名称">
                    <template slot-scope="scope">
                      <span class="department-block" :style="departmentStyle(scope.$index)"></span>
                      <span>{{ scope.row.projectName }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    v-if="month"
                    min-width="6.7%"
                    align="center"
                    v-for="item in rData.xAxisData.slice(0, 13)"
                    :key="item"
                    :prop="item === undefined ? '' : item + 'ri'"
                    :label="item === undefined ? '' : item + '日'">
                  </el-table-column>
                  <el-table-column
                    v-if="!month"
                    min-width="6.7%"
                    align="center"
                    v-for="item in rData.xAxisData"
                    :key="item"
                    :prop="item + 'yue'"
                    :label="item + '月'">
                  </el-table-column>
                </el-table>
              </report-table>
              <report-table v-if="month && rData.xAxisData && rData.xAxisData.length > 13" class="row" className="table2" reportName="能源负荷分析">
                <el-table
                  slot="table"
                  :data="tableData"
                  border
                  header-cell-class-name="header-cell-class-name">
                  <el-table-column
                    prop="projectName"
                    header-align="center"
                    min-width="12.9%"
                    label="项目名称">
                    <template slot-scope="scope">
                      <span class="department-block" :style="departmentStyle(scope.$index)"></span>
                      <span>{{ scope.row.projectName }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    align="center"
                    min-width="6.7%"
                    v-for="item in rData.xAxisData.slice(13, 26)"
                    :key="item"
                    :prop="item === undefined ? '' : item + 'ri'"
                    :label="item === undefined ? '' : item + '日'">
                  </el-table-column>
                </el-table>
              </report-table>
              <report-table v-if="month && rData.xAxisData && rData.xAxisData.length > 26" class="row" className="table3" reportName="能源负荷分析">
                <el-table
                  slot="table"
                  :data="tableData"
                  border
                  header-cell-class-name="header-cell-class-name">
                  <el-table-column
                    prop="projectName"
                    header-align="center"
                    min-width="12.9%"
                    label="项目名称">
                    <template slot-scope="scope">
                      <span class="department-block" :style="departmentStyle(scope.$index)"></span>
                      <span>{{ scope.row.projectName }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    align="center"
                    min-width="6.7%"
                    v-for="item in rData.xAxisData.slice(26, rData.xAxisData.length)"
                    :key="item"
                    :prop="item === undefined ? '' : item + 'ri'"
                    :label="item === undefined ? '' : item + '日'">
                  </el-table-column>
                </el-table>
              </report-table>
            </div>
            <!--<div class="col-lg-4 col-md-12 table-box box-right">-->
              <!--<data-panel-title title="分析结果" :noBorder="noBorder"></data-panel-title>-->
            <!--</div>-->
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
  import {orgSystemIdDicCasc, lxrdDic, monthDic, chartColors} from 'utils/dic'
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
        options1: orgSystemIdDicCasc,
        options2: lxrdDic,
        options3: monthDic,
        tableData: [],
        colors: chartColors,
        noBorder: true,
        lx: '32',
        system_id: '904489',
        year: moment().format('YYYY') || '',
        month: moment().format('MM') || '',
        rData: {},
        legendData: ['用量'],
        seriesData: [],
        y: [{name: '产量'}],
        maxVal: 0,
        minVal: 0,
        avgVal: 0,
        chartTitleShow: ''
      }
    },
    computed: {
      yAxis() {
        if (this.lx === '33') {
          return [{name: '千瓦时'}]
        } else if (this.lx === '00') {
          return [{name: '立方米'}]
        } else if (this.lx === '32') {
          return [{name: '吉焦'}]
        } else if (this.lx === '15') {
          return [{name: '立方米'}]
        } else if (this.lx === '40') {
          return [{name: '吨标煤'}]
        } else if (this.lx === '33_d') {
          return [{name: '千瓦时/辆'}]
        } else if (this.lx === '00_d') {
          return [{name: '立方米/辆'}]
        } else if (this.lx === '32_d') {
          return [{name: '吉焦/辆'}]
        } else if (this.lx === '15_d') {
          return [{name: '立方米/辆'}]
        } else if (this.lx === '40_d') {
          return [{name: '吨标煤/辆'}]
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
          let monthId = this.options3.findIndex((item) => {
            return this.month === item.value
          })
          let monthText = monthId >= 0 ? this.options3[monthId].label : ''
          return orgName + this.year + '年' + monthText + lxName + '负荷分析'
        } else {
          return ''
        }
      },
      xAxisData() {
        if (this.rData.xAxisData && this.rData.xAxisData.length > 0) {
          let copyArr = []
          this.rData.xAxisData.forEach((item) => {
            if (item !== undefined) {
              if (this.month) {
                copyArr.push(item + '日')
              } else {
                copyArr.push(item + '月')
              }
            }
          })
          return copyArr
        } else {
          return []
        }
      }
    },
    methods: {
      lxChange(lx) {
        if (this.system_id && this.year) {
          this.onSearch()
        }
      },
      departmentStyle(index) {
        return `background: ${this.colors[index]}`
      },
      onSearch() {
        this.loading = true
        fetch('get', api.nyylfxDay, {id: this.system_id, year: this.year, month: this.month}).then((res) => {
          this.tableData = []
          this.rData = res.data
          // 电
          if (this.lx === '33' && res.data.d) {
            this.maxVal = res.data.dmax
            this.minVal = res.data.dmin
            this.avgVal = res.data.daverage
            let obj = {}
            if (this.month) {
              this.seriesData = [{
                name: '日电量(' + (this.yAxis && this.yAxis.length > 0 ? this.yAxis[0].name : '') + ')',
                type: 'bar',
                data: res.data.d
              }]
              this.legendData = ['日电量(' + (this.yAxis && this.yAxis.length > 0 ? this.yAxis[0].name : '') + ')']
              obj.projectName = '日电量(' + (this.yAxis && this.yAxis.length > 0 ? this.yAxis[0].name : '') + ')'
            } else {
              this.seriesData = [{
                name: '本期电量(' + (this.yAxis && this.yAxis.length > 0 ? this.yAxis[0].name : '') + ')',
                type: 'bar',
                data: res.data.d
              }]
              this.legendData = ['本期电量(' + (this.yAxis && this.yAxis.length > 0 ? this.yAxis[0].name : '') + ')']
              obj.projectName = '本期电量(' + (this.yAxis && this.yAxis.length > 0 ? this.yAxis[0].name : '') + ')'
            }
            for (let i = 0; i < res.data.d.length; i++) {
              if (this.month) {
                let key = res.data.xAxisData[i] + 'ri'
                obj[key] = res.data.d[i]
              } else {
                let key = res.data.xAxisData[i] + 'yue'
                obj[key] = res.data.d[i]
              }
            }
            this.tableData = [obj]
            // 水
          } else if (this.lx === '00' && res.data.s) {
            this.maxVal = res.data.smax
            this.minVal = res.data.smin
            this.avgVal = res.data.saverage
            let obj = {}
            if (this.month) {
              this.seriesData = [{
                name: '日水量(' + (this.yAxis && this.yAxis.length > 0 ? this.yAxis[0].name : '') + ')',
                type: 'bar',
                data: res.data.s
              }]
              this.legendData = ['日水量(' + (this.yAxis && this.yAxis.length > 0 ? this.yAxis[0].name : '') + ')']
              obj.projectName = '日水量(' + (this.yAxis && this.yAxis.length > 0 ? this.yAxis[0].name : '') + ')'
            } else {
              this.seriesData = [{
                name: '本期水量(' + (this.yAxis && this.yAxis.length > 0 ? this.yAxis[0].name : '') + ')',
                type: 'bar',
                data: res.data.s
              }]
              this.legendData = ['本期水量(' + (this.yAxis && this.yAxis.length > 0 ? this.yAxis[0].name : '') + ')']
              obj.projectName = '本期水量(' + (this.yAxis && this.yAxis.length > 0 ? this.yAxis[0].name : '') + ')'
            }
            for (let i = 0; i < res.data.s.length; i++) {
              if (this.month) {
                let key = res.data.xAxisData[i] + 'ri'
                obj[key] = res.data.s[i]
              } else {
                let key = res.data.xAxisData[i] + 'yue'
                obj[key] = res.data.s[i]
              }
            }
            this.tableData = [obj]
            // 热力
          } else if (this.lx === '32' && res.data.r) {
            this.maxVal = res.data.rmax
            this.minVal = res.data.rmin
            this.avgVal = res.data.raverage
            let obj = {}
            if (this.month) {
              this.seriesData = [{
                name: '日热量(' + (this.yAxis && this.yAxis.length > 0 ? this.yAxis[0].name : '') + ')',
                type: 'bar',
                data: res.data.r
              }]
              this.legendData = ['日热量(' + (this.yAxis && this.yAxis.length > 0 ? this.yAxis[0].name : '') + ')']
              obj.projectName = '日热量(' + (this.yAxis && this.yAxis.length > 0 ? this.yAxis[0].name : '') + ')'
            } else {
              this.seriesData = [{
                name: '本期热量(' + (this.yAxis && this.yAxis.length > 0 ? this.yAxis[0].name : '') + ')',
                type: 'bar',
                data: res.data.r
              }]
              this.legendData = ['本期热量(' + (this.yAxis && this.yAxis.length > 0 ? this.yAxis[0].name : '') + ')']
              obj.projectName = '本期热量(' + (this.yAxis && this.yAxis.length > 0 ? this.yAxis[0].name : '') + ')'
            }
            for (let i = 0; i < res.data.r.length; i++) {
              if (this.month) {
                let key = res.data.xAxisData[i] + 'ri'
                obj[key] = res.data.r[i]
              } else {
                let key = res.data.xAxisData[i] + 'yue'
                obj[key] = res.data.r[i]
              }
            }
            this.tableData = [obj]
            // 天然气
          } else if (this.lx === '15' && res.data.q) {
            this.maxVal = res.data.qmax
            this.minVal = res.data.qmin
            this.avgVal = res.data.qaverage
            let obj = {}
            if (this.month) {
              this.seriesData = [{
                name: '日天然气量(' + (this.yAxis && this.yAxis.length > 0 ? this.yAxis[0].name : '') + ')',
                type: 'bar',
                data: res.data.q
              }]
              this.legendData = ['日天然气量(' + (this.yAxis && this.yAxis.length > 0 ? this.yAxis[0].name : '') + ')']
              obj.projectName = '日天然气量(' + (this.yAxis && this.yAxis.length > 0 ? this.yAxis[0].name : '') + ')'
            } else {
              this.seriesData = [{
                name: '本期气量(' + (this.yAxis && this.yAxis.length > 0 ? this.yAxis[0].name : '') + ')',
                type: 'bar',
                data: res.data.q
              }]
              this.legendData = ['本期气量(' + (this.yAxis && this.yAxis.length > 0 ? this.yAxis[0].name : '') + ')']
              obj.projectName = '本期气量(' + (this.yAxis && this.yAxis.length > 0 ? this.yAxis[0].name : '') + ')'
            }
            for (let i = 0; i < res.data.q.length; i++) {
              if (this.month) {
                let key = res.data.xAxisData[i] + 'ri'
                obj[key] = res.data.q[i]
              } else {
                let key = res.data.xAxisData[i] + 'yue'
                obj[key] = res.data.q[i]
              }
            }
            this.tableData = [obj]
            // 能源消耗总量
          } else if (this.lx === '40' && res.data.ny) {
            this.maxVal = res.data.nymax
            this.minVal = res.data.nymin
            this.avgVal = res.data.nyaverage
            let obj = {}
            if (this.month) {
              this.seriesData = [{
                name: '日能源消耗总量(' + (this.yAxis && this.yAxis.length > 0 ? this.yAxis[0].name : '') + ')',
                type: 'bar',
                data: res.data.ny
              }]
              this.legendData = ['日能源消耗总量(' + (this.yAxis && this.yAxis.length > 0 ? this.yAxis[0].name : '') + ')']
              obj.projectName = '日能源消耗总量(' + (this.yAxis && this.yAxis.length > 0 ? this.yAxis[0].name : '') + ')'
            } else {
              this.seriesData = [{
                name: '本期能源消耗总量(' + (this.yAxis && this.yAxis.length > 0 ? this.yAxis[0].name : '') + ')',
                type: 'bar',
                data: res.data.ny
              }]
              this.legendData = ['本期能源消耗总量(' + (this.yAxis && this.yAxis.length > 0 ? this.yAxis[0].name : '') + ')']
              obj.projectName = '本期能源消耗总量(' + (this.yAxis && this.yAxis.length > 0 ? this.yAxis[0].name : '') + ')'
            }
            for (let i = 0; i < res.data.ny.length; i++) {
              if (this.month) {
                let key = res.data.xAxisData[i] + 'ri'
                obj[key] = res.data.ny[i]
              } else {
                let key = res.data.xAxisData[i] + 'yue'
                obj[key] = res.data.ny[i]
              }
            }
            this.tableData = [obj]
          } else if (this.lx === '33_d' && res.data.dd) {
            this.maxVal = res.data.ddmax
            this.minVal = res.data.ddmin
            this.avgVal = res.data.ddaverage
            let obj = {}
            if (this.month) {
              this.seriesData = [{
                name: '日单车电量(' + (this.yAxis && this.yAxis.length > 0 ? this.yAxis[0].name : '') + ')',
                type: 'bar',
                data: res.data.dd
              }]
              this.legendData = ['日单车电量(' + (this.yAxis && this.yAxis.length > 0 ? this.yAxis[0].name : '') + ')']
              obj.projectName = '日单车电量(' + (this.yAxis && this.yAxis.length > 0 ? this.yAxis[0].name : '') + ')'
            } else {
              this.seriesData = [{
                name: '本期单车电量(' + (this.yAxis && this.yAxis.length > 0 ? this.yAxis[0].name : '') + ')',
                type: 'bar',
                data: res.data.dd
              }]
              this.legendData = ['本期单车电量(' + (this.yAxis && this.yAxis.length > 0 ? this.yAxis[0].name : '') + ')']
              obj.projectName = '本期单车电量(' + (this.yAxis && this.yAxis.length > 0 ? this.yAxis[0].name : '') + ')'
            }
            for (let i = 0; i < res.data.dd.length; i++) {
              if (this.month) {
                let key = res.data.xAxisData[i] + 'ri'
                obj[key] = res.data.dd[i]
              } else {
                let key = res.data.xAxisData[i] + 'yue'
                obj[key] = res.data.dd[i]
              }
            }
            this.tableData = [obj]
            // 单车水
          } else if (this.lx === '00_d' && res.data.sd) {
            this.maxVal = res.data.sdmax
            this.minVal = res.data.sdmin
            this.avgVal = res.data.sdaverage
            let obj = {}
            if (this.month) {
              this.seriesData = [{
                name: '日单车水量(' + (this.yAxis && this.yAxis.length > 0 ? this.yAxis[0].name : '') + ')',
                type: 'bar',
                data: res.data.sd
              }]
              this.legendData = ['日单车水量(' + (this.yAxis && this.yAxis.length > 0 ? this.yAxis[0].name : '') + ')']
              obj.projectName = '日单车水量(' + (this.yAxis && this.yAxis.length > 0 ? this.yAxis[0].name : '') + ')'
            } else {
              this.seriesData = [{
                name: '本期单车水量(' + (this.yAxis && this.yAxis.length > 0 ? this.yAxis[0].name : '') + ')',
                type: 'bar',
                data: res.data.sd
              }]
              this.legendData = ['本期单车水量(' + (this.yAxis && this.yAxis.length > 0 ? this.yAxis[0].name : '') + ')']
              obj.projectName = '本期单车水量(' + (this.yAxis && this.yAxis.length > 0 ? this.yAxis[0].name : '') + ')'
            }
            for (let i = 0; i < res.data.sd.length; i++) {
              if (this.month) {
                let key = res.data.xAxisData[i] + 'ri'
                obj[key] = res.data.sd[i]
              } else {
                let key = res.data.xAxisData[i] + 'yue'
                obj[key] = res.data.sd[i]
              }
            }
            this.tableData = [obj]
            // 单车热力
          } else if (this.lx === '32_d' && res.data.rd) {
            this.maxVal = res.data.rdmax
            this.minVal = res.data.rdmin
            this.avgVal = res.data.rdaverage
            let obj = {}
            if (this.month) {
              this.seriesData = [{
                name: '日单车热力(' + (this.yAxis && this.yAxis.length > 0 ? this.yAxis[0].name : '') + ')',
                type: 'bar',
                data: res.data.rd
              }]
              this.legendData = ['日单车热力(' + (this.yAxis && this.yAxis.length > 0 ? this.yAxis[0].name : '') + ')']
              obj.projectName = '日单车热力(' + (this.yAxis && this.yAxis.length > 0 ? this.yAxis[0].name : '') + ')'
            } else {
              this.seriesData = [{
                name: '本期单车热力(' + (this.yAxis && this.yAxis.length > 0 ? this.yAxis[0].name : '') + ')',
                type: 'bar',
                data: res.data.rd
              }]
              this.legendData = ['本期单车热力(' + (this.yAxis && this.yAxis.length > 0 ? this.yAxis[0].name : '') + ')']
              obj.projectName = '本期单车热力(' + (this.yAxis && this.yAxis.length > 0 ? this.yAxis[0].name : '') + ')'
            }
            for (let i = 0; i < res.data.rd.length; i++) {
              if (this.month) {
                let key = res.data.xAxisData[i] + 'ri'
                obj[key] = res.data.rd[i]
              } else {
                let key = res.data.xAxisData[i] + 'yue'
                obj[key] = res.data.rd[i]
              }
            }
            this.tableData = [obj]
            // 单车天然气
          } else if (this.lx === '15_d' && res.data.qd) {
            this.maxVal = res.data.qdmax
            this.minVal = res.data.qdmin
            this.avgVal = res.data.qdaverage
            let obj = {}
            if (this.month) {
              this.seriesData = [{
                name: '日单车天然气(' + (this.yAxis && this.yAxis.length > 0 ? this.yAxis[0].name : '') + ')',
                type: 'bar',
                data: res.data.qd
              }]
              this.legendData = ['日单车天然气(' + (this.yAxis && this.yAxis.length > 0 ? this.yAxis[0].name : '') + ')']
              obj.projectName = '日单车天然气(' + (this.yAxis && this.yAxis.length > 0 ? this.yAxis[0].name : '') + ')'
            } else {
              this.seriesData = [{
                name: '本期单车天然气(' + (this.yAxis && this.yAxis.length > 0 ? this.yAxis[0].name : '') + ')',
                type: 'bar',
                data: res.data.qd
              }]
              this.legendData = ['本期单车天然气(' + (this.yAxis && this.yAxis.length > 0 ? this.yAxis[0].name : '') + ')']
              obj.projectName = '本期单车天然气(' + (this.yAxis && this.yAxis.length > 0 ? this.yAxis[0].name : '') + ')'
            }
            for (let i = 0; i < res.data.qd.length; i++) {
              if (this.month) {
                let key = res.data.xAxisData[i] + 'ri'
                obj[key] = res.data.qd[i]
              } else {
                let key = res.data.xAxisData[i] + 'yue'
                obj[key] = res.data.qd[i]
              }
            }
            this.tableData = [obj]
            // 单车能源消耗总量
          } else if (this.lx === '40_d' && res.data.nyd) {
            this.maxVal = res.data.nydmax
            this.minVal = res.data.nydmin
            this.avgVal = res.data.nydaverage
            let obj = {}
            if (this.month) {
              this.seriesData = [{
                name: '日单车能源消耗总量(' + (this.yAxis && this.yAxis.length > 0 ? this.yAxis[0].name : '') + ')',
                type: 'bar',
                data: res.data.nyd
              }]
              this.legendData = ['日单车能源消耗总量(' + (this.yAxis && this.yAxis.length > 0 ? this.yAxis[0].name : '') + ')']
              obj.projectName = '日单车能源消耗总量(' + (this.yAxis && this.yAxis.length > 0 ? this.yAxis[0].name : '') + ')'
            } else {
              this.seriesData = [{
                name: '本期单车能源消耗总量(' + (this.yAxis && this.yAxis.length > 0 ? this.yAxis[0].name : '') + ')',
                type: 'bar',
                data: res.data.nyd
              }]
              this.legendData = ['本期单车能源消耗总量(' + (this.yAxis && this.yAxis.length > 0 ? this.yAxis[0].name : '') + ')']
              obj.projectName = '本期单车能源消耗总量(' + (this.yAxis && this.yAxis.length > 0 ? this.yAxis[0].name : '') + ')'
            }
            for (let i = 0; i < res.data.nyd.length; i++) {
              if (this.month) {
                let key = res.data.xAxisData[i] + 'ri'
                obj[key] = res.data.nyd[i]
              } else {
                let key = res.data.xAxisData[i] + 'yue'
                obj[key] = res.data.nyd[i]
              }
            }
            this.tableData = [obj]
          }
          if (this.month) {
            let param = res.data.xAxisData.length % 13
            if (param === 0) {
              param = 13
            }
            res.data.xAxisData[res.data.xAxisData.length - 1 + 13 - param] = undefined
          }
          this.loading = false
        }).catch(() => {
          this.tableData = []
          this.rData = {}
          this.loading = false
        })
        this.chartTitleShow = this.chartTitle
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
      .date-year
        width: 100px
      .date-month
        width: 90px
      .date-type
        width: 60px
      .department-block
        display: inline-block
        width: 25px
        height: 10px
      .panel-box
        min-height: calc(100vh - 191px)
      .chart-box
        min-height: 350px
        border-radius: 0px
</style>
