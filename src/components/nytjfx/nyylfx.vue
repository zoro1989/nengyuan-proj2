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
          <span slot="title2">
            <el-select
              class="date-type"
              slot="title1"
              v-model="dateType"
              placeholder="请选择"
              size="mini"
              @change="selectChange">
            <el-option
              v-for="item in options2"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
            <el-date-picker
              v-model="valueMonth"
              :type="dateType"
              size="mini"
              value-format="yyyy-MM"
              @change="dateChange"
              :placeholder="dateType === 'month' ? '选择月' : '选择年'">
          </el-date-picker>
          </span>
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
                  <Calendar v-if="dateType === 'month'" startDate="2018-10-06" locale="zh-cn" :dateData="calendarData" class="ui-calendar">
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
                    v-if="dateType !== 'month'"
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
        this.legendData = ['上年同期消耗', '实际消耗', '计划消耗', '上年同期节能指标', '实际节能指标', '计划节能指标']
        this.xAxisData = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
        this.seriesData = [
          {
            name: '上年同期消耗',
            type: 'bar',
            data: [20.0, 25.0, 22.0, 21.0, 25.0, 27.0, 29.0, 27.0, 20.0, 25.0, 22.0, 21.0],
            reality: '0'
          },
          {
            name: '实际消耗',
            type: 'bar',
            data: [19.0, 31.0, 19.0, 27.0, 25.0, 31.0, 20.0, 17.0, 26.0, 31.0, 25.0, 27.0],
            reality: '1'
          },
          {
            name: '计划消耗',
            type: 'bar',
            data: [28.0, 21.0, 28.0, 28.0, 28.0, 32.0, 28.0, 22.0, 28.0, 41.0, 28.0, 28.0],
            reality: '0'
          },
          {
            name: '上年同期节能指标',
            type: 'line',
            data: [0.012, 0.013, 0.017, 0.016, 0.018, 0.017, 0.016, 0.015, 0.012, 0.013, 0.017, 0.016]
          },
          {
            name: '实际节能指标',
            type: 'line',
            data: [0.007, 0.009, 0.015, 0.005, 0.007, 0.012, 0.013, 0.019, 0.007, 0.009, 0.015, 0.005]
          },
          {
            name: '计划节能指标',
            type: 'line',
            data: [0.005, 0.012, 0.01, 0.012, 0.013, 0.018, 0.016, 0.012, 0.005, 0.012, 0.01, 0.012]
          }
        ]
        this.y = [{name: '吨标煤', min: 0.0, max: 50.0, interval: 10.0},
          {name: '吨标煤/万元', min: 0.00, max: 0.05, interval: 0.01}]
        this.strucPie1 = [{value: 274, name: '水'}, {value: 168, name: '其他'}, {value: 335, name: '高温水'}, {value: 235, name: '原煤'}, {value: 310, name: '天然气'}, {value: 400, name: '电'}]
        this.strucPie2 = [{value: 274, name: '水'}, {value: 168, name: '其他'}, {value: 335, name: '高温水'}, {value: 235, name: '原煤'}, {value: 310, name: '天然气'}, {value: 400, name: '电'}]
      }, 20)
    },
    data() {
      return {
        strucPie1: [],
        strucPie2: [],
        legendData: [],
        seriesData: [],
        xAxisData: [],
        y: [],
        pieRadius: ['13%', '60%'],
        dateType: 'month',
        valueMonth: '',
        valueSelect: '',
        options2: [{
          value: 'year',
          label: '年'
        }, {
          value: 'month',
          label: '月'
        }],
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
          projectName: '实际电量（万千瓦时）',
          '1yue': '126.7',
          '2yue': '126.7',
          '3yue': '126.7',
          '4yue': '126.7',
          '5yue': '126.7',
          '6yue': '126.7',
          '7yue': '126.7',
          '8yue': '126.7',
          '9yue': '126.7',
          '10yue': '126.7',
          '11yue': '126.7',
          '12yue': '126.7'
        }, {
          projectName: '同期电量（万千瓦时）',
          '1yue': '126.7',
          '2yue': '126.7',
          '3yue': '126.7',
          '4yue': '126.7',
          '5yue': '126.7',
          '6yue': '126.7',
          '7yue': '126.7',
          '8yue': '126.7',
          '9yue': '126.7',
          '10yue': '126.7',
          '11yue': '126.7',
          '12yue': '126.7'
        }, {
          projectName: '上月电量（万千瓦时）',
          '1yue': '126.7',
          '2yue': '126.7',
          '3yue': '126.7',
          '4yue': '126.7',
          '5yue': '126.7',
          '6yue': '126.7',
          '7yue': '126.7',
          '8yue': '126.7',
          '9yue': '126.7',
          '10yue': '126.7',
          '11yue': '126.7',
          '12yue': '126.7'
        }, {
          projectName: '实际产量（辆）',
          '1yue': '126.7',
          '2yue': '126.7',
          '3yue': '126.7',
          '4yue': '126.7',
          '5yue': '126.7',
          '6yue': '126.7',
          '7yue': '126.7',
          '8yue': '126.7',
          '9yue': '126.7',
          '10yue': '126.7',
          '11yue': '126.7',
          '12yue': '126.7'
        }, {
          projectName: '实际产量（辆）',
          '1yue': '126.7',
          '2yue': '126.7',
          '3yue': '126.7',
          '4yue': '126.7',
          '5yue': '126.7',
          '6yue': '126.7',
          '7yue': '126.7',
          '8yue': '126.7',
          '9yue': '126.7',
          '10yue': '126.7',
          '11yue': '126.7',
          '12yue': '126.7'
        }, {
          projectName: '上月产量（辆）',
          '1yue': '126.7',
          '2yue': '126.7',
          '3yue': '126.7',
          '4yue': '126.7',
          '5yue': '126.7',
          '6yue': '126.7',
          '7yue': '126.7',
          '8yue': '126.7',
          '9yue': '126.7',
          '10yue': '126.7',
          '11yue': '126.7',
          '12yue': '126.7'
        }, {
          projectName: '同比电量增幅%',
          '1yue': '126.7',
          '2yue': '126.7',
          '3yue': '126.7',
          '4yue': '126.7',
          '5yue': '126.7',
          '6yue': '126.7',
          '7yue': '126.7',
          '8yue': '126.7',
          '9yue': '126.7',
          '10yue': '126.7',
          '11yue': '126.7',
          '12yue': '126.7'
        }, {
          projectName: '同比产量增幅%',
          '1yue': '126.7',
          '2yue': '126.7',
          '3yue': '126.7',
          '4yue': '126.7',
          '5yue': '126.7',
          '6yue': '126.7',
          '7yue': '126.7',
          '8yue': '126.7',
          '9yue': '126.7',
          '10yue': '126.7',
          '11yue': '126.7',
          '12yue': '126.7'
        }, {
          projectName: '环比电量增幅%',
          '1yue': '126.7',
          '2yue': '126.7',
          '3yue': '126.7',
          '4yue': '126.7',
          '5yue': '126.7',
          '6yue': '126.7',
          '7yue': '126.7',
          '8yue': '126.7',
          '9yue': '126.7',
          '10yue': '126.7',
          '11yue': '126.7',
          '12yue': '126.7'
        }, {
          projectName: '环比产量增幅%',
          '1yue': '126.7',
          '2yue': '126.7',
          '3yue': '126.7',
          '4yue': '126.7',
          '5yue': '126.7',
          '6yue': '126.7',
          '7yue': '126.7',
          '8yue': '126.7',
          '9yue': '126.7',
          '10yue': '126.7',
          '11yue': '126.7',
          '12yue': '126.7'
        }],
        colors: ['#5967f1', '#06e56d', '#7dd1ff', '#ff8e06', '#1196de', '#0c1994', '#8c6be6', '#ffc300', '#4472c6', '#838389', '#1096df'],
        noBorder: true,
        calendarData: [
          {
            date: '2018-10-01',
            dl: '352.65',
            cl: '410.00'
          },
          {
            date: '2018-10-02',
            dl: '352.65',
            cl: '410.00'
          },
          {
            date: '2018-10-03',
            dl: '352.65',
            cl: '410.00'
          },
          {
            date: '2018-10-04',
            dl: '352.65',
            cl: '410.00'
          },
          {
            date: '2018-10-05',
            dl: '352.65',
            cl: '410.00'
          }
        ]
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
