import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import promise from 'es6-promise'
import 'common/stylus/index.styl'
import 'vue2-event-calendar/default.css'
import Calendar from 'vue2-event-calendar/dist/calendar-nodep.js'
import ElementUI from 'element-ui'
Vue.use(ElementUI)
Vue.component('Calendar', Calendar)
Vue.config.productionTip = false
promise.polyfill()
fastclick.attach(document.body)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
