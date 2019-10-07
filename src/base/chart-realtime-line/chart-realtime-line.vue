<template>
  <div class="chart-realtime-line" >
    <div class="title" @click="titleClick">{{titleText}}</div>
    <div class="chart" ref="chart" v-show="seriesData.length !== 0"></div>
    <no-result v-show="seriesData.length === 0"></no-result>
  </div>
</template>
<script>
import echarts from 'echarts'
import NoResult from 'base/no-result/no-result'
// import moment from 'moment'
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
    },
    xAxisData: {
      type: Array,
      default: function () {
        return []
      }
    },
    seriesData: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  components: {
    NoResult
  },
  created() {
    this.chart = {}
  },
  watch: {
    seriesData: function (newData) {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.makeChart(newData)
      }, 20)
    }
  },
  methods: {
    titleClick() {
      this.$router.replace('/home/ss/ssxz')
    },
    makeChart(newData) {
      this.chart = echarts.init(this.$refs.chart)

      // 指定图表的配置项和数据
      const option = {
        color: [this.chartColor],
        title: {
          show: false
//          text: this.titleText,
//          x: 'center',
//          textStyle: {
//            color: '#006195',
//            fontWeight: 'normal'
//          },
//          link: '/#/ssxz',
//          target: 'self'
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
        xAxis: {
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
          axisLabel: {
            interval: 0
          },
          data: this.xAxisData && this.xAxisData.map((item) => {
            return item + '时'
          })
//          data: (function () {
//            var now = moment()
//            var res = []
//            var len = 12
//            while (len--) {
//              res.unshift(now.format('HH:00'))
//              now = now.subtract(3600, 'seconds')
//            }
//            return res
//          })()
        },
        yAxis: [
          {
            type: 'value',
            scale: true,
            name: this.yAxisTitle,
//            max: 30,
            min: 0,
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
        series: [
          {
            name: this.seriesName,
            type: 'line',
            areaStyle: this.showArea ? {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    {offset: 0, color: '#02fac8'},
                    {offset: 0.5, color: '#18c1e3'},
                    {offset: 1, color: '#4365ef'}
                  ]
                )
              }
            } : undefined,
            symbol: 'circle',
            symbolSize: 6,
            label: {
              normal: {
                show: true,
                position: 'top',
                color: '#fff'
              }
            },
            lineStyle: {
              color: this.showArea ? 'transparent' : '#18c1e3'
            },
            itemStyle: {
              color: '#e889b5'
            },
            data: newData
//            data: (function () {
//              var res = []
//              var len = 0
//              while (len < 12) {
//                res.push((Math.random() * 10 + 5).toFixed(1) - 0)
//                len++
//              }
//              return res
//            })()
          }
        ]
      }

//      clearInterval(this.timer)
//      this.timer = setInterval(() => {
//        var now = moment()
//        if (option.xAxis.data.length > 0 &&
//          option.xAxis.data[option.xAxis.data.length - 1].split(':')[0] * 1 < now.format('HH') * 1) {
//          let axisData = now.format('HH:00')
//          var data0 = option.series[0].data
//          data0.shift()
//          data0.push((Math.random() * 10 + 5).toFixed(1) - 0)
//
//          option.xAxis.data.shift()
//          option.xAxis.data.push(axisData)
//
//          this.chart.setOption(option, true)
//        }
//      }, 60 * 1000)

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
  .chart-realtime-line
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
      cursor: pointer
      a
        color: $color-text
      &:hover
        color: $color-sub-text
</style>
