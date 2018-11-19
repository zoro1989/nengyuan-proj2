<template>
  <div class="info">
    <div class="col-box">
      <select-title title1="用能单位" title2="选择时间" title3="能源类型" @search="onSearch" :showSearch="true">
        <el-select
          slot="title1"
          v-model="system_id"
          placeholder="请选择"
          size="mini"
          @change="selectChange">
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
            @change="dateChange"
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
      <div class="panel-box" v-loading="loading">
        <div class="row">
          <div class="table-box">
            <div class="row">
              <chart-bar-line class="chart-box"
                              :legendData="legendData"
                              :series="seriesData"
                              :xAxisData="xAxisData"
                              :yAxis="yAxis"
                              :titleText="chartTitle"></chart-bar-line>
            </div>
            <div class="row">
              <div style="height: 50px; line-height: 50px">
                <span>最大值：{{maxVal}}</span>
                <span>最小值：{{minVal}}</span>
                <span>平均值：{{avgVal}}</span>
              </div>
            </div>
            <div class="row">
              <el-table
                :data="tableData"
                border
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
                  align="center"
                  v-for="item in rData.xAxisData"
                  :key="item"
                  :prop="month ? item + 'ri' : item + 'yue'"
                  :label="month ? item + '日' : item + '月'">
                </el-table-column>
              </el-table>
            </div>
          </div>
          <!--<div class="col-lg-4 col-md-12 table-box box-right">-->
            <!--<data-panel-title title="分析结果" :noBorder="noBorder"></data-panel-title>-->
          <!--</div>-->
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
  import {orgSystemIdDic, lxdDic, monthDic, chartColors} from 'utils/dic'
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
        strucPie1: [],
        strucPie2: [],
        legendData: ['实际用量'],
        seriesData: [],
        pieRadius: ['13%', '60%'],
        valueYear: '',
        valueMonth: '',
        valueSelect: '',
        options1: orgSystemIdDic,
        options2: lxdDic,
        options3: monthDic,
        tableData: [],
        colors: chartColors,
        noBorder: true,
        calendarData: [],
        lx: '33',
        system_id: '',
        year: '',
        month: '',
        rData: {},
        maxVal: 0,
        minVal: 0,
        avgVal: 0
      }
    },
    computed: {
      yAxis() {
        if (this.lx === '33') {
          return [{name: '万千瓦时'}]
        } else if (this.lx === '00') {
          return [{name: '吨'}]
        } else if (this.lx === '32') {
          return [{name: '吉焦'}]
        } else if (this.lx === '15') {
          return [{name: '万立方米'}]
        } else if (this.lx === '40') {
          return [{name: '万吨标煤'}]
        } else if (this.lx === '33_d') {
          return [{name: '万千瓦时'}]
        } else if (this.lx === '00_d') {
          return [{name: '吨'}]
        } else if (this.lx === '32_d') {
          return [{name: '吉焦'}]
        } else if (this.lx === '15_d') {
          return [{name: '万立方米'}]
        } else if (this.lx === '40_d') {
          return [{name: '万吨标煤'}]
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
          return orgName + this.year + '年' + monthText + '产量与' + lxName + '量趋势分析'
        } else {
          return ''
        }
      },
      xAxisData() {
        if (this.rData.xAxisData && this.rData.xAxisData.length > 0) {
          let copyArr = JSON.parse(JSON.stringify(this.rData.xAxisData))
          return copyArr.map((item) => {
            if (this.month) {
              return item + '日'
            } else {
              return item + '月'
            }
          })
        } else {
          return []
        }
      }
    },
    methods: {
      fetchData() {
        this.loading = true
        fetch('get', api.nyylfxDay, {id: this.system_id, year: this.year, month: this.month}).then((res) => {
          this.tableData = []
          this.rData = res.data
          // 电
          if (this.lx === '33' && res.data.d) {
            this.seriesData = [{
              name: '电',
              type: 'bar',
              data: res.data.d
            }]
            this.maxVal = res.data.dmax
            this.minVal = res.data.dmin
            this.avgVal = res.data.daverage
            let obj = {}
            obj.projectName = '实际电量'
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
            this.seriesData = [{
              name: '水',
              type: 'bar',
              data: res.data.s
            }]
            this.maxVal = res.data.smax
            this.minVal = res.data.smin
            this.avgVal = res.data.saverage
            let obj = {}
            obj.projectName = '实际水量'
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
            this.seriesData = [{
              name: '热力',
              type: 'bar',
              data: res.data.r
            }]
            this.maxVal = res.data.rmax
            this.minVal = res.data.rmin
            this.avgVal = res.data.raverage
            let obj = {}
            obj.projectName = '实际热量'
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
            this.seriesData = [{
              name: '天然气',
              type: 'bar',
              data: res.data.q
            }]
            this.maxVal = res.data.qmax
            this.minVal = res.data.qmin
            this.avgVal = res.data.qaverage
            let obj = {}
            obj.projectName = '实际气量'
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
            this.seriesData = [{
              name: '能源消耗总量',
              type: 'bar',
              data: res.data.ny
            }]
            this.maxVal = res.data.nymax
            this.minVal = res.data.nymin
            this.avgVal = res.data.nyaverage
            let obj = {}
            obj.projectName = '实际能源消耗总量'
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
            this.seriesData = [{
              name: '单车电',
              type: 'bar',
              data: res.data.dd
            }]
            this.maxVal = res.data.ddmax
            this.minVal = res.data.ddmin
            this.avgVal = res.data.ddaverage
            let obj = {}
            obj.projectName = '实际单车电量'
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
            this.seriesData = [{
              name: '单车水',
              type: 'bar',
              data: res.data.sd
            }]
            this.maxVal = res.data.sdmax
            this.minVal = res.data.sdmin
            this.avgVal = res.data.sdaverage
            let obj = {}
            obj.projectName = '实际单车水量'
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
            this.seriesData = [{
              name: '单车热力',
              type: 'bar',
              data: res.data.rd
            }]
            this.maxVal = res.data.rdmax
            this.minVal = res.data.rdmin
            this.avgVal = res.data.rdaverage
            let obj = {}
            obj.projectName = '实际单车热力'
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
            this.seriesData = [{
              name: '单车天然气',
              type: 'bar',
              data: res.data.qd
            }]
            this.maxVal = res.data.qdmax
            this.minVal = res.data.qdmin
            this.avgVal = res.data.qdaverage
            let obj = {}
            obj.projectName = '实际单车天然气'
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
            this.seriesData = [{
              name: '单车能源消耗总量',
              type: 'bar',
              data: res.data.nyd
            }]
            this.maxVal = res.data.nydmax
            this.minVal = res.data.nydmin
            this.avgVal = res.data.nydaverage
            let obj = {}
            obj.projectName = '实际单车能源消耗总量'
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
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
      },
      onSearch() {
        this.fetchData()
      },
      departmentStyle(index) {
        return `background: ${this.colors[index]}`
      },
      dateChange(value) {
        this.dateTime = value
      },
      selectChange(value) {}
    }
  }
</script>
<style lang="stylus" scoped>
  @import "~common/stylus/variable.styl"
  @import "~common/stylus/mixin.styl"
  .info
    background: $color-sub-text
    display: flex
    flex-direction: column
    min-width: 600px
    .date-year
      width: 100px
    .date-month
      width: 90px
    .department-block
      display: inline-block
      width: 25px
      height: 10px
    .table-box > .row:last-child
      min-height: calc(100vh - 616px)
    .chart-box
      min-height: 350px
      border-radius: 0px
</style>
