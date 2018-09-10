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
      <div class="panel-box">
        <data-panel-title :title="lastMonth + '集团能源用量信息'"></data-panel-title>
        <div class="panel row">
          <div class="col-xs-12">
            <data-panel
              class="border-right"
              title="能源消耗总量"
              data="10.3514"
              unit="万吨标煤"
              tongbiData="20.28%"
              tongbiStatus="down"
              huanbiData="2.73%"
              huanbiStatus="up"
              showType="column"
            ></data-panel>
          </div>
          <div class="col-xs-12">
            <data-panel
              class="border-right"
              title="电量"
              data="373709.5"
              unit="万千瓦时"
              tongbiData="20.28%"
              tongbiStatus="down"
              huanbiData="2.73%"
              huanbiStatus="up"
              showType="column"
            ></data-panel>
          </div>
          <div class="col-xs-12">
            <data-panel
              class="border-right"
              title="热量"
              data="10.3514"
              unit="吉焦"
              tongbiData="20.28%"
              tongbiStatus="down"
              huanbiData="2.73%"
              huanbiStatus="up"
              showType="column"
            ></data-panel>
          </div>
          <div class="col-xs-12">
            <data-panel
              class="border-right"
              title="水量"
              data="3214"
              unit="吨"
              tongbiData="20.28%"
              tongbiStatus="down"
              huanbiData="2.73%"
              huanbiStatus="up"
              showType="column"
            ></data-panel>
          </div>
          <div class="col-xs-12">
            <data-panel
              class="border-right"
              title="天然气量"
              data="15826.5"
              unit="万立方米"
              tongbiData="20.28%"
              tongbiStatus="down"
              huanbiData="2.73%"
              huanbiStatus="up"
              showType="column"
            ></data-panel>
          </div>
          <div class="col-xs-12">
            <data-panel
              class="border-right"
              title="原煤量"
              data="611262.1"
              unit="吨"
              tongbiData="20.28%"
              tongbiStatus="down"
              huanbiData="2.73%"
              huanbiStatus="up"
              showType="column"
            ></data-panel>
          </div>
          <div class="col-xs-12">
            <data-panel
              title="清洁能源"
              data="4586"
              unit="吨标煤"
              tongbiData="20.28%"
              tongbiStatus="down"
              huanbiData="2.73%"
              huanbiStatus="up"
              showType="column"
            ></data-panel>
          </div>
        </div>
      </div>
      <div class="panel-box">
        <data-panel-title :title="lastMonth + '集团能源费用信息'"></data-panel-title>
        <div class="panel row">
          <div class="col-xs-12">
            <data-panel
              class="border-right"
              title="能源总费用"
              data="461107.7"
              unit="万元"
              tongbiData="20.28%"
              tongbiStatus="down"
              huanbiData="2.73%"
              huanbiStatus="up"
              showType="column"
            ></data-panel>
          </div>
          <div class="col-xs-12">
            <data-panel
              class="border-right"
              title="电费"
              data="168483.9"
              unit="万元"
              tongbiData="20.28%"
              tongbiStatus="down"
              huanbiData="2.73%"
              huanbiStatus="up"
              showType="column"
            ></data-panel>
          </div>
          <div class="col-xs-12">
            <data-panel
              class="border-right"
              title="热量费"
              data="48019.5"
              unit="万元"
              tongbiData="20.28%"
              tongbiStatus="down"
              huanbiData="2.73%"
              huanbiStatus="up"
              showType="column"
            ></data-panel>
          </div>
          <div class="col-xs-12">
            <data-panel
              class="border-right"
              title="水费"
              data="9420.6"
              unit="万元"
              tongbiData="20.28%"
              tongbiStatus="down"
              huanbiData="2.73%"
              huanbiStatus="up"
              showType="column"
            ></data-panel>
          </div>
          <div class="col-xs-12">
            <data-panel
              class="border-right"
              title="天然气费"
              data="37430.0"
              unit="万元"
              tongbiData="20.28%"
              tongbiStatus="down"
              huanbiData="2.73%"
              huanbiStatus="up"
              showType="column"
            ></data-panel>
          </div>
          <div class="col-xs-12">
            <data-panel
              class="border-right"
              title="原煤费"
              data="1371.1"
              unit="万元"
              tongbiData="20.28%"
              tongbiStatus="down"
              huanbiData="2.73%"
              huanbiStatus="up"
              showType="column"
            ></data-panel>
          </div>
          <div class="col-xs-12">
            <div class="sample-data-panel">
              <data-panel
                title="柴油费"
                data="8047.2"
                unit="万元"
                showBi="hide"
              ></data-panel>
            </div>
            <div class="sample-data-panel">
              <data-panel
                title="其他费"
                data="6659.2"
                unit="万元"
                showBi="hide"
              ></data-panel>
            </div>
          </div>
        </div>
      </div>
      <div class="row top-10">
        <div class="col-lg-4 col-md-12 col-xs-12">
          <chart-pie class="quantity" ref="fee"
                     :titleText="lastMonth + '电量占比'"
                     :radius="quantityChartRadius"
                     :data="strucPie1"
                     postion="inside"></chart-pie>
        </div>
        <div class="col-lg-8 col-md-12 col-xs-12 fee-box">
          <chart-pie class="fee" ref="fee"
                     :titleText="lastMonth + '电费用占比'"
                     :radius="feeChartRadius"
                     :data="strucPie2"
                     postion="inside"></chart-pie>
        </div>
      </div>
      <div class="panel-box">
        <chart-bar-line class="energy" ref="energy"
                        :legendData="legendData"
                        :series="seriesData"
                        :xAxisData="xAxisData1"
                        :yAxis="yAxis"
                        titleText="能源用量与节能指标同比分析"></chart-bar-line>
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
      strucPie1: [],
      strucPie2: [],
      legendData: [],
      seriesData: [],
      valueMonth: '',
      options1: [{
        value: 'd',
        label: '电'
      }, {
        value: 's',
        label: '水'
      }, {
        value: 'rl',
        label: '热力'
      }, {
        value: 'trq',
        label: '天然气'
      }, {
        value: 'ym',
        label: '原煤'
      }, {
        value: 'nyxhzl',
        label: '能源消耗总量'
      }],
      valueYndw: '',
      xAxisData1: ['红旗工厂', '一汽大众', '一汽轿车', '一汽吉林', '新能源汽车', '长春丰越', '天津夏利', '天津丰田', '一汽通用(长春)', '四川丰田(成都)', '一汽解放', '一汽客车'],
      yAxis: [{name: '千瓦时', min: 0.0, max: 50.0, interval: 10.0},
        {name: '万元', min: 0.00, max: 0.05, interval: 0.01}]
    }
  },
  created() {
    setTimeout(() => {
      this.strucPie1 = [{value: 274, name: '零部件、物流研发'}, {value: 168, name: '整车制造'}]
      this.strucPie2 = [{value: 274, name: '水'}, {value: 168, name: '其他', othersData: [{value: 55.3, name: '一汽解放'}, {value: 38.9, name: '天津丰田'}, {value: 5.8, name: '天津夏利'}, {value: 3, name: '长春丰越'}, {value: 2, name: '一汽通用'}]}, {value: 335, name: '高温水'}, {value: 235, name: '原煤'}, {value: 310, name: '天然气'}, {value: 400, name: '电'}]
      this.legendData = ['上年同期电量', '实际电量', '计划电量', '上年同期费用', '实际费用', '计划费用']
      this.seriesData = [
        {
          name: '上年同期电量',
          type: 'bar',
          data: [20.0, 25.0, 22.0, 21.0, 25.0, 27.0, 29.0, 27.0, 20.0, 25.0, 22.0, 21.0],
          reality: '0'
        },
        {
          name: '实际电量',
          type: 'bar',
          data: [19.0, 31.0, 19.0, 27.0, 25.0, 31.0, 20.0, 17.0, 26.0, 31.0, 25.0, 27.0],
          reality: '1'
        },
        {
          name: '计划电量',
          type: 'bar',
          data: [28.0, 21.0, 28.0, 28.0, 28.0, 32.0, 28.0, 22.0, 28.0, 41.0, 28.0, 28.0],
          reality: '0'
        },
        {
          name: '上年同期费用',
          type: 'line',
          data: [0.012, 0.013, 0.017, 0.016, 0.018, 0.017, 0.016, 0.015, 0.012, 0.013, 0.017, 0.016]
        },
        {
          name: '实际费用',
          type: 'line',
          data: [0.007, 0.009, 0.015, 0.005, 0.007, 0.012, 0.013, 0.019, 0.007, 0.009, 0.015, 0.005]
        },
        {
          name: '计划费用',
          type: 'line',
          data: [0.005, 0.012, 0.01, 0.012, 0.013, 0.018, 0.016, 0.012, 0.005, 0.012, 0.01, 0.012]
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
    .row
      &.top-10
        margin-top: 10px
    .cost-info
      background: $color-sub-text
      display: flex
      flex-direction: column
      min-height: 100%
      min-width: 600px
      @media (max-width: 992px)
        .fee-box
          padding: 10px 0 0 10px!important
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
      .panel-box
        margin: 10px 10px 0px 10px
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
        margin: 0 10px
        min-height: 250px
        position: relative
        height: 100%
        border-radius: 5px
      .fee
        background: #fff
        margin-right: 10px
        min-height: 250px
        position: relative
        height: 100%
        border-radius: 5px
</style>
