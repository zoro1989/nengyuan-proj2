import Vue from 'vue'
import Router from 'vue-router'
const Home = () => import('components/home/home')
const EnergyCost = () => import('components/energy-cost/energy-cost')
const StatisticsAnalyze = () => import('components/statistics-analyze/statistics-analyze')
const IndicatorAnalyze = () => import('components/indicator-analyze/indicator-analyze')
const EnergyManage = () => import('components/energy-manage/energy-manage')
const EnergyWarning = () => import('components/energy-warning/energy-warning')
const SysEnergyManage = () => import('components/sys-energy-manage/sys-energy-manage')

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
      path: '/energy-cost',
      name: '能源消耗总览',
      component: EnergyCost
    },
    {
      path: '/statistics-analyze',
      name: '能源统计分析',
      component: StatisticsAnalyze
    },
    {
      path: '/indicator-analyze',
      name: '能源指标分析',
      component: IndicatorAnalyze
    },
    {
      path: '/energy-manage',
      name: '设备能效管理',
      component: EnergyManage
    },
    {
      path: '/energy-warning',
      name: '能源预测/预警',
      component: EnergyWarning
    },
    {
      path: '/sys-energy-manage',
      name: '系统能源管理',
      component: SysEnergyManage
    }
  ]
})
