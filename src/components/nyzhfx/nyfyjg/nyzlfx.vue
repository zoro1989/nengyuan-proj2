<template>
  <div class="info-container">
    <div class="info">
      <div class="col-box">
        <select-title title1="用能单位" title2="基期" title3="比较期" @search="onSearch" :showSearch="true">
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
            <div class="col-lg-12 col-md-12 table-box">
              <div class="row">
                <div class="col-lg-6 col-md-12">
                  <chart-pie class="chart-box"
                             :isSort="false"
                             :titleText="type === 'nh' ? jcqFormat + dwFormat + '能源消耗结构' : jcqFormat + dwFormat + '能源费用结构'"
                             :radius="pieRadius"
                             :legendData="rData.jcq_pie && rData.jcq_pie.legendData"
                             :seriesData="rData.jcq_pie && rData.jcq_pie.seriesData"></chart-pie>
                </div>
                <report-table class="col-lg-6 col-md-12" className="table1" :reportName="type === 'nh' ? '种类能源消耗结构-基础期' : '种类能源费用结构-基础期'">
                  <el-table
                    slot="table"
                    v-if="type === 'nh'"
                    :data="filterJcqData"
                    border
                    header-cell-class-name="header-cell-class-name"
                    style="width: 98%; margin-left: 2%">
                    <el-table-column
                      align="center"
                      prop="nyzl"
                      label="能源种类">
                    </el-table-column>
                    <el-table-column
                      align="center"
                      prop="jldw"
                      label="计量单位">
                    </el-table-column>
                    <el-table-column
                      align="center"
                      prop="yl"
                      :label="jcqFormat">
                    </el-table-column>
                    <el-table-column
                      align="center"
                      prop="zb"
                      label="占比（%）">
                    </el-table-column>
                  </el-table>
                  <el-table
                    slot="table"
                    v-if="type === 'fy'"
                    :data="filterJcqData"
                    border
                    header-cell-class-name="header-cell-class-name"
                    style="width: 98%; margin-left: 2%">
                    <el-table-column
                      align="center"
                      prop="fyzl"
                      label="费用种类">
                    </el-table-column>
                    <el-table-column
                      align="center"
                      prop="jldw"
                      label="计量单位">
                    </el-table-column>
                    <el-table-column
                      align="center"
                      prop="fy"
                      :label="jcqFormat">
                    </el-table-column>
                    <el-table-column
                      align="center"
                      prop="zb"
                      label="占比（%）">
                    </el-table-column>
                  </el-table>
                </report-table>
              </div>
              <div class="row">
                <div class="col-lg-6 col-md-12">
                  <chart-pie class="chart-box"
                             :isSort="false"
                             :titleText="type === 'nh' ? bjqFormat + dwFormat + '能源消耗结构' : bjqFormat + dwFormat + '能源费用结构'"
                             :radius="pieRadius"
                             :legendData="rData.bjq_pie && rData.bjq_pie.legendData"
                             :seriesData="rData.bjq_pie && rData.bjq_pie.seriesData"></chart-pie>
                </div>
                <report-table class="col-lg-6 col-md-12" className="table2" :reportName="type === 'nh' ? '种类能源消耗结构-比较期' : '种类能源费用结构-比较期'">
                  <el-table
                    slot="table"
                    v-if="type === 'nh'"
                    :data="filterBjqData"
                    border
                    header-cell-class-name="header-cell-class-name"
                    style="width: 98%; margin-left: 2%">
                    <el-table-column
                      align="center"
                      prop="nyzl"
                      label="能源种类">
                    </el-table-column>
                    <el-table-column
                      align="center"
                      prop="jldw"
                      label="计量单位">
                    </el-table-column>
                    <el-table-column
                      align="center"
                      prop="yl"
                      :label="bjqFormat">
                    </el-table-column>
                    <el-table-column
                      align="center"
                      prop="zb"
                      label="占比（%）">
                    </el-table-column>
                  </el-table>
                  <el-table
                    slot="table"
                    v-if="type === 'fy'"
                    :data="filterBjqData"
                    border
                    header-cell-class-name="header-cell-class-name"
                    style="width: 98%; margin-left: 2%">
                    <el-table-column
                      align="center"
                      prop="fyzl"
                      label="费用种类">
                    </el-table-column>
                    <el-table-column
                      align="center"
                      prop="jldw"
                      label="计量单位">
                    </el-table-column>
                    <el-table-column
                      align="center"
                      prop="fy"
                      :label="bjqFormat">
                    </el-table-column>
                    <el-table-column
                      align="center"
                      prop="zb"
                      label="占比（%）">
                    </el-table-column>
                  </el-table>
                </report-table>
              </div>
            </div>
          </div>
          <div class="row">
            <report-table class="col-lg-12 col-md-12 table-box box-bottom" className="table3" :reportName="type === 'nh' ? '能源消耗结构增幅分析' : '能源费用结构增幅分析'">
              <data-panel-title slot="title" :title="type === 'nh' ? '能源消耗结构增幅分析' : '能源费用结构增幅分析'" :noBorder="noBorder"></data-panel-title>
              <el-table
                slot="table"
                v-if="type === 'nh'"
                :data="rData.zfl"
                border
                header-cell-class-name="header-cell-class-name"
                style="width: 100%">
                <el-table-column
                  align="center"
                  prop="zl"
                  label="能源种类">
                </el-table-column>
                <el-table-column
                  align="center"
                  v-for="(item, index) in rData.list_zf"
                  :key="index"
                  :prop="'zf' + index"
                  :label="item.nyzl">
                </el-table-column>
              </el-table>
              <el-table
                slot="table"
                v-if="type === 'fy'"
                :data="rData.zfl"
                border
                header-cell-class-name="header-cell-class-name"
                style="width: 100%">
                <el-table-column
                  align="center"
                  prop="zl"
                  label="费用种类">
                </el-table-column>
                <el-table-column
                  align="center"
                  v-for="(item, index) in rData.list_zf"
                  :key="index"
                  :prop="'zf' + index"
                  :label="item.fyzl">
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
  import { api } from '@/config'
  import fetch from 'utils/fetch'
  import {orgSystemIdDic} from 'utils/dic'
  import {tableDataFilter} from 'utils/filter'
  import ReportTable from 'base/report-table/report-table'
  let moment = require('moment')
  moment.locale('zh-cn')
  export default {
    components: {
      SelectTitle,
      ChartPie,
      DataPanelTitle,
      ReportTable
    },
    created() {
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
        system_id: '42052',
        jcq_sj: moment().subtract(13, 'months').format('YYYY-MM'),
        bjq_sj: moment().subtract(1, 'months').format('YYYY-MM'),
        strucPie1: [],
        strucPie2: [],
        pieRadius: ['13%', '60%'],
        options1: orgSystemIdDic,
        noBorder: true,
        dwFormat: '',
        jcqFormat: moment().format('YYYY年MM月'),
        bjqFormat: moment().format('YYYY年MM月')
      }
    },
    computed: {
      filterJcqData() {
        if (this.rData.list_jcq && this.rData.list_jcq.length > 0) {
          return tableDataFilter(this.rData.list_jcq)
        } else {
          return []
        }
      },
      filterBjqData() {
        if (this.rData.list_bjq && this.rData.list_bjq.length > 0) {
          return tableDataFilter(this.rData.list_bjq)
        } else {
          return []
        }
      }
    },
    methods: {
      computedFormat() {
        let index = this.options1.findIndex((item) => {
          return this.system_id === item.value
        })
        this.dwFormat = this.options1[index] ? this.options1[index].label : ''
        this.jcqFormat = this.jcq_sj ? moment(this.jcq_sj).format('YYYY年MM月') : moment().format('YYYY年MM月')
        this.bjqFormat = this.bjq_sj ? moment(this.bjq_sj).format('YYYY年MM月') : moment().format('YYYY年MM月')
      },
      fetchData() {
        this.loading = true
        this.computedFormat()
        if (this.type === 'nh') {
          fetch('get', api.queryNyZlFx, {system_id: this.system_id, jcq_sj: this.jcq_sj, bjq_sj: this.bjq_sj}).then((res) => {
            let zfl = {}
            zfl.zl = '增幅率（%）'
            res.data.list_zf && res.data.list_zf.forEach((item, i) => {
              zfl['zf' + i] = (item.zf)
            })
            this.rData = res.data
            this.rData.zfl = [zfl]
            this.loading = false
          }).catch(() => {
            this.rData = {}
            this.loading = false
          })
        } else {
          fetch('get', api.queryNyFyJg, {system_id: this.system_id, jcq_sj: this.jcq_sj, bjq_sj: this.bjq_sj}).then((res) => {
            let zfl = {}
            zfl.zl = '增幅率（%）'
            res.data.list_zf && res.data.list_zf.forEach((item, i) => {
              zfl['zf' + i] = (item.zf)
            })
            this.rData = res.data
            this.rData.zfl = [zfl]
            this.loading = false
          }).catch(() => {
            this.rData = {}
            this.loading = false
          })
        }
      },
      dateChange(value) {
        this.dateTime = value
      },
      onSearch() {
        this.fetchData()
      },
      selectChange(value) {}
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
      .table-box > .row:last-child
        min-height: calc(100vh - 510px)
      .chart-box
        min-height: 350px
        border-radius: 0px
</style>
