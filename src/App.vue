<template>
  <div id="app">
    <m-header></m-header>
    <div class="container">
      <m-menu v-show="menuShow" @hide-menu="hideMenu"></m-menu>
      <h-menu v-show="hMenuShow" @hide-hmenu="hideMenu"></h-menu>
      <div class="main">
        <m-news @toggle-menu="toggleMenu" @toggle-hmenu="toggleHMenu"></m-news>
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
      menuShow: true,
      hMenuShow: true
    }
  },
  methods: {
    hideMenu() {
      this.hMenuShow = false
    },
    toggleMenu() {
      this.menuShow = !this.menuShow
    },
    toggleHMenu() {
      this.hMenuShow = !this.hMenuShow
    }
  }
}
</script>

<style scoped lang="stylus">
  #app
    .container
      display: flex
      position: fixed
      top: 90px
      bottom: 0
      left: 0
      right: 0
      overflow: hidden
      .main
        flex: 1
        position: relative
        width: 100%
</style>
