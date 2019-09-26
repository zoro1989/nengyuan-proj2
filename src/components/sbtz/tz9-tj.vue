<template>
  <div class="info-container">
    <div class="info">
      <div class="col-box">
        <div class="panel-box" v-loading="loading">
          <div class="row">
            <div class="table-box">
              <div class="row">
                <el-table
                  :data="rList"
                  :span-method="arraySpanMethod"
                  border
                  header-cell-class-name="header-cell-class-name"
                  style="width: 99%">
                  <el-table-column
                    prop="name"
                    width="250"
                    label="公司名">
                  </el-table-column>
                  <el-table-column
                    align="center"
                    prop="ly"
                    label="炉窑">
                  </el-table-column>
                  <el-table-column
                    align="center"
                    prop="byq"
                    label="变压器">
                  </el-table-column>
                  <el-table-column
                    align="center"
                    prop="gl"
                    label="锅炉">
                  </el-table-column>
                  <el-table-column
                    align="center"
                    prop="kyj"
                    label="空压机">
                  </el-table-column>
                  <el-table-column
                    align="center"
                    prop="fj"
                    label="风机">
                  </el-table-column>
                  <el-table-column
                    align="center"
                    prop="sb"
                    label="水泵">
                  </el-table-column>
                  <el-table-column
                    align="center"
                    prop="qt"
                    label="其他">
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
  import { api } from '@/config'
  import fetch from 'utils/fetch'
  export default {
    created() {
      this.onSearch()
    },
    data() {
      return {
        loading: false,
        tableData: [],
        rList: []
      }
    },
    methods: {
      arraySpanMethod({ row, column, rowIndex, columnIndex }) {
        if (rowIndex === this.rList.length - 1) {
          if (columnIndex === 1) {
            return [1, 7]
          }
        }
      },
      onSearch() {
        this.loading = true
        fetch('get', api.sbTj, {}).then((res) => {
          this.rList = res.reuslt
          this.rList.push(res.hj)
          this.rList.push({'name': '总计', 'ly': res.zj, 'gl': res.zj, 'kyj': res.zj, 'fj': res.zj, 'sb': res.zj, 'byq': res.zj, 'qt': res.zj})
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
      background-color: $color-background-sub
      display: flex
      flex-direction: column
      min-width: 600px
      .search-btn
        margin: 10px 0
      .date-type
        width: 60px
      .department-block
        display: inline-block
        width: 25px
        height: 10px
      .panel-box > .row
        min-height: calc(100vh - 140px)
      .chart-box
        min-height: 350px
        border-radius: 0px
</style>
