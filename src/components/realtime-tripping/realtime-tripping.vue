<template>
  <scroll class="realtime-tripping-container">
    <div class="realtime-tripping">
      <div class="tripping-title">
        <div class="title-l">
          <span>选择日期</span>
          <select>
            <option>第十四周4.2-4.8</option>
          </select>
          <span>用能单位</span>
          <select>
            <option>单选或多选</option>
          </select>
        </div>
        <div class="title-r">
          <span class="analyze-btn">对比分析</span>
          <span @click="channgeChart('0')"><i class="fa fa-line-chart"></i></span>
          <span @click="channgeChart('1')"><i class="fa fa-bar-chart"></i></span>
          <span><i class="fa fa-times"></i></span>
        </div>
      </div>
      <div class="tripping-content" v-if="showflag === '0'">
        <div class="row">
          <div class="col-lg-6 col-md-12 col-xs-12">
            <chart-realtime-line class="chart-l"
                                 titleText="四月十六能源用量(小时)"
                                 yAxisTitle="吨标煤/时"
                                 seriesName="能耗"
                                 chartColor="#2434e3" key="lineChart"></chart-realtime-line>
          </div>
          <div class="col-lg-6 col-md-12 col-xs-12">
            <chart-realtime-line class="chart-r"
                                 titleText="四月十六能源费用(小时)"
                                 yAxisTitle="万元/时"
                                 seriesName="能耗"
                                 chartColor="#4b50e4"></chart-realtime-line>
          </div>
        </div>
        <div class="sub-title">一汽大众单车日耗</div>
        <div class="row">
          <div class="col-lg-6 col-md-12 col-xs-12">
            <chart-line class="chart-l"
                                 titleText="单车综合能耗"
                                 yAxisTitle="吨标煤"
                                 chartColor="#48daf6"></chart-line>
          </div>
          <div class="col-lg-6 col-md-12 col-xs-12">
            <chart-line class="chart-r"
                        titleText="单车能源费用"
                        yAxisTitle="元/辆"
                        chartColor="#916fe9"></chart-line>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-6 col-md-12 col-xs-12">
            <chart-line class="chart-l"
                        titleText="单车耗电"
                        yAxisTitle="千瓦时/量"
                        chartColor="#916fe9"></chart-line>
          </div>
          <div class="col-lg-6 col-md-12 col-xs-12">
            <chart-line class="chart-r"
                        titleText="单车耗水"
                        yAxisTitle="升/辆"
                        chartColor="#5de49c"></chart-line>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-6 col-md-12 col-xs-12">
            <chart-line class="chart-l"
                        titleText="单车耗热"
                        yAxisTitle="吉焦/辆"
                        chartColor="#ff930f"></chart-line>
          </div>
          <div class="col-lg-6 col-md-12 col-xs-12">
            <chart-line class="chart-r"
                        titleText="单车耗天然气"
                        yAxisTitle="立方米/辆"
                        chartColor="#82828a"></chart-line>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-6 col-md-12 col-xs-12">
            <chart-line class="chart-l"
                        titleText="一汽大众日能源消耗总量"
                        yAxisTitle="吨/标煤"
                        chartColor="#5a63ee"></chart-line>
          </div>
          <div class="col-lg-6 col-md-12 col-xs-12">
            <chart-line class="chart-r"
                        titleText="一汽大众能源消耗总量"
                        yAxisTitle="吨/标煤"
                        chartColor="#916fe9"></chart-line>
          </div>
        </div>
      </div>
      <div class="tripping-content" v-if="showflag === '1'">
        <div class="row">
          <div class="col-lg-6 col-md-12 col-xs-12">
            <chart-realtime-line class="chart-l"
                                 titleText="四月十六能源用量(小时)"
                                 yAxisTitle="吨标煤/时"
                                 seriesName="能耗"
                                 :showArea="showArea" key="barChart"></chart-realtime-line>
          </div>
          <div class="col-lg-6 col-md-12 col-xs-12">
            <chart-realtime-bar class="chart-r"
                                 titleText="四月十六能源费用(小时)"
                                 yAxisTitle="万元/时"
                                 seriesName="能耗"></chart-realtime-bar>
          </div>
        </div>
        <div class="sub-title">一汽大众单车日耗</div>
        <div class="row">
          <div class="col-lg-6 col-md-12 col-xs-12">
            <chart-bar class="chart-l"
                        titleText="单车综合能耗"
                        yAxisTitle="吨标煤"
                        seriesName="能耗"
                        chartColor="#48daf6"></chart-bar>
          </div>
          <div class="col-lg-6 col-md-12 col-xs-12">
            <chart-bar class="chart-r"
                        titleText="单车能源费用"
                        yAxisTitle="元/辆"
                        seriesName="费用"
                        chartColor="#916fe9"></chart-bar>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-6 col-md-12 col-xs-12">
            <chart-bar class="chart-l"
                        titleText="单车耗电"
                        yAxisTitle="千瓦时/量"
                        seriesName="耗电"
                        chartColor="#916fe9"></chart-bar>
          </div>
          <div class="col-lg-6 col-md-12 col-xs-12">
            <chart-bar class="chart-r"
                        titleText="单车耗水"
                        yAxisTitle="升/辆"
                        seriesName="耗水"
                        chartColor="#5de49c"></chart-bar>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-6 col-md-12 col-xs-12">
            <chart-bar class="chart-l"
                        titleText="单车耗热"
                        yAxisTitle="吉焦/辆"
                        seriesName="耗热"
                        chartColor="#ff930f"></chart-bar>
          </div>
          <div class="col-lg-6 col-md-12 col-xs-12">
            <chart-bar class="chart-r"
                        titleText="单车耗天然气"
                        yAxisTitle="立方米/辆"
                        seriesName="耗天然气"
                        chartColor="#82828a"></chart-bar>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-6 col-md-12 col-xs-12">
            <chart-bar class="chart-l"
                        titleText="一汽大众日能源消耗总量"
                        yAxisTitle="吨/标煤"
                        seriesName="能耗总量"
                        chartColor="#5a63ee"></chart-bar>
          </div>
          <div class="col-lg-6 col-md-12 col-xs-12">
            <chart-bar class="chart-r"
                        titleText="一汽大众能源消耗总量"
                        yAxisTitle="吨/标煤"
                        seriesName="能耗总量"
                        chartColor="#916fe9"></chart-bar>
          </div>
        </div>
      </div>
    </div>
  </scroll>
</template>
<script>
import Scroll from 'base/scroll/scroll'

import ChartRealtimeLine from 'base/chart-realtime-line/chart-realtime-line'
import ChartRealtimeBar from 'base/chart-realtime-bar/chart-realtime-bar'
import ChartLine from 'base/chart-line/chart-line'
import ChartBar from 'base/chart-bar/chart-bar'
export default {
  components: {
    Scroll,
    ChartRealtimeLine,
    ChartRealtimeBar,
    ChartLine,
    ChartBar
  },
  data() {
    return {
      showArea: true,
      showflag: '1'
    }
  },
  methods: {
    channgeChart(status) {
      this.showflag = status
    }
  },
  mounted() {

  }
}
</script>
<style scoped lang="stylus">
  @import "~common/stylus/variable.styl"
  @import "~common/stylus/mixin.styl"
  .realtime-tripping-container
    overflow: hidden
    position: absolute
    top: 0
    left: 0
    right: 0
    bottom: 0
    .realtime-tripping
      background: $color-sub-text
      display: flex
      flex-direction: column
      min-height: 100%
      .tripping-title
        margin: 6px
        height: 40px
        line-height: 40px
        background: #fff
        border-radius: 5px
        color: #333
        display: flex
        justify-content: space-between
        padding: 0 10px 0 10px
        .title-r
          .analyze-btn
            background: #899eb6
            color: #fff
            padding: 2px 10px
            border-radius: 3px
            margin-right: 10px
            cursor: pointer
          .fa
            margin: 0 5px
            color: #899eb6
            font-size: $font-size-large
            cursor: pointer
      .tripping-content
        .sub-title
          text-align: center
          margin: 0 0 6px 0
        .chart-l
          min-height: 250px
          background: #fff
          margin: 0 3px 6px 6px
          border-radius: 5px
        .chart-r
          min-height: 250px
          background: #fff
          margin: 0 6px 6px 3px
          border-radius: 5px
</style>
