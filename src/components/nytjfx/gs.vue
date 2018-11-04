<template>
  <div class="info">
    <div class="col-lg-12 col-md-12 col-box">
      <select-title title1="用能单位" title2="基期" title3="能源类型" @search="onSearch" :showSearch="true">
        <el-select
          slot="title1"
          v-model="system_id"
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
        <span slot="title2">
          <el-date-picker
            v-model="year"
            class="date-year"
            size="mini"
            type="year"
            value-format="yyyy"
            @change="dateChange"
            placeholder="选择年">
          </el-date-picker>
          <el-select
            v-model="month"
            class="date-month"
            placeholder="选择月"
            clearable
            size="mini">
            <el-option
              v-for="item in options3"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </span>
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
              <div class="col-lg-12 col-md-12" style="height: 50px; line-height: 50px">
                <span>最大电量：5600</span>
                <span>最小电量：2100</span>
                <span>平均电量：3500</span>
                <span>标准差值：10</span>
              </div>
            </div>
            <div class="row">
              <div class="col-lg-12 col-md-12">
                <Calendar v-if="month" locale="zh-cn" :dateData="calendarData" class="ui-calendar">
                  <div slot="header-left">
                    <div style="height: 20px;line-height: 20px">
                      <span style="display: inline-block; background: #5967f1; height: 2px; width: 20px; margin-right: 5px;"></span><span>实际电量（兆瓦时）</span>
                    </div>
                    <div style="height: 20px;line-height: 20px">
                      <span style="display: inline-block; background: #06e56d; height: 8px; width: 20px; margin-right: 5px;"></span><span>实际产量（辆）</span>
                    </div>
                  </div>
                  <div
                    :class="[
                        'ui-calendar-item',
                        {
                          'is-otherMonth': item.isPrevMonth || item.isNextMonth,
                          'is-today': item.isToday
                        },
                      ]"
                    slot-scope="item"
                  >
                    <div
                      :class="['ui-calendar-item-date']">
                      {{item.date.date}}
                    </div>
                    <div
                      class="ui-calendar-item-name"
                      v-for="(item, index) in item.data"
                      :key="index"
                    >
                      <el-tooltip class="item" effect="dark" content="实际电量（兆瓦时）" placement="top-start">
                        <div style="height: 20px;line-height: 20px">
                          <span style="display: inline-block; background: #5967f1; height: 2px; width: 20px; margin-right: 5px;"></span><span>{{item.dl}}</span>
                        </div>
                      </el-tooltip>
                      <el-tooltip class="item" effect="dark" content="实际产量（辆）" placement="top-start">
                        <div style="height: 20px;line-height: 20px">
                          <span style="display: inline-block; background: #06e56d; height: 8px; width: 20px; margin-right: 5px;"></span><span>{{item.cl}}</span>
                        </div>
                      </el-tooltip>
                    </div>
                  </div>
                </Calendar>
                <el-table
                  v-if="!month"
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
        strucPie1: [],
        strucPie2: [],
        legendData: ['用量', '同期用量', '上月用量', '产量', '同期产量', '上月产量'],
        seriesData: [],
        xAxisData: [],
        y: [{name: '产量（辆）'}, {name: '电量（万千瓦时）'}],
        pieRadius: ['13%', '60%'],
        valueYear: '',
        valueMonth: '',
        valueSelect: '',
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
        options3: [
          {
            value: '01',
            label: '一月'
          },
          {
            value: '02',
            label: '二月'
          },
          {
            value: '03',
            label: '三月'
          },
          {
            value: '04',
            label: '四月'
          },
          {
            value: '05',
            label: '五月'
          },
          {
            value: '06',
            label: '六月'
          },
          {
            value: '07',
            label: '七月'
          },
          {
            value: '08',
            label: '八月'
          },
          {
            value: '09',
            label: '九月'
          },
          {
            value: '10',
            label: '十月'
          },
          {
            value: '11',
            label: '十一月'
          },
          {
            value: '12',
            label: '十二月'
          }
        ],
        tableData: [],
        colors: ['#5967f1', '#06e56d', '#7dd1ff', '#ff8e06', '#1196de', '#0c1994', '#8c6be6', '#ffc300', '#4472c6', '#838389', '#1096df'],
        noBorder: true,
        calendarData: [],
        lx: '',
        system_id: '',
        year: '',
        month: '',
        rData: {}
      }
    },
    methods: {
      fetchData() {
        fetch('get', api.nyylfxDay, {id: this.system_id, year: this.year, month: this.month, lx: this.lx}).then((res) => {
          this.rData = res.data
          let series = []
          if (res.data.yl && res.data.yl.length > 0) {
            series.push({
              name: '用量',
              type: 'bar',
              data: res.data.yl
            })
          }
          if (res.data.tqyl && res.data.tqyl.length > 0) {
            series.push({
              name: '同期用量',
              type: 'bar',
              data: res.data.tqyl
            })
          }
          if (res.data.syyl && res.data.syyl.length > 0) {
            series.push({
              name: '上月用量',
              type: 'bar',
              data: res.data.syyl
            })
          }
          if (res.data.cl && res.data.cl.length > 0) {
            series.push({
              name: '产量',
              type: 'line',
              data: res.data.cl
            })
          }
          if (res.data.tqcl && res.data.tqcl.length > 0) {
            series.push({
              name: '同期产量',
              type: 'line',
              data: res.data.tqcl
            })
          }
          if (res.data.sycl && res.data.sycl.length > 0) {
            series.push({
              name: '上月产量',
              type: 'line',
              data: res.data.sycl
            })
          }
          this.seriesData = series
        }).catch(() => {
        })
      },
      onSearch() {
        this.fetchData()
      },
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
  .info
    background: $color-sub-text
    display: flex
    flex-direction: column
    min-height: 100%
    min-width: 600px
    .date-year
      width: 100px
    .date-month
      width: 90px
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
    .ui-calendar
      margin: 0 10px 0 0;
      border-radius: 5px;
      height: 90%
      &-header
        &__left
          > button
            font-size: 12px;
            &:nth-child(2)
              margin-left: -4px
      &-modeBtn
        position: relative;
        display: inline-block;
        background: #fff;
        border: 1px solid #75c4ef;
        color: #75c4ef;
        padding: 5px 1em;
        font-size: 13px;
        line-height: 1;
        box-shadow: 0 1px 3px lighten(#75c4ef, 15%);
        min-width: 5em;
        margin-right: -1px;
        // text-indent: 0.5em;
        text-align: center
        cursor: pointer
        &:first-child
          border-top-left-radius: 3px;
          border-bottom-left-radius: 3px;
        &:last-child
          // left: -.5em;
          border-bottom-right-radius: 3px;
          border-top-right-radius: 3px
        &:active,
        &:focus
          outline: none
        &.active,
        &:active
          background: #75c4ef;
          color: #fff;
          z-index: 2
      & .k-calendar
        &-header-center
          color: #75c4ef
        &-week-title-item
          color: #75c4ef
      &-item
        padding: 5px 10px;
        color: #666;
        &.is
          &-otherMonth
            color: #bbb
          &-today
            .ui-calendar-item-date
              position: relative;
              display: inline-block;
              background: #75c4ef;
              color: #fff;
              width: 20px;
              height: 20px;
              border-radius: 50%;
              text-align: center;
              line-height: 20px;
              top: -1px
        &-name
          font-size: 12px;
          > *
            vertical-align: middle
          .del
            display: inline-block;
            cursor: pointer;
            color: inherit;
            margin-bottom: -2px

      .vue-calendar-body-row
        height: auto
</style>
