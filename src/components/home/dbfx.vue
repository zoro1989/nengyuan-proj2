<template>
  <div class="realtime-tripping-container">
    <div class="realtime-tripping">
      <div class="tripping-title">
        <div class="title-l">
          <span class="picker-txt">选择日期</span>
          <el-date-picker
            v-model="time"
            value-format="yyyy-MM-dd"
            size="mini"
            placeholder="选择日期">
          </el-date-picker>
          <span class="picker-txt">能源类别</span>
          <el-select
            v-model="lx"
            placeholder="请选择"
            size="mini">
            <el-option
              v-for="item in options1"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-button class="search-btn" type="primary" icon="el-icon-search" size="mini" @click="onSearch">搜索</el-button>
        </div>
        <div class="title-r">
          <span @click="onClose" class="ripple"><i class="fa fa-times"></i></span>
        </div>
      </div>
      <div class="tripping-content">
        <div class="col-box-left-right-bottom">
          <chart-bar class="chart-box"
                     :titleText="chartTitle"
                     :yAxis="yAxis"
                     :series="seriesData1"
                     :xAxisData="data1.xAxisData"
                     chartColor="#48daf6"></chart-bar>
        </div>
        <div class="col-box-left-right-bottom">
          <chart-bar class="chart-box"
                     :titleText="chartTitle"
                     :yAxis="yAxis"
                     :series="seriesData2"
                     :xAxisData="data2.xAxisData"
                     chartColor="#916fe9"></chart-bar>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ChartBar from 'base/chart-bar/chart-bar'
import { api } from '@/config'
import fetch from 'utils/fetch'
let moment = require('moment')
moment.locale('zh-cn')
export default {
  components: {
    ChartBar
  },
  data() {
    return {
      showArea: true,
      selectedOptions: [],
      options1: [{
        value: 'D_D',
        label: '单车耗电'
      }, {
        value: 'S_D',
        label: '单车耗水'
      }, {
        value: 'R_D',
        label: '单车耗热'
      }, {
        value: 'Q_D',
        label: '单车耗气'
      }],
      time: moment().format('YYYY-MM-DD'),
      lx: 'D_D',
      data1: {},
      data2: {},
      system_id: '41951',
      seriesData1: [],
      seriesData2: []
    }
  },
  created() {
    this.fetchData()
  },
  computed: {
    yAxis() {
      if (this.lx === 'D_D') {
        return [{name: '万千瓦时'}]
      } else if (this.lx === 'S_D') {
        return [{name: '吨'}]
      } else if (this.lx === 'R_D') {
        return [{name: '吉焦'}]
      } else if (this.lx === 'Q_D') {
        return [{name: '万立方米'}]
      } else {
        return []
      }
    },
    chartTitle() {
      let orgId = this.options1.findIndex((item) => {
        return this.lx === item.value
      })
      let orgName = orgId >= 0 ? this.options1[orgId].label : ''
      if (this.time && this.lx) {
        let monthText = moment(this.time).format('YYYY年MM月DD')
        return monthText + orgName + '日对比分析'
      } else {
        return ''
      }
    }
  },
  methods: {
    fetchData() {
      fetch('get', api.dayolumnOrder, {time: this.time, column_name: this.lx}).then((res) => {
        this.data1 = res.data.data1
        this.seriesData1 = [
            {
              name: '用量',
              data: res.data.data1.seriesData
            }
        ]
        this.data2 = res.data.data2
        this.seriesData2 = [
          {
            name: '用量',
            data: res.data.data2.seriesData
          }
        ]
      }).catch(() => {
        this.data1 = {}
        this.data2 = {}
      })
    },
    channgeChart(status) {
      this.showflag = status
    },
    selectUnitChange(value) {
      this.system_id = value[value.length - 1]
    },
    onSearch() {
      this.fetchData()
    },
    onClose() {
      this.$router.replace('/home/ssxz')
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
        .chart-box
          padding: 0 10px 10px 10px
          min-height: calc(50vh - 75px)
</style>
