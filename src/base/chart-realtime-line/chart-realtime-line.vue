<template>
  <div class="chart-realtime-line" ref="chart"></div>
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
    showArea: {
      type: Boolean,
      default: false
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
            color: '#006195'
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
        xAxis: [
          {
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
          }
        ],
        yAxis: [
          {
            type: 'value',
            scale: true,
            name: this.yAxisTitle,
            max: 30,
            min: 0,
            boundaryGap: [0.2, 0.2],
            axisLine: {
              lineStyle: {
                color: '#666'
              }
            }
          }
        ],
        series: [
          {
            name: this.seriesName,
            type: 'line',
            areaStyle: this.showArea ? {} : undefined,
            data: (function () {
              var res = []
              var len = 0
              while (len < 10) {
                res.push((Math.random() * 10 + 5).toFixed(1) - 0)
                len++
              }
              return res
            })()
          }
        ]
      }

      clearInterval(this.timer)
      this.timer = setInterval(() => {
        let axisData = (new Date()).toLocaleTimeString().replace(/^\D*/, '')

        var data0 = option.series[0].data
        data0.shift()
        data0.push((Math.random() * 10 + 5).toFixed(1) - 0)

        option.xAxis[0].data.shift()
        option.xAxis[0].data.push(axisData)

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
<style scoped lang="stylus">
</style>
