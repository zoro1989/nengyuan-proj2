<template>
  <div class="select-title">
    <div class="title-l">
      <span class="picker-txt">{{title1}}：</span>
      <slot name="title1"></slot>
      <span class="picker-txt" v-if="title2">{{title2}}：</span>
      <slot name="title2"></slot>
      <span class="picker-txt" v-if="title3">{{title3}}：</span>
      <slot name="title3"></slot>
      <el-button class="search-btn" v-if="showSearch" type="primary" icon="el-icon-search" size="mini" @click="onSearch">搜索</el-button>
    </div>
    <div class="title-r">
      <span @click="onClose" class="ripple"><i class="fa fa-times"></i></span>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      title1: {
        type: String,
        default: ''
      },
      title2: {
        type: String,
        default: ''
      },
      title3: {
        type: String,
        default: ''
      },
      showSearch: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      onClose() {
        this.$router.replace('/home/ss')
      },
      onSearch() {
        this.$emit('search')
      }
    }
  }
</script>
<style scoped lang="stylus">
  .select-title
    padding-top: 10px
    min-height: 50px
    display: flex
    align-items: center
    width: 100%
    background: #fff
    border-radius: 5px
    color: #333
    justify-content: space-between
    &.home
      background: transparent
      color: #fff
    .title-r
      .fa
        margin: 0 5px
        color: #899eb6
        font-size: $font-size-large
        cursor: pointer
    .picker-txt
      padding: 0 5px 0 15px
    .search-btn
      margin-left: 15px
</style>
