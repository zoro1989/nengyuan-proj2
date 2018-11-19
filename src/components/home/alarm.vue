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
                <el-table
                  :data="rList"
                  border
                  header-cell-class-name="header-cell-class-name"
                  style="width: 99%">
                  <el-table-column
                    prop="org"
                    label="对应部门">
                  </el-table-column>
                  <el-table-column
                    prop="createdAt"
                    label="报警时间">
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
    </div>
  </div>
</template>
<script>
  import SelectTitle from 'base/select-title/select-title'
  import { api } from '@/config'
  import fetch from 'utils/fetch'
  import {getToken} from 'common/js/cache'
  let moment = require('moment')
  moment.locale('zh-cn')
  export default {
    components: {
      SelectTitle
    },
    created() {
      if (!getToken()) {
        this.$router.replace('/login')
      } else {
        this.initData()
      }
    },
    data() {
      return {
        loading: false,
        rToken: [],
        rList: []
      }
    },
    methods: {
      dblStyle(index) {
        let intNow = (new Date().getTime()) * 1
        let res = this.rToken[index].validTime * 1 - intNow
        return res <= 0 ? 'background: #F56C6C; color: #fff;' : 'background: #67C23A; color: #fff;'
      },
      goHome() {
        this.$router.replace('/home')
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
          this.rList = res.data
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
        min-height: calc(50vh - 90px)
      .chart-box
        min-height: 350px
        border-radius: 0px
</style>
