<template>
  <div class="chart-realtime-bar" >
    <span class="title" @click="titleClick" :class="isXiazuan ? 'xiazuan' : ''">{{titleText}}</span>
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
    },
    isXiazuan: {
      type: Boolean,
      default: false
    }
  },
  components: {
    NoResult
  },
  created() {
    this.chart = {}
  },
  mounted() {
    if (!this.seriesData.length) {
      return
    }
    clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      this.makeChart(this.seriesData)
    }, 20)
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
//        color: [this.chartColor],
        title: {
          show: false
//          text: this.titleText,
//          x: 'center',
//          textStyle: {
//            color: this.titleTextColor,
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
        yAxis: {
          type: 'value',
          scale: true,
          name: this.yAxisTitle,
//          max: 1200,
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
        },
        series: [
          {
            name: this.seriesName,
            type: 'bar',
            itemStyle: {
              barBorderRadius: [5, 5, 0, 0],
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    {offset: 0, color: '#08d5ef'},
                    {offset: 0.5, color: '#04e9dc'},
                    {offset: 1, color: '#00fec7'}
                  ]
                )
              }
            },
            label: {
              normal: {
                show: true,
                position: 'top',
                color: '#fff'
              }
            },
            data: newData
//            data: (function () {
//              var res = []
//              var len = 12
//              while (len--) {
//                res.push(Math.round(Math.random() * 1000))
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
//          var axisData = now.format('HH:00')
//          var data0 = option.series[0].data
//          data0.shift()
//          data0.push(Math.round(Math.random() * 1000))
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
<style lang="stylus" scoped>
  @import "~common/stylus/variable.styl"
  .chart-realtime-bar
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
      &.xiazuan
        text-decoration: underline
      a
        color: $color-text
      &:hover
        color: $color-sub-text
</style>
