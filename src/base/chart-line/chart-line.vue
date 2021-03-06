<template>
  <div class="chart-line" >
    <div class="title">{{titleText}}</div>
    <div class="chart" ref="chart" v-show="series.length !== 0"></div>
    <no-result v-show="series.length === 0"></no-result>
  </div>
</template>
<script>
import echarts from 'echarts'
import NoResult from 'base/no-result/no-result'
export default {
  props: {
    titleText: {
      type: String,
      default: '图表标题'
    },
    chartColor: {
      type: String,
      default: '#49b5ef'
    },
    titleTextColor: {
      type: String,
      default: '#006195'
    },
    yAxisTitle: {
      type: String,
      default: 'Y轴'
    },
    seriesName: {
      type: String,
      default: 'X轴'
    },
    legendData: {
      type: Array,
      default: function () {
        return []
      }
    },
    showArea: {
      type: Boolean,
      default: false
    },
    xAxisData: {
      type: Array,
      default: function () {
        return []
      }
    },
    series: {
      type: Array,
      default: function () {
        return []
      }
    },
    suffix: {
      type: String,
      default: ''
    }
  },
  components: {
    NoResult
  },
  created() {
    this.chart = {}
  },
  mounted() {
    if (!this.series.length) {
      return
    }
    clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      this.makeChart(this.series)
    }, 20)
  },
  watch: {
    series: function (newData) {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.makeChart(newData)
      }, 20)
    }
  },
  methods: {
    makeChart(newData) {
      this.chart = echarts.init(this.$refs.chart)
      // 指定图表的配置项和数据
      const option = {
        color: [this.chartColor, '#8c6be6'],
        title: {
          show: false
//          text: this.titleText,
//          x: 'center',
//          textStyle: {
//            color: '#006195',
//            fontWeight: 'normal'
//          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#2e77d8'
            }
          }
        },
        dataZoom: {
          show: false,
          start: 0,
          end: 100
        },
        legend: {
          padding: [5, 0, 0, 0],
          bottom: 0,
          data: this.legendData,
          textStyle: {
            color: '#fff'
          }
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: true,
            axisLine: {
              lineStyle: {
                color: '#fff'
              }
            },
            axisTick: {
              alignWithLabel: true
            },
            data: this.xAxisData && this.xAxisData.map((item) => {
              return item + this.suffix
            })
          }
        ],
        yAxis: [
          {
            type: 'value',
            scale: true,
            name: this.yAxisTitle,
            boundaryGap: [0.2, 0.2],
            axisLine: {
              lineStyle: {
                color: '#fff'
              }
            },
            nameTextStyle: {
              color: '#fff'
            },
            splitLine: {
              lineStyle: {
                color: '#2e77d8'
              }
            }
          }
        ],
        series: ((vm, series) => {
          let res = []
          for (let i = 0; i < series.length; i++) {
            res.push({
              name: series[i].name,
              type: 'line',
              data: series[i].data
            })
          }
          return res
        })(this, newData)
//        series: [
//          {
//            name: this.seriesName,
//            type: 'line',
//            data: [180, 200, 120, 300, 250, 310, 290]
//          }
//        ]
      }

      // 使用刚指定的配置项和数据显示图表。
      this.chart.setOption(option, true)

      window.addEventListener('resize', () => {
        clearTimeout(this.resizeTimer)
        this.resizeTimer = setTimeout(() => {
          this.refreshChart()
        }, 60)
      })
    },
    refreshChart() {
      this.chart.resize()
    }
  }
}
</script>
<style scoped lang="stylus">
  @import "~common/stylus/variable.styl"
  .chart-line
    .chart
      position: absolute
      top: 10px
      left: 0px
      right: 0px
      bottom: 10px
    .title
      position: absolute
      z-index: 1
      top: 0
      left: 50%
      transform: translateX(-50%)
      text-align: center
      height: 50px
      display: flex
      align-items: center
      justify-content: center
      a
        color: $color-text
</style>
