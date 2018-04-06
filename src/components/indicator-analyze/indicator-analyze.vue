<template>
  <scroll class="indicator-analyze">
    <div class="row">
      <div id="c1" class="col-md-6"></div>
    </div>
  </scroll>
</template>
<script>
import Scroll from 'base/scroll/scroll'
import G2 from '@antv/g2'
export default {
  components: {
    Scroll
  },
  data() {
    return {
      roseView: undefined
    }
  },
  mounted() {
    this.initChart()
  },
  methods: {
    initChart() {
      const chart = new G2.Chart({
        container: 'c1',
        forceFit: true,
        height: 600
      })
      chart.legend(false)
      const data = [
        { year: '24', population: 0 },
        { year: '25', population: 0 },
        { year: '26', population: 0 },
        { year: '27', population: 0 },
        { year: '28', population: 0 },
        { year: '29', population: 0 },
        { year: '1999', population: 0 },
        { year: '2000', population: 0 },
        { year: '2001', population: 0 },
        { year: '2002', population: 0 },
        { year: '2003', population: 0 },
        { year: '2004', population: 0 },
        { year: '2005', population: 0 },
        { year: '2006', population: 31.7 },
        { year: '2007', population: 33 },
        { year: '2008', population: 46 },
        { year: '2009', population: 38.3 },
        { year: '2010', population: 28 },
        { year: '2011', population: 42.5 },
        { year: '2012', population: 30.3 },
        { year: '2013', population: 2.3 },
        { year: '2014', population: 4.3 },
        { year: '2015', population: 5.3 },
        { year: '2016', population: 3.3 }
      ]
      const qdata = [
        {'question': '其他', 'percent': 0.20},
        {'question': '物流研发', 'percent': 0.5},
        {'question': '零部件加工', 'percent': 0.6},
        {'question': '整车制造', 'percent': 0.9}
      ]
      this.roseChart(chart, data)
      this.yujueCart(chart, qdata)
      chart.render()
    },
    roseChart(chart, data, chartColor = '#33ccff') {
      if (this.roseView) {
        this.roseView.clear()
      }
      this.roseView = chart.view()
      this.roseView.source(data)
      this.roseView.coord('polar', {
        radius: 1, // 设置半径，值范围为 0 至 1
        innerRadius: 0.6, // 空心圆的半径，值范围为 0 至 1
        startAngle: 2 * Math.PI / 2, // 极坐标的起始角度，单位为弧度
        endAngle: 4 * Math.PI / 2// 极坐标的结束角度，单位为弧度
      })
      this.roseView.axis(false)
      this.roseView.interval()
        .position('year*population')
        .tooltip('population', val => {
          return {
            name: '一汽大众',
            value: '占比:' + val + '%'
          }
        })
        .color(chartColor)
        // .label('year', {
        //   offset: -15
        // })
        .style({
          lineWidth: 1,
          stroke: '#fff'
        })
      this.roseView.repaint()
    },
    yujueCart(chart, data) {
      const percentView = chart.view()
      percentView.source(data, {
        'percent': { min: 0, max: 1 }
      })

      percentView.coord('polar', {
        radius: 0.6,
        innerRadius: 0.58,
        startAngle: 2 * Math.PI / 2,
        endAngle: 4 * Math.PI / 2
      }).transpose()
      percentView.interval()
        .position('question*percent')
        .color('percent', ['#00ff66', '#FFFF00', '#FF0000'])
        .size(8)
        .tooltip('percent', val => {
          return {
            name: '占比',
            value: val * 100 + '%'
          }
        })
        .label('percent', {
          offset: -5,
          formatter(text, item, index) {
            return text * 100 + '%'
          }
        })
      percentView.on('click', ev => {
        const data2 = [
          { year: '24', population: 0 },
          { year: '25', population: 0 },
          { year: '26', population: 0 },
          { year: '2014', population: 4.3 },
          { year: '2015', population: 5.3 },
          { year: '2016', population: 3.3 },
          { year: '27', population: 0 },
          { year: '28', population: 0 },
          { year: '29', population: 0 },
          { year: '1999', population: 0 },
          { year: '2006', population: 31.7 },
          { year: '2007', population: 33 },
          { year: '2008', population: 46 },
          { year: '2009', population: 38.3 },
          { year: '2010', population: 28 },
          { year: '2000', population: 0 },
          { year: '2001', population: 0 },
          { year: '2002', population: 0 },
          { year: '2003', population: 0 },
          { year: '2004', population: 0 },
          { year: '2005', population: 0 },
          { year: '2011', population: 42.5 },
          { year: '2012', population: 30.3 },
          { year: '2013', population: 2.3 }
        ]
        this.roseChart(chart, data2, ev.data.color)
      })
    }
  }
}
</script>
<style scoped lang="stylus">
  .indicator-analyze
    overflow: hidden
    position: absolute
    top: 60px
    left: 0
    right: 0
    bottom: 0
</style>
