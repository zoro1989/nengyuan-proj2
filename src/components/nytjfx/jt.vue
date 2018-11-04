<template>
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
                                :xAxisData="rData.xAxisData"
                                :yAxis="y"
                                titleText="一汽大众公司2017年一月份产量与电量日趋势分析"></chart-bar-line>
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
                    v-for="item in rData.xAxisData"
                    :key="item"
                    :prop="item + 'yue'"
                    :label="item + '月'">
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
    },
    data() {
      return {
        pieRadius: ['13%', '60%'],
        options1: [
          {
            value: '3',
            label: '红旗工厂'
          }, {
            value: '4',
            label: '一汽大众公司'
          }, {
            value: '10',
            label: '一汽轿车股份有限公司'
          }, {
            value: '14',
            label: '四川一汽丰田汽车有限公司'
          }, {
            value: '15',
            label: '一汽丰越公司'
          }, {
            value: '16',
            label: '一汽解放汽车有限公司'
          }, {
            value: '17',
            label: '一汽吉林汽车有限公司'
          }, {
            value: '18',
            label: '天津一汽丰田汽车有限公司'
          }, {
            value: '19',
            label: '天津一汽夏利汽车有限公司'
          }, {
            value: '20',
            label: '一汽通用轻型商用汽车有限公司'
          }, {
            value: '21',
            label: '一汽客车有限公司'
          }, {
            value: '22',
            label: '一汽新能源汽车有限公司'
          }, {
            value: '24',
            label: '长春一汽富维汽车零部件股份有限公司'
          }, {
            value: '25',
            label: '一汽铸锻有限公司'
          }, {
            value: '26',
            label: '一汽模具制造有限公司'
          }, {
            value: '27',
            label: '一汽丰田（长春）发动机有限公司'
          }, {
            value: '28',
            label: '天津一汽丰田发动机有限公司'
          }, {
            value: '29',
            label: '无锡泽根弹簧有限公司'
          }, {
            value: '31',
            label: '一汽国际物流'
          }, {
            value: '32',
            label: '一汽物流'
          }, {
            value: '33',
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
        colors: ['#066090', '#1196de', '#7ed2ff', '#ff8e06', '#666666', '#2436e3'],
        noBorder: true,
        system_id: '',
        year: '',
        lx: '',
        rData: {},
        legendData: ['用量', '同期用量', '上月用量', '产量', '同期产量', '上月产量'],
        seriesData: [],
        y: [{name: '产量（辆）'}, {name: '电量（万千瓦时）'}]
      }
    },
    methods: {
      departmentStyle(index) {
        return `background: ${this.colors[index]}`
      },
      onSearch() {
        fetch('get', api.nyylfxJituan, {id: this.system_id, year: this.year, lx: this.lx}).then((res) => {
          let series = []
          if (res.data.yl && res.data.yl.length > 0) {
            series.push({
              name: '用量',
              type: 'bar',
              data: res.data.yl
            })
            let obj = {}
            obj.projectName = '用量'
            for (let i = 0; i < res.data.yl.length; i++) {
              let key = i + 1 + 'yue'
              obj[key] = res.data.yl[i]
            }
            this.tableData.push(obj)
          }
          if (res.data.tqyl && res.data.tqyl.length > 0) {
            series.push({
              name: '同期用量',
              type: 'bar',
              data: res.data.tqyl
            })
            let obj = {}
            obj.projectName = '同期用量'
            for (let i = 0; i < res.data.tqyl.length; i++) {
              let key = i + 1 + 'yue'
              obj[key] = res.data.tqyl[i]
            }
            this.tableData.push(obj)
          }
          if (res.data.syyl && res.data.syyl.length > 0) {
            series.push({
              name: '上月用量',
              type: 'bar',
              data: res.data.syyl
            })
            let obj = {}
            obj.projectName = '上月用量'
            for (let i = 0; i < res.data.syyl.length; i++) {
              let key = i + 1 + 'yue'
              obj[key] = res.data.syyl[i]
            }
            this.tableData.push(obj)
          }
          if (res.data.cl && res.data.cl.length > 0) {
            series.push({
              name: '产量',
              type: 'line',
              data: res.data.cl
            })
            let obj = {}
            obj.projectName = '产量'
            for (let i = 0; i < res.data.cl.length; i++) {
              let key = i + 1 + 'yue'
              obj[key] = res.data.cl[i]
            }
            this.tableData.push(obj)
          }
          if (res.data.tqcl && res.data.tqcl.length > 0) {
            series.push({
              name: '同期产量',
              type: 'line',
              data: res.data.tqcl
            })
            let obj = {}
            obj.projectName = '同期产量'
            for (let i = 0; i < res.data.tqcl.length; i++) {
              let key = i + 1 + 'yue'
              obj[key] = res.data.tqcl[i]
            }
            this.tableData.push(obj)
          }
          if (res.data.sycl && res.data.sycl.length > 0) {
            series.push({
              name: '上月产量',
              type: 'line',
              data: res.data.sycl
            })
            let obj = {}
            obj.projectName = '上月产量'
            for (let i = 0; i < res.data.sycl.length; i++) {
              let key = i + 1 + 'yue'
              obj[key] = res.data.sycl[i]
            }
            this.tableData.push(obj)
          }
          this.seriesData = series
          this.rData = res.data
        }).catch(() => {
        })
      }
    }
  }
</script>
<style lang="stylus" scoped>
  @import "~common/stylus/variable.styl"
  @import "~common/stylus/mixin.styl"
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
