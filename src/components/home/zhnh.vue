<template>
  <div class="cost-info-container">
    <div class="cost-info">
      <div class="col-box">
        <select-title title1="选择日期" title2="指标类别">
          <el-date-picker
            slot="title1"
            :clearable="false"
            v-model="valueMonth"
            type="month"
            size="mini"
            value-format="yyyy-MM"
            @change="dateChange"
            placeholder="选择月">
          </el-date-picker>
          <el-select
            slot="title2"
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
        </select-title>
      </div>
      <div class="row">
        <div class="col-lg-5 col-md-12 col-box-left">
          <div class="panel-box">
            <data-panel-title :title="lastMonth + '能源绩效'"></data-panel-title>
            <div class="row">
              <data-panel
                class="border-right border-bottom"
                title="产值综合能耗"
                :data="pData.czzhnh || 0"
                unit="吨标煤/万元"
                :tongbiData="pData.czzhnh_tb"
                :huanbiData="pData.czzhnh_hb"
                showType="column"
              ></data-panel>
              <data-panel
                class="border-bottom"
                title="产值碳排放量"
                :data="pData.cztan"
                unit="kgCO<sub>2</sub>/万元"
                :tongbiData="pData.cztan_tb"
                :huanbiData="pData.cztan_hb"
                showType="column"
              ></data-panel>
              <data-panel
                class="border-left border-bottom"
                title="产值耗电量"
                :data="pData.czd"
                unit="千瓦时/万元"
                :tongbiData="pData.czd_tb"
                :huanbiData="pData.czd_hb"
                showType="column"
              ></data-panel>
            </div>
            <div class="row">
              <data-panel
                class="border-right"
                title="产值耗天然气量"
                :data="pData.czq"
                unit="立方米/万元"
                :tongbiData="pData.czq_tb"
                :huanbiData="pData.czq_hb"
                showType="column"
              ></data-panel>
              <data-panel
                title="产值耗水量"
                :data="pData.czs"
                unit="升（水）/万元"
                :tongbiData="pData.czs_tb"
                :huanbiData="pData.czs_hb"
                showType="column"
              ></data-panel>
              <data-panel
                title="产值耗热量"
                class="border-left"
                :data="pData.czr"
                unit="吉焦/万元"
                :tongbiData="pData.czr_tb"
                :huanbiData="pData.czr_hb"
                showType="column"
              ></data-panel>
            </div>
          </div>
        </div>
        <div class="col-lg-7 col-md-12 col-box-right">
          <div class="panel-box">
            <data-panel-title :title="lastMonth + '能耗信息'"></data-panel-title>
            <div class="row">
              <data-panel
                class="border-right border-bottom"
                title="单车综合能耗"
                :data="pData.dzhnh"
                unit="吨标煤/辆"
                :tongbiData="pData.dzhnh_tb"
                :huanbiData="pData.dzhnh_hb"
                showType="column"
              ></data-panel>
              <data-panel
                class="border-right border-bottom"
                title="单车碳排放量"
                :data="pData.dtan"
                unit="kgCO<sub>2</sub>/辆"
                :tongbiData="pData.dtan_tb"
                :huanbiData="pData.dtan_hb"
                showType="column"
              ></data-panel>
              <data-panel
                class="border-right border-bottom"
                title="单车耗电量"
                :data="pData.dd"
                unit="千瓦时/辆"
                :tongbiData="pData.dd_tb"
                :huanbiData="pData.dd_hb"
                showType="column"
              ></data-panel>
              <data-panel
                class="border-bottom"
                title="乘用车单车能源费用"
                :data="pData.dcyje"
                unit="元/辆"
                :tongbiData="pData.dcyje_tb"
                :huanbiData="pData.dcyje_hb"
                showType="column"
              ></data-panel>
            </div>
            <div class="row">
              <data-panel
                class="border-right"
                title="单车耗水量"
                :data="pData.ds"
                unit="升（水）/辆"
                :tongbiData="pData.ds_tb"
                :huanbiData="pData.ds_hb"
                showType="column"
              ></data-panel>
              <data-panel
                class="border-right"
                title="单车耗天然气量"
                :data="pData.dq"
                unit="立方米/辆"
                :tongbiData="pData.dq_tb"
                :huanbiData="pData.dq_hb"
                showType="column"
              ></data-panel>
              <data-panel
                class="border-right"
                title="单车耗热量"
                :data="pData.dr"
                unit="吉焦/辆"
                :tongbiData="pData.dr_tb"
                :huanbiData="pData.dr_hb"
                showType="column"
              ></data-panel>
              <data-panel
                title="中重型车单车能源费用"
                :data="pData.dzxje"
                unit="元/辆"
                :tongbiData="pData.dzxje_tb"
                :huanbiData="pData.dzxje_hb"
                showType="column"
              ></data-panel>
            </div>
          </div>
        </div>
      </div>
      <div class="col-box">
        <chart-bar-line class="chart-box"
                        :legendData="zcData.legendData"
                        :series="zcData.series"
                        :xAxisData="zcData.xAxisData"
                        :yAxis="yAxis"
                        :titleText="lastMonth + '整车制造' + chartTitle"></chart-bar-line>
      </div>
      <div class="col-box-bottom">
        <chart-bar-line class="chart-box"
                        :legendData="lbjData.legendData"
                        :series="lbjData.series"
                        :xAxisData="lbjData.xAxisData"
                        :yAxis="yAxis"
                        :titleText="lastMonth + '零部件加工' + chartTitle"></chart-bar-line>
      </div>
    </div>
  </div>
</template>
<script>
import DataPanel from 'base/data-panel/data-panel'
import DataPanelTitle from 'base/data-panel-title/data-panel-title'
import ChartPie from 'base/chart-pie/chart-pie'
import ChartBarLine from 'base/chart-bar-line/chart-bar-line'
import SelectTitle from 'base/select-title/select-title'
import { api } from '@/config'
import fetch from 'utils/fetch'
let moment = require('moment')
moment.locale('zh-cn')
export default {
  components: {
    DataPanel,
    DataPanelTitle,
    ChartPie,
    ChartBarLine,
    SelectTitle
  },
  data() {
    return {
      lastMonth: moment().subtract(1, 'months').format('MMMM'),
      quantityChartRadius: [0, '60%'],
      feeChartRadius: [0, '60%'],
      valueMonth: '',
      valueSelect: '',
      options1: [{
        value: '40',
        label: '产值综合能耗'
      }, {
        value: '101',
        label: '产值碳排放量'
      }, {
        value: '33',
        label: '产值耗电量'
      }, {
        value: '15',
        label: '产值耗天然气量'
      }, {
        value: '00',
        label: '产值耗水量'
      }, {
        value: '32',
        label: '产值耗热量'
      }, {
        value: '102',
        label: '单车综合能耗'
      }, {
        value: '103',
        label: '单车碳排放量'
      }],
      pData: {},
      zcData: {},
      lbjData: {},
      dateTime: '',
      lx: '',
      yAxis: [{name: '吨标煤/万元'}, {name: '%'}],
      chartTitle: '产值综合能耗'
    }
  },
  created() {
    this.fetchPanelData()
    this.fetchChartData()
  },
  methods: {
    fetchPanelData() {
      fetch('get', api.queryZhiBiaoList, {dateTime: this.dateTime}).then((res) => {
        this.pData = res.data[0]
      }).catch(() => {
        this.pData = {}
      })
    },
    fetchChartData() {
      fetch('get', api.queryNyZListZc, {dateTime: this.dateTime, lx: this.lx}).then((res) => {
        this.zcData = res.data
      }).catch(() => {
        this.zcData = {}
      })
      fetch('get', api.queryNyZListLbj, {dateTime: this.dateTime, lx: this.lx}).then((res) => {
        this.lbjData = res.data
      }).catch(() => {
        this.lbjData = {}
      })
    },
    onClose() {
      this.$router.replace('/home')
    },
    dateChange(value) {
      this.dateTime = value
      this.lastMonth = moment(value).format('MMMM')
      this.fetchPanelData()
      this.fetchChartData()
    },
    selectChange(value) {
      let index = this.options1.findIndex((item) => {
        return value === item.value
      })
      this.chartTitle = this.options1[index].label
      // 产值综合能耗
      if (value === '40') {
        this.yAxis = [{name: '吨标煤/万元'}, {name: '%'}]
        // 产值碳排放量
      } else if (value === '101') {
        this.yAxis = [{name: 'kgCO2/万元'}, {name: '%'}]
      } else if (value === '33') {
        this.yAxis = [{name: '千瓦时/万元'}, {name: '%'}]
      } else if (value === '15') {
        this.yAxis = [{name: '立方米/万元'}, {name: '%'}]
      } else if (value === '00') {
        this.yAxis = [{name: '升（水）/万元'}, {name: '%'}]
      } else if (value === '32') {
        this.yAxis = [{name: '吉焦/万元'}, {name: '%'}]
      } else if (value === '102') {
        this.yAxis = [{name: '吨标煤/辆'}, {name: '%'}]
      } else if (value === '103') {
        this.yAxis = [{name: 'kgCO2/辆'}, {name: '%'}]
      }
      this.lx = value
      this.fetchChartData()
    }
  }
}
</script>
<style lang="stylus" scoped>
  @import "~common/stylus/variable.styl"
  @import "~common/stylus/mixin.styl"
  .cost-info-container
    overflow: auto
    -webkit-overflow-scrolling: touch
    position: absolute
    top: 0
    left: 0
    right: 0
    bottom: 0
    .cost-info
      background: $color-sub-text
      display: flex
      flex-direction: column
      min-height: 100%
      min-width: 600px
      .chart-box
        min-height: 350px
</style>
