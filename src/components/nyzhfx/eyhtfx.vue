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
        <div class="panel-box" v-loading="loading">
          <div class="row">
            <div class="col-lg-8 col-md-12 table-box">
              <div class="row">
                <div class="col-lg-6 col-md-12">
                  <chart-pie class="chart-box"
                             :titleText="jcqFormat + '集团公司二氧化碳排放量分布'"
                             :radius="pieRadius"
                             @pieClick="pieClick"
                             :seriesData="rData.bjq_pie && rData.bjq_pie.seriesData"></chart-pie>
                </div>
                <div class="col-lg-6 col-md-12">
                  <chart-pie class="chart-box"
                             :titleText="bjqFormat + '集团公司二氧化碳排放量分布'"
                             :radius="pieRadius"
                             @pieClick="pieClick"
                             :seriesData="rData.bjq_pie && rData.jcq_pie.seriesData"></chart-pie>
                </div>
              </div>
              <div class="row">
                <div class="col-lg-6 col-md-12">
                  <el-table
                    height="100%"
                    :data="rData.list_jcq"
                    border
                    header-cell-class-name="header-cell-class-name"
                    style="width: 98%">
                    <el-table-column
                      prop="nybm"
                      label="能源部门">
                    </el-table-column>
                    <el-table-column
                      prop="tan"
                      label="二氧化碳排放">
                    </el-table-column>
                    <el-table-column
                      prop="zb"
                      label="占比（%）">
                    </el-table-column>
                  </el-table>
                </div>
                <div class="col-lg-6 col-md-12">
                  <el-table
                    height="100%"
                    :data="rData.list_bjq"
                    border
                    header-cell-class-name="header-cell-class-name"
                    style="width: 98%">
                    <el-table-column
                      prop="nybm"
                      label="能源部门">
                    </el-table-column>
                    <el-table-column
                      prop="tan"
                      label="二氧化碳排放">
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
              <data-panel-title title="能源消耗结构同比增幅分析" :noBorder="noBorder"></data-panel-title>
              <el-table
                height="calc(100% - 50px)"
                :data="rData.list_zf"
                border
                header-cell-class-name="header-cell-class-name"
                style="width: 100%">
                <el-table-column
                  prop="nybm"
                  label="能源部门">
                </el-table-column>
                <el-table-column
                  prop="zf"
                  label="同比增幅率（%）">
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
//      this.fetchData()
    },
    data() {
      return {
        loading: false,
        type: this.$route.params.type || 'nh',
        rData: {},
        org_pid: '2',
        jcq_sj: '',
        bjq_sj: '',
        strucPie1: [],
        strucPie2: [],
        pieRadius: ['13%', '60%'],
        noBorder: true,
        jcqFormat: moment().format('YYYY年MM月'),
        bjqFormat: moment().format('YYYY年MM月')
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
          this.rData = res.data
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
        } else if (param.data.name === '物流') {
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
