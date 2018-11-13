<template>
  <div class="info-container">
    <div class="info">
      <div class="col-box">
        <select-title title1="用能单位" title2="基期" title3="比较期" @search="onSearch" :showSearch="true">
          <el-select
            slot="title1"
            v-model="valueSelect"
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
          <el-date-picker
            slot="title2"
            v-model="jcq_sj"
            type="month"
            size="mini"
            value-format="yyyy-MM"
            @change="dateChange"
            placeholder="选择月">
          </el-date-picker>
          <el-date-picker
            slot="title3"
            v-model="bjq_sj"
            type="month"
            size="mini"
            value-format="yyyy-MM"
            @change="dateChange"
            placeholder="选择月">
          </el-date-picker>
        </select-title>
      </div>
      <div class="col-box-left-right-bottom">
        <div class="panel-box" v-loading="loading">
          <div class="row">
            <div class="table-box">
              <div class="row chart-container">
                <div class="col-lg-6 col-md-12">
                  <chart-pie class="chart-box"
                             :titleText="type === 'nh' ? jcqFormat + dwFormat + '能源消耗结构' : jcqFormat + dwFormat + '能源费用结构'"
                             :radius="pieRadius"
                             :center="pieCenter"
                             :isShowLabel="isShowLabel"
                             :legendData="rData.jcq_pie && rData.jcq_pie.legendData"
                             :seriesData="rData.jcq_pie && rData.jcq_pie.seriesData"></chart-pie>
                </div>
                <div class="col-lg-6 col-md-12">
                  <chart-pie class="chart-box"
                             :titleText="type === 'nh' ? bjqFormat + dwFormat + '能源消耗结构' : bjqFormat + dwFormat + '能源费用结构'"
                             :radius="pieRadius"
                             :center="pieCenter"
                             :isShowLabel="isShowLabel"
                             :legendData="rData.bjq_pie && rData.bjq_pie.legendData"
                             :seriesData="rData.bjq_pie && rData.bjq_pie.seriesData"></chart-pie>
                </div>
              </div>
              <el-table
                v-if="type === 'nh'"
                height="calc(100% - 350px)"
                :data="sortTable(rData.list)"
                border
                header-cell-class-name="header-cell-class-name"
                style="width: 100%">
                <el-table-column
                  prop="ynbm"
                  width="150"
                  label="用能部门">
                  <template slot-scope="scope">
                    <span class="department-block" :style="departmentStyle(scope.$index)"></span>
                    <span>{{ filterName(scope.row.ynbm) }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  :label="jcqFormat + '占比'">
                  <el-table-column
                    align="center"
                    prop="nyxhjq"
                    label="能源消耗量（吨标煤）">
                  </el-table-column>
                  <el-table-column
                    align="center"
                    prop="zbjq"
                    label="占集团公司总量百分比（%）">
                  </el-table-column>
                </el-table-column>
                <el-table-column
                  :label="bjqFormat + '占比'">
                  <el-table-column
                    align="center"
                    prop="nyxhbjq"
                    label="能源消耗量（吨标煤）">
                  </el-table-column>
                  <el-table-column
                    align="center"
                    prop="zbbjq"
                    label="占集团公司总量百分比（%）">
                  </el-table-column>
                </el-table-column>
              </el-table>
              <el-table
                v-if="type === 'fy'"
                height="calc(100% - 350px)"
                :data="sortTable(rData.list)"
                border
                header-cell-class-name="header-cell-class-name"
                style="width: 100%">
                <el-table-column
                  prop="ynbm"
                  width="150"
                  label="用能部门">
                  <template slot-scope="scope">
                    <span class="department-block" :style="departmentStyle(scope.$index)"></span>
                    <span>{{ filterName(scope.row.ynbm) }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  :label="jcqFormat + '占比'">
                  <el-table-column
                    prop="fyjq"
                    align="center"
                    label="能源费用（万元）">
                  </el-table-column>
                  <el-table-column
                    prop="zbjq"
                    align="center"
                    label="占集团公司总量百分比（%）">
                  </el-table-column>
                </el-table-column>
                <el-table-column
                  :label="bjqFormat + '占比'">
                  <el-table-column
                    prop="fybjq"
                    align="center"
                    label="能源费用（万元）">
                  </el-table-column>
                  <el-table-column
                    prop="zbbjq"
                    align="center"
                    label="占集团公司总量百分比（%）">
                  </el-table-column>
                </el-table-column>
              </el-table>
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
  import {filter, tableDataFilter} from 'utils/filter'
  import { api } from '@/config'
  import fetch from 'utils/fetch'
  let moment = require('moment')
  moment.locale('zh-cn')
  export default {
    components: {
      SelectTitle,
      ChartPie,
      DataPanelTitle
    },
    created() {
//      setTimeout(() => {
//        this.strucPie1 = [{value: 274, name: '水'}, {value: 168, name: '其他'}, {value: 335, name: '高温水'}, {value: 235, name: '原煤'}, {value: 310, name: '天然气'}, {value: 400, name: '电'}]
//        this.strucPie2 = [{value: 274, name: '水'}, {value: 168, name: '其他'}, {value: 335, name: '高温水'}, {value: 235, name: '原煤'}, {value: 310, name: '天然气'}, {value: 400, name: '电'}]
//      }, 20)
      this.fetchData()
    },
    props: {
      type: {
        type: String,
        default: 'nh'
      }
    },
    data() {
      return {
        loading: false,
        rData: {},
        strucPie1: [],
        strucPie2: [],
        jcq_sj: moment().subtract(13, 'months').format('YYYY-MM-DD'),
        bjq_sj: moment().subtract(1, 'months').format('YYYY-MM-DD'),
        isShowLabel: false,
        pieRadius: ['0%', '60%'],
        pieCenter: ['40%', '55%'],
        valueMonth: '',
        valueSelect: '2',
        options1: [{
          value: '2',
          label: '整车制造'
        }, {
          value: '23',
          label: '零部件加工'
        }, {
          value: '30',
          label: '物流'
        }],
        colors: ['#5967f1', '#06e56d', '#7dd1ff', '#ff8e06', '#1196de', '#0c1994', '#8c6be6', '#ffc300', '#4472c6', '#838389', '#1096df'],
        noBorder: true,
        dwFormat: '',
        jcqFormat: moment().format('YYYY年MM月'),
        bjqFormat: moment().format('YYYY年MM月')
      }
    },
    methods: {
      computedFormat() {
        let index = this.options1.findIndex((item) => {
          return this.valueSelect === item.value
        })
        this.dwFormat = this.options1[index] ? this.options1[index].label : ''
        this.jcqFormat = this.jcq_sj ? moment(this.jcq_sj).format('YYYY年MM月') : moment().format('YYYY年MM月')
        this.bjqFormat = this.bjq_sj ? moment(this.bjq_sj).format('YYYY年MM月') : moment().format('YYYY年MM月')
      },
      fetchData() {
        this.loading = true
        this.computedFormat()
        if (this.type === 'nh') {
          fetch('get', api.queryNyZcZzYl, {org_pid: this.valueSelect, jcq_sj: this.jcq_sj, bjq_sj: this.bjq_sj}).then((res) => {
            this.rData = res.data
            this.loading = false
          }).catch(() => {
            this.rData = {}
            this.loading = false
          })
        } else {
          fetch('get', api.queryNyZcFyDb, {org_pid: this.valueSelect, jcq_sj: this.jcq_sj, bjq_sj: this.bjq_sj}).then((res) => {
            this.rData = res.data
            this.loading = false
          }).catch(() => {
            this.rData = {}
            this.loading = false
          })
        }
      },
      departmentStyle(index) {
        if (index === this.rData.list.length - 1) {
          return ''
        } else {
          return `background: ${this.colors[index]}`
        }
      },
      dateChange(value) {
        this.dateTime = value
      },
      selectChange(value) {},
      onSearch() {
        this.fetchData()
      },
      filterName(name) {
        return filter(name)
      },
      sortTable(list) {
        if (!list) {
          return []
        }
        let copyData = JSON.parse(JSON.stringify(list))
        let sortData = copyData.sort((a, b) => {
          if (this.type === 'nh') {
            return a.nyxhjq - b.nyxhjq
          } else {
            return a.fyjq - b.fyjq
          }
        })
        return tableDataFilter(sortData)
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
      .chart-container
        padding-left: 90px
      .department-block
        display: inline-block
        width: 25px
        height: 10px
      .col-box-left-right-bottom
        height: 100%
      .panel-box > .row
        height: 100%
      .chart-box
        min-height: 350px
        border-radius: 0px
</style>
