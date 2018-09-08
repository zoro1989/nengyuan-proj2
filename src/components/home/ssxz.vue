<template>
  <div class="realtime-tripping-container">
    <div class="realtime-tripping">
      <div class="tripping-title">
        <div class="title-l">
          <span class="picker-txt">选择日期</span>
          <el-date-picker
            size="mini"
            v-model="valueWeek"
            type="week"
            format="yyyy 第 WW 周"
            placeholder="选择周">
          </el-date-picker>
          <span class="picker-txt">用能单位</span>
          <el-cascader
            expand-trigger="hover"
            :options="options"
            v-model="selectedOptions"
            size="mini"
            @change="handleChange">
          </el-cascader>
        </div>
        <div class="title-r">
          <span class="analyze-btn ripple"><router-link to="/dbfx">对比分析</router-link></span>
          <span @click="channgeChart('0')" class="ripple"><i class="fa fa-line-chart"></i></span>
          <span @click="channgeChart('1')" class="ripple"><i class="fa fa-bar-chart"></i></span>
          <span @click="onClose" class="ripple"><i class="fa fa-times"></i></span>
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
                        :series="seriesData1"
                        chartColor="#48daf6"></chart-line>
          </div>
          <div class="col-lg-6 col-md-12 col-xs-12">
            <chart-line class="chart-r"
                        titleText="单车能源费用"
                        yAxisTitle="元/辆"
                        :series="seriesData1"
                        chartColor="#916fe9"></chart-line>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-6 col-md-12 col-xs-12">
            <chart-line class="chart-l"
                        titleText="单车耗电"
                        yAxisTitle="千瓦时/量"
                        :series="seriesData1"
                        chartColor="#916fe9"></chart-line>
          </div>
          <div class="col-lg-6 col-md-12 col-xs-12">
            <chart-line class="chart-r"
                        titleText="单车耗水"
                        yAxisTitle="升/辆"
                        :series="seriesData1"
                        chartColor="#5de49c"></chart-line>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-6 col-md-12 col-xs-12">
            <chart-line class="chart-l"
                        titleText="单车耗热"
                        yAxisTitle="吉焦/辆"
                        :series="seriesData1"
                        chartColor="#ff930f"></chart-line>
          </div>
          <div class="col-lg-6 col-md-12 col-xs-12">
            <chart-line class="chart-r"
                        titleText="单车耗天然气"
                        yAxisTitle="立方米/辆"
                        :series="seriesData1"
                        chartColor="#82828a"></chart-line>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-6 col-md-12 col-xs-12">
            <chart-line class="chart-l"
                        titleText="一汽大众日能源消耗总量"
                        yAxisTitle="吨/标煤"
                        :series="seriesData1"
                        chartColor="#5a63ee"></chart-line>
          </div>
          <div class="col-lg-6 col-md-12 col-xs-12">
            <chart-line class="chart-r"
                        titleText="一汽大众能源消耗总量"
                        yAxisTitle="吨/标煤"
                        :legendData="legendData"
                        :series="seriesData10"
                        chartColor="#4a14dd"></chart-line>
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
                        :series="seriesData2"
                        chartColor="#48d9f5"></chart-bar>
          </div>
          <div class="col-lg-6 col-md-12 col-xs-12">
            <chart-bar class="chart-r"
                        titleText="单车能源费用"
                        yAxisTitle="元/辆"
                        seriesName="费用"
                        :series="seriesData2"
                        chartColor="#8c6be6"></chart-bar>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-6 col-md-12 col-xs-12">
            <chart-bar class="chart-l"
                        titleText="单车耗电"
                        yAxisTitle="千瓦时/量"
                        seriesName="耗电"
                        :series="seriesData2"
                        chartColor="#8c6be6"></chart-bar>
          </div>
          <div class="col-lg-6 col-md-12 col-xs-12">
            <chart-bar class="chart-r"
                        titleText="单车耗水"
                        yAxisTitle="升/辆"
                        seriesName="耗水"
                        :series="seriesData2"
                        chartColor="#56e197"></chart-bar>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-6 col-md-12 col-xs-12">
            <chart-bar class="chart-l"
                        titleText="单车耗热"
                        yAxisTitle="吉焦/辆"
                        seriesName="耗热"
                        :series="seriesData2"
                        chartColor="#ff8f06"></chart-bar>
          </div>
          <div class="col-lg-6 col-md-12 col-xs-12">
            <chart-bar class="chart-r"
                        titleText="单车耗天然气"
                        yAxisTitle="立方米/辆"
                        seriesName="耗天然气"
                        :series="seriesData2"
                        chartColor="#838389"></chart-bar>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-6 col-md-12 col-xs-12">
            <chart-bar class="chart-l"
                        titleText="一汽大众日能源消耗总量"
                        yAxisTitle="吨标煤"
                        seriesName="耗天然气"
                        :series="seriesData2"
                        chartColor="#5967f1"></chart-bar>
          </div>
          <div class="col-lg-6 col-md-12 col-xs-12">
            <chart-bar class="chart-r"
                        titleText="一汽大众能源消耗总量"
                        :legendData="legendData"
                        :series="seriesData10"
                        yAxisTitle="吨标煤"
                        :xAxisData="xAxisData"
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
export default {
  components: {
    ChartRealtimeLine,
    ChartRealtimeBar,
    ChartLine,
    ChartBar,
    ChartBarLine
  },
  data() {
    return {
      showArea: true,
      showflag: '1',
      valueWeek: '',
      value: '',
      options: [{
        value: 'zczz',
        label: '整车制造',
        children: [{
          value: 'hqgc',
          label: '红旗工厂'
        }, {
          value: 'yqdz',
          label: '一汽大众',
          children: [{
            value: 'ccgc',
            label: '长春工厂'
          }, {
            value: 'tjgc',
            label: '天津工厂'
          }, {
            value: 'qdgc',
            label: '青岛工厂'
          }, {
            value: 'fsgc',
            label: '佛山工厂'
          }, {
            value: 'cdgc',
            label: '成都工厂'
          }]
        }, {
          value: 'yqjcgfyxgs',
          label: '一汽轿车股份有限公司'
        }, {
          value: 'yqjfqcyxgs',
          label: '一汽解放汽车有限公司'
        }, {
          value: 'yqjlqcyxgs',
          label: '一汽吉林汽车有限公司'
        }, {
          value: 'yqkcyxgs',
          label: '一汽客车有限公司'
        }, {
          value: 'yqfy',
          label: '一汽丰越'
        }, {
          value: 'tjxl',
          label: '天津夏利'
        }, {
          value: 'yqft',
          label: '一汽丰田'
        }, {
          value: 'yqtysxqcyxgs',
          label: '一汽通用轻型商用汽车有限公司'
        }, {
          value: 'scft',
          label: '四川丰田'
        }]
      },
        {
        value: 'lbjjg',
        label: '零部件加工',
        children: [{
          value: 'yqfw',
          label: '一汽富维'
        }, {
          value: 'yqmjzzyxgs',
          label: '一汽模具制造有限公司'
        }, {
          value: 'yqfw',
          label: '一汽富维'
        }, {
          value: 'yqdzjlyxgs',
          label: '一汽锻造吉林有限公司'
        }, {
          value: 'yqzzyxgs',
          label: '一汽铸造有限公司'
        }, {
          value: 'yqfw',
          label: '一汽丰发'
        }, {
          value: 'tjfw',
          label: '天津丰发'
        }, {
          value: 'wxzgthyxgs',
          label: '无锡泽根弹簧有限公司'
        }]
      },
        {
        value: 'qt',
        label: '其他',
        children: [{
          value: 'dnfgs',
          label: '动能分公司'
        }, {
          value: 'yqwlgs',
          label: '一汽物流公司'
        }]
      }, {
        value: 'jt',
        label: '集团'
      }],
      selectedOptions: [],
      xAxisData: ['4.1', '4.2', '4.3', '4.4', '4.5', '4.6', '4.7'],
      seriesData1: [],
      seriesData2: [],
      chartColor10: ['#8c6be6', '#4a14dd'],
      legendData: ['生产能耗', '非生产能耗'],
      seriesData10: []
    }
  },
  created() {
    setTimeout(() => {
      this.seriesData1 = [
        {
          name: '消耗总量',
          data: [180, 200, 120, 300, 250, 310, 290]
        }
      ]
      this.seriesData2 = [
        {
          name: '消耗总量',
          data: [180, 200, 120, 300, 250, 310, 290]
        }
      ]

      this.seriesData10 = [
        {
          name: '生产能耗',
          data: [130, 150, 60, 200, 150, 110, 190]
        },
        {
          name: '非生产能耗',
          data: [80, 20, 40, 10, 60, 20, 10]
        }
      ]
    })
  },
  methods: {
    channgeChart(status) {
      this.showflag = status
    },
    handleChange(value) {
      console.log(value)
    },
    onClose() {
      this.$router.replace('/home')
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
    overflow: scroll
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
          background: #fff
          margin: 0 10px 10px 10px
          border-radius: 5px
        .chart-r
          min-height: 250px
          background: #fff
          margin: 0 10px 10px 0
          border-radius: 5px
</style>
