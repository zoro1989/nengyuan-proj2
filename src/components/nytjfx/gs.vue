<template>
  <div class="info">
    <div class="col-box">
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
    <div class="col-box-left-right-bottom">
      <div class="panel-box">
        <div class="row">
          <div class="table-box">
            <div class="row">
              <chart-bar-line class="chart-box"
                              :legendData="legendData"
                              :series="seriesData"
                              :xAxisData="rData.xAxisData"
                              :yAxis="y"
                              titleText="一汽大众公司2017年一月份产量与电量日趋势分析"></chart-bar-line>
            </div>
            <div class="row">
              <div style="height: 50px; line-height: 50px">
                <span>最大值：{{maxVal}}</span>
                <span>最小值：{{minVal}}</span>
                <span>平均值：{{avgVal}}</span>
              </div>
            </div>
            <div class="row">
              <!--<Calendar v-if="month" locale="zh-cn" :dateData="calendarData" class="ui-calendar">-->
              <!--<div slot="header-left">-->
              <!--<div style="height: 20px;line-height: 20px">-->
              <!--<span style="display: inline-block; background: #5967f1; height: 2px; width: 20px; margin-right: 5px;"></span><span>实际电量（兆瓦时）</span>-->
              <!--</div>-->
              <!--<div style="height: 20px;line-height: 20px">-->
              <!--<span style="display: inline-block; background: #06e56d; height: 8px; width: 20px; margin-right: 5px;"></span><span>实际产量（辆）</span>-->
              <!--</div>-->
              <!--</div>-->
              <!--<div-->
              <!--:class="[-->
              <!--'ui-calendar-item',-->
              <!--{-->
              <!--'is-otherMonth': item.isPrevMonth || item.isNextMonth,-->
              <!--'is-today': item.isToday-->
              <!--},-->
              <!--]"-->
              <!--slot-scope="item"-->
              <!--&gt;-->
              <!--<div-->
              <!--:class="['ui-calendar-item-date']">-->
              <!--{{item.date.date}}-->
              <!--</div>-->
              <!--<div-->
              <!--class="ui-calendar-item-name"-->
              <!--v-for="(item, index) in item.data"-->
              <!--:key="index"-->
              <!--&gt;-->
              <!--<el-tooltip class="item" effect="dark" content="实际电量（兆瓦时）" placement="top-start">-->
              <!--<div style="height: 20px;line-height: 20px">-->
              <!--<span style="display: inline-block; background: #5967f1; height: 2px; width: 20px; margin-right: 5px;"></span><span>{{item.dl}}</span>-->
              <!--</div>-->
              <!--</el-tooltip>-->
              <!--<el-tooltip class="item" effect="dark" content="实际产量（辆）" placement="top-start">-->
              <!--<div style="height: 20px;line-height: 20px">-->
              <!--<span style="display: inline-block; background: #06e56d; height: 8px; width: 20px; margin-right: 5px;"></span><span>{{item.cl}}</span>-->
              <!--</div>-->
              <!--</el-tooltip>-->
              <!--</div>-->
              <!--</div>-->
              <!--</Calendar>-->
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
                  :prop="month ? item + 'ri' : item + 'yue'"
                  :label="month ? item + '日' : item + '月'">
                </el-table-column>
              </el-table>
            </div>
          </div>
          <!--<div class="col-lg-4 col-md-12 table-box box-right">-->
            <!--<data-panel-title title="分析结果" :noBorder="noBorder"></data-panel-title>-->
          <!--</div>-->
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
        legendData: ['用量'],
        seriesData: [],
        xAxisData: [],
        y: [{name: '产量'}],
        pieRadius: ['13%', '60%'],
        valueYear: '',
        valueMonth: '',
        valueSelect: '',
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
          },
          {
            value: '33_d',
            label: '单车电'
          }, {
            value: '00_d',
            label: '单车水'
          }, {
            value: '32_d',
            label: '单车热力'
          }, {
            value: '15_d',
            label: '单车天然气'
          }, {
            value: '40_d',
            label: '单车能源消耗总量'
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
        colors: ['#066090', '#1196de', '#7ed2ff', '#ff8e06', '#666666', '#2436e3'],
        noBorder: true,
        calendarData: [],
        lx: '33',
        system_id: '',
        year: '',
        month: '',
        rData: {},
        maxVal: 0,
        minVal: 0,
        avgVal: 0
      }
    },
    methods: {
      fetchData() {
        fetch('get', api.nyylfxDay, {id: this.system_id, year: this.year, month: this.month}).then((res) => {
          this.rData = res.data
          // 电
          if (this.lx === '33' && res.data.d) {
            this.seriesData = [{
              name: '电',
              type: 'bar',
              data: res.data.d
            }]
            this.maxVal = res.data.dmax
            this.minVal = res.data.dmin
            this.avgVal = res.data.daverage
            let obj = {}
            obj.projectName = '实际电量'
            for (let i = 0; i < res.data.d.length; i++) {
              if (this.month) {
                let key = res.data.xAxisData[i] + 'ri'
                obj[key] = res.data.d[i]
              } else {
                let key = res.data.xAxisData[i] + 'yue'
                obj[key] = res.data.d[i]
              }
            }
            this.tableData = [obj]
            // 水
          } else if (this.lx === '00' && res.data.s) {
            this.seriesData = [{
              name: '水',
              type: 'bar',
              data: res.data.s
            }]
            this.maxVal = res.data.smax
            this.minVal = res.data.smin
            this.avgVal = res.data.saverage
            let obj = {}
            obj.projectName = '实际水量'
            for (let i = 0; i < res.data.s.length; i++) {
              if (this.month) {
                let key = res.data.xAxisData[i] + 'ri'
                obj[key] = res.data.s[i]
              } else {
                let key = res.data.xAxisData[i] + 'yue'
                obj[key] = res.data.s[i]
              }
            }
            this.tableData = [obj]
            // 热力
          } else if (this.lx === '32' && res.data.r) {
            this.seriesData = [{
              name: '热力',
              type: 'bar',
              data: res.data.r
            }]
            this.maxVal = res.data.rmax
            this.minVal = res.data.rmin
            this.avgVal = res.data.raverage
            let obj = {}
            obj.projectName = '实际热量'
            for (let i = 0; i < res.data.r.length; i++) {
              if (this.month) {
                let key = res.data.xAxisData[i] + 'ri'
                obj[key] = res.data.r[i]
              } else {
                let key = res.data.xAxisData[i] + 'yue'
                obj[key] = res.data.r[i]
              }
            }
            this.tableData = [obj]
            // 天然气
          } else if (this.lx === '15' && res.data.q) {
            this.seriesData = [{
              name: '天然气',
              type: 'bar',
              data: res.data.q
            }]
            this.maxVal = res.data.qmax
            this.minVal = res.data.qmin
            this.avgVal = res.data.qaverage
            let obj = {}
            obj.projectName = '实际气量'
            for (let i = 0; i < res.data.q.length; i++) {
              if (this.month) {
                let key = res.data.xAxisData[i] + 'ri'
                obj[key] = res.data.q[i]
              } else {
                let key = res.data.xAxisData[i] + 'yue'
                obj[key] = res.data.q[i]
              }
            }
            this.tableData = [obj]
            // 能源消耗总量
          } else if (this.lx === '40' && res.data.ny) {
            this.seriesData = [{
              name: '能源消耗总量',
              type: 'bar',
              data: res.data.ny
            }]
            this.maxVal = res.data.nymax
            this.minVal = res.data.nymin
            this.avgVal = res.data.nyaverage
            let obj = {}
            obj.projectName = '实际能源消耗总量'
            for (let i = 0; i < res.data.ny.length; i++) {
              if (this.month) {
                let key = res.data.xAxisData[i] + 'ri'
                obj[key] = res.data.ny[i]
              } else {
                let key = res.data.xAxisData[i] + 'yue'
                obj[key] = res.data.ny[i]
              }
            }
            this.tableData = [obj]
          } else if (this.lx === '33_d' && res.data.dd) {
            this.seriesData = [{
              name: '单车电',
              type: 'bar',
              data: res.data.dd
            }]
            this.maxVal = res.data.ddmax
            this.minVal = res.data.ddmin
            this.avgVal = res.data.ddaverage
            let obj = {}
            obj.projectName = '实际单车电量'
            for (let i = 0; i < res.data.dd.length; i++) {
              if (this.month) {
                let key = res.data.xAxisData[i] + 'ri'
                obj[key] = res.data.dd[i]
              } else {
                let key = res.data.xAxisData[i] + 'yue'
                obj[key] = res.data.dd[i]
              }
            }
            this.tableData = [obj]
            // 单车水
          } else if (this.lx === '00_d' && res.data.sd) {
            this.seriesData = [{
              name: '单车水',
              type: 'bar',
              data: res.data.sd
            }]
            this.maxVal = res.data.sdmax
            this.minVal = res.data.sdmin
            this.avgVal = res.data.sdaverage
            let obj = {}
            obj.projectName = '实际单车水量'
            for (let i = 0; i < res.data.sd.length; i++) {
              if (this.month) {
                let key = res.data.xAxisData[i] + 'ri'
                obj[key] = res.data.sd[i]
              } else {
                let key = res.data.xAxisData[i] + 'yue'
                obj[key] = res.data.sd[i]
              }
            }
            this.tableData = [obj]
            // 单车热力
          } else if (this.lx === '32_d' && res.data.rd) {
            this.seriesData = [{
              name: '单车热力',
              type: 'bar',
              data: res.data.rd
            }]
            this.maxVal = res.data.rdmax
            this.minVal = res.data.rdmin
            this.avgVal = res.data.rdaverage
            let obj = {}
            obj.projectName = '实际单车热力'
            for (let i = 0; i < res.data.rd.length; i++) {
              if (this.month) {
                let key = res.data.xAxisData[i] + 'ri'
                obj[key] = res.data.rd[i]
              } else {
                let key = res.data.xAxisData[i] + 'yue'
                obj[key] = res.data.rd[i]
              }
            }
            this.tableData = [obj]
            // 单车天然气
          } else if (this.lx === '15_d' && res.data.qd) {
            this.seriesData = [{
              name: '单车天然气',
              type: 'bar',
              data: res.data.qd
            }]
            this.maxVal = res.data.qdmax
            this.minVal = res.data.qdmin
            this.avgVal = res.data.qdaverage
            let obj = {}
            obj.projectName = '实际单车天然气'
            for (let i = 0; i < res.data.qd.length; i++) {
              if (this.month) {
                let key = res.data.xAxisData[i] + 'ri'
                obj[key] = res.data.qd[i]
              } else {
                let key = res.data.xAxisData[i] + 'yue'
                obj[key] = res.data.qd[i]
              }
            }
            this.tableData = [obj]
            // 单车能源消耗总量
          } else if (this.lx === '40_d' && res.data.nyd) {
            this.seriesData = [{
              name: '单车能源消耗总量',
              type: 'bar',
              data: res.data.nyd
            }]
            this.maxVal = res.data.nydmax
            this.minVal = res.data.nydmin
            this.avgVal = res.data.nydaverage
            let obj = {}
            obj.projectName = '实际单车能源消耗总量'
            for (let i = 0; i < res.data.nyd.length; i++) {
              if (this.month) {
                let key = res.data.xAxisData[i] + 'ri'
                obj[key] = res.data.nyd[i]
              } else {
                let key = res.data.xAxisData[i] + 'yue'
                obj[key] = res.data.nyd[i]
              }
            }
            this.tableData = [obj]
          }
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
    height: 100%
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
      height: 100%
      .panel-box >.row
        height: 100%
        .table-box > .row:last-child
          height: calc(100% - 400px)
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
