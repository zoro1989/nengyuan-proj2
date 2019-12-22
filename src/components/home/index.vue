<template>
  <div class="home-container">
    <div class="info">
      <div class="row">
        <div class="panel col-lg-4-4 col-md-12 col-box">
          <div class="panel-box home">
            <data-panel-title :title="lastMonth + '能源绩效'" link="/home/ss/zhnh"></data-panel-title>
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
                :isMathRound="true"
                unit="元/辆"
                :tongbiData="data.je_d_tb"
                :huanbiData="data.je_d_hb"
              ></data-panel>
            </div>
            <div class="row">
              <data-panel
                class="border-right"
                title="单车综合能耗"
                :data="data.zhnh_d"
                unit="吨标煤/辆"
                :tongbiData="data.zhnh_d_tb"
                :huanbiData="data.zhnh_d_hb"
              ></data-panel>
              <data-panel
                title="单车碳排放量"
                :data="data.tan_d"
                :isMathRound="true"
                unit="kgCO<sub>2</sub>/辆"
                :tongbiData="data.tan_d_tb"
                :huanbiData="data.tan_d_hb"
              ></data-panel>
            </div>
          </div>
        </div>
        <div class="panel col-lg-4-2 col-md-12 col-box-top-bottom">
          <div class="panel-box home flip-box">
            <data-panel-title :title="lastMonth + '清洁能源用量'"></data-panel-title>
            <div class="row">
              <data-panel
                class="border-bottom"
                title="清洁能源"
                :isLinear="true"
                :data="0"
                unit="吨标煤"
                :tongbiData="-0"
                :huanbiData="0"
              ></data-panel>
            </div>
            <div class="row">
              <flip-panel title="光伏发电实时量(小时)">
              </flip-panel>
            </div>
          </div>
        </div>
        <div class="panel col-lg-4-4 col-md-12 col-box">
          <div class="panel-box home">
            <data-panel-title :title="lastMonth + '能耗信息'" link="/home/ss/nyylfy"></data-panel-title>
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
                :isMathRound="true"
                unit="吨CO<sub>2</sub>"
                :tongbiData="data.tan_tb"
                :huanbiData="data.tan_hb"
              ></data-panel>
              <data-panel
                title="能源费用"
                :data="data.je"
                :isMathRound="true"
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
                               yAxisTitle="吨标煤"
                               seriesName="能耗"
                               :isXiazuan="true"
                               :xAxisData="ny.xAxisData"
                               :seriesData="ny.seriesData"
                               :showArea="showArea"></chart-realtime-line>
        </div>
        <div class="col-lg-6 col-md-12 col-box-right">
          <chart-realtime-bar class="chart-box"
                              :titleText="realTimeToday + '能源费用(小时)'"
                              yAxisTitle="千元"
                              :isXiazuan="true"
                              :xAxisData="fy.xAxisData"
                              :seriesData="fy.seriesData"
                              seriesName="费用"></chart-realtime-bar>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-3 col-md-12 col-box">
          <chart-pie class="chart-box"
                     :isHome="true"
                     :titleText="lastMonth + '能源消耗结构'"
                     :seriesData="strucPie"
                     :radius="analyzeChartRadius"></chart-pie>
        </div>
        <div class="col-lg-6 col-md-12 col-box-top-bottom">
          <chart-bar-line class="chart-box"
                          :legendData="jnBar.legendData"
                          :series="jnBar.series"
                          :xAxisData="jnBar.xAxisData"
                          :isHome="true"
                          :yAxis="y"
                          :titleText="lastMonth + '能源用量与节能指标对比分析'"></chart-bar-line>
        </div>
        <div class="col-lg-3 col-md-12 col-box">
          <chart-pie class="chart-box"
                     :isHome="true"
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
        analyzeChartRadius: ['13%', '50%'],
        feeChartRadius: ['30%', '50%'],
        showArea: true,
        // 三月能耗结构
        strucPie: [],
        // 三月能耗费用
        costPie: [],
        data: {},
        y: [{name: '万吨标煤'}, {name: '吨标煤/万元'}],
        jnBar: {},
        ny: {},
        fy: {}
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
        this.jnBar = res.data
      }).catch(() => {
        this.jnBar = {}
      })
      fetch('get', api.hourNy, {}).then((res) => {
        this.ny = res.data.ny
        this.fy = res.data.fy
      }).catch(() => {
        this.ny = {}
        this.fy = {}
      })
    },
    computed: {
      realTimeToday () {
        return moment().format('MMMM') + this.sectionToChinese(moment().format('D')) + '日'
      },
      lastMonth() {
        return this.sectionToChinese(this.data.yue) + '月'
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
    .info
      background-image: $color-background-linear
      min-width: 600px
      .panel-box
        border-radius: 60px
</style>
