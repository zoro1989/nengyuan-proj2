<template>
  <div class="realtime-tripping-container">
    <div class="realtime-tripping">
      <div class="tripping-title">
        <div class="title-l">
          <span class="picker-txt">选择日期：</span>
          <el-date-picker
            v-model="valueDate"
            type="daterange"
            align="right"
            unlink-panels
            size="mini"
            value-format="yyyy-MM-dd"
            range-separator="～"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions2">
          </el-date-picker>
          <span class="picker-txt">用能单位：</span>
          <el-select
            v-model="system_id"
            placeholder="请选择"
            size="mini">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <!--<el-cascader-->
            <!--:options="options"-->
            <!--v-model="selectedOptions"-->
            <!--change-on-select-->
            <!--size="mini"-->
            <!--:show-all-levels="false"-->
          <!--&gt;</el-cascader>-->
          <!--<multi-cascader-->
            <!--:options="options"-->
            <!--@on-selected="getSelected"-->
            <!--:inputValue="configTips"-->
          <!--&gt;</multi-cascader>-->
          <el-button class="search-btn" type="primary" icon="el-icon-search" size="mini" @click="onSearch">搜索</el-button>
        </div>
        <div class="title-r">
          <span class="analyze-btn ripple"><router-link to="/home/ss/dbfx">对比分析</router-link></span>
          <span @click="channgeChart('0')" class="ripple"><i class="fa fa-line-chart"></i></span>
          <span @click="channgeChart('1')" class="ripple"><i class="fa fa-bar-chart"></i></span>
          <span @click="onClose" class="ripple"><i class="fa fa-times"></i></span>
        </div>
      </div>
      <div class="tripping-content" v-if="showflag === '0'" key="line">
        <div class="row">
          <div class="col-lg-6 col-md-12 col-xs-12">
            <chart-realtime-line class="chart-l"
                                 :titleText="chartTitleShow + realTimeToday + '能源用量(小时)'"
                                 yAxisTitle="吨标煤"
                                 seriesName="能耗"
                                 :xAxisData="ny.xAxisData"
                                 :seriesData="ny.seriesData"
                                 :showArea="false" key="lineChart"></chart-realtime-line>
          </div>
          <div class="col-lg-6 col-md-12 col-xs-12">
            <chart-realtime-line class="chart-r"
                                 :titleText="chartTitleShow + realTimeToday + '能源费用(小时)'"
                                 yAxisTitle="千元"
                                 seriesName="费用"
                                 :xAxisData="fy.xAxisData"
                                 :seriesData="fy.seriesData"
                                 :showArea="false"></chart-realtime-line>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-6 col-md-12 col-xs-12">
            <chart-line class="chart-l"
                        :titleText="chartTitleShow + '单车综合能耗'"
                        yAxisTitle="吨标煤"
                        :yAxis="bData.dnys && bData.dnys.y"
                        :xAxisData="bData.dnys && bData.dnys.xAxisData"
                        :series="bData.dnys && bData.dnys.seriesData"
                        chartColor="#48daf6"></chart-line>
          </div>
          <div class="col-lg-6 col-md-12 col-xs-12">
            <chart-line class="chart-r"
                        :titleText="chartTitleShow + '单车能源费用'"
                        yAxisTitle="千元/辆"
                        :yAxis="bData.dfys && bData.dfys.y"
                        :xAxisData="bData.dfys && bData.dfys.xAxisData"
                        :series="bData.dfys && bData.dfys.seriesData"
                        chartColor="#916fe9"></chart-line>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-6 col-md-12 col-xs-12">
            <chart-line class="chart-l"
                        :titleText="chartTitle + '单车耗电'"
                        yAxisTitle="千瓦时/量"
                        :yAxis="bData.dds && bData.dds.y"
                        :xAxisData="bData.dds && bData.dds.xAxisData"
                        :series="bData.dds && bData.dds.seriesData "
                        chartColor="#916fe9"></chart-line>
          </div>
          <div class="col-lg-6 col-md-12 col-xs-12">
            <chart-line class="chart-r"
                        :titleText="chartTitle + '单车耗水'"
                        yAxisTitle="立方米/辆"
                        :yAxis="bData.dss && bData.dss.y"
                        :xAxisData="bData.dss && bData.dss.xAxisData"
                        :series="bData.dss && bData.dss.seriesData"
                        chartColor="#5de49c"></chart-line>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-6 col-md-12 col-xs-12">
            <chart-line class="chart-l"
                        :titleText="chartTitle + '单车耗热'"
                        yAxisTitle="吉焦/辆"
                        :yAxis="bData.drs && bData.drs.y"
                        :xAxisData="bData.drs && bData.drs.xAxisData"
                        :series="bData.drs && bData.drs.seriesData"
                        chartColor="#ff930f"></chart-line>
          </div>
          <div class="col-lg-6 col-md-12 col-xs-12">
            <chart-line class="chart-r"
                        :titleText="chartTitle + '单车耗天然气'"
                        yAxisTitle="立方米/辆"
                        :yAxis="bData.dqs && bData.dqs.y"
                        :xAxisData="bData.dqs && bData.dqs.xAxisData"
                        :series="bData.dqs && bData.dqs.seriesData"
                        chartColor="#82828a"></chart-line>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-12 col-md-12 col-xs-12">
            <chart-line class="chart-l"
                        :titleText="chartTitle + '能源消耗总量'"
                        yAxisTitle="吨/标煤"
                        :yAxis="bData.allnys && bData.allnys.y"
                        :xAxisData="bData.allnys && bData.allnys.xAxisData"
                        :series="bData.allnys && bData.allnys.seriesData"
                        chartColor="#5a63ee"></chart-line>
          </div>
        </div>
      </div>
      <div class="tripping-content" v-if="showflag === '1'" key="bar">
        <div class="row">
          <div class="col-lg-6 col-md-12 col-xs-12">
            <chart-realtime-line class="chart-l"
                                 :titleText="chartTitleShow + realTimeToday + '能源用量(小时)'"
                                 yAxisTitle="吨标煤"
                                 seriesName="能耗"
                                 :xAxisData="ny.xAxisData"
                                 :seriesData="ny.seriesData"
                                 :showArea="showArea" key="barChart"></chart-realtime-line>
          </div>
          <div class="col-lg-6 col-md-12 col-xs-12">
            <chart-realtime-bar class="chart-r"
                                 :titleText="chartTitleShow + realTimeToday + '能源费用(小时)'"
                                 yAxisTitle="千元"
                                 :xAxisData="fy.xAxisData"
                                 :seriesData="fy.seriesData"
                                 seriesName="费用"></chart-realtime-bar>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-6 col-md-12 col-xs-12">
            <chart-bar class="chart-l"
                        :titleText="chartTitleShow + '单车综合能耗'"
                        yAxisTitle="吨标煤"
                        seriesName="能耗"
                        :yAxis="bData.dnys && bData.dnys.y"
                        :xAxisData="bData.dnys && bData.dnys.xAxisData"
                        :series="bData.dnys && bData.dnys.seriesData"
                        :chartColor="[
                          {offset: 0, color: '#00ffc0'},
                          {offset: 0.5, color: '#00fffb'},
                          {offset: 1, color: '#1d90ed'}
                          ]"></chart-bar>
          </div>
          <div class="col-lg-6 col-md-12 col-xs-12">
            <chart-bar class="chart-r"
                        :titleText="chartTitleShow + '单车能源费用'"
                        yAxisTitle="千元/辆"
                        seriesName="费用"
                        :yAxis="bData.dfys && bData.dfys.y"
                        :xAxisData="bData.dfys && bData.dfys.xAxisData"
                        :series="bData.dfys && bData.dfys.seriesData"
                       :chartColor="[
                          {offset: 0, color: '#e3f88b'},
                          {offset: 0.5, color: '#73f1c1'},
                          {offset: 1, color: '#0eebf1'}
                          ]"></chart-bar>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-6 col-md-12 col-xs-12">
            <chart-bar class="chart-l"
                        :titleText="chartTitleShow + '单车耗电'"
                        yAxisTitle="千瓦时/量"
                        seriesName="耗电"
                       :yAxis="bData.dds && bData.dds.y"
                        :xAxisData="bData.dds && bData.dds.xAxisData"
                        :series="bData.dds && bData.dds.seriesData"
                       :chartColor="[
                          {offset: 0, color: '#bcedff'},
                          {offset: 0.5, color: '#6eecf9'},
                          {offset: 1, color: '#0bebf2'}
                          ]"></chart-bar>
          </div>
          <div class="col-lg-6 col-md-12 col-xs-12">
            <chart-bar class="chart-r"
                        :titleText="chartTitleShow + '单车耗水'"
                        yAxisTitle="立方米/辆"
                        seriesName="耗水"
                       :yAxis="bData.dss && bData.dss.y"
                        :xAxisData="bData.dss && bData.dss.xAxisData"
                        :series="bData.dss && bData.dss.seriesData"
                       :chartColor="[
                          {offset: 0, color: '#00ffc0'},
                          {offset: 0.5, color: '#0bd0fb'},
                          {offset: 1, color: '#4f72ff'}
                          ]"></chart-bar>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-6 col-md-12 col-xs-12">
            <chart-bar class="chart-l"
                        :titleText="chartTitleShow + '单车耗热'"
                        yAxisTitle="吉焦/辆"
                        seriesName="耗热"
                       :yAxis="bData.drs && bData.drs.y"
                        :xAxisData="bData.drs && bData.drs.xAxisData"
                        :series="bData.drs && bData.drs.seriesData"
                       :chartColor="[
                          {offset: 0, color: '#e2f88b'},
                          {offset: 0.5, color: '#70f1c2'},
                          {offset: 1, color: '#17eced'}
                          ]"></chart-bar>
          </div>
          <div class="col-lg-6 col-md-12 col-xs-12">
            <chart-bar class="chart-r"
                        :titleText="chartTitleShow + '单车耗天然气'"
                        yAxisTitle="立方米/辆"
                        seriesName="耗天然气"
                       :yAxis="bData.dqs && bData.dqs.y"
                        :xAxisData="bData.dqs && bData.dqs.xAxisData"
                        :series="bData.dqs && bData.dqs.seriesData"
                       :chartColor="[
                          {offset: 0, color: '#baedff'},
                          {offset: 0.5, color: '#55ecf7'},
                          {offset: 1, color: '#0eebf2'}
                          ]"></chart-bar>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-12 col-md-12 col-xs-12">
            <chart-bar class="chart-l"
                        :titleText="chartTitleShow + '能源消耗总量'"
                        :legendData="legendData"
                        yAxisTitle="吨标煤"
                        :yAxis="bData.allnys && bData.allnys.y"
                        :xAxisData="bData.allnys && bData.allnys.xAxisData"
                        :series="bData.allnys && bData.allnys.seriesData"
                       :chartColor="[
                          {offset: 0, color: '#b3edfe'},
                          {offset: 0.5, color: '#50ecf7'},
                          {offset: 1, color: '#0febf2'}
                          ]"
                        :stack="'1'"></chart-bar>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ChartRealtimeLine from 'base/chart-realtime-line/chart-realtime-line'
import ChartRealtimeBar from 'base/chart-realtime-bar/chart-realtime-bar'
import ChartLine from 'base/chart-line/chart-line'
import ChartBar from 'base/chart-bar/chart-bar'
import ChartBarLine from 'base/chart-bar-line/chart-bar-line'
import DepartmentSelect from 'base/department-select/department-select'
import MultiCascader from 'base/department-select/MulCheckCascader'
import {orgSystemIdDicCasc} from 'utils/dic'
import { api } from '@/config'
import fetch from 'utils/fetch'
let moment = require('moment')
moment.locale('zh-cn')
export default {
  components: {
    ChartRealtimeLine,
    ChartRealtimeBar,
    ChartLine,
    ChartBar,
    ChartBarLine,
    DepartmentSelect,
    MultiCascader
  },
  data() {
    return {
      showArea: true,
      showflag: '1',
      valueDate: [moment().startOf('week').format('YYYY-MM-DD'), moment().endOf('week').format('YYYY-MM-DD')],
      pickerOptions2: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }],
        disabledDate: (time) => {
          return time.getTime() > Date.now()
        }
      },
      value: '',
      options: orgSystemIdDicCasc,
//      selectedOptions: [],
      selectGroups: '',
      configTips: '',
      system_id: '904489',
      begin_time: '',
      end_time: '',
      bData: {},
      ny: {},
      fy: {},
      yAxis: [{name: '万千瓦时'}],
      legendData: ['生产能耗', '非生产能耗'],
      chartTitleShow: ''
    }
  },
  created() {
    this.fetchData()
  },
  computed: {
    realTimeToday () {
      return moment().format('MMMM') + this.sectionToChinese(moment().format('D')) + '日'
    },
    chartTitle() {
      let orgId = this.options.findIndex((item) => {
        return this.system_id === item.value
      })
      return orgId >= 0 ? this.options[orgId].label : ''
    }
  },
  methods: {
    fetchData() {
      if (this.valueDate.length === 2) {
        this.begin_time = this.valueDate[0]
        this.end_time = this.valueDate[1]
      }
//      if (this.selectedOptions.length > 0) {
//        this.system_id = this.selectedOptions[this.selectedOptions.length - 1]
//      }
      fetch('get', api.dayNy, {system_id: this.system_id, begin_time: this.begin_time, end_time: this.end_time}).then((res) => {
        let data = res.data
        if (data.dnys && data.dnys.seriesData) {
          data.dnys.seriesData = [{
            name: '单车综合能耗',
            data: data.dnys.seriesData
          }]
          data.dnys.y = [{name: '吨标煤/辆'}]
        }
        if (data.dfys && data.dfys.seriesData) {
          data.dfys.seriesData = [{
            name: '单车费用',
            data: data.dfys.seriesData
          }]
          data.dfys.y = [{name: '千元/辆'}]
        }
        if (data.dds && data.dds.seriesData) {
          data.dds.seriesData = [{
            name: '单车电',
            data: data.dds.seriesData
          }]
          data.dds.y = [{name: '千瓦时/辆'}]
        }
        if (data.dss && data.dss.seriesData) {
          data.dss.seriesData = [{
            name: '单车水',
            data: data.dss.seriesData
          }]
          data.dss.y = [{name: '立方米/辆'}]
        }
        if (data.drs && data.drs.seriesData) {
          data.drs.seriesData = [{
            name: '单车热',
            data: data.drs.seriesData
          }]
          data.drs.y = [{name: '吉焦/辆'}]
        }
        if (data.dqs && data.dqs.seriesData) {
          data.dqs.seriesData = [{
            name: '单车天然气',
            data: data.dqs.seriesData
          }]
          data.dqs.y = [{name: '立方米/辆'}]
        }
        if (data.nys && data.nys.seriesData &&
          data.fnys && data.fnys.seriesData) {
          data.allnys = {}
          data.allnys.seriesData = [
            {
              name: '生产消耗',
              data: data.nys.seriesData
            },
            {
              name: '非生产消耗',
              data: data.fnys.seriesData
            }
          ]
          data.allnys.xAxisData = data.nys.xAxisData
          data.allnys.y = [{name: '吨标煤'}]
        }
        this.bData = data
      }).catch(() => {
        this.bData = {}
      })
      fetch('get', api.hourNy, {system_id: this.system_id}).then((res) => {
        this.ny = res.data.ny
        this.fy = res.data.fy
      }).catch(() => {
        this.ny = {}
        this.fy = {}
      })
      this.chartTitleShow = this.chartTitle
    },
    onSearch() {
      this.fetchData()
    },
    getSelected(val) {
      this.selectGroups = val
      console.log(this.selectGroups)
      if (val.length === 0) {
        this.configTips = ''
      } else {
        this.configTips = `已选择${val.length}个公司`
      }
    },
    channgeChart(status) {
      this.showflag = status
      fetch('get', api.hourNy, {system_id: this.system_id}).then((res) => {
        this.ny = res.data.ny
        this.fy = res.data.fy
      }).catch(() => {
        this.ny = {}
        this.fy = {}
      })
    },
    onClose() {
      this.$router.replace('/home/ss')
    },
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
  },
  mounted() {

  }
}
</script>
<style scoped lang="stylus">
  @import "~common/stylus/variable.styl"
  @import "~common/stylus/mixin.styl"
  .realtime-tripping-container
    .realtime-tripping
      background-image: $color-background-linear
      display: flex
      flex-direction: column
      min-height: 100%
      min-width: 600px
      @media (max-width: 992px)
        .chart-r
          margin-left: 10px!important
      .tripping-title
        margin: 10px
        height: 40px
        line-height: 40px
        border-radius: 5px
        color: $color-text
        display: flex
        justify-content: space-between
        padding: 0 10px 0 10px
        .title-l
          .tags
            display: inline-block
          .picker-txt
            padding: 0 5px 0 15px
        .title-r
          .analyze-btn
            background: #899eb6
            color: #fff
            padding: 2px 10px
            border-radius: 3px
            margin-right: 10px
            cursor: pointer
            a
              color: #fff
          .fa
            margin: 0 5px
            color: #fff
            font-size: $font-size-large
            cursor: pointer
      .tripping-content
        .sub-title
          text-align: center
          margin: 0 0 10px 0
        .chart-l
          min-height: 250px
          position: relative
          margin: 0 10px 10px 10px
          border-radius: 5px
        .chart-r
          min-height: 250px
          position: relative
          margin: 0 10px 10px 0
          border-radius: 5px
</style>
