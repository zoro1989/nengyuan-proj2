<template>
  <div class="home-container">
    <div class="home">
      <div class="panels row">
        <div class="panel-l col-lg-5 col-md-12">
          <div class="panel-box">
            <data-panel-title :title="lastMonth + '能源绩效'" link="/zhnh"></data-panel-title>
            <div class="panel row">
              <div class="col-md-6">
                <data-panel
                  class="border-right border-bottom"
                  title="产值综合能耗"
                  :data="data.czzhnh || 0"
                  unit="吨标煤/万元"
                  :tongbiData="Math.abs(data.czzhnh_tb || 0)"
                  :tongbiStatus="(data.czzhnh_tb || 0) > 0 ? 'up' : 'down'"
                  :huanbiData="Math.abs(data.czzhnh_hb || 0)"
                  :huanbiStatus="(data.czzhnh_hb || 0) > 0 ? 'up' : 'down'"
                ></data-panel>
              </div>
              <div class="col-md-6">
                <data-panel
                  class="border-bottom"
                  title="单车能源费用"
                  :data="data.je_d || 0"
                  unit="元/辆"
                  :tongbiData="Math.abs(data.je_d_tb || 0)"
                  :tongbiStatus="(data.je_d_tb|| 0) > 0 ? 'up' : 'down'"
                  :huanbiData="Math.abs(data.je_d_hb || 0)"
                  :huanbiStatus="(data.je_d_hb|| 0) > 0 ? 'up' : 'down'"
                ></data-panel>
              </div>
            </div>
            <div class="panel row">
              <div class="col-md-6">
                <data-panel
                  class="border-right"
                  title="单车综合标煤"
                  :data="data.zhnh_d || 0"
                  unit="吨标煤/辆"
                  :tongbiData="Math.abs(data.zhnh_d_tb || 0)"
                  :tongbiStatus="(data.zhnh_d_tb || 0) > 0 ? 'up' : 'down'"
                  :huanbiData="Math.abs(data.zhnh_d_hb || 0)"
                  :huanbiStatus="(data.zhnh_d_hb || 0) > 0 ? 'up' : 'down'"
                ></data-panel>
              </div>
              <div class="col-md-6">
                <data-panel
                  title="单车碳排放量"
                  :data="data.tan_d || 0"
                  unit="KGCO2/辆"
                  :tongbiData="Math.abs(data.tan_d_tb || 0)"
                  :tongbiStatus="(data.tan_d_tb || 0) > 0 ? 'up' : 'down'"
                  :huanbiData="Math.abs(data.tan_d_hb || 0)"
                  :huanbiStatus="(data.tan_d_hb || 0) > 0 ? 'up' : 'down'"
                ></data-panel>
              </div>
            </div>
          </div>
        </div>
        <div class="panel-c col-lg-2 col-md-12">
          <div class="panel-box">
            <data-panel-title :title="lastMonth + '清洁能源用量'"></data-panel-title>
            <div class="panel row">
              <div class="col-md-12">
                <data-panel
                  class="border-bottom"
                  title="清洁能源"
                  data="4586"
                  unit="吨标煤"
                  tongbiData="12.2%"
                  tongbiStatus="down"
                  huanbiData="6.7%"
                  huanbiStatus="up"
                ></data-panel>
              </div>
            </div>
            <div class="panel row">
              <div class="col-md-12">
                <flip-panel title="光伏发电实时量(小时)">
                </flip-panel>
              </div>
            </div>
          </div>
        </div>
        <div class="panel-r col-lg-5 col-md-12">
          <div class="panel-box">
            <data-panel-title :title="lastMonth + '能耗信息'" link="/nyylfy"></data-panel-title>
            <div class="panel row">
              <div class="col-md-6">
                <data-panel
                  class="border-right border-bottom"
                  title="生产产量"
                  :data="data.cl || 0"
                  unit="万辆"
                  :tongbiData="Math.abs(data.cl_tb || 0)"
                  :tongbiStatus="(data.cl_tb || 0) > 0 ? 'up' : 'down'"
                  :huanbiData="Math.abs(data.cl_hb || 0)"
                  :huanbiStatus="(data.cl_hb || 0) > 0 ? 'up' : 'down'"
                ></data-panel>
              </div>
              <div class="col-md-6">
                <data-panel
                  class="border-bottom"
                  title="能源用量"
                  :data="data.nh || 0"
                  unit="万吨标煤"
                  :tongbiData="Math.abs(data.nh_tb || 0)"
                  :tongbiStatus="(data.nh_tb || 0) > 0 ? 'up' : 'down'"
                  :huanbiData="Math.abs(data.nh_hb || 0)"
                  :huanbiStatus="(data.nh_hb || 0) > 0 ? 'up' : 'down'"
                ></data-panel>
              </div>
            </div>
            <div class="panel row">
              <div class="col-md-6">
                <data-panel
                  class="border-right"
                  title="碳排放量"
                  :data="data.tan || 0"
                  unit="吨CO2"
                  :tongbiData="Math.abs(data.tan_tb || 0)"
                  :tongbiStatus="(data.tan_tb || 0) > 0 ? 'up' : 'down'"
                  :huanbiData="Math.abs(data.tan_hb || 0)"
                  :huanbiStatus="(data.tan_hb || 0) > 0 ? 'up' : 'down'"
                ></data-panel>
              </div>
              <div class="col-md-6">
                <data-panel
                  title="能源费用"
                  :data="data.je || 0"
                  unit="万元"
                  :tongbiData="Math.abs(data.je_tb || 0)"
                  :tongbiStatus="(data.je_tb || 0) > 0 ? 'up' : 'down'"
                  :huanbiData="Math.abs(data.je_hb || 0)"
                  :huanbiStatus="(data.je_hb || 0) > 0 ? 'up' : 'down'"
                ></data-panel>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="real-time row">
        <div class="col-lg-6 col-md-12">
          <chart-realtime-line class="dosage" ref="dosage"
                               :titleText="realTimeToday + '能源用量(小时)'"
                               yAxisTitle="吨标煤/时"
                               seriesName="能耗"
                               :showArea="showArea"></chart-realtime-line>
        </div>
        <div class="col-lg-6 col-md-12">
          <chart-realtime-bar class="cost" ref="cost"
                              :titleText="realTimeToday + '能源费用(小时)'"
                              yAxisTitle="万元/时"
                              seriesName="费用"></chart-realtime-bar>
        </div>
      </div>
      <div class="chart row">
        <div class="col-lg-3 col-md-12">
          <chart-pie class="analyze" ref="analyze"
                     titleText="三月能源消耗结构"
                     roseType="radius"
                     :data="strucPie"
                     :radius="analyzeChartRadius"></chart-pie>
        </div>
        <div class="col-lg-6 col-md-12 energy-box">
          <chart-bar-line class="energy" ref="energy"
                          :legendData="legendData"
                          :series="seriesData"
                          titleText="能源用量与节能指标同比分析"></chart-bar-line>
        </div>
        <div class="col-lg-3 col-md-12">
          <chart-pie class="fee" ref="fee"
                     titleText="三月能源费用结构"
                     :data="costPie"
                     :radius="feeChartRadius"></chart-pie>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import DataPanel from 'base/data-panel/data-panel'
import DataPanelTitle from 'base/data-panel-title/data-panel-title'
import FlipPanel from 'base/flip-panel/flip-panel'
import ChartRealtimeLine from 'base/chart-realtime-line/chart-realtime-line'
import ChartRealtimeBar from 'base/chart-realtime-bar/chart-realtime-bar'
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
    FlipPanel,
    ChartRealtimeLine,
    ChartRealtimeBar,
    ChartPie,
    ChartBarLine
  },
  data() {
    return {
      analyzeChartRadius: ['13%', '65%'],
      feeChartRadius: ['40%', '65%'],
      showArea: true,
      // 三月能耗结构
      strucPie: [],
      // 三月能耗费用
      costPie: [],
      data: {},
      legendData: [],
      seriesData: [],
      lastMonth: moment().subtract(1, 'months').format('MMMM')
    }
  },
  created() {
    setTimeout(() => {
//      this.strucPie = [{value: 274, name: '水'}, {value: 168, name: '其他'}, {value: 335, name: '高温水'}, {value: 235, name: '原煤'}, {value: 310, name: '天然气'}, {value: 400, name: '电'}]
//      this.costPie = [{value: 274, name: '水'}, {value: 168, name: '其他'}, {value: 335, name: '高温水'}, {value: 235, name: '原煤'}, {value: 310, name: '天然气'}, {value: 400, name: '电'}]
      this.legendData = ['上年同期消耗', '实际消耗', '计划消耗', '上年同期节能指标', '实际节能指标', '计划节能指标']
      this.seriesData = [
        {
          name: '上年同期消耗',
          type: 'bar',
          data: [20.0, 25.0, 22.0, 21.0, 25.0, 27.0, 29.0, 27.0, 20.0, 25.0, 22.0, 21.0],
          reality: '0'
        },
        {
          name: '实际消耗',
          type: 'bar',
          data: [19.0, 31.0, 19.0, 27.0, 25.0, 31.0, 20.0, 17.0, 26.0, 31.0, 25.0, 27.0],
          reality: '1'
        },
        {
          name: '计划消耗',
          type: 'bar',
          data: [28.0, 21.0, 28.0, 28.0, 28.0, 32.0, 28.0, 22.0, 28.0, 41.0, 28.0, 28.0],
          reality: '0'
        },
        {
          name: '上年同期节能指标',
          type: 'line',
          data: [0.012, 0.013, 0.017, 0.016, 0.018, 0.017, 0.016, 0.015, 0.012, 0.013, 0.017, 0.016]
        },
        {
          name: '实际节能指标',
          type: 'line',
          data: [0.007, 0.009, 0.015, 0.005, 0.007, 0.012, 0.013, 0.019, 0.007, 0.009, 0.015, 0.005]
        },
        {
          name: '计划节能指标',
          type: 'line',
          data: [0.005, 0.012, 0.01, 0.012, 0.013, 0.018, 0.016, 0.012, 0.005, 0.012, 0.01, 0.012]
        }
      ]
    })
    fetch('get', api.getHomeData, {}).then((res) => {
      this.data = res.data
      this.strucPie = res.pie1.seriesData
      this.costPie = res.pie2.seriesData
    })
  },
  computed: {
    realTimeToday () {
      return moment().format('MMMM') + this.sectionToChinese(moment().format('D')) + '日'
    }
  },
  methods: {
    sectionToChinese(section) {
      let chnNumChar = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']
      let chnUnitChar = ['', '十', '百', '千']
      let strIns = ''
      let chnStr = ''
      var unitPos = 0
      var zero = true
      while (section > 0) {
        var v = section % 10
        if (v === 0) {
          if (!zero) {
            zero = true
            chnStr = chnNumChar[v] + chnStr
          }
        } else {
          zero = false
          strIns = chnNumChar[v]
          strIns += chnUnitChar[unitPos]
          chnStr = strIns + chnStr
        }
        unitPos++
        section = Math.floor(section / 10)
      }
      return chnStr
    }
  }
}
</script>
<style scoped lang="stylus">
  @import "~common/stylus/variable.styl"
  @import "~common/stylus/mixin.styl"
  .home-container
    position: absolute
    top: 0
    left: 0
    width: 100%
    bottom: 0
    overflow: auto
    -webkit-overflow-scrolling: touch
    .home
      background: $color-sub-text
      display: flex
      flex-direction: column
      min-height: 100%
      min-width: 600px
      @media (max-width: 992px)
        .panel-c
          .panel-box
            margin: 0 10px!important
        .chart
          .energy-box
            padding: 10px
        .real-time
          .cost
            margin-left: 10px!important
      .panels
        .panel-l
          .panel-box
            margin: 10px
        .panel-c
          .panel-box
            margin: 10px 0 10px 0
        .panel-r
          .panel-box
            margin: 10px
        .panel-l,.panel-c,.panel-r
          display: flex
          .panel-box
            display: flex
            flex-direction: column
            padding: 0 10px 10px 10px
            background: #fff
            border-radius: 5px
            flex: 1
      .real-time
        .dosage
          margin: 0 10px 10px 10px
          min-height: 250px
          display: flex
          background: $color-background
          padding: 5px
          border-radius: 5px
          justify-content: flex-start
        .cost
          margin: 0 10px 10px 0
          min-height: 250px
          display: flex
          background: $color-background
          padding: 5px
          border-radius: 5px
          justify-content: flex-end
      .chart
        flex: 1
        margin-bottom: 10px
        .analyze
          margin: 0 10px
          display: flex
          background: $color-background
          padding: 5px
          border-radius: 5px
          justify-content: flex-start
          height: 100%
          min-height: 250px
        .energy
          min-height: 250px
          height: 100%
          display: flex
          background: $color-background
          padding: 5px
          border-radius: 5px
          justify-content: flex-start
        .fee
          margin: 0 10px
          min-height: 250px
          height: 100%
          display: flex
          background: $color-background
          padding: 5px
          border-radius: 5px
          justify-content: flex-start
</style>
