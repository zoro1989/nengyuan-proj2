<template>
  <div class="chart-realtime-line" ref="chart"></div>
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
            label: {
              normal: {
                show: true,
                position: 'top'
              }
            },
            data: (function () {
              var res = []
              var len = 0
              while (len < 12) {
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
        var now = moment()
        if (option.xAxis.data.length > 0 &&
          option.xAxis.data[option.xAxis.data.length - 1].split(':')[0] * 1 < now.format('HH') * 1) {
          let axisData = now.format('HH:00')
          var data0 = option.series[0].data
          data0.shift()
          data0.push((Math.random() * 10 + 5).toFixed(1) - 0)

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
<style scoped lang="stylus">
</style>
