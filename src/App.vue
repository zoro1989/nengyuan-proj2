<template>
  <div id="app">
    <login></login>
    <m-header></m-header>
    <div class="container">
      <!--<m-menu v-show="menuShow" @hide-menu="hideMenu"></m-menu>-->
      <m-menu></m-menu>
      <!--<h-menu v-show="hMenuShow" @hide-hmenu="hideMenu"></h-menu>-->
      <div class="main">
        <!--<m-news @toggle-menu="toggleMenu" @toggle-hmenu="toggleHMenu"></m-news>-->
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
import Login from 'components/login/login.vue'
import MHeader from 'components/m-header/m-header.vue'
import MMenu from 'base/m-menu/m-menu.vue'
import HMenu from 'base/h-menu/h-menu.vue'
import MNews from 'components/m-news/m-news'
export default {
  components: {
    Login,
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
  #app
    .container
      display: flex
      position: fixed
      top: 70px
      bottom: 0
      left: 0
      width: 100%
      .main
        position: absolute
        left: 180px
        top: 0
        bottom: 0
        right: 0
</style>
