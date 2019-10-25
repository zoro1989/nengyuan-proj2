<template>
  <div class="info-container">
    <div class="info">
      <div class="col-box">
        <select-title title1="用能单位" title2="选择日期" @search="onSearch" :showSearch="true">
          <el-select
            slot="title1"
            v-model="system_id"
            @change="selectChange"
            clearable
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
            v-model="time"
            type="month"
            size="mini"
            value-format="yyyy-MM"
            placeholder="选择日期">
          </el-date-picker>
        </select-title>
      </div>
      <div class="col-box-left-right-bottom">
        <div class="panel-box" v-loading="loading">
          <div class="row">
            <div class="table-box">
              <data-panel-title :title="chartTitle" :noBorder="noBorder"></data-panel-title>
              <el-table
                :data="rData"
                key="table1"
                v-if="system_id === '1'"
                border
                :header-cell-style="headerCellStyle"
                header-cell-class-name="header-cell-class-name"
                style="width: 99%">
                <el-table-column
                  prop="org"
                  align="center"
                  min-width="200"
                  label="部门名称">
                  <template slot-scope="scope">
                    <span class="org-title" @click="orgClick(scope.$index)">{{ scope.row.org }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  align="center"
                  prop="sl"
                  label="数量（台）">
                </el-table-column>
                <el-table-column
                  align="center"
                  prop="edgl"
                  label="容量（KVA）">
                </el-table-column>
                <el-table-column
                  align="center"
                  label="用电单耗(千万时/立方米)">
                  <el-table-column
                    prop="hege"
                    align="center"
                    label="合格">
                  </el-table-column>
                  <el-table-column
                    prop="buhege"
                    align="center"
                    label="不合格">
                  </el-table-column>
                  <el-table-column
                    prop="jinggao"
                    align="center"
                    label="警告">
                  </el-table-column>
                </el-table-column>
              </el-table>
              <data-panel-title
                v-if="rData2 && rData2.length > 0 && system_id === '1'"
                :title="subTitle + '部门空压机能效分析'"
                :noBorder="noBorder"></data-panel-title>
              <el-table
                v-if="rData2 && rData2.length > 0 && system_id === '1'"
                :data="rData2"
                key="table2"
                border
                :header-cell-style="headerCellStyle"
                header-cell-class-name="header-cell-class-name"
                style="width: 99%">
                <el-table-column
                  prop="org"
                  align="center"
                  min-width="200"
                  label="部门名称">
                  <template slot-scope="scope">
                    <span class="org-title" @click="orgGsClick(scope.$index)">{{ scope.row.org }}</span>
                    <span></span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="sl"
                  align="center"
                  label="数量（台）">
                </el-table-column>
                <el-table-column
                  prop="edgl"
                  align="center"
                  label="容量（KVA）">
                </el-table-column>
                <el-table-column
                  label="用电单耗(千万时/立方米)">
                  <el-table-column
                    prop="hege"
                    align="center"
                    label="合格">
                  </el-table-column>
                  <el-table-column
                    prop="buhege"
                    align="center"
                    label="不合格">
                  </el-table-column>
                  <el-table-column
                    align="center"
                    prop="jinggao"
                    label="警告">
                  </el-table-column>
                </el-table-column>
              </el-table>
              <report-table className="table1" reportName="空压机">
                <data-panel-title
                  v-if="system_id === '1' && (rData3 && rData3.length > 0)"
                  slot="title"
                  :title="subSubTitle + '变压器能效分析'"
                  :noBorder="noBorder"></data-panel-title>
                <el-table
                  v-if="system_id !== '1' || (rData3 && rData3.length > 0)"
                  :data="rData3"
                  key="table3"
                  slot="table"
                  border
                  :cell-style="cellStyle"
                  header-cell-class-name="header-cell-class-name"
                  style="width: 100%">
                  <el-table-column
                    prop="code"
                    width="120"
                    align="center"
                    label="空压机编号">
                  </el-table-column>
                  <el-table-column
                    prop="wz"
                    align="center"
                    width="120"
                    label="所在位置">
                  </el-table-column>
                  <el-table-column
                    align="center"
                    :render-header="renderHeader"
                    label="用电单耗">
                    <el-table-column
                      v-for="(item, index) in lastDay"
                      :key="index"
                      align="center"
                      :label="(index + 1) + '日'">
                      <template slot-scope="scope">
                        {{ scope.row[(index + 1) + 'ri'] ? scope.row[(index + 1) + 'ri'].split('_')[0] : '' }}
                      </template>
                    </el-table-column>
                  </el-table-column>
                </el-table>
              </report-table>
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
  import {orgIdDicNx} from 'utils/dic'
  import fetch from 'utils/fetch'
  import ReportTable from 'base/report-table/report-table'
  let moment = require('moment')
  moment.locale('zh-cn')
  export default {
    components: {
      SelectTitle,
      ChartPie,
      DataPanelTitle,
      ChartBarLine,
      ReportTable
    },
    created() {
      this.onSearch()
    },
    data() {
      return {
        loading: false,
        pieRadius: ['13%', '60%'],
        options1: orgIdDicNx,
        tableData: [],
        noBorder: true,
        system_id: '15',
        time: moment().format('YYYY-MM') || '',
        rData: [],
        rData2: [],
        rData3: [],
        subTitle: '',
        subSubTitle: ''
      }
    },
    computed: {
      chartTitle() {
        let orgId = this.options1.findIndex((item) => {
          return this.system_id === item.value
        })
        let orgName = orgId >= 0 ? this.options1[orgId].label : ''
        return orgName + '空压机用电单耗能效分析'
      },
      lastDay() {
        if (this.time) {
          return moment(this.time).endOf('month').format('DD') * 1
        } else {
          return 31
        }
      }
    },
    methods: {
      renderHeader (h, {column}) { // h即为cerateElement的简写，具体可看vue官方文档
        return h(
          'div',
          [
            h('span', column.label),
            h('span', {
              style: 'margin-left:30px; background: #67C23A;width: 30px;height: 10px;display: inline-block;'
            }),
            h('span', '合格'),
            h('span', {
              style: 'margin-left:10px; background: #FFFF00;width: 30px;height: 10px;display: inline-block;'
            }),
            h('span', '不合格'),
            h('span', {
              style: 'margin-left:10px; background: #F56C6C;width: 30px;height: 10px;display: inline-block;'
            }),
            h('span', '严重警告')
          ]
        )
      },
      headerCellStyle(cell) {
        if (cell.rowIndex === 1 && cell.columnIndex === 0) {
          return 'background: #67C23A;'
        } else if (cell.rowIndex === 1 && cell.columnIndex === 1) {
          return 'background: #FFFF00;'
        } else if (cell.rowIndex === 1 && cell.columnIndex === 2) {
          return 'background: #F56C6C;'
        }
      },
      onSearch() {
        if (this.system_id !== '1') {
          this.byqList(this.system_id)
        } else {
          this.loading = true
          fetch('get', api.kyjJituan, {time: this.time}).then((res) => {
            this.rData = res.data
            this.rData2 = []
            this.loading = false
          }).catch(() => {
            this.rData = []
            this.rData2 = []
            this.loading = false
          })
        }
      },
      orgClick(index) {
        fetch('get', api.kyjGs, {time: this.time, pid: this.rData[index].org_id}).then((res) => {
          this.subTitle = this.rData[index].org
          this.rData2 = res.data
        }).catch(() => {
          this.rData2 = []
        })
      },
      cellStyle (cell) {
        let value
        if (cell.columnIndex === 2) {
          value = cell.row['1ri']
        } else if (cell.columnIndex === 3) {
          value = cell.row['2ri']
        } else if (cell.columnIndex === 4) {
          value = cell.row['3ri']
        } else if (cell.columnIndex === 5) {
          value = cell.row['4ri']
        } else if (cell.columnIndex === 6) {
          value = cell.row['5ri']
        } else if (cell.columnIndex === 7) {
          value = cell.row['6ri']
        } else if (cell.columnIndex === 8) {
          value = cell.row['7ri']
        } else if (cell.columnIndex === 9) {
          value = cell.row['8ri']
        } else if (cell.columnIndex === 10) {
          value = cell.row['9ri']
        } else if (cell.columnIndex === 11) {
          value = cell.row['10ri']
        } else if (cell.columnIndex === 12) {
          value = cell.row['11ri']
        } else if (cell.columnIndex === 13) {
          value = cell.row['12ri']
        } else if (cell.columnIndex === 14) {
          value = cell.row['13ri']
        } else if (cell.columnIndex === 15) {
          value = cell.row['14ri']
        } else if (cell.columnIndex === 16) {
          value = cell.row['15ri']
        } else if (cell.columnIndex === 17) {
          value = cell.row['16ri']
        } else if (cell.columnIndex === 18) {
          value = cell.row['17ri']
        } else if (cell.columnIndex === 19) {
          value = cell.row['18ri']
        } else if (cell.columnIndex === 20) {
          value = cell.row['19ri']
        } else if (cell.columnIndex === 21) {
          value = cell.row['20ri']
        } else if (cell.columnIndex === 22) {
          value = cell.row['21ri']
        } else if (cell.columnIndex === 23) {
          value = cell.row['22ri']
        } else if (cell.columnIndex === 24) {
          value = cell.row['23ri']
        } else if (cell.columnIndex === 25) {
          value = cell.row['24ri']
        } else if (cell.columnIndex === 26) {
          value = cell.row['25ri']
        } else if (cell.columnIndex === 27) {
          value = cell.row['26ri']
        } else if (cell.columnIndex === 28) {
          value = cell.row['27ri']
        } else if (cell.columnIndex === 29) {
          value = cell.row['28ri']
        } else if (cell.columnIndex === 30) {
          value = cell.row['29ri']
        } else if (cell.columnIndex === 31) {
          value = cell.row['30ri']
        } else if (cell.columnIndex === 32) {
          value = cell.row['31ri']
        }
        let data = value ? value.split('_').length === 2 ? value.split('_')[0] : '' : ''
        if (data * 1 === 0) {
          return 'background: #fff'
        }
        let status = value ? value.split('_').length === 2 ? value.split('_')[1] : '' : ''
        if (status === '1') {
          return 'background: #67C23A'
        } else if (status === '2') {
          return 'background: #FFFF00'
        } else if (status === '3') {
          return 'background: #F56C6C'
        }
      },
      orgGsClick(index) {
        this.subSubTitle = this.rData2[index].org
        this.byqList(this.rData2[index].org_id)
      },
      byqList(orgId) {
        this.loading = true
        let nian = this.time.split('-').length > 0 ? this.time.split('-')[0] : ''
        let yue = this.time.split('-').length > 0 ? this.time.split('-')[1] : ''
        fetch('get', api.kyjList, {nian: nian, yue: yue, org_id: orgId}).then((res) => {
          this.rData3 = []
          for (let i = 0; i < res.data.length; i++) {
            let item = res.data[i]
            let index = this.rData3.findIndex((i) => {
              return i['code'] === item['CODE']
            })
            if (index < 0) {
              let obj = {}
              obj.code = item['CODE']
              obj.wz = item['WZ']
              let key = item['RI'] + 'ri'
              obj[key] = item['VALUE'] + '_' + item['STATE']
              this.rData3.push(obj)
            } else {
              let obj = this.rData3[index]
              let key = item['RI'] + 'ri'
              obj[key] = item['VALUE'] + '_' + item['STATE']
            }
          }
          this.loading = false
        }).catch(() => {
          this.rData3 = []
          this.loading = false
        })
      },
      selectChange() {
        this.time = ''
        this.rData = []
        this.rData2 = []
        this.rData3 = []
      }
    }
  }
</script>
<style lang="stylus" scoped>
  @import "~common/stylus/variable.styl"
  @import "~common/stylus/mixin.styl"
  .info-container
    .info
      background-color: $color-background-sub
      display: flex
      flex-direction: column
      min-width: 600px
      .org-title
        &:hover
          cursor: pointer
          color: #fc3507
      .date-type
        width: 60px
      .department-block
        display: inline-block
        width: 25px
        height: 10px
      .panel-box > .row
        min-height: calc(100vh - 160px)
      .chart-box
        min-height: 350px
        border-radius: 0px
</style>
