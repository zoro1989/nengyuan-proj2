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
      <div class="panel-box">
        <data-panel-title :title="lastMonth + '集团能源用量信息'"></data-panel-title>
        <div class="panel row">
          <div class="col-xs-12">
            <data-panel
              class="border-right"
              title="能源消耗总量"
              :data="pData.zhnh"
              unit="万吨标煤"
              :tongbiData="pData.zhnh_tb"
              :huanbiData="pData.zhnh_hb"
              showType="column"
            ></data-panel>
          </div>
          <div class="col-xs-12">
            <data-panel
              class="border-right"
              title="电量"
              :data="pData.d"
              unit="万千瓦时"
              :tongbiData="pData.d_tb"
              :huanbiData="pData.d_hb"
              showType="column"
            ></data-panel>
          </div>
          <div class="col-xs-12">
            <data-panel
              class="border-right"
              title="热量"
              :data="pData.rl"
              unit="吉焦"
              :tongbiData="pData.rl_tb"
              :huanbiData="pData.rl_hb"
              showType="column"
            ></data-panel>
          </div>
          <div class="col-xs-12">
            <data-panel
              class="border-right"
              title="水量"
              :data="pData.s"
              unit="吨"
              :tongbiData="pData.s_tb"
              :huanbiData="pData.s_hb"
              showType="column"
            ></data-panel>
          </div>
          <div class="col-xs-12">
            <data-panel
              class="border-right"
              title="天然气量"
              :data="pData.trq"
              unit="万立方米"
              :tongbiData="pData.trq_tb"
              :huanbiData="pData.trq_hb"
              showType="column"
            ></data-panel>
          </div>
          <div class="col-xs-12">
            <data-panel
              class="border-right"
              title="原煤量"
              :data="pData.m"
              unit="吨"
              :tongbiData="pData.m_tb"
              :huanbiData="pData.m_hb"
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
              :data="pData.zhje"
              unit="万元"
              :tongbiData="pData.zhje_tb"
              :huanbiData="pData.zhje_hb"
              showType="column"
            ></data-panel>
          </div>
          <div class="col-xs-12">
            <data-panel
              class="border-right"
              title="电费"
              :data="pData.dje"
              unit="万元"
              :tongbiData="pData.dje_tb"
              :huanbiData="pData.dje_hb"
              showType="column"
            ></data-panel>
          </div>
          <div class="col-xs-12">
            <data-panel
              class="border-right"
              title="热量费"
              :data="pData.rlje"
              unit="万元"
              :tongbiData="pData.rlje_tb"
              :huanbiData="pData.rlje_hb"
              showType="column"
            ></data-panel>
          </div>
          <div class="col-xs-12">
            <data-panel
              class="border-right"
              title="水费"
              :data="pData.sje"
              unit="万元"
              :tongbiData="pData.sje_tb"
              :huanbiData="pData.sje_hb"
              showType="column"
            ></data-panel>
          </div>
          <div class="col-xs-12">
            <data-panel
              class="border-right"
              title="天然气费"
              :data="pData.trqje"
              unit="万元"
              :tongbiData="pData.trqje_tb"
              :huanbiData="pData.trqje_hb"
              showType="column"
            ></data-panel>
          </div>
          <div class="col-xs-12">
            <data-panel
              class="border-right"
              title="原煤费"
              :data="pData.mje"
              unit="万元"
              :tongbiData="pData.mje_tb"
              :huanbiData="pData.mje_hb"
              showType="column"
            ></data-panel>
          </div>
          <div class="col-xs-12">
            <div class="sample-data-panel">
              <data-panel
                title="柴油费"
                :data="pData.cyje"
                unit="万元"
                showBi="hide"
              ></data-panel>
            </div>
            <div class="sample-data-panel">
              <data-panel
                title="其他费"
                :data="pData.qtje"
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
                     :titleText="lastMonth + chartTitle + '量占比'"
                     :radius="quantityChartRadius"
                     @pieClick="pieClick"
                     :data="pieDl.seriesData"></chart-pie>
        </div>
        <div class="col-lg-8 col-md-12 col-xs-12 fee-box">
          <chart-pie class="fee" ref="fee"
                     :titleText="lastMonth + chartTitle + '费用占比'"
                     :radius="feeChartRadius"
                     :data="pieDf.seriesData"></chart-pie>
        </div>
      </div>
      <div class="panel-box">
        <chart-bar-line class="energy" ref="energy"
                        :legendData="barDb.legendData"
                        :series="barDb.series"
                        :xAxisData="barDb.xAxisData"
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
      strucPie1: [],
      strucPie2: [],
      legendData: [],
      seriesData: [],
      valueMonth: '',
      options1: [{
        value: '33',
        label: '电'
      }, {
        value: '00',
        label: '水'
      }, {
        value: '32',
        label: '热力'
      }, {
        value: '15',
        label: '天然气'
      }, {
        value: '01',
        label: '原煤'
      }, {
        value: '40',
        label: '能源消耗总量'
      }],
      valueYndw: '',
      xAxisData1: ['红旗工厂', '一汽大众', '一汽轿车', '一汽吉林', '新能源汽车', '长春丰越', '天津夏利', '天津丰田', '一汽通用(长春)', '四川丰田(成都)', '一汽解放', '一汽客车'],
      yAxis: [{name: '千瓦时'}, {name: '万元'}],
      pData: {},
      pieDl: {},
      pieDf: {},
      barDb: {},
      dateTime: '',
      lx: '',
      pid: '2',
      chartTitle: '电'
    }
  },
  created() {
//    setTimeout(() => {
//      this.strucPie1 = [{value: 274, name: '零部件、物流研发'}, {value: 168, name: '整车制造'}]
//      this.strucPie2 = [{value: 274, name: '水'}, {value: 168, name: '其他', othersData: [{value: 55.3, name: '一汽解放'}, {value: 38.9, name: '天津丰田'}, {value: 5.8, name: '天津夏利'}, {value: 3, name: '长春丰越'}, {value: 2, name: '一汽通用'}]}, {value: 335, name: '高温水'}, {value: 235, name: '原煤'}, {value: 310, name: '天然气'}, {value: 400, name: '电'}]
//      this.legendData = ['上年同期电量', '实际电量', '计划电量', '上年同期费用', '实际费用', '计划费用']
//      this.seriesData = [
//        {
//          name: '上年同期电量',
//          type: 'bar',
//          data: [20.0, 25.0, 22.0, 21.0, 25.0, 27.0, 29.0, 27.0, 20.0, 25.0, 22.0, 21.0],
//          reality: '0'
//        },
//        {
//          name: '实际电量',
//          type: 'bar',
//          data: [19.0, 31.0, 19.0, 27.0, 25.0, 31.0, 20.0, 17.0, 26.0, 31.0, 25.0, 27.0],
//          reality: '1'
//        },
//        {
//          name: '计划电量',
//          type: 'bar',
//          data: [28.0, 21.0, 28.0, 28.0, 28.0, 32.0, 28.0, 22.0, 28.0, 41.0, 28.0, 28.0],
//          reality: '0'
//        },
//        {
//          name: '上年同期费用',
//          type: 'line',
//          data: [0.012, 0.013, 0.017, 0.016, 0.018, 0.017, 0.016, 0.015, 0.012, 0.013, 0.017, 0.016]
//        },
//        {
//          name: '实际费用',
//          type: 'line',
//          data: [0.007, 0.009, 0.015, 0.005, 0.007, 0.012, 0.013, 0.019, 0.007, 0.009, 0.015, 0.005]
//        },
//        {
//          name: '计划费用',
//          type: 'line',
//          data: [0.005, 0.012, 0.01, 0.012, 0.013, 0.018, 0.016, 0.012, 0.005, 0.012, 0.01, 0.012]
//        }
//      ]
//    })
    this.fetchPanelData()
    this.fetchChartData()
  },
  methods: {
    fetchPanelData() {
      fetch('get', api.queryXinXiList, {dateTime: this.dateTime}).then((res) => {
        this.pData = res.data[0]
      })
    },
    fetchChartData() {
      fetch('get', api.queryNyYLListDl, {dateTime: this.dateTime, lx: this.lx}).then((res) => {
        this.pieDl = res.data
      })
      this.fetchPieData()
      fetch('get', api.queryNyDBList, {dateTime: this.dateTime, lx: this.lx}).then((res) => {
        this.barDb = res.data
      })
    },
    fetchPieData() {
      fetch('get', api.queryNyYLListDf, {dateTime: this.dateTime, lx: this.lx, pid: this.pid}).then((res) => {
        this.pieDf = res.data
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
      let index = this.options1.findIndex((item) => {
        return value === item.value
      })
      if (value === '40') {
        this.chartTitle = '能源消耗总'
      } else {
        this.chartTitle = this.options1[index].label
      }
      this.fetchChartData()
    },
    pieClick(param) {
      if (param.data.name === '整车制造') {
        this.pid = '2'
      } else {
        this.pid = '23'
      }
      this.fetchPieData()
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
