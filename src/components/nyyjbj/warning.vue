<template>
  <div class="info-container">
    <div class="info">
      <div class="col-box">
        <select-title title1="用能单位" title2="选择时间" @search="onSearch" :showSearch="true">
          <el-select
            slot="title1"
            v-model="system_id"
            class="multiple-org"
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
            v-model="selectDate"
            range-separator="～"
            type="daterange"
            size="mini"
            value-format="yyyy-MM"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            placeholder="请选择">
          </el-date-picker>
        </select-title>
      </div>
      <div class="col-box-left-right-bottom">
        <div class="panel-box" v-loading="loading">
          <div class="row">
            <el-table
              :data="tableData"
              border
              header-cell-class-name="header-cell-class-name"
              style="width: 99%">
              <el-table-column
                prop="org"
                label="报警部门">
              </el-table-column>
              <el-table-column
                prop="level"
                label="报警等级">
              </el-table-column>
              <el-table-column
                prop="date"
                label="报警时间">
              </el-table-column>
              <el-table-column
                prop="name"
                label="报警名称">
              </el-table-column>
              <el-table-column
                prop="content"
                label="报警内容">
              </el-table-column>
            </el-table>
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
//  import { api } from '@/config'
//  import fetch from 'utils/fetch'
  import {orgIdSimpleDic} from 'utils/dic'
//  import {tableDataBMFilter} from 'utils/filter'
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
        options1: orgIdSimpleDic,
        tableData: [],
        noBorder: true,
        system_id: '',
        selectDate: '',
        year: '',
        month: '',
        rData: []
      }
    },
    methods: {
      onSearch() {
        this.loading = true
        setTimeout(() => {
          this.tableData = [
            {
              org: '吉林汽车',
              level: '1',
              date: '2018-10',
              content: '万元产值综合能耗实际值大于计划值9.98%',
              name: '单耗超标'
            },
            {
              org: '一汽丰越',
              level: '1',
              date: '2018-6',
              content: '万元产值综合能耗实际值大于计划值1.11%',
              name: '单耗超标'
            },
            {
              org: '天津夏利',
              level: '5',
              date: '2018-6',
              content: '万元产值综合能耗实际值大于计划值142.66%',
              name: '单耗超标'
            },
            {
              org: '一汽模具',
              level: '1',
              date: '2018-6',
              content: '万元产值综合能耗实际值大于计划值2.2%',
              name: '单耗超标'
            },
            {
              org: '吉林汽车',
              level: '1',
              date: '2018-6',
              content: '实际电量大于计划电量13%',
              name: '用量超标'
            },
            {
              org: '天津夏利',
              level: '1',
              date: '2018-6',
              content: '实际电量大于计划电量144%',
              name: '用量超标'
            }
          ]
          this.loading = false
        }, 1000)
//        let dateArr = this.selectDate.split('-')
//        if (dateArr.length > 0) {
//          this.year = dateArr[0]
//          this.month = dateArr[1]
//        }
//        this.loading = true
//        fetch('get', api.bumenyongnengfx, {id: this.system_id.join(','), year: this.year, month: this.month}).then((res) => {
//          this.rData = res.data
//          this.loading = false
//        }).catch(() => {
//          this.loading = false
//        })
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
      .date-type
        width: 60px
      .department-block
        display: inline-block
        width: 25px
        height: 10px
      .panel-box > .row
        min-height: calc(100vh - 160px)
</style>
