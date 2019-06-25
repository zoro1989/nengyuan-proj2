<template>
  <div class="info-container">
    <div class="info">
      <div class="col-box">
        <select-title>
          <el-button slot="title1" size="mini" @click="goHome" icon="el-icon-back" plain>返回首页</el-button>
        </select-title>
      </div>
      <div class="col-box-left-right-bottom">
        <div class="panel-box" v-loading="loading">
          <div class="row">
            <div class="table-box">
              <div class="row">
                <el-table
                  class="token-table"
                  :data="rToken"
                  :show-header="false"
                  border
                  header-cell-class-name="header-cell-class-name"
                  style="width: 99%">
                  <el-table-column
                    prop="org"
                    label="公司名称">
                  </el-table-column>
                  <el-table-column
                    label="状态">
                    <template slot-scope="scope">
                      <span class="dbl" :style="dblStyle(scope.$index)"></span>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <div class="row">
                <el-tabs v-model="activeTab" type="card" style="width: 100%;">
                  <el-tab-pane label="报警信息" name="1">
                    <el-table
                      class="token-table"
                      :data="wList"
                      border
                      header-cell-class-name="header-cell-class-name"
                      style="width: 99%">
                      <el-table-column
                        align="center"
                        width="250"
                        prop="org"
                        label="报警部门">
                      </el-table-column>
                      <el-table-column
                        align="center"
                        width="100"
                        prop="dj"
                        label="报警等级">
                      </el-table-column>
                      <el-table-column
                        align="center"
                        width="180"
                        label="报警时间">
                        <template slot-scope="scope">
                          <span>{{scope.row.nian}}年{{scope.row.yue}}月</span>
                        </template>
                      </el-table-column>
                      <el-table-column
                        width="180"
                        align="center"
                        prop="mc"
                        label="报警名称">
                      </el-table-column>
                      <el-table-column
                        align="center"
                        prop="nr"
                        label="报警内容">
                      </el-table-column>
                      <!--<el-table-column-->
                        <!--align="center"-->
                        <!--width="250"-->
                        <!--prop="yczb"-->
                        <!--label="异常指标">-->
                      <!--</el-table-column>-->
                    </el-table>
                  </el-tab-pane>
                  <el-tab-pane label="日志信息" name="2">
                    <el-table
                      :data="rList"
                      border
                      header-cell-class-name="header-cell-class-name"
                      style="width: 99%">
                      <el-table-column
                        align="center"
                        prop="org"
                        label="分子公司">
                      </el-table-column>
                      <el-table-column
                        align="center"
                        prop="createdAt"
                        label="日志时间">
                      </el-table-column>
                      <el-table-column
                        align="center"
                        prop="content"
                        label="日志内容">
                      </el-table-column>
                    </el-table>
                  </el-tab-pane>
                </el-tabs>
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
  import { api } from '@/config'
  import fetch from 'utils/fetch'
  import {getRole} from 'common/js/cache'
  let moment = require('moment')
  moment.locale('zh-cn')
  export default {
    components: {
      SelectTitle
    },
    created() {
      if (!getRole()) {
        this.$router.replace('/login')
      } else {
        this.initData()
      }
    },
    data() {
      return {
        loading: false,
        rToken: [],
        rList: [],
        wList: [],
        activeTab: '1'
      }
    },
    methods: {
      dblStyle(index) {
        return moment().isAfter(this.rToken[index].validTime) ? 'background: #F56C6C; color: #fff;' : 'background: #67C23A; color: #fff;'
      },
      goHome() {
        this.$router.replace('/home/ss')
      },
      initData() {
        this.loading = true
        fetch('get', api.bjToken, {}).then((res) => {
          this.rToken = res.data
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
        fetch('get', api.bjList, {}).then((res) => {
          this.rList = res.data.slice(0, 50)
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
        fetch('get', api.ycFind, {begin_time: moment().format('YYYY-MM'), end_time: moment().format('YYYY-MM')}).then((res) => {
          this.wList = res.data.slice(0, 50)
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
    .info
      background: $color-sub-text
      display: flex
      flex-direction: column
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
      .table-box > .row
        min-height: calc(50vh - 85px)
      .chart-box
        min-height: 350px
        border-radius: 0px
</style>
