<template>
  <div>
    <m-header></m-header>
    <m-menu v-if="$route.path.indexOf('/home/ss') < 0 "></m-menu>
    <div class="container" :class="$route.path.indexOf('/home/ss') < 0 ? 'h2' : 'h1'">
      <div class="main">
        <router-view/>
      </div>
    </div>
  </div>
</template>
<script>
  import MHeader from 'components/m-header/m-header.vue'
  import MMenu from 'base/m-menu/m-menu.vue'
  import HMenu from 'base/h-menu/h-menu.vue'
  import MNews from 'components/m-news/m-news'
  export default {
    components: {
      MHeader,
      MMenu,
      HMenu,
      MNews
    },
    data() {
      return {
        menuShow: true
      }
    },
    methods: {
    }
  }
</script>
<style scoped lang="stylus">
  .container
    &.h1
      margin-top: 70px
    &.h2
      margin-top: 110px
      color: #006195
</style>
