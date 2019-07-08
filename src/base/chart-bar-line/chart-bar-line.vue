<template>
  <div class="chart-bar-line" >
    <div class="title">{{titleText}}</div>
    <div class="chart" ref="chart" v-show="series.length !== 0"></div>
    <no-result v-show="series.length === 0"></no-result>
  </div>
</template>
<script>
import echarts from 'echarts'
import {filterArr, filterLegend} from 'utils/filter'
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
        return ['#0084ff', '#09cdf7', '#f8c1da', '#8c6be6', '#33f3ff', '#ff9c00']
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
    },
    isOnlyLine: {
      type: Boolean,
      default: false
    },
    isHome: {
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
        toolbox: {
          feature: {
            saveAsImage: {
              iconStyle: {
                color: this.isHome ? '#fff' : '#666',
                borderColor: this.isHome ? '#fff' : '#666'
              }
            }
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#283b56'
            },
            label: {
              backgroundColor: '#2e77d8'
            }
          }
        },
        legend: {
          padding: [5, 0, 0, 0],
          bottom: 0,
          data: this.isHome ? filterLegend(this.legendData) : this.legendData,
          textStyle: {
            color: this.isHome ? '#fff' : '#666'
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
                color: this.isHome ? '#fff' : '#666'
              }
            },
            nameTextStyle: {
              color: this.isHome ? '#fff' : '#666'
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
                  color: this.isHome ? '#fff' : '#666'
                }
              },
              nameTextStyle: {
                color: this.isHome ? '#fff' : '#666'
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
              if (!this.isOnlyLine) {
                item.yAxisIndex = 1
              }
              item.itemStyle = {color: vm.chartColor[i]}
              item.lineStyle = {width: 2}
            } else {
              item.itemStyle = {
                barBorderRadius: [3, 3, 0, 0]
              }
            }
            if (series[i].type === 'bar' && (series[i].name.indexOf('实际') >= 0 || series[i].name.indexOf('本期') >= 0) &&
              series[i + 1] && series[i].type === 'bar' && series[i + 1].name.indexOf('计划') >= 0) {
              for (let j = 0; j < series[i].data.length; j++) {
                if (series[i].data[j] !== 0 && series[i + 1].data[j] !== 0 &&
                  series[i].data[j] > series[i + 1].data[j]) {
                  series[i].data[j] = {
                    value: series[i].data[j],
                    itemStyle: {color: '#e7251e'}
                  }
                }
              }
            }
            item.data = series[i].data
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
      display: flex
      align-items: center
      justify-content: center
      a
        color: $color-text
</style>
