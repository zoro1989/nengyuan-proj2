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
            placeholder="选择月">
          </el-date-picker>
          <span class="picker-txt">用能单位</span>
          <el-select v-model="valueYndw" placeholder="请选择" size="mini">
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
                  data="0.0321"
                  unit="吨标煤/万元"
                  tongbiData="53.94%"
                  tongbiStatus="down"
                  huanbiData="23.94%"
                  huanbiStatus="down"
                  showType="column"
                ></data-panel>
              </div>
              <div class="col-md-4 col-xs-12">
                <data-panel
                  class="border-bottom"
                  title="产值碳排放量"
                  data="1665"
                  unit="kgCO<sub>2</sub>/万元"
                  tongbiData="58.94%"
                  tongbiStatus="down"
                  huanbiData="2.96%"
                  huanbiStatus="up"
                  showType="column"
                ></data-panel>
              </div>
              <div class="col-md-4 col-xs-12">
                <data-panel
                  class="border-left border-bottom"
                  title="产值耗电量"
                  data="1665"
                  unit="千瓦时/万元"
                  tongbiData="58.94%"
                  tongbiStatus="down"
                  huanbiData="2.96%"
                  huanbiStatus="up"
                  showType="column"
                ></data-panel>
              </div>
            </div>
            <div class="panel row">
              <div class="col-md-4 col-xs-12">
                <data-panel
                  class="border-right"
                  title="产值耗天然气量"
                  data="0.442"
                  unit="立方米/万元"
                  tongbiData="7.94%"
                  tongbiStatus="down"
                  huanbiData="58.94%"
                  huanbiStatus="down"
                  showType="column"
                ></data-panel>
              </div>
              <div class="col-md-4 col-xs-12">
                <data-panel
                  title="产值耗水量"
                  data="101.58"
                  unit="升（水）/万元"
                  tongbiData="2.54%"
                  tongbiStatus="up"
                  huanbiData="2.96%"
                  huanbiStatus="up"
                  showType="column"
                ></data-panel>
              </div>
              <div class="col-md-4 col-xs-12">
                <data-panel
                  title="产值耗热量"
                  class="border-left"
                  data="101.58"
                  unit="吉焦/万元"
                  tongbiData="2.54%"
                  tongbiStatus="up"
                  huanbiData="2.96%"
                  huanbiStatus="up"
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
                  data="22.9788"
                  unit="吨标煤/辆"
                  tongbiData="212.2%"
                  tongbiStatus="down"
                  huanbiData="2.48%"
                  huanbiStatus="down"
                  showType="column"
                ></data-panel>
              </div>
              <div class="col-md-3 col-xs-12">
                <data-panel
                  class="border-right border-bottom"
                  title="单车碳排放量"
                  data="10.3514"
                  unit="kgco2/辆"
                  tongbiData="20.28%"
                  tongbiStatus="down"
                  huanbiData="2.73%"
                  huanbiStatus="up"
                  showType="column"
                ></data-panel>
              </div>
              <div class="col-md-3 col-xs-12">
                <data-panel
                  class="border-right border-bottom"
                  title="单车耗电量"
                  data="10.3514"
                  unit="千瓦时/辆"
                  tongbiData="20.28%"
                  tongbiStatus="down"
                  huanbiData="2.73%"
                  huanbiStatus="up"
                  showType="column"
                ></data-panel>
              </div>
              <div class="col-md-3 col-xs-12">
                <data-panel
                  class="border-bottom"
                  title="乘用车单车能源费用"
                  data="10.3514"
                  unit="元/辆"
                  tongbiData="20.28%"
                  tongbiStatus="down"
                  huanbiData="2.73%"
                  huanbiStatus="up"
                  showType="column"
                ></data-panel>
              </div>
            </div>
            <div class="panel row">
              <div class="col-md-3 col-xs-12">
                <data-panel
                  class="border-right"
                  title="单车耗水量"
                  data="33.30"
                  unit="吉焦/万元"
                  tongbiData="56.2%"
                  tongbiStatus="down"
                  huanbiData="34.7%"
                  huanbiStatus="up"
                  showType="column"
                ></data-panel>
              </div>
              <div class="col-md-3 col-xs-12">
                <data-panel
                  class="border-right"
                  title="单车耗天然气量"
                  data="37434.71"
                  unit="立方米/辆"
                  tongbiData="17.68%"
                  tongbiStatus="down"
                  huanbiData="1.32%"
                  huanbiStatus="up"
                  showType="column"
                ></data-panel>
              </div>
              <div class="col-md-3 col-xs-12">
                <data-panel
                  class="border-right"
                  title="单车耗热量"
                  data="37434.71"
                  unit="吉焦/辆"
                  tongbiData="17.68%"
                  tongbiStatus="down"
                  huanbiData="1.32%"
                  huanbiStatus="up"
                  showType="column"
                ></data-panel>
              </div>
              <div class="col-md-3 col-xs-12">
                <data-panel
                  title="中重型车单车能源费用"
                  data="37434.71"
                  unit="元/辆"
                  tongbiData="17.68%"
                  tongbiStatus="down"
                  huanbiData="1.32%"
                  huanbiStatus="up"
                  showType="column"
                ></data-panel>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="panel-box">
        <chart-bar-line class="energy" ref="energy"
                        :legendData="legendData"
                        :series="seriesData1"
                        :xAxisData="xAxisData1"
                        :titleText="lastMonth + '整车制造产值综合能耗'"></chart-bar-line>
      </div>
      <div class="panel-box">
        <chart-bar-line class="energy" ref="energy"
                        :legendData="legendData"
                        :series="seriesData2"
                        :xAxisData="xAxisData2"
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
      quantityChartRadius: [0, '70%'],
      feeChartRadius: [0, '70%'],
      legendData: [],
      seriesData: [],
      valueMonth: '',
      options1: [{
        value: 'czzhnh',
        label: '产值综合能耗'
      }, {
        value: 'cztpfl',
        label: '产值碳排放量'
      }, {
        value: 'czhdl',
        label: '产值耗电量'
      }, {
        value: 'cztrql',
        label: '产值耗天然气量'
      }, {
        value: 'czhsl',
        label: '产值耗水量'
      }, {
        value: 'czhrl',
        label: '产值耗热量'
      }, {
        value: 'dczhnh',
        label: '单车综合能耗'
      }, {
        value: 'dctpfl',
        label: '单车碳排放量'
      }],
      valueYndw: '',
      xAxisData1: ['红旗工厂', '一汽大众', '一汽轿车', '一汽吉林', '新能源汽车', '长春丰越', '天津夏利', '天津丰田', '一汽通用(长春)', '四川丰田(成都)', '一汽解放', '一汽客车'],
      xAxisData2: ['一汽富维', '一汽模具', '一汽锻造', '一汽铸造', '长春丰田', '天津丰田', '一汽物流']
    }
  },
  created() {
    setTimeout(() => {
      this.legendData = ['上年同期指标', '实际指标', '计划指标', '达标率']
      this.seriesData1 = [
        {
          name: '上年同期指标',
          type: 'bar',
          data: [20.0, 25.0, 22.0, 21.0, 25.0, 27.0, 29.0, 27.0, 20.0, 25.0, 22.0, 21.0],
          reality: '0'
        },
        {
          name: '实际指标',
          type: 'bar',
          data: [19.0, 31.0, 19.0, 27.0, 25.0, 31.0, 20.0, 17.0, 26.0, 31.0, 25.0, 27.0],
          reality: '1'
        },
        {
          name: '计划指标',
          type: 'bar',
          data: [28.0, 21.0, 28.0, 28.0, 28.0, 32.0, 28.0, 22.0, 28.0, 41.0, 28.0, 28.0],
          reality: '0'
        },
        {
          name: '达标率',
          type: 'line',
          data: [0.012, 0.013, 0.017, 0.016, 0.018, 0.017, 0.016, 0.015, 0.012, 0.013, 0.017, 0.016]
        }
      ]
      this.seriesData2 = [
        {
          name: '上年同期指标',
          type: 'bar',
          data: [20.0, 25.0, 22.0, 21.0, 25.0, 27.0, 29.0],
          reality: '0'
        },
        {
          name: '实际指标',
          type: 'bar',
          data: [19.0, 31.0, 19.0, 27.0, 25.0, 31.0, 20.0],
          reality: '1'
        },
        {
          name: '计划指标',
          type: 'bar',
          data: [28.0, 21.0, 28.0, 28.0, 28.0, 32.0, 28.0],
          reality: '0'
        },
        {
          name: '达标率',
          type: 'line',
          data: [0.012, 0.013, 0.017, 0.016, 0.018, 0.017, 0.016]
        }
      ]
    })
  },
  methods: {
    onClose() {
      this.$router.replace('/home')
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
      .quantity
        background: #fff
        margin: 10px
        min-height: 250px
        position: relative
        height: 100%
        border-radius: 5px
      .fee
        background: #fff
        margin: 10px 10px 10px 0px
        min-height: 250px
        position: relative
        height: 100%
        border-radius: 5px
</style>
