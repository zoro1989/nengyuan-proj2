<template>
  <div class="chart-bar" >
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
      type: Array,
      default: function () {
        return [
          {offset: 0, color: '#08d5ef'},
          {offset: 0.5, color: '#04e9dc'},
          {offset: 1, color: '#00fec7'}
        ]
      }
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
    showOrientation: {
      type: String,
      default: 'horizontal'
    },
    stack: {
      type: String,
      default: null
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
    yAxis: {
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
//        color: [this.chartColor, '#8c6be6'],
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
//        yAxis: {
//          type: 'value',
//          scale: true,
//          name: this.yAxisTitle,
//          max: 1200,
//          min: 0,
//          boundaryGap: [0.2, 0.2],
//          axisLine: {
//            lineStyle: {
//              color: '#666'
//            }
//          }
//        },
        yAxis: (() => {
          let res = []
          for (let i = 0; i < this.yAxis.length; i++) {
            res.push({
              type: 'value',
              name: this.yAxis[i].name,
              min: this.yAxis[i].min,
              max: this.yAxis[i].max,
              interval: this.yAxis[i].interval,
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
            })
          }
          return res
        })(),
        series: ((vm, series) => {
          let res = []
          let colorSet = []
          colorSet.push(this.chartColor)
          if (vm.stack !== null) {
            colorSet.push([
              {offset: 0, color: '#189def'},
              {offset: 0.5, color: '#337cfc'},
              {offset: 1, color: '#8a5fff'}
            ])
          }
          for (let i = 0; i < series.length; i++) {
            res.push({
              name: series[i].name,
              type: 'bar',
              barWidth: '60%',
              data: series[i].data,
              stack: vm.stack,
              itemStyle: {
                barBorderRadius: vm.stack === null ? [3, 3, 0, 0] : i === series.length - 1 ? [3, 3, 0, 0] : [0, 0, 0, 0],
                normal: {
                  color: new echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    vm.stack === null ? this.chartColor : colorSet[i]
                  )
                }
              }
            })
          }
          return res
        })(this, newData)
//        series: [
//          {
//            name: this.seriesName,
//            type: 'bar',
//            barWidth: '60%',
//            data: [180, 200, 120, 300, 250, 310, 290],
//            itemStyle: {
//              barBorderRadius: [3, 3, 0, 0]
//            }
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
  .chart-bar
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
