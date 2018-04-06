<template>
  <div class="home">
    <div class="panels">
      <div class="panel-l">
        <div class="title">
          能源指标
        </div>
        <div class="panel">
          <div class="panel-item">
            <span class="row big">21.463万吨标煤</span>
            <span class="row">
              同比<span class="down">&nbsp;<i class="fa fa-long-arrow-down"></i>&nbsp;-32.54%</span>
              环比<span class="down">&nbsp;<i class="fa fa-long-arrow-down"></i>&nbsp;-56.92%</span>
            </span>
          </div>
          <div class="panel-item">
            <span class="row big">21.463万吨标煤</span>
            <span class="row">
              同比<span class="down">&nbsp;<i class="fa fa-long-arrow-down"></i>&nbsp;-32.54%</span>
              环比<span class="down">&nbsp;<i class="fa fa-long-arrow-down"></i>&nbsp;-56.92%</span>
            </span>
          </div>
        </div>
        <div class="panel">
          <div class="panel-item">
            <span class="row big">21.463万吨标煤</span>
            <span class="row">
              同比<span class="down">&nbsp;<i class="fa fa-long-arrow-down"></i>&nbsp;-32.54%</span>
              环比<span class="down">&nbsp;<i class="fa fa-long-arrow-down"></i>&nbsp;-56.92%</span>
            </span>
          </div>
          <div class="panel-item">
            <span class="row big">21.463万吨标煤</span>
            <span class="row">
              同比<span class="down">&nbsp;<i class="fa fa-long-arrow-down"></i>&nbsp;-32.54%</span>
              环比<span class="down">&nbsp;<i class="fa fa-long-arrow-down"></i>&nbsp;-56.92%</span>
            </span>
          </div>
        </div>
      </div>
      <div class="panel-r">
        <div class="panel">
          <div class="panel-item">
            <span class="subtitle row">累计能源用量</span>
            <span class="row big">21.463万吨标煤</span>
            <span class="row">同比<span class="down">&nbsp;<i class="fa fa-long-arrow-down"></i>&nbsp;-32.54%</span></span>
            <span class="row">环比<span class="down">&nbsp;<i class="fa fa-long-arrow-down"></i>&nbsp;-56.92%</span></span>
          </div>
          <div class="panel-item">
            <span class="subtitle row">累计能源用量</span>
            <span class="row big">21.463万吨标煤</span>
            <span class="row">同比<span class="down">&nbsp;<i class="fa fa-long-arrow-down"></i>&nbsp;-32.54%</span></span>
            <span class="row">环比<span class="down">&nbsp;<i class="fa fa-long-arrow-down"></i>&nbsp;-56.92%</span></span>
          </div>
          <div class="panel-item">
            <span class="subtitle row">累计能源用量</span>
            <span class="row big">21.463万吨标煤</span>
            <span class="row">同比<span class="down">&nbsp;<i class="fa fa-long-arrow-down"></i>&nbsp;-32.54%</span></span>
            <span class="row">环比<span class="down">&nbsp;<i class="fa fa-long-arrow-down"></i>&nbsp;-56.92%</span></span>
          </div>
        </div>
        <div class="panel">
          <div class="panel-item">
            <span class="subtitle row">累计能源用量</span>
            <span class="row big">21.463万吨标煤</span>
            <span class="row">
              同比<span class="down">&nbsp;<i class="fa fa-long-arrow-down"></i>&nbsp;-32.54%</span>
              环比<span class="down">&nbsp;<i class="fa fa-long-arrow-down"></i>&nbsp;-56.92%</span>
            </span>
          </div>
          <div class="panel-item">
            <span class="subtitle row">累计能源用量</span>
            <span class="row big">21.463万吨标煤</span>
            <span class="row">
              同比<span class="down">&nbsp;<i class="fa fa-long-arrow-down"></i>&nbsp;-32.54%</span>
              环比<span class="down">&nbsp;<i class="fa fa-long-arrow-down"></i>&nbsp;-56.92%</span>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="chart">
      <div class="energy" ref="chart"></div>
      <div class="analyze" ref="analyze"></div>
    </div>
  </div>
</template>
<script>
import echarts from 'echarts'
export default {
  mounted() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(this.$refs.chart)

    // 指定图表的配置项和数据
    var option = {
      title: {
        text: '能源用量与节能指标同比分析',
        textStyle: {
          color: '#ffffff'
        }
      },
      color: ['#5faee3', '#fdb944', '#ee672d', '#144ba6', '#b47913', '#eb0709'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          crossStyle: {
            color: '#999'
          }
        }
      },
      toolbox: {
        feature: {
          dataView: {show: true, readOnly: false},
          magicType: {show: true, type: ['line', 'bar']},
          restore: {show: true},
          saveAsImage: {show: true}
        }
      },
      legend: {
        type: 'scroll',
        bottom: 0,
        data: ['实际能源用量', '计划能源用量', '上年同期能源用量', '计划节能指标', '实际节能指标', '上年同期节能指标'],
        textStyle: {
          color: '#ffffff'
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
              color: '#eee'
            }
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          name: '吨标煤',
          min: 0.0,
          max: 500000.0,
          interval: 100000.0,
          axisLabel: {
            formatter: '{value} 吨'
          },
          axisLine: {
            lineStyle: {
              color: '#eee'
            }
          }
        },
        {
          type: 'value',
          name: '吨标煤/万元',
          min: 0.00,
          max: 0.05,
          interval: 0.01,
          axisLabel: {
            formatter: '{value} 万元'
          },
          axisLine: {
            lineStyle: {
              color: '#eee'
            }
          }
        }
      ],
      series: [
        {
          name: '实际能源用量',
          type: 'bar',
          data: [350000.0, 310000.0, 190000.0, 290000.0, 250000.0, 310000.0, 200000.0, 170000.0],
          itemStyle: {
            barBorderRadius: [3, 3, 0, 0]
          }
        },
        {
          name: '计划能源用量',
          type: 'bar',
          data: [280000.0, 210000.0, 280000.0, 280000.0, 280000.0, 160000.0, 280000.0, 220000.0],
          itemStyle: {
            barBorderRadius: [3, 3, 0, 0]
          }
        },
        {
          name: '上年同期能源用量',
          type: 'bar',
          data: [200000.0, 250000.0, 220000.0, 210000.0, 250000.0, 270000.0, 290000.0, 270000.0],
          itemStyle: {
            barBorderRadius: [3, 3, 0, 0]
          }
        },
        {
          name: '计划节能指标',
          type: 'line',
          yAxisIndex: 1,
          data: [0.005, 0.012, 0.01, 0.012, 0.013, 0.018, 0.016, 0.012]
        },
        {
          name: '实际节能指标',
          type: 'line',
          yAxisIndex: 1,
          data: [0.007, 0.009, 0.015, 0.005, 0.007, 0.012, 0.013, 0.019]
        },
        {
          name: '上年同期节能指标',
          type: 'line',
          yAxisIndex: 1,
          data: [0.012, 0.013, 0.017, 0.016, 0.018, 0.017, 0.016, 0.015]
        }

      ]
    }

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option)
    var myChart2 = echarts.init(this.$refs.analyze)

    // 指定图表的配置项和数据
    var option2 = {
      title: {
        text: '分公司产量占总产量比重',
        textStyle: {
          color: '#ffffff'
        }
      },
      color: ['#fdb944', '#5faee3', '#ee672d', '#144ba6', '#b47913', '#eb0709'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        },
        formatter: function (params, ticket, callback) {
          var res = params[0].name
          for (var i = 0, l = params.length; i < l; i++) {
            res += '<br/>' + params[i].seriesName + ' : ' + Math.abs(params[i].value)
          }

          return res
        }
      },
      legend: {
        data: ['男', '女'],
        textStyle: {
          color: '#ffffff'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          axisLabel: {
            formatter: function (value) {
              return Math.abs(value)
            }
          },
          type: 'value',
          axisLine: {
            lineStyle: {
              color: '#eee'
            }
          }
        }
      ],
      yAxis: [
        {
          type: 'category',
          axisTick: {show: false},
          // data : ['0~5岁','5~10岁','10-30岁','30-50岁','50-70岁','70-100','100以上']
          data: ['一月', '二月', '三月', '四月', '五月', '六月'],
          axisLine: {
            lineStyle: {
              color: '#eee'
            }
          }
        }
      ],
      series: [
        {
          name: '2016年',
          type: 'bar',
          stack: '总量',
          label: {
            position: 'insideLeft',
            color: '#ffffff',
            show: true
          },
          itemStyle: {
            barBorderRadius: [0, 3, 3, 0],
            borderColor: '#fff'
          },
          // data:[320, 302, 341, 374, 390, 450, 420]
          data: [276.08, 251.43, 332.30, 14.41, 251.43, 276.08]
        },
        {
          name: '2017年',
          type: 'bar',
          stack: '总量',
          barMaxWidth: '30',
          label: {
            position: 'insideRight',
            color: '#ffffff',
            show: true,
            formatter: function (v) { return Math.abs(v.data) }
          },
          itemStyle: {
            barBorderRadius: [3, 0, 0, 3],
            borderColor: '#fff'
          },
          // data:[-120, -132, -101, -134, -190, -230, -210]
          data: [-212.08, -434.43, -176.30, -177.41, -455.43, -376.08]
        }
      ]
    }

    // 使用刚指定的配置项和数据显示图表。
    myChart2.setOption(option2)
  }
}
</script>
<style scoped lang="stylus">
  .home
    position: absolute
    top: 60px
    width: 100%
    overflow: hidden
    .panels
      display: flex
      .panel-l,.panel-r
        flex: 1
        height: 250px
        display: flex
        flex-direction: column
        .title
          flex: 0 0 50px
          line-height: 50px
          background: #354052
          margin: 5px
        .panel
          flex: 1
          display: flex
          .panel-item
            flex: 1
            cursor: pointer
            background: #354052
            margin: 5px
            color: #89c5fc
            padding: 5px
            display: flex
            flex-direction: column
            .row
              flex: 1
              display: flex
              align-items: center
              .down
                color: #08ae5e
            .subtitle
              color: #ffffff
    .chart
      display: flex
      .energy
        width: 880px
        height: 280px
      .analyze
        width: 300px
        height: 280px
</style>
