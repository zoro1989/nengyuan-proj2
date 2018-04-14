import Vue from 'vue'
import Router from 'vue-router'
const Home = () => import('components/home/home')
const EnergyCostStructure = () => import('components/energy-cost-structure/energy-cost-structure')
const EnergyFeeStructure = () => import('components/energy-fee-structure/energy-fee-structure')
const Co2Distribute = () => import('components/co2-distribute/co2-distribute')
const EnergyCostAnalyze = () => import('components/energy-cost-analyze/energy-cost-analyze')
const EnergyFeeAnalyze = () => import('components/energy-fee-analyze/energy-fee-analyze')
const Co2Analyze = () => import('components/co2-analyze/co2-analyze')
const EnergyLoadAnalyze = () => import('components/energy-load-analyze/energy-load-analyze')
const ElecFeeAnalyze = () => import('components/elec-fee-analyze/elec-fee-analyze')
const KpiIndicatorAnalyze = () => import('components/kpi-indicator-analyze/kpi-indicator-analyze')
const ConstIndicatorAnalyze = () => import('components/const-indicator-analyze/const-indicator-analyze')
const KpiIndicatorExamine = () => import('components/kpi-indicator-examine/kpi-indicator-examine')
const DeviceEfficAnalyze = () => import('components/device-effic-analyze/device-effic-analyze')

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
      path: '/energy-cost-structure',
      name: '能源消耗结构',
      component: EnergyCostStructure
    },
    {
      path: '/energy-fee-structure',
      name: '能源费用结构',
      component: EnergyFeeStructure
    },
    {
      path: '/co2-distribute',
      name: '二氧化碳分布',
      component: Co2Distribute
    },
    {
      path: '/energy-cost-analyze',
      name: '能源用量分析',
      component: EnergyCostAnalyze
    },
    {
      path: '/energy-fee-analyze',
      name: '能源费用分析',
      component: EnergyFeeAnalyze
    },
    {
      path: '/co2-analyze',
      name: '二氧化碳排放分析',
      component: Co2Analyze
    },
    {
      path: '/energy-load-analyze',
      name: '能源负荷分析',
      component: EnergyLoadAnalyze
    },
    {
      path: '/elec-fee-analyze',
      name: '电价分析',
      component: ElecFeeAnalyze
    },
    {
      path: '/kpi-indicator-analyze',
      name: 'KPI指标分析',
      component: KpiIndicatorAnalyze
    },
    {
      path: '/const-indicator-analyze',
      name: '定额指标分析',
      component: ConstIndicatorAnalyze
    },
    {
      path: '/kpi-indicator-examine',
      name: '绩效指标考核',
      component: KpiIndicatorExamine
    },
    {
      path: '/device-effic-analyze',
      name: '设备能效分析',
      component: DeviceEfficAnalyze
    }
  ]
})
