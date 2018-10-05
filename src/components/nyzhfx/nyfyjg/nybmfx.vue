<template>
  <div class="info-container">
    <div class="info">
      <div class="col-lg-12 col-md-12 col-box">
        <select-title title1="用能单位" title2="基期">
          <el-select
            slot="title1"
            v-model="valueSelect"
            placeholder="请选择"
            size="mini"
            @change="selectChange">
            <el-option
              v-for="item in options1"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-date-picker
            slot="title2"
            v-model="valueMonth"
            type="month"
            size="mini"
            value-format="yyyy-MM"
            @change="dateChange"
            placeholder="选择月">
          </el-date-picker>
        </select-title>
      </div>
      <div class="col-lg-12 col-md-12 col-box-left-right-bottom">
        <div class="panel-box">
          <div class="row">
            <div class="col-lg-8 col-md-12 table-box">
              <div class="row">
                <div class="col-lg-6 col-md-12">
                  <chart-pie class="chart-box"
                             titleText="2015年整车制造能源消耗结构"
                             :radius="pieRadius"
                             :seriesData="strucPie1"></chart-pie>
                </div>
                <div class="col-lg-6 col-md-12">
                  <chart-pie class="chart-box"
                             titleText="2014年整车制造能源消耗结构"
                             :radius="pieRadius"
                             :seriesData="strucPie2"></chart-pie>
                </div>
              </div>
              <div class="row">
                <div class="col-lg-12 col-md-12">
                  <el-table
                    :data="tableData"
                    border
                    header-cell-class-name="header-cell-class-name"
                    style="width: 99%">
                    <el-table-column
                      prop="department"
                      min-width="150"
                      label="用能部门">
                      <template slot-scope="scope">
                        <span class="department-block" :style="departmentStyle(scope.$index)"></span>
                        <span>{{ scope.row.department }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="2015年占比">
                      <el-table-column
                        prop="nyxhl1"
                        label="能源消耗量（吨标煤）">
                      </el-table-column>
                      <el-table-column
                        prop="percent1"
                        label="占集团公司总量百分比">
                      </el-table-column>
                    </el-table-column>
                    <el-table-column
                      label="2014年占比">
                      <el-table-column
                        prop="nyxhl2"
                        label="能源消耗量（吨标煤）">
                      </el-table-column>
                      <el-table-column
                        prop="percent2"
                        label="占集团公司总量百分比">
                      </el-table-column>
                    </el-table-column>
                  </el-table>
                </div>
              </div>
            </div>
            <div class="col-lg-4 col-md-12 table-box box-right">
              <data-panel-title title="分析结果" :noBorder="noBorder"></data-panel-title>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import SelectTitle from 'base/select-title/select-title'
  import DataPanelTitle from 'base/data-panel-title/data-panel-title'
  import ChartPie from 'base/chart-pie/chart-pie'
  let moment = require('moment')
  moment.locale('zh-cn')
  export default {
    components: {
      SelectTitle,
      ChartPie,
      DataPanelTitle
    },
    created() {
      setTimeout(() => {
        this.strucPie1 = [{value: 274, name: '水'}, {value: 168, name: '其他'}, {value: 335, name: '高温水'}, {value: 235, name: '原煤'}, {value: 310, name: '天然气'}, {value: 400, name: '电'}]
        this.strucPie2 = [{value: 274, name: '水'}, {value: 168, name: '其他'}, {value: 335, name: '高温水'}, {value: 235, name: '原煤'}, {value: 310, name: '天然气'}, {value: 400, name: '电'}]
      }, 20)
    },
    data() {
      return {
        strucPie1: [],
        strucPie2: [],
        pieRadius: ['13%', '60%'],
        valueMonth: '',
        valueSelect: '',
        options1: [{
          value: '1',
          label: '集团公司'
        }, {
          value: '2',
          label: '红旗工厂'
        }, {
          value: '3',
          label: '一汽轿车股份有限公司'
        }, {
          value: '4',
          label: '一汽解放汽车有限公司'
        }, {
          value: '5',
          label: '一汽客车有限公司'
        }, {
          value: '6',
          label: '长春丰越'
        }, {
          value: '7',
          label: '一汽大众公司'
        }, {
          value: '8',
          label: '天津夏利'
        }, {
          value: '9',
          label: '一汽通用轻型商用汽车有限公司'
        }, {
          value: '10',
          label: '四川丰田'
        }, {
          value: '11',
          label: '一汽富维'
        }],
        tableData: [{
          department: '一汽大众汽车有限公司',
          nyxhl1: '吨标煤',
          percent1: '43206.0',
          nyxhl2: '26.7',
          percent2: '26.7'
        }, {
          department: '一汽大众汽车有限公司',
          nyxhl1: '吨标煤',
          percent1: '43206.0',
          nyxhl2: '26.7',
          percent2: '26.7'
        }, {
          department: '一汽大众汽车有限公司',
          nyxhl1: '吨标煤',
          percent1: '43206.0',
          nyxhl2: '26.7',
          percent2: '26.7'
        }, {
          department: '一汽大众汽车有限公司',
          nyxhl1: '吨标煤',
          percent1: '43206.0',
          nyxhl2: '26.7',
          percent2: '26.7'
        }, {
          department: '一汽大众汽车有限公司',
          nyxhl1: '吨标煤',
          percent1: '43206.0',
          nyxhl2: '26.7',
          percent2: '26.7'
        }, {
          department: '一汽大众汽车有限公司',
          nyxhl1: '吨标煤',
          percent1: '43206.0',
          nyxhl2: '26.7',
          percent2: '26.7'
        }, {
          department: '一汽大众汽车有限公司',
          nyxhl1: '吨标煤',
          percent1: '43206.0',
          nyxhl2: '26.7',
          percent2: '26.7'
        }, {
          department: '一汽大众汽车有限公司',
          nyxhl1: '吨标煤',
          percent1: '43206.0',
          nyxhl2: '26.7',
          percent2: '26.7'
        }],
        colors: ['#5967f1', '#06e56d', '#7dd1ff', '#ff8e06', '#1196de', '#0c1994', '#8c6be6', '#ffc300', '#4472c6', '#838389', '#1096df'],
        noBorder: true
      }
    },
    methods: {
      departmentStyle(index) {
        return `background: ${this.colors[index]}`
      },
      dateChange(value) {
        this.dateTime = value
      },
      selectChange(value) {}
    }
  }
</script>
<style lang="stylus" scoped>
  @import "~common/stylus/variable.styl"
  @import "~common/stylus/mixin.styl"
  .info-container
    overflow: auto
    -webkit-overflow-scrolling: touch
    position: absolute
    top: 0
    left: 0
    right: 0
    bottom: 0
    .info
      background: $color-sub-text
      display: flex
      flex-direction: column
      min-height: 100%
      min-width: 600px
      .department-block
        display: inline-block
        width: 25px
        height: 10px
      .col-box-left-right-bottom
        flex: 1
        .panel-box >.row
          height: 100%
      .chart-box
        min-height: 350px
        border-radius: 0px
</style>
