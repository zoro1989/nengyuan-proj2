<template>
  <div class="info-container">
    <div class="info">
      <div class="col-box">
        <select-title title1="用能单位" title2="选择日期" @search="onSearch" :showSearch="true">
          <el-select
            slot="title1"
            v-model="system_id"
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
            :type="system_id ? 'year' : 'month'"
            size="mini"
            :value-format="system_id ? 'yyyy' : 'yyyy-MM'"
            placeholder="选择日期">
          </el-date-picker>
        </select-title>
      </div>
      <div class="col-box-left-right-bottom">
        <div class="panel-box">
          <div class="row">
            <div class="table-box">
              <data-panel-title :title="chartTitle" :noBorder="noBorder"></data-panel-title>
              <el-table
                :data="rData"
                v-if="!system_id"
                border
                :header-cell-style="headerCellStyle"
                header-cell-class-name="header-cell-class-name"
                style="width: 99%">
                <el-table-column
                  prop="org"
                  min-width="200"
                  label="部门名称">
                  <template slot-scope="scope">
                    <span class="org-title" @click="orgClick(scope.$index)">{{ scope.row.org }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="sl"
                  label="数量（台）">
                </el-table-column>
                <el-table-column
                  prop="edszgl"
                  label="容量（KVA）">
                </el-table-column>
                <el-table-column
                  align="center"
                  label="负载率（β%）">
                  <el-table-column
                    prop="hege"
                    align="center"
                    label="合格">
                  </el-table-column>
                  <el-table-column
                    align="center"
                    prop="buhege"
                    label="不合格">
                  </el-table-column>
                  <el-table-column
                    align="center"
                    prop="jinggao"
                    label="警告">
                  </el-table-column>
                </el-table-column>
              </el-table>
              <data-panel-title
                v-if="rData2 && rData2.length > 0 && !system_id"
                :title="subTitle + '部门变压器能效分析'"
                :noBorder="noBorder"></data-panel-title>
              <el-table
                v-if="rData2 && rData2.length > 0 && !system_id"
                :data="rData2"
                border
                :header-cell-style="headerCellStyle"
                header-cell-class-name="header-cell-class-name"
                style="width: 99%">
                <el-table-column
                  prop="org"
                  min-width="200"
                  label="部门名称">
                  <template slot-scope="scope">
                    <span class="org-title" @click="orgGsClick(scope.$index)">{{ scope.row.org }}</span>
                    <span></span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="sl"
                  label="数量（台）">
                </el-table-column>
                <el-table-column
                  prop="edszgl"
                  label="容量（KVA）">
                </el-table-column>
                <el-table-column
                  label="负载率（β%）">
                  <el-table-column
                    prop="hege"
                    label="合格">
                  </el-table-column>
                  <el-table-column
                    prop="buhege"
                    label="不合格">
                  </el-table-column>
                  <el-table-column
                    prop="jinggao"
                    label="警告">
                  </el-table-column>
                </el-table-column>
              </el-table>
              <el-table
                v-if="system_id || (rData3 && rData3.length > 0)"
                :data="rData3"
                border
                header-cell-class-name="header-cell-class-name"
                style="width: 99%">
                <el-table-column
                  prop="code"
                  label="变压器编号">
                </el-table-column>
                <el-table-column
                  prop="wz"
                  label="所在位置">
                </el-table-column>
                <el-table-column
                  prop="value"
                  label="负载率(%)">
                </el-table-column>
                <el-table-column
                  label="一月">
                  <template slot-scope="scope">
                    <span :style="cellStyle(scope.$index, 3)">{{ scope.row['1yue'] }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="二月">
                  <template slot-scope="scope">
                    <span :style="cellStyle(scope.$index, 4)">{{ scope.row['2yue'] }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="三月">
                  <template slot-scope="scope">
                    <span :style="cellStyle(scope.$index, 5)">{{ scope.row['3yue'] }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="四月">
                  <template slot-scope="scope">
                    <span :style="cellStyle(scope.$index, 6)">{{ scope.row['4yue'] }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="五月">
                  <template slot-scope="scope">
                    <span :style="cellStyle(scope.$index, 7)">{{ scope.row['5yue'] }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="6yue"
                  label="六月">
                  <template slot-scope="scope">
                    <span :style="cellStyle(scope.$index, 8)">{{ scope.row['6yue'] }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="7yue"
                  label="七月">
                  <template slot-scope="scope">
                    <span :style="cellStyle(scope.$index, 9)">{{ scope.row['7yue'] }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="八月">
                  <template slot-scope="scope">
                    <span :style="cellStyle(scope.$index, 10)">{{ scope.row['8yue'] }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="九月">
                  <template slot-scope="scope">
                    <span :style="cellStyle(scope.$index, 11)">{{ scope.row['9yue'] }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="十月">
                  <template slot-scope="scope">
                    <span :style="cellStyle(scope.$index, 12)">{{ scope.row['10yue'] }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="十一月">
                  <template slot-scope="scope">
                    <span :style="cellStyle(scope.$index, 13)">{{ scope.row['11yue'] }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="十二月">
                  <template slot-scope="scope">
                    <span :style="cellStyle(scope.$index, 14)">{{ scope.row['12yue'] }}</span>
                  </template>
                </el-table-column>
              </el-table>
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
  import {orgIdDic} from 'utils/dic'
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
        options1: orgIdDic,
        tableData: [],
        noBorder: true,
        system_id: '',
        time: '',
        rData: [],
        rData2: [],
        rData3: [],
        subTitle: '',
        hege: [],
        buhege: [],
        jinggao: []
      }
    },
    computed: {
      chartTitle() {
        let orgId = this.options1.findIndex((item) => {
          return this.system_id === item.value
        })
        let orgName = orgId >= 0 ? this.options1[orgId].label : ''
        if (orgName) {
          return orgName + '变压器能效分析'
        } else {
          return '集团公司变压器能效分析'
        }
      }
    },
    methods: {
      headerCellStyle(cell) {
        if (cell.rowIndex === 1 && cell.columnIndex === 0) {
          return 'background: #67C23A; color: #fff'
        } else if (cell.rowIndex === 1 && cell.columnIndex === 1) {
          return 'background: #F56C6C; color: #fff'
        } else if (cell.rowIndex === 1 && cell.columnIndex === 2) {
          return 'background: #E6A23C; color: #fff'
        }
      },
      onSearch() {
        if (this.system_id) {
          this.byqList(this.system_id)
        } else {
          fetch('get', api.byqJituan, {time: this.time}).then((res) => {
            this.rData = res.data
            this.rData2 = []
          }).catch(() => {
          })
        }
      },
      orgClick(index) {
        fetch('get', api.byqGs, {time: this.time, pid: this.rData[index].org_id}).then((res) => {
          this.subTitle = this.rData[index].org
          this.rData2 = res.data
        }).catch(() => {
        })
      },
      cellStyle (row, column, rowIndex, columnIndex) {
        let ihege = this.hege.findIndex((item) => {
          return item.row === row && item.column === column
        })
        let ibuhege = this.buhege.findIndex((item) => {
          return item.row === row && item.column === column
        })
        let ijinggao = this.jinggao.findIndex((item) => {
          return item.row === row && item.column === column
        })
        if (ihege >= 0) {
          return 'background: #67C23A; color: #fff; position: absolute; top: 0; left: 0; right: 0; bottom: 0; display: flex; justify-content: center; align-items: center;'
        } else if (ibuhege >= 0) {
          return 'background: #F56C6C; color: #fff; position: absolute; top: 0; left: 0; right: 0; bottom: 0; display: flex; justify-content: center; align-items: center;'
        } else if (ijinggao >= 0) {
          return 'background: #E6A23C; color: #fff; position: absolute; top: 0; left: 0; right: 0; bottom: 0; display: flex; justify-content: center; align-items: center;'
        }
      },
      orgGsClick(index) {
        this.byqList(this.rData2[index].org_id)
      },
      byqList(orgId) {
        let nian = this.time.split('-').length > 0 ? this.time.split('-')[0] : ''
        fetch('get', api.byqList, {nian: nian, org_id: orgId}).then((res) => {
          for (let i = 0; i < res.data.length; i++) {
            let item = res.data[i]
            let index = this.rData3.findIndex((i) => {
              return i['code'] === item['CODE']
            })
            if (index < 0) {
              let obj = {}
              if (item['STATE'] === 1) {
                this.hege.push({
                  row: this.rData3.length,
                  column: item['YUE'] + 2
                })
              } else if (item['STATE'] === 2) {
                this.buhege.push({
                  row: this.rData3.length,
                  column: item['YUE'] + 2
                })
              } else if (item['STATE'] === 3) {
                this.jinggao.push({
                  row: this.rData3.length,
                  column: item['YUE'] + 2
                })
              }
              obj.code = item['CODE']
              obj.wz = item['WZ']
              let key = item['YUE'] + 'yue'
              obj[key] = item['VALUE']
              this.rData3.push(obj)
            } else {
              let obj = this.rData3[index]
              if (item['STATE'] === 1) {
                this.hege.push({
                  row: this.rData3.length,
                  column: item['YUE'] + 2
                })
              } else if (item['STATE'] === 2) {
                this.buhege.push({
                  row: this.rData3.length,
                  column: item['YUE'] + 2
                })
              } else if (item['STATE'] === 3) {
                this.jinggao.push({
                  row: this.rData3.length,
                  column: item['YUE'] + 2
                })
              }
              let key = item['YUE'] + 'yue'
              obj[key] = item['VALUE']
            }
          }
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
