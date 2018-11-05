<template>
  <div class="info-container">
    <div class="info">
      <div class="col-box">
        <select-title title1="用能单位" title2="选择时间" @search="onSearch" :showSearch="true">
          <el-select
            slot="title1"
            v-model="system_id"
            multiple
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
            type="month"
            size="mini"
            value-format="yyyy-MM"
            placeholder="请选择">
          </el-date-picker>
        </select-title>
      </div>
      <div class="col-box-left-right-bottom">
        <div class="panel-box" v-loading="loading">
          <div class="row">
            <el-table
              :data="rData"
              border
              header-cell-class-name="header-cell-class-name"
              style="width: 99%">
              <el-table-column
                prop="org"
                label="用能单位">
              </el-table-column>
              <el-table-column
                label="产品综合能耗（标煤/万元）">
                <el-table-column
                  prop="czzhnh"
                  label="实际值">
                </el-table-column>
                <el-table-column
                  prop="tqczzhnh"
                  label="同期值">
                </el-table-column>
              </el-table-column>
              <el-table-column
                label="产品耗水（吨/万元）">
                <el-table-column
                  prop="s"
                  label="实际值">
                </el-table-column>
                <el-table-column
                  prop="tqs"
                  label="同期值">
                </el-table-column>
              </el-table-column>
              <el-table-column
                label="能源消耗总量（吨标煤）">
                <el-table-column
                  prop="zhnh"
                  label="实际值">
                </el-table-column>
                <el-table-column
                  prop="tqzhnh"
                  label="同期值">
                </el-table-column>
              </el-table-column>
              <el-table-column
                label="单车综合能耗（吨标煤/辆）">
                <el-table-column
                  prop="dczzhnh"
                  label="实际值">
                </el-table-column>
                <el-table-column
                  prop="tqdczzhnh"
                  label="同期值">
                </el-table-column>
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
        colors: ['#5967f1', '#06e56d', '#7dd1ff', '#ff8e06', '#1196de', '#0c1994', '#8c6be6', '#ffc300', '#4472c6', '#838389', '#1096df'],
        noBorder: true,
        system_id: '',
        selectDate: '',
        year: '',
        month: '',
        rData: [],
        legendData: ['用量', '同期用量', '上月用量', '产量', '同期产量', '上月产量'],
        seriesData: [],
        y: [{name: '辆'}, {name: '亿元'}]
      }
    },
    methods: {
      departmentStyle(index) {
        return `background: ${this.colors[index]}`
      },
      onSearch() {
        let dateArr = this.selectDate.split('-')
        if (dateArr.length > 0) {
          this.year = dateArr[0]
          this.month = dateArr[1]
        }
        this.loading = true
        fetch('get', api.bumenyongnengfx, {id: this.system_id.join(','), year: this.year, month: this.month}).then((res) => {
          this.rData = res.data
          this.loading = false
        }).catch(() => {
          this.loading = false
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
