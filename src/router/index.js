import Vue from 'vue'
import Router from 'vue-router'
const Home = () => import('components/home/home')
const Zhnh = () => import('components/home/zhnh')
const Nyylfy = () => import('components/home/nyylfy')
const Ssxz = () => import('components/home/ssxz')
const Dbfx = () => import('components/home/dbfx')
const Alarm = () => import('components/home/alarm')

const Zlfy = () => import('components/nyzhfx/nyfyjg/zlfy')
const Zlnh = () => import('components/nyzhfx/nyfyjg/zlnh')
const Bmfy = () => import('components/nyzhfx/nyfyjg/bmfy')
const Bmnh = () => import('components/nyzhfx/nyfyjg/bmnh')
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

const Nxbyq = () => import('components/sbnxfx/byq')
const Nxkyj = () => import('components/sbnxfx/kyj')
const Nxfj = () => import('components/sbnxfx/fj')
const Nxsb = () => import('components/sbnxfx/sb')

const KPI1 = () => import('components/kpizbfx/kpi1')
const KPI2 = () => import('components/kpizbfx/kpi2')
const KPI3 = () => import('components/kpizbfx/kpi3')
const KPI4 = () => import('components/kpizbfx/kpi4')
const KPI5 = () => import('components/kpizbfx/kpi5')

const Taizhang1Ly = () => import('components/sbtz/tz1-ly')
const Taizhang2Gl = () => import('components/sbtz/tz2-gl')
const Taizhang3Kyj = () => import('components/sbtz/tz3-kyj')
const Taizhang5Tfj = () => import('components/sbtz/tz5-tfj')
const Taizhang6Sb = () => import('components/sbtz/tz6-sb')
const Taizhang7Byq = () => import('components/sbtz/tz7-byq')
const Taizhang8Qt = () => import('components/sbtz/tz8-qt')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/alarm'
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
      path: '/nyzlfx/fy',
      name: '能源种类分析',
      component: Zlfy
    },
    {
      path: '/nyzlfx/nh',
      name: '能源种类分析',
      component: Zlnh
    },
    {
      path: '/nybmfx/fy',
      name: '能源部门分析',
      component: Bmfy
    },
    {
      path: '/nybmfx/nh',
      name: '能源部门分析',
      component: Bmnh
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
      path: '/nxbyq',
      name: '变压器',
      component: Nxbyq
    },
    {
      path: '/nxkyj',
      name: '空压机',
      component: Nxkyj
    },
    {
      path: '/nxfj',
      name: '风机',
      component: Nxfj
    },
    {
      path: '/nxsb',
      name: '水泵',
      component: Nxsb
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
    },
    {
      path: '/kpi1',
      name: 'kpi指标分析',
      component: KPI1
    },
    {
      path: '/kpi2',
      name: 'kpi指标分析',
      component: KPI2
    },
    {
      path: '/kpi3',
      name: 'kpi指标分析',
      component: KPI3
    },
    {
      path: '/kpi4',
      name: 'kpi指标分析',
      component: KPI4
    },
    {
      path: '/kpi5',
      name: 'kpi指标分析',
      component: KPI5
    },
    {
      path: '/alarm',
      name: '能源预警',
      component: Alarm
    },
    {
      path: '/tz1-ly',
      name: '台账',
      component: Taizhang1Ly
    },
    {
      path: '/tz2-gl',
      name: '台账',
      component: Taizhang2Gl
    },
    {
      path: '/tz3-kyj',
      name: '台账',
      component: Taizhang3Kyj
    },
    {
      path: '/tz5-tfj',
      name: '台账',
      component: Taizhang5Tfj
    },
    {
      path: '/tz6-sb',
      name: '台账',
      component: Taizhang6Sb
    },
    {
      path: '/tz7-byq',
      name: '台账',
      component: Taizhang7Byq
    },
    {
      path: '/tz8-qt',
      name: '台账',
      component: Taizhang8Qt
    }
  ]
})
