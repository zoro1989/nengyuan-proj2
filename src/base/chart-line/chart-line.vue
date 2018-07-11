<template>
  <div class="chart-line" ref="chart"></div>
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
            data: ['4.1', '4.2', '4.3', '4.4', '4.5', '4.6', '4.7']
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
        series: [
          {
            name: this.seriesName,
            type: 'line',
            data: [180, 200, 120, 300, 250, 310, 290]
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
