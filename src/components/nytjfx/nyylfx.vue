<template>
  <div class="info-container">
    <el-tabs type="card" v-model="activeTab">
      <el-tab-pane label="集团" name="jt" :lazy="true">
        <jt></jt>
      </el-tab-pane>
      <el-tab-pane label="公司" name="gs" :lazy="true">
        <gs></gs>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  import Jt from './jt.vue'
  import Gs from './gs.vue'
  export default {
    components: {
      Jt,
      Gs
    },
    data() {
      return {
        activeTab: 'jt'
      }
    },
    methods: {}
  }
</script>
<style lang="stylus" scoped>
  @import "~common/stylus/variable.styl"
  @import "~common/stylus/mixin.styl"
  .info-container
    .el-tabs
      background-color: #fff
      height: 100%
      .el-tabs__content
        height: calc(100% - 55px)
</style>
