<template>
  <div class="info-container">
    <div class="info">
      <div class="col-lg-12 col-md-12 col-box">
        <select-title title1="用能单位" title2="基期" title3="能源类型" @search="onSearch" :showSearch="true">
          <el-select
            slot="title1"
            v-model="system_id"
            placeholder="请选择"
            size="mini">
            <el-option
              v-for="item in options1"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-date-picker
            slot="title2"
            v-model="year"
            type="year"
            size="mini"
            value-format="yyyy"
            placeholder="选择年">
          </el-date-picker>
          <el-select
            slot="title3"
            v-model="lx"
            placeholder="请选择"
            size="mini">
            <el-option
              v-for="item in options2"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </select-title>
      </div>
      <div class="col-lg-12 col-md-12 col-box-left-right-bottom">
        <div class="panel-box">
          <div class="row">
            <div class="col-lg-8 col-md-12 table-box">
              <div class="row">
                <div class="col-lg-12 col-md-12">
                  <chart-bar-line class="chart-box"
                                  :legendData="legendData"
                                  :series="seriesData"
                                  :xAxisData="xAxisData"
                                  :yAxis="y"
                                  titleText="一汽大众公司2017年一月份产量与电量日趋势分析"></chart-bar-line>
                </div>
              </div>
              <div class="row">
                <div class="col-lg-12 col-md-12" style="height: 50px; line-height: 50px">
                  <span>最大电量：5600</span>
                  <span>最小电量：2100</span>
                  <span>平均电量：3500</span>
                  <span>标准差值：10</span>
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
                      prop="projectName"
                      min-width="200"
                      label="项目名称">
                      <template slot-scope="scope">
                        <span class="department-block" :style="departmentStyle(scope.$index)"></span>
                        <span>{{ scope.row.projectName }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="1yue"
                      label="1月">
                    </el-table-column>
                    <el-table-column
                      prop="2yue"
                      label="2月">
                    </el-table-column>
                    <el-table-column
                      prop="3yue"
                      label="3月">
                    </el-table-column>
                    <el-table-column
                      prop="4yue"
                      label="4月">
                    </el-table-column>
                    <el-table-column
                      prop="5yue"
                      label="5月">
                    </el-table-column>
                    <el-table-column
                      prop="6yue"
                      label="6月">
                    </el-table-column>
                    <el-table-column
                      prop="7yue"
                      label="7月">
                    </el-table-column>
                    <el-table-column
                      prop="8yue"
                      label="8月">
                    </el-table-column>
                    <el-table-column
                      prop="9yue"
                      label="9月">
                    </el-table-column>
                    <el-table-column
                      prop="10yue"
                      label="10月">
                    </el-table-column>
                    <el-table-column
                      prop="11yue"
                      label="11月">
                    </el-table-column>
                    <el-table-column
                      prop="12yue"
                      label="12月">
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
  import ChartBarLine from 'base/chart-bar-line/chart-bar-line'
  import { api } from '@/config'
  import fetch from 'utils/fetch'
  let moment = require('moment')
  moment.locale('zh-cn')
  export default {
    components: {
      SelectTitle,
      ChartPie,
      DataPanelTitle,
      ChartBarLine
    },
    created() {
      setTimeout(() => {
        this.y = [{name: '吨标煤', min: 0.0, max: 50.0, interval: 10.0},
          {name: '吨标煤/万元', min: 0.00, max: 0.05, interval: 0.01}]
      }, 20)
    },
    data() {
      return {
        y: [],
        pieRadius: ['13%', '60%'],
        options1: [
          {
            value: '42052',
            label: '红旗工厂'
          }, {
            value: '41951',
            label: '一汽大众公司'
          }, {
            value: '41949',
            label: '一汽轿车股份有限公司'
          }, {
            value: '41954',
            label: '四川一汽丰田汽车有限公司'
          }, {
            value: '904489',
            label: '一汽丰越公司'
          }, {
            value: '41937',
            label: '一汽解放汽车有限公司'
          }, {
            value: '41939',
            label: '一汽吉林汽车有限公司'
          }, {
            value: '41953',
            label: '天津一汽丰田汽车有限公司'
          }, {
            value: '41950',
            label: '天津一汽夏利汽车有限公司'
          }, {
            value: '41952',
            label: '一汽通用轻型商用汽车有限公司'
          }, {
            value: '41938',
            label: '一汽客车有限公司'
          }, {
            value: '41917',
            label: '一汽新能源汽车有限公司'
          }, {
            value: '41924',
            label: '长春一汽富维汽车零部件股份有限公司'
          }, {
            value: '41944',
            label: '一汽铸锻有限公司'
          }, {
            value: '41945',
            label: '一汽模具制造有限公司'
          }, {
            value: '41955',
            label: '一汽丰田（长春）发动机有限公司'
          }, {
            value: '41956',
            label: '天津一汽丰田发动机有限公司'
          }, {
            value: '41992',
            label: '无锡泽根弹簧有限公司'
          }, {
            value: '42018',
            label: '一汽国际物流'
          }, {
            value: '41947',
            label: '一汽物流'
          }, {
            value: '41934',
            label: '动能分公司'
          }
        ],
        options2: [
          {
            value: '33',
            label: '电'
          }, {
            value: '00',
            label: '水'
          }, {
            value: '32',
            label: '热力'
          }, {
            value: '15',
            label: '天然气'
          }, {
            value: '40',
            label: '能源消耗总量'
          }
        ],
        tableData: [],
        colors: ['#5967f1', '#06e56d', '#7dd1ff', '#ff8e06', '#1196de', '#0c1994', '#8c6be6', '#ffc300', '#4472c6', '#838389', '#1096df'],
        noBorder: true,
        system_id: '',
        year: '',
        lx: ''
      }
    },
    methods: {
      departmentStyle(index) {
        return `background: ${this.colors[index]}`
      },
      onSearch() {
        fetch('get', api.nyfyfx, {id: this.system_id, year: this.year, lx: this.lx}).then((res) => {
          console.log(res)
        }).catch(() => {
        })
      }
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
      .date-type
        width: 60px
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
