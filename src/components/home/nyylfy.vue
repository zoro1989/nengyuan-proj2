<template>
  <div class="cost-info-container">
    <div class="cost-info">
      <div class="col-box">
        <select-title title1="选择日期" title2="能源种类">
          <el-date-picker
            slot="title1"
            :clearable="false"
            v-model="dateTime"
            type="month"
            size="mini"
            value-format="yyyy-MM"
            @change="dateChange"
            placeholder="选择月">
          </el-date-picker>
          <el-select
            slot="title2"
            v-model="lx"
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
      <div class="col-box-left-right">
        <div class="panel-box">
          <data-panel-title :title="lastMonth + '集团能源用量信息'"></data-panel-title>
          <div class="row">
            <data-panel
              class="border-right"
              title="能源消耗总量"
              :data="pData.zhnh"
              unit="万吨标煤"
              :tongbiData="pData.zhnh_tb"
              :huanbiData="pData.zhnh_hb"
              showType="column"
              :isMathRound="true"
            ></data-panel>
            <data-panel
              class="border-right"
              title="电量"
              :data="pData.d"
              unit="万千瓦时"
              :tongbiData="pData.d_tb"
              :huanbiData="pData.d_hb"
              showType="column"
              :isMathRound="true"
            ></data-panel>
            <data-panel
              class="border-right"
              title="热量"
              :data="pData.rl"
              unit="吉焦"
              :tongbiData="pData.rl_tb"
              :huanbiData="pData.rl_hb"
              showType="column"
              :isMathRound="true"
            ></data-panel>
            <data-panel
              class="border-right"
              title="水量"
              :data="pData.s"
              unit="吨"
              :tongbiData="pData.s_tb"
              :huanbiData="pData.s_hb"
              showType="column"
              :isMathRound="true"
            ></data-panel>
            <data-panel
              class="border-right"
              title="天然气量"
              :data="pData.trq"
              unit="万立方米"
              :tongbiData="pData.trq_tb"
              :huanbiData="pData.trq_hb"
              showType="column"
              :isMathRound="true"
            ></data-panel>
            <data-panel
              class="border-right"
              title="原煤量"
              :data="pData.m"
              unit="吨"
              :tongbiData="pData.m_tb"
              :huanbiData="pData.m_hb"
              showType="column"
              :isMathRound="true"
            ></data-panel>
            <data-panel
              title="清洁能源"
              :data="4586"
              unit="吨标煤"
              :tongbiData="-20.28"
              :huanbiData="2.73"
              showType="column"
              :isMathRound="true"
            ></data-panel>
          </div>
        </div>
      </div>
      <div class="col-box">
        <div class="panel-box">
          <data-panel-title :title="lastMonth + '集团能源费用信息'"></data-panel-title>
          <div class="row">
            <data-panel
              class="border-right"
              title="能源总费用"
              :data="pData.zhje"
              unit="万元"
              :tongbiData="pData.zhje_tb"
              :huanbiData="pData.zhje_hb"
              showType="column"
              :isMathRound="true"
            ></data-panel>
            <data-panel
              class="border-right"
              title="电费"
              :data="pData.dje"
              unit="万元"
              :tongbiData="pData.dje_tb"
              :huanbiData="pData.dje_hb"
              showType="column"
              :isMathRound="true"
            ></data-panel>
            <data-panel
              class="border-right"
              title="热量费"
              :data="pData.rlje"
              unit="万元"
              :tongbiData="pData.rlje_tb"
              :huanbiData="pData.rlje_hb"
              showType="column"
              :isMathRound="true"
            ></data-panel>
            <data-panel
              class="border-right"
              title="水费"
              :data="pData.sje"
              unit="万元"
              :tongbiData="pData.sje_tb"
              :huanbiData="pData.sje_hb"
              showType="column"
              :isMathRound="true"
            ></data-panel>
            <data-panel
              class="border-right"
              title="天然气费"
              :data="pData.trqje"
              unit="万元"
              :tongbiData="pData.trqje_tb"
              :huanbiData="pData.trqje_hb"
              showType="column"
              :isMathRound="true"
            ></data-panel>
            <data-panel
              class="border-right"
              title="原煤费"
              :data="pData.mje"
              unit="万元"
              :tongbiData="pData.mje_tb"
              :huanbiData="pData.mje_hb"
              showType="column"
              :isMathRound="true"
            ></data-panel>
            <div class="row flex-column">
              <data-panel
                title="柴油费"
                :data="pData.cyje"
                :isMathRound="true"
                class="data-content-simple"
                unit="万元"
                showBi="hide"
              ></data-panel>
              <data-panel
                title="其他费"
                :data="pData.qtje"
                :isMathRound="true"
                class="data-content-simple"
                unit="万元"
                showBi="hide"
              ></data-panel>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-6 col-md-12 col-xs-12 col-box-left">
          <chart-pie class="chart-box"
                     :titleText="lastMonth + chartTitle + '量占比'"
                     :radius="quantityChartRadius"
                     ref="quantity"
                     @pieClick="pieClick"
                     @back="pieBack"
                     @titleClick="pieTitleClickDl"
                     :isShowLabel="isShowLabel"
                     :legendData="pieDl.legendData"
                     :center="pieCenter"
                     :seriesData="pieDl.seriesData"></chart-pie>
        </div>
        <div class="col-lg-6 col-md-12 col-xs-12 col-box-right">
          <chart-pie class="chart-box"
                     :titleText="lastMonth + chartTitle + '费用占比'"
                     :radius="feeChartRadius"
                     :isShowLabel="isShowLabel"
                     :legendData="pieDf.legendData"
                     :center="pieCenter"
                     :seriesData="pieDf.seriesData"></chart-pie>
          <!--<chart-pie class="fee" ref="fee"-->
                     <!--:titleText="lastMonth + chartTitle + '费用占比'"-->
                     <!--:radius="feeChartRadius"-->
                     <!--:isShowLabel="isShowLabel"-->
                     <!--:legendData="pieDf.legendData"-->
                     <!--:center="pieCenter"-->
                     <!--:seriesData="pieDf.seriesData"></chart-pie>-->
        </div>
      </div>
      <div class="col-box">
        <chart-bar-line class="chart-box"
                        :legendData="barDb.legendData"
                        :series="barDb.series"
                        :xAxisData="barDb.xAxisData"
                        :yAxis="yAxis"
                        titleText="能源用量与费用对比分析"></chart-bar-line>
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
      quantityChartRadius: [0, '70%'],
      feeChartRadius: [0, '70%'],
      pieCenter: ['40%', '60%'],
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
        value: '40',
        label: '能源消耗总量'
      }],
      yAxis: [{name: '万千瓦时'}, {name: '万元'}],
      pData: {},
      pieDl: {},
      pieDf: {},
      barDb: {},
      dateTime: moment().subtract(1, 'months').format('YYYY-MM'),
      lx: '33',
      pid: '2',
      pidmain: '1',
      chartTitle: '电',
      isShowLabel: false
    }
  },
  created() {
//    setTimeout(() => {
//      this.strucPie1 = [{value: 274, name: '零部件、物流研发'}, {value: 168, name: '整车制造'}]
//      this.strucPie2 = [{value: 274, name: '水'}, {value: 168, name: '其他'}, {value: 335, name: '高温水'}, {value: 235, name: '原煤'}, {value: 310, name: '天然气'}, {value: 400, name: '电'}]
//      this.legendData = ['水', '其他', '一汽解放', '天津丰田', '天津夏利', '长春丰越', '一汽通用', '高温水', '原煤', '天然气', '电']
//    })
    this.fetchPanelData()
    this.fetchChartData()
  },
  watch: {
    pidmain(newValue) {
      if (newValue !== '1') {
        this.$refs.quantity.showBackBtn()
      } else {
        this.$refs.quantity.hideBackBtn()
      }
    }
  },
  methods: {
    fetchPanelData() {
      fetch('get', api.queryXinXiList, {dateTime: this.dateTime}).then((res) => {
        this.pData = res.data[0]
      }).catch(() => {
        this.pData = {}
      })
    },
    fetchChartData() {
        this.fetchPieData()
    },
    fetchPieData() {
      fetch('get', api.queryNyYLListDl, {dateTime: this.dateTime, lx: this.lx, pid: this.pidmain}).then((res) => {
        this.pieDl = res.data
      }).catch(() => {
        this.pieDl = {}
      })
      fetch('get', api.queryNyYLListDf, {dateTime: this.dateTime, lx: this.lx, pid: this.pidmain}).then((res) => {
        this.pieDf = res.data
      }).catch(() => {
        this.pieDf = {}
      })
      fetch('get', api.queryNyDBList, {dateTime: this.dateTime, lx: this.lx, pid: this.pid}).then((res) => {
        this.barDb = res.data
      }).catch(() => {
        this.barDb = {}
      })
    },
    fetchSubPieData() {
      fetch('get', api.queryNyYLListDl, {dateTime: this.dateTime, lx: this.lx, pid: this.pidmain}).then((res) => {
        if (this.pid === '2') {
          let othervalue = 0
          for (let i = 0; i < this.pieDl.seriesData.length; i++) {
            if (this.pieDl.seriesData[i].name !== '整车制造') {
              othervalue += this.pieDl.seriesData[i].value * 1
            }
          }
          let legendData = res.data.legendData
          legendData.push('其他')
          let seriesData = res.data.seriesData
          seriesData.push({
            name: '其他',
            value: othervalue
          })
          this.pieDl.legendData = legendData
          this.pieDl.seriesData = seriesData
        } else if (this.pid === '23') {
          let othervalue = 0
          for (let i = 0; i < this.pieDl.seriesData.length; i++) {
            if (this.pieDl.seriesData[i].name !== '零部件加工') {
              othervalue += this.pieDl.seriesData[i].value * 1
            }
          }
          let legendData = res.data.legendData
          legendData.push('其他')
          let seriesData = res.data.seriesData
          seriesData.push({
            name: '其他',
            value: othervalue
          })
          this.pieDl.legendData = legendData
          this.pieDl.seriesData = seriesData
        } else if (this.pid === '30') {
          let othervalue = 0
          for (let i = 0; i < this.pieDl.seriesData.length; i++) {
            if (this.pieDl.seriesData[i].name !== '物流') {
              othervalue += this.pieDl.seriesData[i].value * 1
            }
          }
          let legendData = res.data.legendData
          legendData.push('其他')
          let seriesData = res.data.seriesData
          seriesData.push({
            name: '其他',
            value: othervalue
          })
          this.pieDl.legendData = legendData
          this.pieDl.seriesData = seriesData
        }
      }).catch(() => {
      })
      fetch('get', api.queryNyYLListDf, {dateTime: this.dateTime, lx: this.lx, pid: this.pidmain}).then((res) => {
        if (this.pid === '2') {
          let othervalue = 0
          for (let i = 0; i < this.pieDf.seriesData.length; i++) {
            if (this.pieDf.seriesData[i].name !== '整车制造') {
              othervalue += this.pieDf.seriesData[i].value * 1
            }
          }
          let legendData = res.data.legendData
          legendData.push('其他')
          let seriesData = res.data.seriesData
          seriesData.push({
            name: '其他',
            value: othervalue
          })
          this.pieDf.legendData = legendData
          this.pieDf.seriesData = seriesData
        } else if (this.pid === '23') {
          let othervalue = 0
          for (let i = 0; i < this.pieDf.seriesData.length; i++) {
            if (this.pieDf.seriesData[i].name !== '零部件加工') {
              othervalue += this.pieDf.seriesData[i].value * 1
            }
          }
          let legendData = res.data.legendData
          legendData.push('其他')
          let seriesData = res.data.seriesData
          seriesData.push({
            name: '其他',
            value: othervalue
          })
          this.pieDf.legendData = legendData
          this.pieDf.seriesData = seriesData
        } else if (this.pid === '30') {
          let othervalue = 0
          for (let i = 0; i < this.pieDf.seriesData.length; i++) {
            if (this.pieDf.seriesData[i].name !== '物流') {
              othervalue += this.pieDf.seriesData[i].value * 1
            }
          }
          let legendData = res.data.legendData
          legendData.push('其他')
          let seriesData = res.data.seriesData
          seriesData.push({
            name: '其他',
            value: othervalue
          })
          this.pieDf.legendData = legendData
          this.pieDf.seriesData = seriesData
        }
      }).catch(() => {
      })
      fetch('get', api.queryNyDBList, {dateTime: this.dateTime, lx: this.lx, pid: this.pid}).then((res) => {
        this.barDb = res.data
      }).catch(() => {
        this.barDb = {}
      })
    },
    onClose() {
      this.$router.replace('/home')
    },
    dateChange(value) {
      this.lastMonth = moment(value).format('MMMM')
      this.fetchPanelData()
      this.fetchChartData()
    },
    selectChange(value) {
      let index = this.options1.findIndex((item) => {
        return value === item.value
      })
      // 能源消耗总量
      if (value === '40') {
        this.chartTitle = '能源消耗总'
        this.yAxis = [{name: '万吨标煤'}, {name: '万元'}]
      } else {
        this.chartTitle = this.options1[index].label
        // 电
        if (value === '33') {
          this.yAxis = [{name: '万千瓦时'}, {name: '万元'}]
          // 水
        } else if (value === '00') {
          this.yAxis = [{name: '吨'}, {name: '万元'}]
          // 热力
        } else if (value === '32') {
          this.yAxis = [{name: '吉焦'}, {name: '万元'}]
          // 天然气
        } else if (value === '15') {
          this.yAxis = [{name: '万立方米'}, {name: '万元'}]
        }
      }
      this.fetchChartData()
    },
    pieClick(param) {
      if (param.data.name === '整车制造') {
        this.pid = '2'
        this.pidmain = '2'
        this.fetchSubPieData()
      } else if (param.data.name === '零部件加工') {
        this.pid = '23'
        this.pidmain = '23'
        this.fetchSubPieData()
      } else if (param.data.name === '物流') {
        this.pid = '30'
        this.pidmain = '30'
        this.fetchSubPieData()
      }
    },
    pieTitleClickDl() {
      this.pid = '2'
      this.pidmain = '1'
      this.fetchPieData()
    },
    pieBack() {
      this.pid = '2'
      this.pidmain = '1'
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
    .cost-info
      background: $color-sub-text
      display: flex
      flex-direction: column
      min-height: 100%
      min-width: 600px
      .chart-box
        min-height: 350px
</style>
