<template>
  <div class="chart-pie" >
    <div class="title" @click="titleClick">{{titleText}}</div>
    <span class="back-btn ripple" v-if="showBack" @click="back"><i class="fa fa-arrow-left"></i>&nbsp;返回</span>
    <div class="chart" ref="chart"></div>
  </div>
</template>
<script>
import echarts from 'echarts'
import {filter, filterArr} from 'utils/filter'
export default {
  props: {
    titleText: {
      type: String,
      default: '图表标题'
    },
    chartColor: {
      type: Array,
      default: function () {
         return ['#5967f1', '#06e56d', '#7dd1ff', '#ff8e06', '#1196de', '#0c1994', '#8c6be6', '#ffc300', '#4472c6', '#838389', '#1096df']
      }
    },
    titleTextColor: {
      type: String,
      default: '#006195'
    },
    seriesName: {
      type: String,
      default: '访问来源'
    },
    roseType: {
      type: String,
      default: ''
    },
    radius: {
      type: Array,
      default: function () {
        return [0, '70%']
      }
    },
    center: {
        type: Array,
        default: function () {
          return ['50%', '60%']
        }
    },
    othersData: {
      type: Array,
      default: function () {
        return []
      }
    },
    position: {
      type: String,
      default: 'outside'
    },
    seriesData: {
      type: Array,
      default: function () {
        return []
      }
    },
    legendData: {
      type: Array,
      default: function () {
        return []
      }
    },
    isShowLabel: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      showBack: false
    }
  },
  created() {
    this.chart = {}
  },
  watch: {
    seriesData: function (newData) {
      this.makeChart(newData)
    }
  },
  methods: {
    back() {
      this.$emit('back')
    },
    showBackBtn() {
      this.showBack = true
    },
    hideBackBtn() {
      this.showBack = false
    },
    titleClick() {
        this.$emit('titleClick')
    },
    makeChart(seriesData) {
      this.chart = echarts.init(this.$refs.chart)
      // 指定图表的配置项和数据
      const option = {
        color: this.chartColor,
        title: {
          show: false
//          text: this.titleText,
//          x: 'center',
//          textStyle: {
//            color: this.titleTextColor,
//            fontWeight: 'normal'
//          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b}\n{d}%'
        },
        label: {
          formatter: '{b}\n{d}%'
        },
        legend: {
          padding: [5, 0, 0, 0],
            right: '12%',
            top: 'middle',
            orient: 'vertical',
            data: filterArr(this.legendData),
            textStyle: {
              color: '#666'
            }
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: this.radius,
            center: this.center,
            label: {
              formatter: !this.isShowLabel ? '{d}%' : undefined
            },
            data: (function (vm, seriesData) {
              let copyData = JSON.parse(JSON.stringify(seriesData))
              let data = copyData.sort(function (a, b) {
                return a.value - b.value
              })
              var res = []
              for (let i = 0; i < data.length; i++) {
                let obj = {}
                obj.value = data[i].value
                obj.name = filter(data[i].name)
                obj.label = (data[i].othersData && data[i].othersData.length > 0) ? {
                  position: vm.position,
                  normal: {
                    formatter: (function (othersData) {
                      let res = []
                      for (let i = 0; i < othersData.length; i++) {
                          res.push('{rate' + i + '|' + filter(othersData[i].name) + '：' + othersData[i].value + '%}')
                        }
                      return res.join('\n')
                    })(vm.data[i].othersData),
                    backgroundColor: '#eee',
                    borderWidth: 1,
                    borderRadius: 4,
                    rich: ((othersData) => {
                      let otherDataColors = ['#ffab45', '#06e56d', '#68caff', '#717eff', '#2436e3']
                      let res = {}
                      for (let i = 0; i < othersData.length; i++) {
                        res['rate' + i] = {
                          width: 120,
                          align: 'center',
                          height: othersData[i].value < 20 ? 20 : othersData[i].value,
                          padding: [0, 0, 0, 0],
                          color: '#fff',
                          backgroundColor: otherDataColors[i]
                        }
                      }
                      return res
                    })(vm.data[i].othersData)
//                    rich: {
//                      rate0: {
//                        width: 100,
//                        align: 'right',
//                        height: 55.3,
//                        padding: [0, 0, 0, 0],
//                        color: '#fff',
//                        backgroundColor: '#ffab45'
//                      },
//                      rate1: {
//                        width: 100,
//                        align: 'right',
//                        height: 38.9,
//                        padding: [0, 0, 0, 0],
//                        color: '#fff',
//                        backgroundColor: '#06e56d'
//                      },
//                      rate2: {
//                        width: 100,
//                        align: 'right',
//                        height: 20,
//                        padding: [0, 0, 0, 0],
//                        color: '#fff',
//                        backgroundColor: '#68caff'
//                      },
//                      rate3: {
//                        width: 100,
//                        align: 'right',
//                        height: 20,
//                        padding: [0, 0, 0, 0],
//                        color: '#fff',
//                        backgroundColor: '#717eff'
//                      },
//                      rate4: {
//                        width: 100,
//                        align: 'right',
//                        height: 20,
//                        padding: [0, 0, 0, 0],
//                        color: '#fff',
//                        backgroundColor: '#2436e3'
//                      }
//                    }
                  }
                } : {position: vm.position}
                res.push(obj)
              }
              return res
            })(this, seriesData),
//            data: [
//              {value: 274, name: '水', label: {position: this.position}},
//              {value: 168,
//                name: '其他',
//                label: this.othersData.length > 0 ? {
//                  position: this.position,
//                  normal: {
//                    formatter: [
//                      '{rate1|一汽解放：55.3%}',
//                      '{rate2|天津丰田：38.9%}',
//                      '{rate3|天津夏利：5.8%}',
//                      '{rate4|长春丰越：3%}',
//                      '{rate5|一汽通用：2%}'
//                    ].join('\n'),
//                    backgroundColor: '#eee',
//                    borderWidth: 1,
//                    borderRadius: 4,
//                    rich: {
//                      rate1: {
//                        width: 100,
//                        align: 'right',
//                        height: 55.3,
//                        padding: [0, 0, 0, 0],
//                        color: '#fff',
//                        backgroundColor: '#ffab45'
//                      },
//                      rate2: {
//                        width: 100,
//                        align: 'right',
//                        height: 38.9,
//                        padding: [0, 0, 0, 0],
//                        color: '#fff',
//                        backgroundColor: '#06e56d'
//                      },
//                      rate3: {
//                        width: 100,
//                        align: 'right',
//                        height: 20,
//                        padding: [0, 0, 0, 0],
//                        color: '#fff',
//                        backgroundColor: '#68caff'
//                      },
//                      rate4: {
//                        width: 100,
//                        align: 'right',
//                        height: 15,
//                        padding: [0, 0, 0, 0],
//                        color: '#fff',
//                        backgroundColor: '#717eff'
//                      },
//                      rate5: {
//                        width: 100,
//                        align: 'right',
//                        height: 15,
//                        padding: [0, 0, 0, 0],
//                        color: '#fff',
//                        backgroundColor: '#2436e3'
//                      }
//                    }
//                  }
//                } : {position: this.position}},
//              {value: 335, name: '高温水', label: {position: this.position}},
//              {value: 235, name: '原煤', label: {position: this.position}},
//              {value: 310, name: '天然气', label: {position: this.position}},
//              {value: 400, name: '电', label: {position: this.position}}
//            ],
            // roseType="radius"
            roseType: this.roseType ? this.roseType : false,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }

      // 使用刚指定的配置项和数据显示图表。
      this.chart.setOption(option, true)
      this.chart.on('click', this.eConsole)
      window.addEventListener('resize', () => {
        clearTimeout(this.resizeTimer)
        this.resizeTimer = setTimeout(() => {
          this.refreshChart()
        }, 60)
      })
    },
    eConsole(param) {
      this.$emit('pieClick', param)
    },
    refreshChart() {
      this.chart.resize()
    }
  }
}
</script>
<style lang="stylus" scoped>
  @import "~common/stylus/variable.styl"
  .chart-pie
    .chart
      position: absolute
      top: 10px
      left: 0px
      right: 0px
      bottom: 10px
      z-index: 2
    .back-btn
      position: absolute
      z-index: 1
      color: #899eb6
      font-size: 15px
      cursor: pointer
      display: table-cell
      vertical-align: middle
      text-align: center
      padding: 3px 10px
      border-radius: 5px
      border: 1px solid #899eb6
      top: 12%
      right: 32%
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
