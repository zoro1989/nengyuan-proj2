<template>
  <div class="chart-bar-line" >
    <div class="title">{{titleText}}</div>
    <div class="chart" ref="chart"></div>
  </div>
</template>
<script>
import echarts from 'echarts'
import {filterArr} from 'utils/filter'
export default {
  props: {
    titleText: {
      type: String,
      default: '图表标题'
    },
    chartColor: {
      type: Array,
      default: function () {
        return ['#066090', '#1196de', '#7ed2ff', '#ff8e06', '#666666', '#2436e3']
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
    legendData: {
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
    }
  },
  created() {
    this.chart = {}
  },
  watch: {
    series: function (newData) {
      this.makeChart(newData)
    }
  },
  methods: {
    makeChart(newData) {
      // 基于准备好的dom，初始化echarts实例
      this.chart = echarts.init(this.$refs.chart)
      // 指定图表的配置项和数据
      const option = {
        title: {
          show: false
//          text: this.titleText,
//          x: 'center',
//          textStyle: {
//            color: this.titleTextColor,
//            fontWeight: 'normal'
//          }
        },
        color: this.chartColor,
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#283b56'
            },
            label: {
              backgroundColor: '#283b56'
            }
          }
        },
        legend: {
          padding: [5, 0, 0, 0],
          bottom: 0,
          data: this.legendData,
          textStyle: {
            color: '#666'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '20%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: filterArr(this.xAxisData),
            axisPointer: {
              type: 'shadow'
            },
            axisTick: {
              alignWithLabel: true
            },
            axisLabel: {
              interval: 0
            },
            axisLine: {
              lineStyle: {
                color: '#666'
              }
            }
          }
        ],
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
                  color: '#666'
                }
              }
            })
          }
          return res
        })(),
//        yAxis: [
//          {
//            type: 'value',
//            name: '万吨标煤',
//            min: 0.0,
//            max: 50.0,
//            interval: 10.0,
//            // axisLabel: {
//            // formatter: '{value} 吨'
//            // },
//            axisLine: {
//              lineStyle: {
//                color: '#666'
//              }
//            }
//          },
//          {
//            type: 'value',
//            name: '吨标煤/万元',
//            min: 0.00,
//            max: 0.05,
//            interval: 0.01,
//            // axisLabel: {
//            // formatter: '{value} 万元'
//            // },
//            axisLine: {
//              lineStyle: {
//                color: '#666'
//              }
//            }
//          }
//        ],
        series: ((vm, series) => {
          let res = []
          for (let i = 0; i < series.length; i++) {
            let item = {}
            item.name = series[i].name
            item.type = series[i].type
            if (item.type === 'line') {
              item.yAxisIndex = 1
              item.lineStyle = {color: vm.chartColor[i]}
            }
            item.data = series[i].data
            item.itemStyle = {
              barBorderRadius: [3, 3, 0, 0],
              color: (params) => {
                if (series[i].type === 'bar' && series[i].reality === '1' &&
                  series[i + 1] && series[i + 1].data[params.dataIndex] &&
                  params.data > series[i + 1].data[params.dataIndex]) {
                  return '#e7251e'
                } else {
                  return vm.chartColor[i]
                }
              }
            }
            res.push(item)
          }
          return res
        })(this, newData)
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
  .chart-bar-line
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
      line-height: 50px
      background: $color-background
      cursor: pointer
      a
        color: $color-text
</style>
