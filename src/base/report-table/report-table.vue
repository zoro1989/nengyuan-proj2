<template>
  <div :class="className" class="report-table">
    <slot name="title"></slot>
    <div class="export-box">
      <span class="export-excel ripple" @click="exportExcel"><i class="el-icon-download" :class="isHome ? 'home-class' : ''"></i></span>
      <slot name="table"></slot>
    </div>
  </div>
</template>
<script>
  import { exportTb } from 'utils/exportTable'
  export default {
    props: {
      className: {
        type: String,
        default: 'report-table'
      },
      reportName: {
        type: String,
        default: '测试'
      },
      isHome: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      exportExcel() {
        exportTb('.' + this.className + ' .el-table', this.reportName + '.xlsx')
      }
    }
  }
</script>
<style scoped lang="stylus">
  .report-table
    .export-box
      position: relative
      width: 100%
      .export-excel
        cursor: pointer
        color: #909399
        right: 0
        top: 0
        font-size: 16px
        position: absolute
        z-index: 5
        .home-class
          color: #fff
</style>
