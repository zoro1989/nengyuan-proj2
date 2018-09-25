<template>
  <div class="cost-info-container">
    <div class="cost-info">
      <div class="cost-title">
        <div class="title-l">
          <span class="picker-txt">选择日期</span>
          <el-date-picker
            v-model="valueMonth"
            type="month"
            size="mini"
            value-format="yyyy-MM"
            @change="dateChange"
            placeholder="选择月">
          </el-date-picker>
          <span class="picker-txt">用能单位</span>
          <el-select
            v-model="valueYndw"
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
        </div>
        <div class="title-r">
          <span @click="onClose" class="ripple"><i class="fa fa-times"></i></span>
        </div>
      </div>
      <div class="row">
        <div class="panel-l col-lg-5 col-md-12 col-xs-12">
          <div class="panel-box">
            <data-panel-title :title="lastMonth + '能源绩效'"></data-panel-title>
            <div class="panel row">
              <div class="col-md-4 col-xs-12">
                <data-panel
                  class="border-right border-bottom"
                  title="产值综合能耗"
                  :data="pData.czzhnh || 0"
                  unit="吨标煤/万元"
                  :tongbiData="pData.czzhnh_tb"
                  :huanbiData="pData.czzhnh_hb"
                  showType="column"
                ></data-panel>
              </div>
              <div class="col-md-4 col-xs-12">
                <data-panel
                  class="border-bottom"
                  title="产值碳排放量"
                  :data="pData.cztan"
                  unit="kgCO<sub>2</sub>/万元"
                  :tongbiData="pData.cztan_tb"
                  :huanbiData="pData.cztan_hb"
                  showType="column"
                ></data-panel>
              </div>
              <div class="col-md-4 col-xs-12">
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
            </div>
            <div class="panel row">
              <div class="col-md-4 col-xs-12">
                <data-panel
                  class="border-right"
                  title="产值耗天然气量"
                  :data="pData.czq"
                  unit="立方米/万元"
                  :tongbiData="pData.czq_tb"
                  :huanbiData="pData.czq_hb"
                  showType="column"
                ></data-panel>
              </div>
              <div class="col-md-4 col-xs-12">
                <data-panel
                  title="产值耗水量"
                  :data="pData.czs"
                  unit="升（水）/万元"
                  :tongbiData="pData.czs_tb"
                  :huanbiData="pData.czs_hb"
                  showType="column"
                ></data-panel>
              </div>
              <div class="col-md-4 col-xs-12">
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
        </div>
        <div class="panel-r col-lg-7 col-md-12 col-xs-12">
          <div class="panel-box">
            <data-panel-title :title="lastMonth + '能耗信息'"></data-panel-title>
            <div class="panel row">
              <div class="col-md-3 col-xs-12">
                <data-panel
                  class="border-right border-bottom"
                  title="单车综合能耗"
                  :data="pData.dzhnh"
                  unit="吨标煤/辆"
                  :tongbiData="pData.dzhnh_tb"
                  :huanbiData="pData.dzhnh_hb"
                  showType="column"
                ></data-panel>
              </div>
              <div class="col-md-3 col-xs-12">
                <data-panel
                  class="border-right border-bottom"
                  title="单车碳排放量"
                  :data="pData.dtan"
                  unit="kgCO<sub>2</sub>/辆"
                  :tongbiData="pData.dtan_tb"
                  :huanbiData="pData.dtan_hb"
                  showType="column"
                ></data-panel>
              </div>
              <div class="col-md-3 col-xs-12">
                <data-panel
                  class="border-right border-bottom"
                  title="单车耗电量"
                  :data="pData.dd"
                  unit="千瓦时/辆"
                  :tongbiData="pData.dd_tb"
                  :huanbiData="pData.dd_hb"
                  showType="column"
                ></data-panel>
              </div>
              <div class="col-md-3 col-xs-12">
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
            </div>
            <div class="panel row">
              <div class="col-md-3 col-xs-12">
                <data-panel
                  class="border-right"
                  title="单车耗水量"
                  :data="pData.ds"
                  unit="吉焦/万元"
                  :tongbiData="pData.ds_tb"
                  :huanbiData="pData.ds_hb"
                  showType="column"
                ></data-panel>
              </div>
              <div class="col-md-3 col-xs-12">
                <data-panel
                  class="border-right"
                  title="单车耗天然气量"
                  :data="pData.dq"
                  unit="立方米/辆"
                  :tongbiData="pData.dq_tb"
                  :huanbiData="pData.dq_hb"
                  showType="column"
                ></data-panel>
              </div>
              <div class="col-md-3 col-xs-12">
                <data-panel
                  class="border-right"
                  title="单车耗热量"
                  :data="pData.dr"
                  unit="吉焦/辆"
                  :tongbiData="pData.dr_tb"
                  :huanbiData="pData.dr_hb"
                  showType="column"
                ></data-panel>
              </div>
              <div class="col-md-3 col-xs-12">
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
      </div>
      <div class="panel-box">
        <chart-bar-line class="energy" ref="energy"
                        :legendData="zcData.legendData"
                        :series="zcData.series"
                        :xAxisData="zcData.xAxisData"
                        :yAxis="zcData.yAxis"
                        :titleText="lastMonth + '整车制造产值综合能耗'"></chart-bar-line>
      </div>
      <div class="panel-box">
        <chart-bar-line class="energy" ref="energy"
                        :legendData="lbjData.legendData"
                        :series="lbjData.series"
                        :xAxisData="lbjData.xAxisData"
                        :yAxis="lbjData.yAxis"
                        :titleText="lastMonth + '零部件加工产值综合能耗'"></chart-bar-line>
      </div>
    </div>
  </div>
</template>
<script>
import DataPanel from 'base/data-panel/data-panel'
import DataPanelTitle from 'base/data-panel-title/data-panel-title'
import ChartPie from 'base/chart-pie/chart-pie'
import ChartBarLine from 'base/chart-bar-line/chart-bar-line'
import { api } from '@/config'
import fetch from 'utils/fetch'
let moment = require('moment')
moment.locale('zh-cn')
export default {
  components: {
    DataPanel,
    DataPanelTitle,
    ChartPie,
    ChartBarLine
  },
  data() {
    return {
      lastMonth: moment().subtract(1, 'months').format('MMMM'),
      quantityChartRadius: [0, '60%'],
      feeChartRadius: [0, '60%'],
      legendData: [],
      seriesData: [],
      valueMonth: '',
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
      valueYndw: '',
      xAxisData1: ['红旗工厂', '一汽大众', '一汽轿车', '一汽吉林', '新能源汽车', '长春丰越', '天津夏利', '天津丰田', '一汽通用(长春)', '四川丰田(成都)', '一汽解放', '一汽客车'],
      xAxisData2: ['一汽富维', '一汽模具', '一汽锻造', '一汽铸造', '长春丰田', '天津丰田', '一汽物流'],
      pData: {},
      zcData: {},
      lbjData: {},
      dateTime: '',
      lx: ''
    }
  },
  created() {
//    setTimeout(() => {
//      this.legendData = ['上年同期指标', '实际指标', '计划指标', '达标率']
//      this.seriesData1 = [
//        {
//          name: '上年同期指标',
//          type: 'bar',
//          data: [20.0, 25.0, 22.0, 21.0, 25.0, 27.0, 29.0, 27.0, 20.0, 25.0, 22.0, 21.0],
//          reality: '0'
//        },
//        {
//          name: '实际指标',
//          type: 'bar',
//          data: [19.0, 31.0, 19.0, 27.0, 25.0, 31.0, 20.0, 17.0, 26.0, 31.0, 25.0, 27.0],
//          reality: '1'
//        },
//        {
//          name: '计划指标',
//          type: 'bar',
//          data: [28.0, 21.0, 28.0, 28.0, 28.0, 32.0, 28.0, 22.0, 28.0, 41.0, 28.0, 28.0],
//          reality: '0'
//        },
//        {
//          name: '达标率',
//          type: 'line',
//          data: [0.012, 0.013, 0.017, 0.016, 0.018, 0.017, 0.016, 0.015, 0.012, 0.013, 0.017, 0.016]
//        }
//      ]
//      this.seriesData2 = [
//        {
//          name: '上年同期指标',
//          type: 'bar',
//          data: [20.0, 25.0, 22.0, 21.0, 25.0, 27.0, 29.0],
//          reality: '0'
//        },
//        {
//          name: '实际指标',
//          type: 'bar',
//          data: [19.0, 31.0, 19.0, 27.0, 25.0, 31.0, 20.0],
//          reality: '1'
//        },
//        {
//          name: '计划指标',
//          type: 'bar',
//          data: [28.0, 21.0, 28.0, 28.0, 28.0, 32.0, 28.0],
//          reality: '0'
//        },
//        {
//          name: '达标率',
//          type: 'line',
//          data: [0.012, 0.013, 0.017, 0.016, 0.018, 0.017, 0.016]
//        }
//      ]
//    })
    this.fetchPanelData()
    this.fetchChartData()
  },
  methods: {
    fetchPanelData() {
      fetch('get', api.queryZhiBiaoList, {dateTime: this.dateTime}).then((res) => {
        this.pData = res.data[0]
      })
    },
    fetchChartData() {
      fetch('get', api.queryNyZListZc, {dateTime: this.dateTime, lx: this.lx}).then((res) => {
        this.zcData = JSON.parse(JSON.stringify(res.data))
        console.log(this.zcData['xAxisData'])
        this.zcData.yAxis = [{name: '吨标煤/万元'}, {name: '%'}]
      })
      fetch('get', api.queryNyZListLbj, {dateTime: this.dateTime, lx: this.lx}).then((res) => {
        this.lbjData = JSON.parse(JSON.stringify(res.data))
        this.lbjData.yAxis = [{name: '吨标煤/万元'}, {name: '%'}]
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
      @media (max-width: 992px)
        .panel-r
          .panel-box
            margin: 0 10px 10px 10px!important
      .cost-title
        margin: 10px 10px 0 10px
        padding: 0 10px
        height: 40px
        line-height: 40px
        background: #fff
        border-radius: 5px
        color: #333
        display: flex
        justify-content: space-between
        .title-r
          .fa
            margin: 0 5px
            color: #899eb6
            font-size: $font-size-large
            cursor: pointer
        .picker-txt
          padding: 0 5px 0 15px
      .panel-l
        .panel-box
          margin: 10px 10px 0 10px
      .panel-r
        .panel-box
          margin: 10px 10px 0 0
      .panel-box
        margin: 0px 10px 10px 10px
        padding: 0 10px 10px 10px
        border-radius: 5px
        background: #fff
        .panel
          display: flex
          div
            flex: 1
            display: flex
            flex-direction: column
            .sample-data-panel
              flex: 1
        .energy
          min-height: 250px
          position: relative
          height: 100%
        &:last-child
          margin-bottom: 10px
</style>
