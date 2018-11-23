import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import promise from 'es6-promise'
import 'common/stylus/index.styl'
import ElementUI from 'element-ui'
Vue.use(ElementUI)
Vue.config.productionTip = false
promise.polyfill()
fastclick.attach(document.body)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
