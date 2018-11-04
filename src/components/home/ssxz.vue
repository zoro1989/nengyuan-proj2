<template>
  <div class="realtime-tripping-container">
    <div class="realtime-tripping">
      <div class="tripping-title">
        <div class="title-l">
          <span class="picker-txt">选择日期</span>
          <el-date-picker
            v-model="valueDate"
            type="daterange"
            align="right"
            unlink-panels
            size="mini"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions2">
          </el-date-picker>
          <span class="picker-txt">用能单位</span>
          <el-cascader
            :options="options"
            v-model="selectedOptions"
            change-on-select
            size="mini"
            :show-all-levels="false"
          ></el-cascader>
          <!--<multi-cascader-->
            <!--:options="options"-->
            <!--@on-selected="getSelected"-->
            <!--:inputValue="configTips"-->
          <!--&gt;</multi-cascader>-->
          <el-button class="search-btn" type="primary" icon="el-icon-search" size="mini" @click="onSearch">搜索</el-button>
        </div>
        <div class="title-r">
          <span class="analyze-btn ripple"><router-link to="/dbfx">对比分析</router-link></span>
          <span @click="channgeChart('0')" class="ripple"><i class="fa fa-line-chart"></i></span>
          <span @click="channgeChart('1')" class="ripple"><i class="fa fa-bar-chart"></i></span>
          <span @click="onClose" class="ripple"><i class="fa fa-times"></i></span>
        </div>
      </div>
      <div class="tripping-content" v-if="showflag === '0'" key="line">
        <div class="row">
          <div class="col-lg-6 col-md-12 col-xs-12">
            <chart-realtime-line class="chart-l"
                                 :titleText="realTimeToday + '能源用量(小时)'"
                                 yAxisTitle="吨标煤/时"
                                 seriesName="能耗"
                                 :xAxisData="ny.xAxisData"
                                 :seriesData="ny.seriesData"
                                 chartColor="#2434e3" key="lineChart"></chart-realtime-line>
          </div>
          <div class="col-lg-6 col-md-12 col-xs-12">
            <chart-realtime-line class="chart-r"
                                 :titleText="realTimeToday + '能源费用(小时)'"
                                 yAxisTitle="万元/时"
                                 seriesName="能耗"
                                 :xAxisData="fy.xAxisData"
                                 :seriesData="fy.seriesData"
                                 chartColor="#4b50e4"></chart-realtime-line>
          </div>
        </div>
        <div class="sub-title">一汽大众单车日耗</div>
        <div class="row">
          <div class="col-lg-6 col-md-12 col-xs-12">
            <chart-line class="chart-l"
                        titleText="单车综合能耗"
                        yAxisTitle="吨标煤"
                        :xAxisData="bData.dnys && bData.dnys.xAxisData"
                        :series="bData.dnys && bData.dnys.seriesData"
                        chartColor="#48daf6"></chart-line>
          </div>
          <div class="col-lg-6 col-md-12 col-xs-12">
            <chart-line class="chart-r"
                        titleText="单车能源费用"
                        yAxisTitle="元/辆"
                        :xAxisData="bData.dfys && bData.dfys.xAxisData"
                        :series="bData.dfys && bData.dfys.seriesData"
                        chartColor="#916fe9"></chart-line>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-6 col-md-12 col-xs-12">
            <chart-line class="chart-l"
                        titleText="单车耗电"
                        yAxisTitle="千瓦时/量"
                        :xAxisData="bData.dds && bData.dds.xAxisData"
                        :series="bData.dds && bData.dds.seriesData "
                        chartColor="#916fe9"></chart-line>
          </div>
          <div class="col-lg-6 col-md-12 col-xs-12">
            <chart-line class="chart-r"
                        titleText="单车耗水"
                        yAxisTitle="升/辆"
                        :xAxisData="bData.dss && bData.dss.xAxisData"
                        :series="bData.dss && bData.dss.seriesData"
                        chartColor="#5de49c"></chart-line>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-6 col-md-12 col-xs-12">
            <chart-line class="chart-l"
                        titleText="单车耗热"
                        yAxisTitle="吉焦/辆"
                        :xAxisData="bData.drs && bData.drs.xAxisData"
                        :series="bData.drs && bData.drs.seriesData"
                        chartColor="#ff930f"></chart-line>
          </div>
          <div class="col-lg-6 col-md-12 col-xs-12">
            <chart-line class="chart-r"
                        titleText="单车耗天然气"
                        yAxisTitle="立方米/辆"
                        :xAxisData="bData.dqs && bData.dqs.xAxisData"
                        :series="bData.dqs && bData.dqs.seriesData"
                        chartColor="#82828a"></chart-line>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-6 col-md-12 col-xs-12">
            <chart-line class="chart-l"
                        titleText="能源消耗总量"
                        yAxisTitle="吨/标煤"
                        :xAxisData="bData.nys && bData.nys.xAxisData"
                        :series="bData.nys && bData.nys.seriesData"
                        chartColor="#5a63ee"></chart-line>
          </div>
          <div class="col-lg-6 col-md-12 col-xs-12">
            <chart-line class="chart-r"
                        titleText="能源非生产消耗"
                        yAxisTitle="吨/标煤"
                        :xAxisData="bData.fnys && bData.fnys.xAxisData"
                        :series="bData.fnys && bData.fnys.seriesData"
                        chartColor="#4a14dd"></chart-line>
          </div>
        </div>
      </div>
      <div class="tripping-content" v-if="showflag === '1'" key="bar">
        <div class="row">
          <div class="col-lg-6 col-md-12 col-xs-12">
            <chart-realtime-line class="chart-l"
                                 :titleText="realTimeToday + '能源用量(小时)'"
                                 yAxisTitle="吨标煤/时"
                                 seriesName="能耗"
                                 :xAxisData="ny.xAxisData"
                                 :seriesData="ny.seriesData"
                                 :showArea="showArea" key="barChart"></chart-realtime-line>
          </div>
          <div class="col-lg-6 col-md-12 col-xs-12">
            <chart-realtime-bar class="chart-r"
                                 :titleText="realTimeToday + '能源费用(小时)'"
                                 yAxisTitle="万元/时"
                                 :xAxisData="fy.xAxisData"
                                 :seriesData="fy.xAxisData"
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
                        :yAxis="yAxis"
                        :xAxisData="bData.dnys && bData.dnys.xAxisData"
                        :series="bData.dnys && bData.dnys.seriesData"
                        chartColor="#48d9f5"></chart-bar>
          </div>
          <div class="col-lg-6 col-md-12 col-xs-12">
            <chart-bar class="chart-r"
                        titleText="单车能源费用"
                        yAxisTitle="元/辆"
                        seriesName="费用"
                        :yAxis="yAxis"
                        :xAxisData="bData.dfys && bData.dfys.xAxisData"
                        :series="bData.dfys && bData.dfys.seriesData"
                        chartColor="#8c6be6"></chart-bar>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-6 col-md-12 col-xs-12">
            <chart-bar class="chart-l"
                        titleText="单车耗电"
                        yAxisTitle="千瓦时/量"
                        seriesName="耗电"
                        :xAxisData="bData.dds && bData.dds.xAxisData"
                        :series="bData.dds && bData.dds.seriesData"
                        chartColor="#8c6be6"></chart-bar>
          </div>
          <div class="col-lg-6 col-md-12 col-xs-12">
            <chart-bar class="chart-r"
                        titleText="单车耗水"
                        yAxisTitle="升/辆"
                        seriesName="耗水"
                        :xAxisData="bData.dss && bData.dss.xAxisData"
                        :series="bData.dss && bData.dss.seriesData"
                        chartColor="#56e197"></chart-bar>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-6 col-md-12 col-xs-12">
            <chart-bar class="chart-l"
                        titleText="单车耗热"
                        yAxisTitle="吉焦/辆"
                        seriesName="耗热"
                        :xAxisData="bData.drs && bData.drs.xAxisData"
                        :series="bData.drs && bData.drs.seriesData"
                        chartColor="#ff8f06"></chart-bar>
          </div>
          <div class="col-lg-6 col-md-12 col-xs-12">
            <chart-bar class="chart-r"
                        titleText="单车耗天然气"
                        yAxisTitle="立方米/辆"
                        seriesName="耗天然气"
                        :xAxisData="bData.dqs && bData.dqs.xAxisData"
                        :series="bData.dqs && bData.dqs.seriesData"
                        chartColor="#838389"></chart-bar>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-6 col-md-12 col-xs-12">
            <chart-bar class="chart-l"
                        titleText="能源消耗总量"
                        yAxisTitle="吨标煤"
                        seriesName="耗天然气"
                        :xAxisData="bData.nys && bData.nys.xAxisData"
                        :series="bData.nys && bData.nys.seriesData"
                        chartColor="#5967f1"></chart-bar>
          </div>
          <div class="col-lg-6 col-md-12 col-xs-12">
            <chart-bar class="chart-r"
                        titleText="一汽大众能源消耗总量"
                        :legendData="legendData"
                        yAxisTitle="吨标煤"
                        :xAxisData="bData.fnys && bData.fnys.xAxisData"
                        :series="bData.fnys && bData.fnys.seriesData"
                        chartColor="#4a14dd"
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
      valueDate: '',
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
        }]
      },
      value: '',
      options: [
        {
          value: '2',
          label: '整车制造',
          children: [
            {
              value: '42052',
              label: '红旗工厂'
            },
            {
              value: '41951',
              label: '一汽大众公司',
              children: [
                {
                  value: '1546481',
                  label: '一汽大众长春工厂'
                },
                {
                  value: '2601331',
                  label: '一汽大众天津工厂'
                },
                {
                  value: '2601332',
                  label: '一汽大众青岛工厂'
                },
                {
                  value: '1546527',
                  label: '一汽大众佛山工厂'
                },
                {
                  value: '42073',
                  label: '一汽大众成都工厂'
                }
              ]
            },
            {
              value: '41949',
              label: '一汽轿车股份有限公司',
              children: [
                {
                  value: '42054',
                  label: '一工厂'
                },
                {
                  value: '42055',
                  label: '二工厂'
                },
                {
                  value: '42056',
                  label: '发传中心'
                },
                {
                  value: '41954',
                  label: '四川一汽丰田汽车有限公司'
                }
              ]
            },
            {
              value: '41954',
              label: '四川一汽丰田汽车有限公司'
            },
            {
              value: '904489',
              label: '一汽丰越公司'
            },
            {
              value: '41937',
              label: '一汽解放汽车有限公司'
            },
            {
              value: '41939',
              label: '一汽吉林汽车有限公司'
            },
            {
              value: '41953',
              label: '天津一汽丰田汽车有限公司'
            },
            {
              value: '41950',
              label: '天津一汽夏利汽车有限公司'
            },
            {
              value: '41952',
              label: '一汽通用轻型商用汽车有限公司'
            },
            {
              value: '41938',
              label: '一汽客车有限公司'
            },
            {
              value: '41917',
              label: '一汽新能源汽车有限公司'
            }
          ]
        },
        {
          value: '23',
          label: '零部件',
          children: [
            {
              value: '41924',
              label: '长春一汽富维汽车零部件股份有限公司'
            },
            {
              value: '41944',
              label: '一汽铸锻有限公司'
            },
            {
              value: '41945',
              label: '一汽模具制造有限公司'
            },
            {
              value: '41955',
              label: '一汽丰田（长春）发动机有限公司'
            },
            {
              value: '41956',
              label: '天津一汽丰田发动机有限公司'
            },
            {
              value: '41992',
              label: '无锡泽根弹簧有限公司'
            }
          ]
        },
        {
          value: '30',
          label: '物流',
          children: [
            {
              value: '42018',
              label: '一汽国际物流'
            },
            {
              value: '41947',
              label: '一汽物流'
            },
            {
              value: '41934',
              label: '动能分公司'
            }
          ]
        }

      ],
      selectedOptions: [],
      chartColor10: ['#8c6be6', '#4a14dd'],
      legendData: ['生产能耗', '非生产能耗'],
      selectGroups: '',
      configTips: '',
      system_id: '41951',
      begin_time: '',
      end_time: '',
      bData: {},
      ny: {},
      fy: {},
      yAxis: [{name: '万千瓦时'}]
    }
  },
  created() {
//    this.fetchData()
  },
  computed: {
    realTimeToday () {
      return moment().format('MMMM') + this.sectionToChinese(moment().format('D')) + '日'
    }
  },
  methods: {
    fetchData() {
      if (this.valueDate.length === 2) {
        this.begin_time = this.valueDate[0]
        this.end_time = this.valueDate[1]
      }
      if (this.selectedOptions.length > 0) {
        this.system_id = this.selectedOptions[this.selectedOptions.length - 1]
      }
      fetch('get', api.dayNy, {system_id: this.system_id, begin_time: this.begin_time, end_time: this.end_time}).then((res) => {
        let data = res.data
        if (data.dnys && data.dnys.seriesData) {
          data.dnys.seriesData = [{
            name: '单车综合能耗',
            data: data.dnys.seriesData
          }]
        }
        if (data.dfys && data.dfys.seriesData) {
          data.dfys.seriesData = [{
            name: '单车费用',
            data: data.dfys.seriesData
          }]
        }
        if (data.dds && data.dds.seriesData) {
          data.dds.seriesData = [{
            name: '单车电',
            data: data.dds.seriesData
          }]
        }
        if (data.dss && data.dss.seriesData) {
          data.dss.seriesData = [{
            name: '单车水',
            data: data.dds.seriesData
          }]
        }
        if (data.drs && data.drs.seriesData) {
          data.drs.seriesData = [{
            name: '单车热',
            data: data.drs.seriesData
          }]
        }
        if (data.dqs && data.dqs.seriesData) {
          data.dqs.seriesData = [{
            name: '单车天然气',
            data: data.dqs.seriesData
          }]
        }
        if (data.nys && data.nys.seriesData) {
          data.nys.seriesData = [{
            name: '能源消耗总量',
            data: data.nys.seriesData
          }]
        }
        if (data.fnys && data.fnys.seriesData) {
          data.fnys.seriesData = [{
            name: '能源非生产消耗',
            data: data.fnys.seriesData
          }]
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
    },
    onClose() {
      this.$router.replace('/home')
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
    overflow: auto
    -webkit-overflow-scrolling: touch
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
      min-width: 600px
      @media (max-width: 992px)
        .chart-r
          margin-left: 10px!important
      .tripping-title
        margin: 10px
        height: 40px
        line-height: 40px
        background: #fff
        border-radius: 5px
        color: #333
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
            color: #899eb6
            font-size: $font-size-large
            cursor: pointer
      .tripping-content
        .sub-title
          text-align: center
          margin: 0 0 10px 0
        .chart-l
          min-height: 250px
          position: relative
          background: #fff
          margin: 0 10px 10px 10px
          border-radius: 5px
        .chart-r
          min-height: 250px
          position: relative
          background: #fff
          margin: 0 10px 10px 0
          border-radius: 5px
</style>
