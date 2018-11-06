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
                :data="tableData"
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
            <data-panel-title title="分析结果" :noBorder="noBorder">
            </data-panel-title>
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
  import {orgIdDic, lxdDic} from 'utils/dic'
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
        if (this.lx === '33') {
          return [{name: '万千瓦时'}, {name: '万元'}]
        } else if (this.lx === '00') {
          return [{name: '吨'}, {name: '万元'}]
        } else if (this.lx === '32') {
          return [{name: '吉焦'}, {name: '万元'}]
        } else if (this.lx === '15') {
          return [{name: '万立方米'}, {name: '万元'}]
        } else if (this.lx === '40') {
          return [{name: '万吨标煤'}, {name: '万元'}]
        } else if (this.lx === '33_d') {
          return [{name: '万千瓦时'}, {name: '万元'}]
        } else if (this.lx === '00_d') {
          return [{name: '吨'}, {name: '万元'}]
        } else if (this.lx === '32_d') {
          return [{name: '吉焦'}, {name: '万元'}]
        } else if (this.lx === '15_d') {
          return [{name: '万立方米'}, {name: '万元'}]
        } else if (this.lx === '40_d') {
          return [{name: '万吨标煤'}, {name: '万元'}]
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
      }
    },
    methods: {
      departmentStyle(index) {
        return `background: ${this.colors[index]}`
      },
      onSearch() {
        let lxInput = this.lx.split('_').length > 0 ? this.lx.split('_')[0] : ''
        this.loading = true
        fetch('get', api.nyylfxJituan, {id: this.system_id, year: this.year, lx: lxInput}).then((res) => {
          this.tableData = []
          let series = []
          if (res.data.yl && res.data.yl.length > 0) {
            series.push({
              name: '实际用量',
              type: 'bar',
              data: res.data.yl
            })
            let obj = {}
            obj.projectName = '实际用量'
            for (let i = 0; i < res.data.yl.length; i++) {
              let key = res.data.xAxisData[i] + 'yue'
              obj[key] = res.data.yl[i]
            }
            this.tableData.push(obj)
          }
          if (res.data.tqyl && res.data.tqyl.length > 0) {
            series.push({
              name: '同期用量',
              type: 'bar',
              data: res.data.tqyl
            })
            let obj = {}
            obj.projectName = '同期用量'
            for (let i = 0; i < res.data.tqyl.length; i++) {
              let key = res.data.xAxisData[i] + 'yue'
              obj[key] = res.data.tqyl[i]
            }
            this.tableData.push(obj)
          }
          if (res.data.syyl && res.data.syyl.length > 0) {
            series.push({
              name: '上月用量',
              type: 'bar',
              data: res.data.syyl
            })
            let obj = {}
            obj.projectName = '上月用量'
            for (let i = 0; i < res.data.syyl.length; i++) {
              let key = res.data.xAxisData[i] + 'yue'
              obj[key] = res.data.syyl[i]
            }
            this.tableData.push(obj)
          }
          if (res.data.cl && res.data.cl.length > 0) {
            series.push({
              name: '实际产量',
              type: 'line',
              data: res.data.cl
            })
            let obj = {}
            obj.projectName = '实际产量'
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
