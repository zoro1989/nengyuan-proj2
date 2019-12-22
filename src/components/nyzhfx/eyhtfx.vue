<template>
  <div class="info-container">
    <div class="info">
      <div class="col-box">
        <select-title title1="基期" title2="比较期" @search="onSearch" :showSearch="true">
          <el-date-picker
            slot="title1"
            v-model="jcq_sj"
            type="month"
            size="mini"
            value-format="yyyy-MM"
            @change="dateChange"
            placeholder="选择月">
          </el-date-picker>
          <el-date-picker
            slot="title2"
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
        <!--<div class="panel-box" v-loading="loading">-->
        <div class="panel-box">
          <div class="row">
            <div class="col-lg-12 col-md-12 table-box">
              <div class="row">
                <div class="col-lg-6 col-md-12">
                  <chart-pie class="chart-box"
                             :isSort="false"
                             :titleText="jcqFormat + '集团公司二氧化碳排放量分布'"
                             :radius="pieRadius"
                             @pieClick="pieClick"
                             :legendData="rData.jcq_pie && rData.jcq_pie.legendData"
                             :seriesData="rData.jcq_pie && rData.jcq_pie.seriesData"></chart-pie>
                </div>
                <report-table class="col-lg-6 col-md-12" className="table1" reportName="二氧化碳排放-基础期">
                  <el-table
                    slot="table"
                    :data="filterJcqData"
                    border
                    header-cell-class-name="header-cell-class-name"
                    style="width: 98%; margin-left: 2%">
                    <el-table-column
                      align="center"
                      prop="nybm"
                      label="用能单位">
                    </el-table-column>
                    <el-table-column
                      align="center"
                      width="110"
                      prop="tan"
                      label="二氧化碳排放（吨CO2）">
                    </el-table-column>
                    <el-table-column
                      align="center"
                      prop="zb"
                      width="100"
                      label="占比（%）">
                    </el-table-column>
                  </el-table>
                </report-table>
              </div>
              <div class="row">
                <div class="col-lg-6 col-md-12">
                  <chart-pie class="chart-box"
                             :isSort="false"
                             :titleText="bjqFormat + '集团公司二氧化碳排放量分布'"
                             :radius="pieRadius"
                             @pieClick="pieClick"
                             :legendData="rData.bjq_pie && rData.bjq_pie.legendData"
                             :seriesData="rData.bjq_pie && rData.bjq_pie.seriesData"></chart-pie>
                </div>
                <report-table class="col-lg-6 col-md-12" className="table2" reportName="二氧化碳排放-比较期">
                  <el-table
                    slot="table"
                    :data="filterBjqData"
                    border
                    header-cell-class-name="header-cell-class-name"
                    style="width: 98%; margin-left: 2%">
                    <el-table-column
                      align="center"
                      prop="nybm"
                      label="用能单位">
                    </el-table-column>
                    <el-table-column
                      align="center"
                      prop="tan"
                      width="110"
                      label="二氧化碳排放（吨CO2）">
                    </el-table-column>
                    <el-table-column
                      align="center"
                      prop="zb"
                      width="100"
                      label="占比（%）">
                    </el-table-column>
                  </el-table>
                </report-table>
              </div>
            </div>
          </div>
          <div class="row">
            <report-table class="col-lg-12 col-md-12 table-box box-bottom" className="table3" reportName="能源消耗结构增幅分析">
              <data-panel-title slot="title" title="能源消耗结构增幅分析" :noBorder="noBorder"></data-panel-title>
              <el-table
                slot="table"
                :data="rData.zfl"
                border
                header-cell-class-name="header-cell-class-name">
                <el-table-column
                  align="center"
                  prop="zl"
                  label="用能单位">
                </el-table-column>
                <el-table-column
                  align="center"
                  v-for="(item, index) in rData.list_zf"
                  :key="index"
                  :prop="'zf' + index"
                  :label="item.nybm">
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
    data() {
      return {
        loading: false,
        type: this.$route.params.type || 'nh',
        rData: {},
        org_pid: '2',
        jcq_sj: moment().format('DD') * 1 <= 10 ? moment().subtract(14, 'months').format('YYYY-MM') : moment().subtract(13, 'months').format('YYYY-MM'),
        bjq_sj: moment().format('DD') * 1 <= 10 ? moment().subtract(2, 'months').format('YYYY-MM') : moment().subtract(1, 'months').format('YYYY-MM'),
        strucPie1: [],
        strucPie2: [],
        pieRadius: ['13%', '60%'],
        noBorder: true,
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
        this.jcqFormat = this.jcq_sj ? moment(this.jcq_sj).format('YYYY年MM月') : moment().format('YYYY年MM月')
        this.bjqFormat = this.bjq_sj ? moment(this.bjq_sj).format('YYYY年MM月') : moment().format('YYYY年MM月')
      },
      fetchData() {
        this.loading = true
        this.computedFormat()
        fetch('get', api.queryNyEyHtLFx, {org_pid: this.org_pid, jcq_sj: this.jcq_sj, bjq_sj: this.bjq_sj}).then((res) => {
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
      },
      dateChange(value) {
        this.dateTime = value
      },
      onSearch() {
        this.fetchData()
      },
      selectChange(value) {},
      pieClick(param) {
        if (param.data.name === '整车制造') {
          this.org_pid = '2'
          this.fetchData()
        } else if (param.data.name === '零部件加工') {
          this.org_pid = '23'
          this.fetchData()
        } else if (param.data.name === '其它公司') {
          this.org_pid = '30'
          this.fetchData()
        }
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
      .panel-box
        min-height: calc(100vh - 191px)
      .chart-box
        min-height: 350px
        border-radius: 0px
</style>
