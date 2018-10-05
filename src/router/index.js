import Vue from 'vue'
import Router from 'vue-router'
const Home = () => import('components/home/home')
const Zhnh = () => import('components/home/zhnh')
const Nyylfy = () => import('components/home/nyylfy')
const Ssxz = () => import('components/home/ssxz')
const Dbfx = () => import('components/home/dbfx')
const Nyzlfx = () => import('components/nyzhfx/nyfyjg/nyzlfx')
const Nybmfx = () => import('components/nyzhfx/nyfyjg/nybmfx')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: '首页',
      component: Home
    },
    {
      path: '/ssxz',
      name: '实时下钻',
      component: Ssxz
    },
    {
      path: '/zhnh',
      name: '综合能耗',
      component: Zhnh
    },
    {
      path: '/nyylfy',
      name: '能源用量费用',
      component: Nyylfy
    },
    {
      path: '/dbfx',
      name: '对比分析',
      component: Dbfx
    },
    {
      path: '/nyzlfx',
      name: '能源种类分析',
      component: Nyzlfx
    },
    {
      path: '/nybmfx',
      name: '能源部门分析',
      component: Nybmfx
    }
  ]
})
