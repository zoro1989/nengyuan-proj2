<template>
  <div class="info-container">
    <div class="info">
      <div class="col-box">
        <select-title title1="用能单位" title2="选择时间" @search="onSearch" :showSearch="true">
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
            v-model="date"
            class="date-year"
            size="mini"
            type="month"
            value-format="yyyy-MM"
            placeholder="选择年">
          </el-date-picker>
        </select-title>
      </div>
      <div class="col-box-left-right-bottom">
        <div class="panel-box" v-loading="loading">
          <div class="row">
            <div class="table-box">
              <el-button class="search-btn" type="primary" size="mini" @click="onSave">
                <i class="fa fa-save"></i>保存</el-button>
              <div class="row">
                <el-table
                  class="token-table"
                  :data="rList"
                  border
                  height="100%"
                  header-cell-class-name="header-cell-class-name"
                  style="width: 99%">
                  <el-table-column
                    label="评价指标">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.pjzb" :disabled="isFormReadOnly" auto-complete="off"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="评价标准">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.pjbz" :disabled="isFormReadOnly" auto-complete="off"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="项目分数">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.fs" :disabled="isFormReadOnly" auto-complete="off"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="权重比">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.qz" :disabled="isFormReadOnly" auto-complete="off"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="实际得分合计">
                    <template slot-scope="scope">
                      <span>{{sumScore(scope.$index)}}</span>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import SelectTitle from 'base/select-title/select-title'
  import {orgSystemIdDic} from 'utils/dic'
  import { api } from '@/config'
  import fetch from 'utils/fetch'
  let moment = require('moment')
  moment.locale('zh-cn')
  export default {
    components: {
      SelectTitle
    },
    created() {
      this.initData()
    },
    data() {
      return {
        loading: false,
        options1: orgSystemIdDic,
        rList: [],
        system_id: '',
        date: '',
        isFormReadOnly: false
      }
    },
    methods: {
      onSearch() {
        this.loading = true
        fetch('get', api.zbKpiPjList, {system_id: this.system_id, date: this.date}).then((res) => {
          this.rList = res.data
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
      },
      onSave() {
        this.loading = true
        fetch('post', api.zbKpiPjCreate, {system_id: this.system_id, date: this.date, datas: this.rList}).then((res) => {
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
      },
      sumScore(index) {
        return Math.round((this.rList[index].fs * 1) * (this.rList[index].qz * 1) / 100)
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
      .panel-box
        width: 100%
        padding-top: 10px
      .dbl
        width: 10px
        height: 10px
        border-radius: 50%
        display: inline-block
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
          .table-box > .row
            height: 100%
      .chart-box
        min-height: 350px
        border-radius: 0px
</style>
