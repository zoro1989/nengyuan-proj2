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
            <data-panel-title title="分析结果" :noBorder="noBorder">
            </data-panel-title>
            <el-table
              :data="rData.zf"
              border
              header-cell-class-name="header-cell-class-name"
              style="width: 99%">
              <el-table-column
                prop="yue"
                label="月">
              </el-table-column>
              <el-table-column
                v-if="lx.split('_').length !== 2"
                prop="ylhbzf"
                label="用量环比增幅">
              </el-table-column>
              <el-table-column
                v-if="lx.split('_').length !== 2"
                prop="clhbzf"
                label="产量环比增幅">
              </el-table-column>
              <el-table-column
                prop="yltbzf"
                label="用量同比增幅">
              </el-table-column>
              <el-table-column
                prop="cltbzf"
                label="产量同比增幅">
              </el-table-column>
              <el-table-column
                v-if="lx.split('_').length === 2"
                prop="dylhbzf"
                label="单车环比增幅">
              </el-table-column>
              <el-table-column
                v-if="lx.split('_').length === 2"
                prop="dyltbzf"
                label="单车同比增幅">
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
  import {orgIdDic, lxdDic, getYAxis} from 'utils/dic'
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
        options2: lxdDic,
        tableData: [],
        colors: ['#066090', '#1196de', '#7ed2ff', '#ff8e06', '#666666', '#2436e3'],
        noBorder: true,
        system_id: '',
        year: '',
        lx: '',
        rData: {},
        legendData: ['实际用量', '同期用量', '上月用量', '实际产量', '同期产量', '上月产量'],
        seriesData: []
      }
    },
    computed: {
      yAxis() {
        return getYAxis(this.lx)
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
      departmentStyle(index) {
        return `background: ${this.colors[index]}`
      },
      lxChange(lx) {
        if (this.tableData.length > 0) {
          this.onSearch()
          this.makeData()
        }
      },
      makeData() {
        this.tableData = []
        let series = []
        if (this.lx.split('_').length === 2) {
          if (this.rData.dyl && this.rData.dyl.length > 0) {
            series.push({
              name: '单车用量',
              type: 'bar',
              data: this.rData.dyl
            })
            let obj = {}
            obj.projectName = '单车用量'
            for (let i = 0; i < this.rData.dyl.length; i++) {
              let key = this.rData.xAxisData[i] + 'yue'
              obj[key] = this.rData.dyl[i]
            }
            this.tableData.push(obj)
          }
          if (this.rData.dtqyl && this.rData.dtqyl.length > 0) {
            series.push({
              name: '单车同期用量',
              type: 'bar',
              data: this.rData.dtqyl
            })
            let obj = {}
            obj.projectName = '单车同期用量'
            for (let i = 0; i < this.rData.dtqyl.length; i++) {
              let key = this.rData.xAxisData[i] + 'yue'
              obj[key] = this.rData.dtqyl[i]
            }
            this.tableData.push(obj)
          }
          if (this.rData.dsyyl && this.rData.dsyyl.length > 0) {
            series.push({
              name: '单车上月用量',
              type: 'bar',
              data: this.rData.dsyyl
            })
            let obj = {}
            obj.projectName = '单车上月用量'
            for (let i = 0; i < this.rData.dsyyl.length; i++) {
              let key = this.rData.xAxisData[i] + 'yue'
              obj[key] = this.rData.dsyyl[i]
            }
            this.tableData.push(obj)
          }
        } else {
          if (this.rData.yl && this.rData.yl.length > 0) {
            series.push({
              name: '实际用量',
              type: 'bar',
              data: this.rData.yl
            })
            let obj = {}
            obj.projectName = '实际用量'
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
        }
        if (this.rData.cl && this.rData.cl.length > 0) {
          series.push({
            name: '实际产量',
            type: 'line',
            data: this.rData.cl
          })
          let obj = {}
          obj.projectName = '实际产量'
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
    .table-box > .row:last-child
      min-height: calc(100vh - 556px)
    .chart-box
      min-height: 350px
      border-radius: 0px
</style>
