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
            :type="system_id !== '1' ? 'year' : 'month'"
            size="mini"
            :value-format="system_id !== '1' ? 'yyyy' : 'yyyy-MM'"
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
                v-if="system_id === '1'"
                key="table1"
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
                  prop="edszgl"
                  label="容量（KVA）">
                </el-table-column>
                <el-table-column
                  align="center"
                  label="负载系数（β）">
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
                v-if="rData2 && rData2.length > 0 && system_id === '1'"
                :title="subTitle + '部门变压器能效分析'"
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
                  align="center"
                  prop="org"
                  min-width="200"
                  label="部门名称">
                  <template slot-scope="scope">
                    <span class="org-title" @click="orgGsClick(scope.$index)">{{ scope.row.org }}</span>
                    <span></span>
                  </template>
                </el-table-column>
                <el-table-column
                  align="center"
                  prop="sl"
                  label="数量（台）">
                </el-table-column>
                <el-table-column
                  align="center"
                  prop="edszgl"
                  label="容量（KVA）">
                </el-table-column>
                <el-table-column
                  align="center"
                  label="负载系数（β）">
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
              <data-panel-title
                v-if="system_id === '1' && (rData3 && rData3.length > 0)"
                :title="subSubTitle + '变压器能效分析'"
                :noBorder="noBorder"></data-panel-title>
              <el-table
                v-if="system_id !== '1' || (rData3 && rData3.length > 0)"
                :data="rData3"
                key="table3"
                border
                header-cell-class-name="header-cell-class-name"
                style="width: 99%">
                <el-table-column
                  align="center"
                  prop="code"
                  label="变压器编号">
                </el-table-column>
                <el-table-column
                  align="center"
                  prop="wz"
                  label="所在位置">
                </el-table-column>
                <el-table-column
                  align="center"
                  label="负载系数(β)">
                  <el-table-column
                    align="center"
                    label="一月">
                    <template slot-scope="scope">
                      <span class="yue-box" :class="cellStyle(scope.row['1yue'])">{{ scope.row['1yue'] ? scope.row['1yue'].split('_')[0] : '' }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    align="center"
                    label="二月">
                    <template slot-scope="scope">
                      <span class="yue-box" :class="cellStyle(scope.row['2yue'])">{{ scope.row['2yue'] ? scope.row['2yue'].split('_')[0] : '' }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    align="center"
                    label="三月">
                    <template slot-scope="scope">
                      <span class="yue-box" :class="cellStyle(scope.row['3yue'])">{{ scope.row['3yue'] ? scope.row['3yue'].split('_')[0] : '' }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    align="center"
                    label="四月">
                    <template slot-scope="scope">
                      <span class="yue-box" :class="cellStyle(scope.row['4yue'])">{{ scope.row['4yue'] ? scope.row['4yue'].split('_')[0] : '' }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    align="center"
                    label="五月">
                    <template slot-scope="scope">
                      <span class="yue-box" :class="cellStyle(scope.row['5yue'])">{{ scope.row['5yue'] ? scope.row['5yue'].split('_')[0] : '' }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    align="center"
                    label="六月">
                    <template slot-scope="scope">
                      <span class="yue-box" :class="cellStyle(scope.row['6yue'])">{{ scope.row['6yue'] ? scope.row['6yue'].split('_')[0] : '' }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    align="center"
                    label="七月">
                    <template slot-scope="scope">
                      <span class="yue-box" :class="cellStyle(scope.row['7yue'])">{{ scope.row['7yue'] ? scope.row['7yue'].split('_')[0] : '' }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    align="center"
                    label="八月">
                    <template slot-scope="scope">
                      <span class="yue-box" :class="cellStyle(scope.row['8yue'])">{{ scope.row['8yue'] ? scope.row['8yue'].split('_')[0] : '' }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    align="center"
                    label="九月">
                    <template slot-scope="scope">
                      <span class="yue-box" :class="cellStyle(scope.row['9yue'])">{{ scope.row['9yue'] ? scope.row['9yue'].split('_')[0] : '' }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    align="center"
                    label="十月">
                    <template slot-scope="scope">
                      <span class="yue-box" :class="cellStyle(scope.row['10yue'])">{{ scope.row['10yue'] ? scope.row['10yue'].split('_')[0] : '' }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    align="center"
                    label="十一月">
                    <template slot-scope="scope">
                      <span class="yue-box" :class="cellStyle(scope.row['11yue'])">{{ scope.row['11yue'] ? scope.row['11yue'].split('_')[0] : '' }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    align="center"
                    label="十二月">
                    <template slot-scope="scope">
                      <span class="yue-box" :class="cellStyle(scope.row['12yue'])">{{ scope.row['12yue'] ? scope.row['12yue'].split('_')[0] : '' }}</span>
                    </template>
                  </el-table-column>
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
        loading: false,
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
        subSubTitle: ''
      }
    },
    computed: {
      chartTitle() {
        let orgId = this.options1.findIndex((item) => {
          return this.system_id === item.value
        })
        let orgName = orgId >= 0 ? this.options1[orgId].label : ''
        return orgName + '变压器负载系数能效分析'
      }
    },
    methods: {
      headerCellStyle(cell) {
        if (cell.rowIndex === 1 && cell.columnIndex === 0) {
          return 'background: #67C23A;'
        } else if (cell.rowIndex === 1 && cell.columnIndex === 1) {
          return 'background: #F56C6C;'
        } else if (cell.rowIndex === 1 && cell.columnIndex === 2) {
          return 'background: #FFFF00;'
        }
      },
      onSearch() {
        if (this.system_id !== '1') {
          this.byqList(this.system_id)
        } else {
          this.loading = true
          fetch('get', api.byqJituan, {time: this.time}).then((res) => {
            this.rData = res.data
            this.rData2 = []
            this.loading = false
          }).catch(() => {
            this.loading = false
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
      cellStyle (value) {
        let status = value ? value.split('_').length === 2 ? value.split('_')[1] : '' : ''
        if (status === '1') {
          return 'green'
        } else if (status === '2') {
          return 'red'
        } else if (status === '3') {
          return 'yellow'
        }
      },
      orgGsClick(index) {
        this.subSubTitle = this.rData2[index].org
        this.byqList(this.rData2[index].org_id)
      },
      byqList(orgId) {
        this.loading = true
        let nian = this.time.split('-').length > 0 ? this.time.split('-')[0] : ''
        fetch('get', api.byqList, {nian: nian, org_id: orgId}).then((res) => {
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
              let key = item['YUE'] + 'yue'
              obj[key] = item['VALUE'] + '_' + item['STATE']
              this.rData3.push(obj)
            } else {
              let obj = this.rData3[index]
              let key = item['YUE'] + 'yue'
              obj[key] = item['VALUE'] + '_' + item['STATE']
            }
          }
          this.loading = false
        }).catch(() => {
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
      .yue-box
        position: absolute
        top: 0
        left: 0
        right: 0
        bottom: 0
        display: flex
        justify-content: center
        align-items: center
        &.red
          background: #F56C6C
        &.yellow
          background: #FFFF00
        &.green
          background: #67C23A
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
