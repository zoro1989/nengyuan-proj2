import Vue from 'vue'
import Router from 'vue-router'
const Home = () => import('components/home/home')
const Zhnh = () => import('components/home/zhnh')
const Nyylfy = () => import('components/home/nyylfy')
const Ssxz = () => import('components/home/ssxz')
const Dbfx = () => import('components/home/dbfx')
const Nyzlfx = () => import('components/nyzhfx/nyfyjg/nyzlfx')
const Nybmfx = () => import('components/nyzhfx/nyfyjg/nybmfx')
const Eyhtfx = () => import('components/nyzhfx/eyhtfx')
const Nyylfx = () => import('components/nytjfx/nyylfx')
const Nyfyfx = () => import('components/nytjfx/nyfyfx')
const TjEyhtfx = () => import('components/nytjfx/eyht')
const Djfx = () => import('components/nytjfx/djfx')
const Bmynfx = () => import('components/nytjfx/bmynfx')
const Nyfhfx = () => import('components/nytjfx/nyfhfx')
const Byq = () => import('components/sblr/byq')
const Kyj = () => import('components/sblr/kyj')
const Dj = () => import('components/sblr/dj')

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
      path: '/nyzlfx/:type',
      name: '能源种类分析',
      component: Nyzlfx
    },
    {
      path: '/nybmfx/:type',
      name: '能源部门分析',
      component: Nybmfx
    },
    {
      path: '/eyhtfx',
      name: '二氧化碳分析',
      component: Eyhtfx
    },
    {
      path: '/nyylfx',
      name: '能源用量分析',
      component: Nyylfx
    },
    {
      path: '/nyfyfx',
      name: '能源费用分析',
      component: Nyfyfx
    },
    {
      path: '/tjeyhtfx',
      name: '二氧化碳分析',
      component: TjEyhtfx
    },
    {
      path: '/djfx',
      name: '电价分析',
      component: Djfx
    },
    {
      path: '/bmynfx',
      name: '部门用能分析',
      component: Bmynfx
    },
    {
      path: '/nyfhfx',
      name: '能源负荷分析',
      component: Nyfhfx
    },
    {
      path: '/byq',
      name: '变压器',
      component: Byq
    },
    {
      path: '/kyj',
      name: '空压机',
      component: Kyj
    },
    {
      path: '/dj',
      name: '电机',
      component: Dj
    }
  ]
})
