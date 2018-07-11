<template>
  <div class="chart-realtime-bar" ref="chart"></div>
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
      default: '#5967f1'
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
      default: '系列名'
    }
  },
  created() {
    this.chart = {}
  },
  methods: {
    makeChart() {
      this.chart = echarts.init(this.$refs.chart)

      // 指定图表的配置项和数据
      const option = {
        color: [this.chartColor],
        title: {
          text: this.titleText,
          x: 'center',
          textStyle: {
            color: this.titleTextColor
          }
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
        xAxis: {
          type: 'category',
          boundaryGap: true,
          axisLine: {
            lineStyle: {
              color: '#666'
            }
          },
          axisLabel: {
            interval: 1
          },
          data: (function () {
            var now = new Date()
            var res = []
            var len = 10
            while (len--) {
              res.unshift(now.toLocaleTimeString().replace(/^\D*/, ''))
              now = new Date(now - 2000)
            }
            return res
          })()
        },
        yAxis: {
          type: 'value',
          scale: true,
          name: this.yAxisTitle,
          max: 1200,
          min: 0,
          boundaryGap: [0.2, 0.2],
          axisLine: {
            lineStyle: {
              color: '#666'
            }
          }
        },
        series: [
          {
            name: this.seriesName,
            type: 'bar',
            itemStyle: {
              barBorderRadius: [3, 3, 0, 0]
            },
            data: (function () {
              var res = []
              var len = 10
              while (len--) {
                res.push(Math.round(Math.random() * 1000))
              }
              return res
            })()
          }
        ]
      }
      clearInterval(this.timer)
      this.timer = setInterval(() => {
        var axisData = (new Date()).toLocaleTimeString().replace(/^\D*/, '')
        var data0 = option.series[0].data
        data0.shift()
        data0.push(Math.round(Math.random() * 1000))

        option.xAxis.data.shift()
        option.xAxis.data.push(axisData)

        this.chart.setOption(option, true)
      }, 2100)

      // 使用刚指定的配置项和数据显示图表。
      this.chart.setOption(option, true)
    },
    refreshChart() {
      this.chart.resize()
    }
  },
  mounted() {
    this.makeChart()
  }
}
</script>
<style lang="stylus" scoped>
</style>
