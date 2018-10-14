import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import promise from 'es6-promise'
import 'common/stylus/index.styl'
import 'vue2-event-calendar/default.css'
import Calendar from 'vue2-event-calendar/dist/calendar-nodep.js'
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
  TableColumn,
  Tag,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Tree,
  Popover,
  Input,
  Checkbox,
  Tooltip,
  Loading
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
Vue.use(Tag)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Tree)
Vue.use(Popover)
Vue.use(Input)
Vue.use(Checkbox)
Vue.use(Tooltip)
Vue.use(Loading)
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
