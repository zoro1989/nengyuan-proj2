<template>
  <div class="realtime-tripping-container">
    <div class="realtime-tripping">
      <div class="tripping-title">
        <div class="title-l">
          <span class="picker-txt">选择日期</span>
          <el-date-picker
            v-model="valueMonth"
            type="month"
            size="mini"
            placeholder="选择月">
          </el-date-picker>
          <span class="picker-txt">能源类别</span>
          <el-select v-model="valueNylb" placeholder="请选择" size="mini">
            <el-option
              v-for="item in options1"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="title-r">
          <span @click="onClose" class="ripple"><i class="fa fa-times"></i></span>
        </div>
      </div>
      <div class="tripping-content">
        <div class="row">
          <div class="col-lg-12 col-md-12 col-xs-12 col-box-left-right-bottom">
            <chart-bar class="chart-box"
                       titleText="单车耗电日对比分析"
                       yAxisTitle="千瓦时"
                       seriesName="能耗"
                       :series="seriesData2"
                       :xAxisData="xAxisData1"
                       chartColor="#48daf6"></chart-bar>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-12 col-md-12 col-xs-12 col-box-left-right-bottom">
            <chart-bar class="chart-box"
                       titleText="单车耗电日对比分析"
                       yAxisTitle="千瓦时"
                       seriesName="耗电"
                       :series="seriesData2"
                       :xAxisData="xAxisData1"
                       chartColor="#916fe9"></chart-bar>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ChartBar from 'base/chart-bar/chart-bar'
export default {
  components: {
    ChartBar
  },
  data() {
    return {
      showArea: true,
      valueMonth: '',
      valueNylb: '',
      options1: [{
        value: 'dchd',
        label: '电车耗电'
      }, {
        value: 'dchs',
        label: '单车耗水'
      }, {
        value: 'dchr',
        label: '单车耗热'
      }, {
        value: 'dchtrq',
        label: '单车耗天然气'
      }],
      selectedOptions: [],
      seriesData2: [],
      xAxisData1: []
    }
  },
  created() {
    setTimeout(() => {
      this.xAxisData1 = ['红旗工厂', '一汽大众', '一汽轿车', '一汽吉林', '新能源汽车', '长春丰越', '天津夏利', '天津丰田', '一汽通用(长春)', '四川丰田', '一汽解放']
      this.seriesData2 = [
        {
          data: [180, 200, 120, 300, 250, 310, 290, 190, 210, 200, 180]
        }
      ]
    })
  },
  methods: {
    channgeChart(status) {
      this.showflag = status
    },
    handleChange(value) {
      console.log(value)
    },
    onClose() {
      this.$router.replace('/ssxz')
    }
  },
  mounted() {

  }
}
</script>
<style scoped lang="stylus">
  @import "~common/stylus/variable.styl"
  @import "~common/stylus/mixin.styl"
  .realtime-tripping-container
    overflow: auto
    -webkit-overflow-scrolling: touch
    position: absolute
    top: 0
    left: 0
    right: 0
    bottom: 0
    .realtime-tripping
      background: $color-sub-text
      display: flex
      flex-direction: column
      min-height: 100%
      min-width: 600px
      .tripping-title
        margin: 10px
        height: 40px
        line-height: 40px
        flex: 0 0 40px
        background: #fff
        border-radius: 5px
        color: #333
        display: flex
        justify-content: space-between
        padding: 0 10px 0 10px
        .title-l
          .picker-txt
            padding: 0 5px 0 15px
        .title-r
          .analyze-btn
            background: #899eb6
            color: #fff
            padding: 2px 10px
            border-radius: 3px
            margin-right: 10px
            cursor: pointer
          .fa
            margin: 0 5px
            color: #899eb6
            font-size: $font-size-large
            cursor: pointer
      .tripping-content
        display: flex
        flex: 1
        flex-direction: column
        height: 100%
        .row
          flex: 1
        .sub-title
          text-align: center
          margin: 0 0 10px 0
        .chart-box
          padding: 0 10px 10px 10px
          .chart
            position: relative
            min-height: 250px
            height: 100%
            background: #fff
            border-radius: 5px
</style>
