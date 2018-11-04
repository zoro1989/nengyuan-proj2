<template>
  <div class="info-container">
    <el-tabs type="card" v-model="activeTab">
      <el-tab-pane label="集团" name="jt">
        <jt></jt>
      </el-tab-pane>
      <el-tab-pane label="公司" name="gs">
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
      min-height: 100%
      min-width: 600px
</style>
