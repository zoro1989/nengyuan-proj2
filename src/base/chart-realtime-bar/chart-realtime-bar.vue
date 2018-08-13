<template>
  <div class="chart-realtime-bar" ref="chart"></div>
</template>
<script>
import echarts from 'echarts'
import moment from 'moment'
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
          },
          link: '/#/ssxz',
          target: 'self'
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
          axisTick: {
            alignWithLabel: true
          },
          axisLabel: {
            interval: 0
          },
          data: (function () {
            var now = moment()
            var res = []
            var len = 12
            while (len--) {
              res.unshift(now.format('HH:00'))
              now = now.subtract(3600, 'seconds')
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
            label: {
              normal: {
                show: true,
                position: 'top'
              }
            },
            data: (function () {
              var res = []
              var len = 12
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
        var now = moment()
        if (option.xAxis.data.length > 0 &&
          option.xAxis.data[option.xAxis.data.length - 1].split(':')[0] * 1 < now.format('HH') * 1) {
          var axisData = now.format('HH:00')
          var data0 = option.series[0].data
          data0.shift()
          data0.push(Math.round(Math.random() * 1000))

          option.xAxis.data.shift()
          option.xAxis.data.push(axisData)

          this.chart.setOption(option, true)
        }
      }, 60 * 1000)

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
