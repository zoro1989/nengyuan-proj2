<template>
  <div class="chart-bar" >
    <div class="title">{{titleText}}</div>
    <div class="chart" ref="chart"></div>
  </div>
</template>
<script>
import echarts from 'echarts'
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
        return ['4.1', '4.2', '4.3', '4.4', '4.5', '4.6', '4.7']
      }
    },
    series: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  created() {
    this.chart = {}
  },
  mounted() {
    if (this.series) {
      this.makeChart(this.series)
    }
  },
  watch: {
    series: function (newData) {
      this.makeChart(newData)
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
              backgroundColor: '#283b56'
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
            color: '#666'
          }
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: true,
            axisLine: {
              lineStyle: {
                color: '#666'
              }
            },
            axisTick: {
              alignWithLabel: true
            },
            data: this.xAxisData
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
                color: '#666'
              }
            }
          }
        ],
        series: ((vm, series) => {
          let res = []
          for (let i = 0; i < series.length; i++) {
            res.push({
              name: series[i].name,
              type: 'bar',
              barWidth: '60%',
              data: series[i].data,
              stack: vm.stack,
              itemStyle: {
                barBorderRadius: vm.stack === null ? [3, 3, 0, 0] : i === series.length - 1 ? [3, 3, 0, 0] : [0, 0, 0, 0]
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
      left: 0
      bottom: 10px
      width: 100%
    .title
      position: absolute
      z-index: 1
      top: 0
      left: 50%
      transform: translateX(-50%)
      text-align: center
      height: 50px
      line-height: 50px
      background: $color-background
      cursor: pointer
      a
        color: $color-text
</style>
