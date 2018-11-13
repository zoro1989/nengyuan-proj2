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
            <div class="col-lg-8 col-md-12 table-box">
              <div class="row">
                <div class="col-lg-6 col-md-12">
                  <chart-pie class="chart-box"
                             :isSort="false"
                             :titleText="type === 'nh' ? jcqFormat + dwFormat + '能源消耗结构' : jcqFormat + dwFormat + '能源费用结构'"
                             :radius="pieRadius"
                             :seriesData="rData.jcq_pie && rData.jcq_pie.seriesData"></chart-pie>
                </div>
                <div class="col-lg-6 col-md-12">
                  <chart-pie class="chart-box"
                             :isSort="false"
                             :titleText="type === 'nh' ? bjqFormat + dwFormat + '能源消耗结构' : bjqFormat + dwFormat + '能源费用结构'"
                             :radius="pieRadius"
                             :seriesData="rData.bjq_pie && rData.bjq_pie.seriesData"></chart-pie>
                </div>
              </div>
              <div class="row">
                <div class="col-lg-6 col-md-12">
                  <el-table
                    v-if="type === 'nh'"
                    height="100%"
                    :data="filterJcqData"
                    border
                    header-cell-class-name="header-cell-class-name"
                    style="width: 98%">
                    <el-table-column
                      prop="nyzl"
                      label="能源种类">
                    </el-table-column>
                    <el-table-column
                      prop="jldw"
                      label="计量单位">
                    </el-table-column>
                    <el-table-column
                      prop="yl"
                      :label="jcqFormat">
                    </el-table-column>
                    <el-table-column
                      prop="zb"
                      label="占比（%）">
                    </el-table-column>
                  </el-table>
                  <el-table
                    v-if="type === 'fy'"
                    height="100%"
                    :data="filterJcqData"
                    border
                    header-cell-class-name="header-cell-class-name"
                    style="width: 98%">
                    <el-table-column
                      prop="fyzl"
                      label="费用种类">
                    </el-table-column>
                    <el-table-column
                      prop="jldw"
                      label="计量单位">
                    </el-table-column>
                    <el-table-column
                      prop="fy"
                      :label="jcqFormat">
                    </el-table-column>
                    <el-table-column
                      prop="zb"
                      label="占比（%）">
                    </el-table-column>
                  </el-table>
                </div>
                <div class="col-lg-6 col-md-12">
                  <el-table
                    v-if="type === 'nh'"
                    height="100%"
                    :data="filterBjqData"
                    border
                    header-cell-class-name="header-cell-class-name"
                    style="width: 98%">
                    <el-table-column
                      prop="nyzl"
                      label="能源种类">
                    </el-table-column>
                    <el-table-column
                      prop="jldw"
                      label="计量单位">
                    </el-table-column>
                    <el-table-column
                      prop="yl"
                      :label="bjqFormat">
                    </el-table-column>
                    <el-table-column
                      prop="zb"
                      label="占比（%）">
                    </el-table-column>
                  </el-table>
                  <el-table
                    v-if="type === 'fy'"
                    height="100%"
                    :data="filterBjqData"
                    border
                    header-cell-class-name="header-cell-class-name"
                    style="width: 98%">
                    <el-table-column
                      prop="fyzl"
                      label="费用种类">
                    </el-table-column>
                    <el-table-column
                      prop="jldw"
                      label="计量单位">
                    </el-table-column>
                    <el-table-column
                      prop="fy"
                      :label="bjqFormat">
                    </el-table-column>
                    <el-table-column
                      prop="zb"
                      label="占比（%）">
                    </el-table-column>
                  </el-table>
                </div>
              </div>
            </div>
            <div class="col-lg-4 col-md-12 table-box box-right">
              <data-panel-title :title="type === 'nh' ? '能源消耗结构增幅分析' : '能源费用结构增幅分析'" :noBorder="noBorder"></data-panel-title>
              <el-table
                v-if="type === 'nh'"
                height="calc(100% - 50px)"
                :data="rData.list_zf"
                border
                header-cell-class-name="header-cell-class-name"
                style="width: 100%">
                <el-table-column
                  prop="nyzl"
                  label="能源种类">
                </el-table-column>
                <el-table-column
                  prop="zf"
                  label="增幅率">
                </el-table-column>
              </el-table>
              <el-table
                v-if="type === 'fy'"
                height="calc(100% - 50px)"
                :data="rData.list_zf"
                border
                header-cell-class-name="header-cell-class-name"
                style="width: 100%">
                <el-table-column
                  prop="fyzl"
                  label="费用种类">
                </el-table-column>
                <el-table-column
                  prop="zf"
                  label="增幅率">
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
  import { api } from '@/config'
  import fetch from 'utils/fetch'
  import {orgSystemIdDic} from 'utils/dic'
  import {tableDataFilter} from 'utils/filter'
  let moment = require('moment')
  moment.locale('zh-cn')
  export default {
    components: {
      SelectTitle,
      ChartPie,
      DataPanelTitle
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
        system_id: '2611',
        jcq_sj: moment().subtract(13, 'months').format('YYYY-MM-DD'),
        bjq_sj: moment().subtract(1, 'months').format('YYYY-MM-DD'),
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
            this.rData = res.data
            this.loading = false
          }).catch(() => {
            this.rData = {}
            this.loading = false
          })
        } else {
          fetch('get', api.queryNyFyJg, {system_id: this.system_id, jcq_sj: this.jcq_sj, bjq_sj: this.bjq_sj}).then((res) => {
            this.rData = res.data
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
      .col-box-left-right-bottom
        height: 100%
      .panel-box > .row
        height: 100%
        .table-box > .row:last-child
          height: calc(100% - 350px)
      .chart-box
        min-height: 350px
        border-radius: 0px
</style>
