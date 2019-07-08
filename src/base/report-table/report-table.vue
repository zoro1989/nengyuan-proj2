<template>
  <div :class="className" class="report-table">
    <span class="export-excel ripple" @click="exportExcel"><i class="el-icon-download" :class="isHome ? 'home-class' : ''"></i></span>
    <slot name="title"></slot>
    <slot name="table"></slot>
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
        exportTb('.' + this.className + ' >.el-table', this.reportName + '.xlsx')
      }
    }
  }
</script>
<style scoped lang="stylus">
  .report-table
    position: relative
    .export-excel
      cursor: pointer
      color: #909399
      right: 0
      top: 0
      font-size: 16px
      position: absolute
      z-index: 20
      .home-class
        color: #fff
</style>
