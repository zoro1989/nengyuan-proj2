import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import 'common/stylus/index.styl'

import {
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Cascader,
  Select,
  Option,
  DatePicker,
  Button,
  Table,
  TableColumn
} from 'element-ui'
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Cascader)
Vue.use(Select)
Vue.use(Option)
Vue.use(DatePicker)
Vue.use(Button)
Vue.use(Table)
Vue.use(TableColumn)

Vue.config.productionTip = false

fastclick.attach(document.body)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
