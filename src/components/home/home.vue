<template>
  <div class="home-container">
    <div class="home">
      <div class="row">
        <div class="panel col-lg-4-4 col-md-12 col-box">
          <div class="panel-box">
            <data-panel-title :title="lastMonth + '能源绩效'" link="/zhnh"></data-panel-title>
            <div class="row">
              <data-panel
                class="border-right border-bottom"
                title="产值综合能耗"
                :data="data.czzhnh"
                unit="吨标煤/万元"
                :tongbiData="data.czzhnh_tb"
                :huanbiData="data.czzhnh_hb"
              ></data-panel>
              <data-panel
                class="border-bottom"
                title="单车能源费用"
                :data="data.je_d"
                unit="元/辆"
                :tongbiData="data.je_d_tb"
                :huanbiData="data.je_d_hb"
              ></data-panel>
            </div>
            <div class="row">
              <data-panel
                class="border-right"
                title="单车综合标煤"
                :data="data.zhnh_d"
                unit="吨标煤/辆"
                :tongbiData="data.zhnh_d_tb"
                :huanbiData="data.zhnh_d_hb"
              ></data-panel>
              <data-panel
                title="单车碳排放量"
                :data="data.tan_d"
                unit="kgCO<sub>2</sub>/辆"
                :tongbiData="data.tan_d_tb"
                :huanbiData="data.tan_d_hb"
              ></data-panel>
            </div>
          </div>
        </div>
        <div class="panel col-lg-4-2 col-md-12 col-box-top-bottom">
          <div class="panel-box">
            <data-panel-title :title="lastMonth + '清洁能源用量'"></data-panel-title>
            <data-panel
              class="border-bottom"
              title="清洁能源"
              data="4586"
              unit="吨标煤"
              tongbiData="-12.2"
              huanbiData="6.7"
            ></data-panel>
            <flip-panel title="光伏发电实时量(小时)">
            </flip-panel>
          </div>
        </div>
        <div class="panel col-lg-4-4 col-md-12 col-box">
          <div class="panel-box">
            <data-panel-title :title="lastMonth + '能耗信息'" link="/nyylfy"></data-panel-title>
            <div class="row">
              <data-panel
                class="border-right border-bottom"
                title="生产产量"
                :data="data.cl"
                unit="万辆"
                :tongbiData="data.cl_tb"
                :huanbiData="data.cl_hb"
              ></data-panel>
              <data-panel
                class="border-bottom"
                title="能源用量"
                :data="data.nh"
                unit="万吨标煤"
                :tongbiData="data.nh_tb"
                :huanbiData="data.nh_hb"
              ></data-panel>
            </div>
            <div class="row">
              <data-panel
                class="border-right"
                title="碳排放量"
                :data="data.tan"
                unit="吨CO<sub>2</sub>"
                :tongbiData="data.tan_tb"
                :huanbiData="data.tan_hb"
              ></data-panel>
              <data-panel
                title="能源费用"
                :data="data.je"
                unit="万元"
                :tongbiData="data.je_tb"
                :huanbiData="data.je_hb"
              ></data-panel>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-6 col-md-12 col-box-left">
          <chart-realtime-line class="chart-box"
                               :titleText="realTimeToday + '能源用量(小时)'"
                               yAxisTitle="吨标煤/时"
                               seriesName="能耗"
                               :showArea="showArea"></chart-realtime-line>
        </div>
        <div class="col-lg-6 col-md-12 col-box-right">
          <chart-realtime-bar class="chart-box"
                              :titleText="realTimeToday + '能源费用(小时)'"
                              yAxisTitle="万元/时"
                              seriesName="费用"></chart-realtime-bar>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-3 col-md-12 col-box">
          <chart-pie class="chart-box"
                     :titleText="lastMonth + '能源消耗结构'"
                     :seriesData="strucPie"
                     :radius="analyzeChartRadius"></chart-pie>
        </div>
        <div class="col-lg-6 col-md-12 col-box-top-bottom">
          <chart-bar-line class="chart-box"
                          :legendData="jnBar.legendData"
                          :series="jnBar.series"
                          :xAxisData="jnBar.xAxisData"
                          :yAxis="y"
                          :titleText="lastMonth + '能源用量与节能指标同比分析'"></chart-bar-line>
        </div>
        <div class="col-lg-3 col-md-12 col-box">
          <chart-pie class="chart-box"
                     :titleText="lastMonth + '能源费用结构'"
                     :seriesData="costPie"
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
      analyzeChartRadius: ['13%', '60%'],
      feeChartRadius: ['30%', '60%'],
      showArea: true,
      // 三月能耗结构
      strucPie: [],
      // 三月能耗费用
      costPie: [],
      data: {},
      legendData: [],
      seriesData: [],
      lastMonth: moment().subtract(1, 'months').format('MMMM'),
      jnBar: {}
    }
  },
  created() {
    fetch('get', api.getHomeData, {}).then((res) => {
      this.data = res.data
      this.strucPie = res.pie1.seriesData
      this.costPie = res.pie2.seriesData
    }).catch(() => {
      this.data = {}
      this.strucPie = []
      this.costPie = []
    })
    fetch('get', api.queryShouYeNhJn, {}).then((res) => {
      this.y = [{name: '吨标煤'}, {name: '吨标煤/万元'}]
      this.jnBar = res.data
    }).catch(() => {
      this.jnBar = {}
    })
  },
  computed: {
    realTimeToday () {
      return moment().format('MMMM') + this.sectionToChinese(moment().format('D')) + '日'
    }
  },
  methods: {
    sectionToChinese(section) {
      let chinese = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']
      let len = ['十']
      // 对特殊情况进行处理.
      section = section + ''
      if (section.length === 2) {
        if (section.charAt(0) === '1') {
          if (section.charAt(1) === '0') return len[0]
          return len[0] + chinese[section.charAt(1)]
        }
        if (section.charAt(1) === '0') return chinese[section.charAt(0)] + len[0]
        return chinese[section.charAt(0)] + len[0] + chinese[section.charAt(1)]
      }
      return this.num2chinese(section)
    },
    num2chinese(section) {
      let chinese = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']
      var result = ''
      for (var i = 0; i < section.length; i++) {
        result += chinese[section.charAt(i)]
      }
      return result
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
      min-width: 600px
</style>
