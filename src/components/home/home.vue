<template>
  <scroll class="home-container">
    <div class="home">
      <div class="panels row">
        <div class="panel-l col-lg-5 col-md-12 col-xs-12">
          <div class="panel-box">
            <data-panel-title title="三月能源绩效" link="/all-cost"></data-panel-title>
            <div class="panel row">
              <div class="col-md-6 col-xs-12">
                <data-panel
                  class="border-right border-bottom"
                  title="产值综合能耗"
                  :data="data.czzhnh"
                  unit="吨标煤/万元"
                  :tongbiData="data.czzhnh_tb"
                  :tongbiStatus="data.czzhnh_tb > 0 ? 'up' : 'down'"
                  :huanbiData="data.czzhnh_hb"
                  :huanbiStatus="data.czzhnh_hb > 0 ? 'up' : 'down'"
                ></data-panel>
              </div>
              <div class="col-md-6 col-xs-12">
                <data-panel
                  class="border-bottom"
                  title="单车能源费用"
                  :data="data.je_d"
                  unit="元/辆"
                  :tongbiData="data.je_d_tb"
                  :tongbiStatus="data.je_d_tb > 0 ? 'up' : 'down'"
                  :huanbiData="data.je_d_hb"
                  :huanbiStatus="data.je_d_hb > 0 ? 'up' : 'down'"
                ></data-panel>
              </div>
            </div>
            <div class="panel row">
              <div class="col-md-6 col-xs-12">
                <data-panel
                  class="border-right"
                  title="单车综合标煤"
                  :data="data.zhnh_d"
                  unit="吨标煤/辆"
                  :tongbiData="data.zhnh_d_tb"
                  :tongbiStatus="data.zhnh_d_tb > 0 ? 'up' : 'down'"
                  :huanbiData="data.zhnh_d_hb"
                  :huanbiStatus="data.zhnh_d_hb > 0 ? 'up' : 'down'"
                ></data-panel>
              </div>
              <div class="col-md-6 col-xs-12">
                <data-panel
                  title="单车碳排放量"
                  :data="data.tan_d"
                  unit="KGCO2/辆"
                  :tongbiData="data.tan_d_tb"
                  :tongbiStatus="data.tan_d_tb > 0 ? 'up' : 'down'"
                  :huanbiData="data.tan_d_hb"
                  :huanbiStatus="data.tan_d_hb > 0 ? 'up' : 'down'"
                ></data-panel>
              </div>
            </div>
          </div>
        </div>
        <div class="panel-c col-lg-2 col-md-12 col-xs-12">
          <div class="panel-box">
            <data-panel-title title="三月清洁能源用量"></data-panel-title>
            <div class="panel row">
              <div class="col-md-12 col-xs-12">
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
              <div class="col-md-12 col-xs-12">
                <flip-panel title="光伏发电实时量(小时)">
                </flip-panel>
              </div>
            </div>
          </div>
        </div>
        <div class="panel-r col-lg-5 col-md-12 col-xs-12">
          <div class="panel-box">
            <data-panel-title title="三月能耗信息" link="/cost-info"></data-panel-title>
            <div class="panel row">
              <div class="col-md-6 col-xs-12">
                <data-panel
                  class="border-right border-bottom"
                  title="生产产量"
                  :data="data.cl"
                  unit="万辆"
                  :tongbiData="data.cl_tb"
                  :tongbiStatus="data.cl_tb > 0 ? 'up' : 'down'"
                  :huanbiData="data.cl_hb"
                  :huanbiStatus="data.cl_hb > 0 ? 'up' : 'down'"
                ></data-panel>
              </div>
              <div class="col-md-6 col-xs-12">
                <data-panel
                  class="border-bottom"
                  title="能源用量"
                  :data="data.nh"
                  unit="万吨标煤"
                  :tongbiData="data.nh_tb"
                  :tongbiStatus="data.nh_tb > 0 ? 'up' : 'down'"
                  :huanbiData="data.nh_hb"
                  :huanbiStatus="data.nh_hb > 0 ? 'up' : 'down'"
                ></data-panel>
              </div>
            </div>
            <div class="panel row">
              <div class="col-md-6 col-xs-12">
                <data-panel
                  class="border-right"
                  title="碳排放量"
                  :data="data.tan"
                  unit="吨CO2"
                  :tongbiData="data.tan_tb"
                  :tongbiStatus="data.tan_tb > 0 ? 'up' : 'down'"
                  :huanbiData="data.tan_hb"
                  :huanbiStatus="data.tan_hb > 0 ? 'up' : 'down'"
                ></data-panel>
              </div>
              <div class="col-md-6  col-xs-12">
                <data-panel
                  title="能源费用"
                  :data="data.je"
                  unit="万元"
                  :tongbiData="data.je_tb"
                  :tongbiStatus="data.je_tb > 0 ? 'up' : 'down'"
                  :huanbiData="data.je_hb"
                  :huanbiStatus="data.je_hb > 0 ? 'up' : 'down'"
                ></data-panel>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="real-time row">
        <div class="col-lg-6 col-md-12 col-xs-12">
          <chart-realtime-line class="dosage" ref="dosage"
                               titleText="四月十六能源用量(小时)"
                               yAxisTitle="吨标煤/时"
                               seriesName="能耗"
                               :showArea="showArea"></chart-realtime-line>
        </div>
        <div class="col-lg-6 col-md-12 col-xs-12">
          <chart-realtime-bar class="cost" ref="cost"
                              titleText="四月十六能源费用(小时)"
                              yAxisTitle="万元/时"
                              seriesName="费用"></chart-realtime-bar>
        </div>
      </div>
      <div class="chart row">
        <div class="col-lg-3 col-md-12 col-xs-12">
          <chart-pie class="analyze" ref="analyze"
                     titleText="三月能源消耗结构"
                     roseType="radius"
                     :data="strucPie"
                     :radius="analyzeChartRadius"></chart-pie>
        </div>
        <div class="col-lg-6 col-md-12 col-xs-12">
          <chart-bar-line class="energy" ref="energy"
                          titleText="能源用量与节能指标同比分析"></chart-bar-line>
        </div>
        <div class="col-lg-3 col-md-12 col-xs-12">
          <chart-pie class="fee" ref="fee"
                     titleText="三月能源费用结构"
                     :data="costPie"
                     :radius="feeChartRadius"></chart-pie>
        </div>
      </div>
    </div>
  </scroll>
</template>
<script>
import Scroll from 'base/scroll/scroll'

import DataPanel from 'base/data-panel/data-panel'
import DataPanelTitle from 'base/data-panel-title/data-panel-title'
import FlipPanel from 'base/flip-panel/flip-panel'
import ChartRealtimeLine from 'base/chart-realtime-line/chart-realtime-line'
import ChartRealtimeBar from 'base/chart-realtime-bar/chart-realtime-bar'
import ChartPie from 'base/chart-pie/chart-pie'
import ChartBarLine from 'base/chart-bar-line/chart-bar-line'

import { api } from '@/config'
import fetch from 'utils/fetch'
export default {
  components: {
    Scroll,
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
      analyzeChartRadius: ['13%', '70%'],
      feeChartRadius: ['40%', '70%'],
      showArea: true,
      // 三月能耗绩效数据块数据
      perfDataPanels: [],
      // 三月清洁能源用量数据块数据
      cleanDataPanels: [],
      // 三月能耗信息数据块数据
      infoDataPanels: [],
      // 三月能耗结构
      strucPie: [],
      // 三月能耗费用
      costPie: [],
      // 能耗与节能指标分析
      analyzeBarLine: [],
      data: {}
    }
  },
  created() {
    setTimeout(() => {
      this.strucPie = [{value: 274, name: '水'}, {value: 168, name: '其他'}, {value: 335, name: '高温水'}, {value: 235, name: '原煤'}, {value: 310, name: '天然气'}, {value: 400, name: '电'}]
      this.costPie = [{value: 274, name: '水'}, {value: 168, name: '其他'}, {value: 335, name: '高温水'}, {value: 235, name: '原煤'}, {value: 310, name: '天然气'}, {value: 400, name: '电'}]
    })
//    fetch('get', api.getHomeData, {}).then((res) => {
//      this.data = res.data
//      this.strucPie = res.pie1.seriesData
//      this.costPie = res.pie2.seriesData
//    })
  },
  methods: {
    refreshChart() {
      this.$refs.analyze.refreshChart()
      this.$refs.energy.refreshChart()
      this.$refs.fee.refreshChart()
      this.$refs.dosage.refreshChart()
      this.$refs.cost.refreshChart()
    }
  },
  mounted() {
    window.addEventListener('resize', () => {
      clearTimeout(this.resizeTimer)
      this.resizeTimer = setTimeout(() => {
        this.refreshChart()
      }, 60)
    })
  }
}
</script>
<style scoped lang="stylus">
  @import "~common/stylus/variable.styl"
  @import "~common/stylus/mixin.styl"
  .home-container
    overflow: hidden
    position: absolute
    top: 0
    left: 0
    right: 0
    bottom: 0
    .home
      background: $color-sub-text
      display: flex
      flex-direction: column
      min-height: 100%
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
            .panel
              flex: 1
      .real-time
        .dosage
          margin: 0 5px 10px 10px
          min-height: 250px
          display: flex
          background: $color-background
          padding: 5px
          border-radius: 5px
          justify-content: flex-start
        .cost
          margin: 0 10px 10px 5px
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
