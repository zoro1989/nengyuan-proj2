<template>
  <div class="info-container">
    <div class="info">
      <div class="col-box">
        <select-title title1="用能单位" title2="选择时间" @search="onSearch" :showSearch="true">
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
                                :isOnlyLine="true"
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
                    v-for="(item, index) in rData.xAxisData"
                    :key="index"
                    :prop="item + 'yue'"
                    :label="item + '月'">
                  </el-table-column>
                </el-table>
              </div>
            </div>
            <div class="col-lg-4 col-md-12 table-box box-right">
              <data-panel-title title="分析结果" :noBorder="noBorder"></data-panel-title>
              <el-table
                :data="rlist"
                border
                height="calc(100% - 50px)"
                header-cell-class-name="header-cell-class-name"
                style="width: 99%">
                <el-table-column
                  prop="YUE"
                  label="日期">
                </el-table-column>
                <el-table-column
                  prop="DBL"
                  label="单月达标率">
                </el-table-column>
                <el-table-column
                  prop="LJDBL"
                  label="累计达标率">
                </el-table-column>
                <el-table-column
                  label="评价">
                  <el-table-column
                    label="单月达标率">
                    <template slot-scope="scope">
                      <span class="dbl" :style="dblStyle(scope.$index)"></span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="累计达标率">
                    <template slot-scope="scope">
                      <span class="dbl" :style="ljdblStyle(scope.$index)"></span>
                    </template>
                  </el-table-column>
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
  import {orgSystemIdDic, lxfyDic} from 'utils/dic'
  let moment = require('moment')
  moment.locale('zh-cn')
  export default {
    props: {
      lx: {
        type: String,
        default: '1'
      }
    },
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
        options1: orgSystemIdDic,
        options2: lxfyDic,
        tableData: [],
        colors: ['#066090', '#1196de', '#7ed2ff', '#ff8e06', '#666666', '#2436e3'],
        noBorder: true,
        system_id: '',
        year: '',
        rData: {},
        legendData: ['产量（辆）', '实际产值（万元）', '计划单月万元产值能耗', '实际单月万元产值能耗', '计划累计万元产值能耗', '实际累计万元产值能耗'],
        seriesData: [],
        rlist: []
      }
    },
    computed: {
      yAxis() {
        if (this.lx === '1') {
          return [{name: '吨标煤/万元'}]
        } else if (this.lx === '2') {
          return [{name: '吨/万元'}]
        } else if (this.lx === '3') {
          return [{name: '吨标煤'}]
        } else if (this.lx === '4') {
          return [{name: '吨标煤/辆'}]
        }

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
        if (this.year && orgName) {
          if (this.lx === '1') {
            return orgName + this.year + '产值综合能耗绩效指标达标率分析'
          } else if (this.lx === '2') {
            return orgName + this.year + '产值耗水量绩效指标达标率分析'
          } else if (this.lx === '3') {
            return orgName + this.year + '能源消耗总量绩效指标达标率分析'
          } else if (this.lx === '4') {
            return orgName + this.year + '单车综合能耗绩效指标达标率分析'
          }
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
      dblStyle(index) {
        let res = this.rlist[index]['JHCZNH'] * 1 - this.rlist[index]['SJCZNH'] * 1
        return res >= 0 ? 'background: #67C23A; color: #fff;' : 'background: #F56C6C; color: #fff;'
      },
      ljdblStyle(index) {
        let res = this.rlist[index]['JHLJCZNH'] * 1 - this.rlist[index]['SJLJCZNH'] * 1
        return res >= 0 ? 'background: #67C23A; color: #fff;' : 'background: #F56C6C; color: #fff;'
      },
      departmentStyle(index) {
        return `background: ${this.colors[index]}`
      },
      onSearch() {
        this.loading = true
        fetch('get', api.kipList, {system_id: this.system_id, nian: this.year, lx: this.lx}).then((res) => {
          this.tableData = []
          let series = []
          if (res.data.cl && res.data.cl.length > 0) {
//            series.push({
//              name: '产量（辆）',
//              type: 'line',
//              data: res.data.cl
//            })
            let obj = {}
            obj.projectName = '产量（辆）'
            for (let i = 0; i < res.data.cl.length; i++) {
              let key = res.data.xAxisData[i] + 'yue'
              obj[key] = res.data.cl[i]
            }
            this.tableData.push(obj)
          }
          if (res.data.cz && res.data.cz.length > 0) {
//            series.push({
//              name: '实际产值（万元）',
//              type: 'line',
//              data: res.data.cz
//            })
            let obj = {}
            obj.projectName = '实际产值（万元）'
            for (let i = 0; i < res.data.cz.length; i++) {
              let key = res.data.xAxisData[i] + 'yue'
              obj[key] = res.data.cz[i]
            }
            this.tableData.push(obj)
          }
          if (res.data.jhcznh && res.data.jhcznh.length > 0) {
            series.push({
              name: '计划单月万元产值能耗',
              type: 'line',
              data: res.data.jhcznh
            })
            let obj = {}
            obj.projectName = '计划单月万元产值能耗'
            for (let i = 0; i < res.data.jhcznh.length; i++) {
              let key = res.data.xAxisData[i] + 'yue'
              obj[key] = res.data.jhcznh[i]
            }
            this.tableData.push(obj)
          }
          if (res.data.sjcznh && res.data.sjcznh.length > 0) {
            series.push({
              name: '实际单月万元产值能耗',
              type: 'line',
              data: res.data.sjcznh
            })
            let obj = {}
            obj.projectName = '实际单月万元产值能耗'
            for (let i = 0; i < res.data.sjcznh.length; i++) {
              let key = res.data.xAxisData[i] + 'yue'
              obj[key] = res.data.sjcznh[i]
            }
            this.tableData.push(obj)
          }
          if (res.data.jhljcznh && res.data.jhljcznh.length > 0) {
            series.push({
              name: '计划累计万元产值能耗',
              type: 'line',
              data: res.data.jhljcznh
            })
            let obj = {}
            obj.projectName = '计划累计万元产值能耗'
            for (let i = 0; i < res.data.jhljcznh.length; i++) {
              let key = res.data.xAxisData[i] + 'yue'
              obj[key] = res.data.jhljcznh[i]
            }
            this.tableData.push(obj)
          }
          if (res.data.sjljcznh && res.data.sjljcznh.length > 0) {
            series.push({
              name: '实际累计万元产值能耗',
              type: 'line',
              data: res.data.sjljcznh
            })
            let obj = {}
            obj.projectName = '实际累计万元产值能耗'
            for (let i = 0; i < res.data.sjljcznh.length; i++) {
              let key = res.data.xAxisData[i] + 'yue'
              obj[key] = res.data.sjljcznh[i]
            }
            this.tableData.push(obj)
          }
          this.seriesData = series
          this.rData = res.data
          this.rlist = res.list.map((item) => {
            item['YUE'] = item['YUE'] + '月'
            return item
          })
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
      .panel-box
        width: 100%
      .dbl
        width: 10px
        height: 10px
        border-radius: 50%
        display: inline-block
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
