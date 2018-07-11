<template>
  <div class="chart-bar-line" ref="chart">
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
      // 基于准备好的dom，初始化echarts实例
      this.chart = echarts.init(this.$refs.chart)
      // 指定图表的配置项和数据
      const option = {
        title: {
          text: this.titleText,
          x: 'center',
          textStyle: {
            color: this.titleTextColor
          }
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
          data: ['上年同期消耗', '实际消耗', '计划消耗', '上年同期节能指标', '实际节能指标', '计划节能指标'],
          textStyle: {
            color: '#666'
          }
        },
        xAxis: [
          {
            type: 'category',
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            axisPointer: {
              type: 'shadow'
            },
            axisLine: {
              lineStyle: {
                color: '#666'
              }
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '万吨标煤',
            min: 0.0,
            max: 50.0,
            interval: 10.0,
            // axisLabel: {
            // formatter: '{value} 吨'
            // },
            axisLine: {
              lineStyle: {
                color: '#666'
              }
            }
          },
          {
            type: 'value',
            name: '吨标煤/万元',
            min: 0.00,
            max: 0.05,
            interval: 0.01,
            // axisLabel: {
            // formatter: '{value} 万元'
            // },
            axisLine: {
              lineStyle: {
                color: '#666'
              }
            }
          }
        ],
        series: [
          {
            name: '上年同期消耗',
            type: 'bar',
            data: [20.0, 25.0, 22.0, 21.0, 25.0, 27.0, 29.0, 27.0, 20.0, 25.0, 22.0, 21.0],
            itemStyle: {
              barBorderRadius: [3, 3, 0, 0]
            }
          },
          {
            name: '实际消耗',
            type: 'bar',
            data: [19.0, 31.0, 19.0, 29.0, 25.0, 31.0, 20.0, 17.0, 35.0, 31.0, 35.0, 29.0],
            itemStyle: {
              barBorderRadius: [3, 3, 0, 0]
            }
          },
          {
            name: '计划消耗',
            type: 'bar',
            data: [28.0, 21.0, 28.0, 28.0, 28.0, 16.0, 28.0, 22.0, 28.0, 21.0, 28.0, 28.0],
            itemStyle: {
              barBorderRadius: [3, 3, 0, 0]
            }
          },
          {
            name: '上年同期节能指标',
            type: 'line',
            yAxisIndex: 1,
            data: [0.012, 0.013, 0.017, 0.016, 0.018, 0.017, 0.016, 0.015, 0.012, 0.013, 0.017, 0.016]
          },
          {
            name: '实际节能指标',
            type: 'line',
            yAxisIndex: 1,
            data: [0.007, 0.009, 0.015, 0.005, 0.007, 0.012, 0.013, 0.019, 0.007, 0.009, 0.015, 0.005]
          },
          {
            name: '计划节能指标',
            type: 'line',
            yAxisIndex: 1,
            data: [0.005, 0.012, 0.01, 0.012, 0.013, 0.018, 0.016, 0.012, 0.005, 0.012, 0.01, 0.012]
          }
        ]
      }

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
