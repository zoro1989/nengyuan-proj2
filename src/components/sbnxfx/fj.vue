<template>
  <div class="info-container">
    <div class="info">
      <div class="col-box">
        <select-title title1="用能单位" title2="基期" @search="onSearch" :showSearch="true">
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
            type="month"
            size="mini"
            value-format="yyyy-MM"
            placeholder="选择日期">
          </el-date-picker>
        </select-title>
      </div>
      <div class="col-box-left-right-bottom">
        <div class="panel-box">
          <div class="row">
            <div class="table-box">
              <data-panel-title title="集团公司风机能效分析'" :noBorder="noBorder"></data-panel-title>
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
                  prop="edgl"
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
              <data-panel-title
                v-if="rData2 && rData2.length > 0 && !system_id"
                :title="subTitle + '部门风机能效分析'"
                :noBorder="noBorder"></data-panel-title>
              <el-table
                v-if="rData2 && rData2.length > 0"
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
                  prop="edgl"
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
                  label="电机编号">
                </el-table-column>
                <el-table-column
                  prop="wz"
                  label="所在位置">
                </el-table-column>
                <el-table-column
                  prop="value"
                  label="用电单耗">
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
        tableData: [],
        lx: '1',
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
      departmentStyle(index) {
        return `background: ${this.colors[index]}`
      },
      onSearch() {
        if (this.system_id) {
          this.byqList(this.system_id)
        } else {
          fetch('get', api.djJituan, {time: this.time, lx: this.lx}).then((res) => {
            this.rData = res.data
            this.rData2 = []
          }).catch(() => {
          })
        }
      },
      orgClick(index) {
        fetch('get', api.djGs, {time: this.time, pid: this.rData[index].org_id, lx: this.lx}).then((res) => {
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
        fetch('get', api.djList, {nian: nian, org_id: orgId, lx: this.lx}).then((res) => {
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
      height: 100%
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
      .col-box-left-right-bottom
        height: 100%
        .panel-box >.row
          height: 100%
          .table-box > .row:last-child
            height: calc(100% - 350px)
      .chart-box
        min-height: 350px
        border-radius: 0px
</style>
