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
            @change="selectChange"
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
        <div>
          <div class="col-box-left-right-bottom">
            <chart-bar class="chart-box"
                       :titleText="'单车耗' + chartTitle + '日对比分析'"
                       :yAxis="yAxis"
                       :series="seriesData1"
                       :xAxisData="data1.xAxisData"
                       chartColor="#48daf6"></chart-bar>
          </div>
        </div>
        <div>
          <div class="col-box-left-right-bottom">
            <chart-bar class="chart-box"
                       :titleText="'单车耗' + chartTitle + '日对比分析'"
                       :yAxis="yAxis"
                       :series="seriesData2"
                       :xAxisData="data2.xAxisData"
                       chartColor="#916fe9"></chart-bar>
          </div>
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
      options: [
        {
          value: '2',
          label: '整车制造',
          children: [
            {
              value: '42052',
              label: '红旗工厂'
            },
            {
              value: '41951',
              label: '一汽大众公司',
              children: [
                {
                  value: '1546481',
                  label: '一汽大众长春工厂'
                },
                {
                  value: '2601331',
                  label: '一汽大众天津工厂'
                },
                {
                  value: '2601332',
                  label: '一汽大众青岛工厂'
                },
                {
                  value: '1546527',
                  label: '一汽大众佛山工厂'
                },
                {
                  value: '42073',
                  label: '一汽大众成都工厂'
                }
              ]
            },
            {
              value: '41949',
              label: '一汽轿车股份有限公司',
              children: [
                {
                  value: '42054',
                  label: '一工厂'
                },
                {
                  value: '42055',
                  label: '二工厂'
                },
                {
                  value: '42056',
                  label: '发传中心'
                },
                {
                  value: '41954',
                  label: '四川一汽丰田汽车有限公司'
                }
              ]
            },
            {
              value: '41954',
              label: '四川一汽丰田汽车有限公司'
            },
            {
              value: '904489',
              label: '一汽丰越公司'
            },
            {
              value: '41937',
              label: '一汽解放汽车有限公司'
            },
            {
              value: '41939',
              label: '一汽吉林汽车有限公司'
            },
            {
              value: '41953',
              label: '天津一汽丰田汽车有限公司'
            },
            {
              value: '41950',
              label: '天津一汽夏利汽车有限公司'
            },
            {
              value: '41952',
              label: '一汽通用轻型商用汽车有限公司'
            },
            {
              value: '41938',
              label: '一汽客车有限公司'
            },
            {
              value: '41917',
              label: '一汽新能源汽车有限公司'
            }
          ]
        },
        {
          value: '23',
          label: '零部件',
          children: [
            {
              value: '41924',
              label: '长春一汽富维汽车零部件股份有限公司'
            },
            {
              value: '41944',
              label: '一汽铸锻有限公司'
            },
            {
              value: '41945',
              label: '一汽模具制造有限公司'
            },
            {
              value: '41955',
              label: '一汽丰田（长春）发动机有限公司'
            },
            {
              value: '41956',
              label: '天津一汽丰田发动机有限公司'
            },
            {
              value: '41992',
              label: '无锡泽根弹簧有限公司'
            }
          ]
        },
        {
          value: '30',
          label: '物流',
          children: [
            {
              value: '42018',
              label: '一汽国际物流'
            },
            {
              value: '41947',
              label: '一汽物流'
            },
            {
              value: '41934',
              label: '动能分公司'
            }
          ]
        }

      ],
      selectedOptions: [],
      options1: [{
        value: 'D_D',
        label: '单车电'
      }, {
        value: 'S_D',
        label: '单车水'
      }, {
        value: 'R_D',
        label: '单车热'
      }, {
        value: 'Q_D',
        label: '单车气'
      }],
      yAxis: [{name: '千瓦时'}],
      time: moment().format('YYYY-MM-DD'),
      lx: 'D_D',
      data1: {},
      data2: {},
      chartTitle: '电',
      system_id: '41951',
      seriesData1: [],
      seriesData2: []
    }
  },
  created() {
    this.fetchData()
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
    selectChange(value) {
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
        flex-direction: column
        height: 100%
        .col-box-left-right-bottom
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
