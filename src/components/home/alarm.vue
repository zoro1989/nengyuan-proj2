<template>
  <div id="alert" class="info-container">
    <div class="info">
      <div class="col-box">
        <select-title>
          <el-button slot="title1" class="goHomeBtn" size="mini" @click="goHome" icon="el-icon-back" plain>返回首页</el-button>
        </select-title>
      </div>
      <div class="col-box-left-right-bottom">
        <!--<div class="panel-box" v-loading="loading">-->
        <div class="panel-box">
          <div class="row">
            <div class="table-box">
              <div class="row">
                <el-table
                  class="token-table"
                  :data="rToken"
                  border
                  header-cell-class-name="header-cell-class-name">
                  <el-table-column
                    prop="org"
                    fixed
                    align="center"
                    min-width="220"
                    label="公司名称">
                  </el-table-column>
                  <el-table-column
                    min-width="50"
                    align="center">
                    <template slot="header" slot-scope="scope">
                      <span>通讯<br>状态</span>
                    </template>
                    <template slot-scope="scope">
                      <span class="dbl" :style="dblStyle(scope.$index)"></span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    align="center"
                    label="电表">
                    <el-table-column
                      align="center"
                      prop="dcj"
                      label="采集">
                    </el-table-column>
                    <el-table-column
                      align="center"
                      width="80"
                      prop="dscl"
                      label="上传率">
                    </el-table-column>
                    <el-table-column
                      align="center"
                      width="80"
                      prop="dzql"
                      label="准确率">
                    </el-table-column>
                    <el-table-column
                      align="center"
                      prop="dzc"
                      label="正常传输">
                    </el-table-column>
                  </el-table-column>
                  <el-table-column
                    align="center"
                    label="水表">
                    <el-table-column
                      align="center"
                      prop="scj"
                      label="采集">
                    </el-table-column>
                    <el-table-column
                      align="center"
                      width="80"
                      prop="sscl"
                      label="上传率">
                    </el-table-column>
                    <el-table-column
                      align="center"
                      width="80"
                      prop="szql"
                      label="准确率">
                    </el-table-column>
                    <el-table-column
                      align="center"
                      prop="szc"
                      label="正常传输">
                    </el-table-column>
                  </el-table-column>
                  <el-table-column
                    align="center"
                    label="天然气表">
                    <el-table-column
                      align="center"
                      prop="qcj"
                      label="采集">
                    </el-table-column>
                    <el-table-column
                      align="center"
                      width="80"
                      prop="qscl"
                      label="上传率">
                    </el-table-column>
                    <el-table-column
                      align="center"
                      width="80"
                      prop="qzql"
                      label="准确率">
                    </el-table-column>
                    <el-table-column
                      align="center"
                      prop="qzc"
                      label="正常传输">
                    </el-table-column>
                  </el-table-column>
                  <el-table-column
                    align="center"
                    label="热力表">
                    <el-table-column
                      align="center"
                      prop="rcj"
                      label="采集">
                    </el-table-column>
                    <el-table-column
                      align="center"
                      width="80"
                      prop="rscl"
                      label="上传率">
                    </el-table-column>
                    <el-table-column
                      align="center"
                      width="80"
                      prop="rzql"
                      label="准确率">
                    </el-table-column>
                    <el-table-column
                      align="center"
                      prop="rzc"
                      label="正常传输">
                    </el-table-column>
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
                      header-cell-class-name="header-cell-class-name">
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
                        width="240"
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
                      header-cell-class-name="header-cell-class-name">
                      <el-table-column
                        align="center"
                        min-width="30%"
                        prop="org"
                        label="分子公司">
                      </el-table-column>
                      <el-table-column
                        align="center"
                        min-width="20%"
                        prop="createdAt"
                        label="日志时间">
                      </el-table-column>
                      <el-table-column
                        align="center"
                        min-width="50%"
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
        if (moment().isAfter(this.rToken[index].validTime)) {
          this.rToken[index].dcj = ''
          this.rToken[index].dscl = ''
          this.rToken[index].dzql = ''
          this.rToken[index].dzc = ''
          this.rToken[index].scj = ''
          this.rToken[index].sscl = ''
          this.rToken[index].szql = ''
          this.rToken[index].szc = ''
          this.rToken[index].qcj = ''
          this.rToken[index].qscl = ''
          this.rToken[index].qzql = ''
          this.rToken[index].qzc = ''
          this.rToken[index].rcj = ''
          this.rToken[index].rscl = ''
          this.rToken[index].rzql = ''
          this.rToken[index].rzc = ''
          return 'background: #F56C6C; color: #fff;'
        } else {
          return 'background: #67C23A; color: #fff;'
        }
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
<style lang="stylus">
  @import "~common/stylus/variable.styl"
  @import "~common/stylus/mixin.styl"
  #alert.info-container
    .info
      background: $color-sub-text
      display: flex
      flex-direction: column
      min-width: 600px
      .goHomeBtn
        margin-left: 10px
      .panel-box
        width: 100%
        padding-top: 10px
        min-height: calc(100vh - 150px)
      .dbl
        width: 10px
        height: 10px
        border-radius: 50%
        display: inline-block
</style>
