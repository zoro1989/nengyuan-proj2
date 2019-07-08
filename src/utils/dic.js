/**
 * Created by zhulin on 2018/11/5.
 */
import {filter} from './filter'
export const chartColors = ['#0a00dd', '#09cdf7', '#00ffc6', '#8c6be6', '#ff8dc2', '#ff9c00']
let orgList = [
  {
    id: '1',
    value: '2611',
    label: '集团公司'
  },
  // {
  //   id: '14',
  //   value: '41954',
  //   label: '四川一汽丰田汽车有限公司'
  // },
  {
    id: '35',
    value: '2763112',
    label: '丰田事业本部'
  },
  {
    id: '15',
    value: '904489',
    label: '一汽丰越公司'
  },
  {
    id: '3',
    value: '42052',
    label: '红旗工厂'
  },
  {
    id: '4',
    value: '41951',
    label: '一汽大众公司'
  },
  {
    id: '10',
    value: '41949',
    label: '一汽轿车股份有限公司'
  },
  {
    id: '16',
    value: '41937',
    label: '一汽解放汽车有限公司'
  },
  {
    id: '17',
    value: '41939',
    label: '一汽吉林汽车有限公司'
  },
  // {
  //   id: '18',
  //   value: '41953',
  //   label: '天津一汽丰田汽车有限公司'
  // },
  {
    id: '19',
    value: '41950',
    label: '天津一汽夏利汽车有限公司'
  },
  // {
  //   id: '20',
  //   value: '41952',
  //   label: '一汽通用轻型商用汽车有限公司'
  // }, {
  //   id: '21',
  //   value: '41938',
  //   label: '一汽客车有限公司'
  // }, {
  //   id: '22',
  //   value: '41917',
  //   label: '一汽新能源汽车有限公司'
  // },
  {
    id: '25',
    value: '41944',
    label: '一汽铸锻有限公司'
  },
  {
    id: '26',
    value: '41945',
    label: '一汽模具制造有限公司'
  },
  {
    // value: '41924',
    // label: '长春一汽富维汽车零部件股份有限公司'
    id: '34',
    value: '2745731',
    label: '天津动力总成'
  },
  // {
  //   id: '27',
  //   value: '41955',
  //   label: '一汽丰田（长春）发动机有限公司'
  // }, {
  //   id: '28',
  //   value: '41956',
  //   label: '天津一汽丰田发动机有限公司'
  // }, {
  //   id: '29',
  //   value: '41992',
  //   label: '无锡泽根弹簧有限公司'
  // }, {
  //   id: '31',
  //   value: '42018',
  //   label: '一汽国际物流'
  // },
  {
    id: '32',
    value: '41947',
    label: '一汽物流'
  }, {
    id: '33',
    value: '41934',
    label: '动能分公司'
  }
]
export const orgSystemIdDic = orgList
let orgListCasc = JSON.parse(JSON.stringify(orgList))
orgListCasc[4].children = [{
  value: '1546481',
  label: '大众汽车（长春）'
}]
export const orgSystemIdDicCasc = [orgListCasc[2], orgListCasc[3], orgListCasc[4], orgListCasc[5], orgListCasc[7]]
let orgListNoJituan = JSON.parse(JSON.stringify(orgList))
orgListNoJituan.shift()
export const orgSystemIdDicNoJituan = orgListNoJituan
let orgIdDicList = []
for (let i = 0; i < orgList.length; i++) {
  orgIdDicList.push(
    {
      value: orgList[i].id,
      label: orgList[i].label
    }
  )
}
export const orgIdDic = orgIdDicList
let orgIdSimpleDicList = []
for (let i = 0; i < orgList.length; i++) {
  orgIdSimpleDicList.push(
    {
      value: orgList[i].id,
      label: filter(orgList[i].label)
    }
  )
}
export const orgIdSimpleDic = orgIdSimpleDicList
let lxList = [
  {
    value: '33',
    label: '电'
  }, {
    value: '00',
    label: '水'
  }, {
    value: '32',
    label: '热力'
  }, {
    value: '15',
    label: '天然气'
  }, {
    value: '40',
    label: '能源消耗总量'
  }
]
export const lxDic = lxList
let lxDList = JSON.parse(JSON.stringify(lxList)).concat([
  {
    value: '33_d',
    label: '单车电'
  }, {
    value: '00_d',
    label: '单车水'
  }, {
    value: '32_d',
    label: '单车热力'
  }, {
    value: '15_d',
    label: '单车天然气'
  }, {
    value: '40_d',
    label: '单车能源消耗总量'
  }
])
export const lxdDic = lxDList
let lxfyList = [
  {
    value: '33',
    label: '电费'
  }, {
    value: '00',
    label: '水费'
  }, {
    value: '32',
    label: '热力费'
  }, {
    value: '15',
    label: '天然气费'
  }, {
    value: '40',
    label: '总费用'
  }
]
export const lxfyNoCarDic = lxfyList
let lxfyCarList = JSON.parse(JSON.stringify(lxfyList)).concat([
  {
    value: '202',
    label: '乘用车费用'
  }, {
    value: '201',
    label: '中重型车费用'
  }
])
export const lxfyDic = lxfyCarList
export const lxTanDic = [
  {
    value: 'tan',
    label: '碳'
  }, {
    value: 'dtan',
    label: '单车碳'
  }
]
export const lxrdDic = [
  {
    value: '32',
    label: '热力'
  }, {
    value: '15',
    label: '天然气'
  }
  // {
  //   value: '32_d',
  //   label: '单车热力'
  // }, {
  //   value: '15_d',
  //   label: '单车天然气'
  // }
]
export const monthDic = [
  {
    value: '01',
    label: '一月'
  },
  {
    value: '02',
    label: '二月'
  },
  {
    value: '03',
    label: '三月'
  },
  {
    value: '04',
    label: '四月'
  },
  {
    value: '05',
    label: '五月'
  },
  {
    value: '06',
    label: '六月'
  },
  {
    value: '07',
    label: '七月'
  },
  {
    value: '08',
    label: '八月'
  },
  {
    value: '09',
    label: '九月'
  },
  {
    value: '10',
    label: '十月'
  },
  {
    value: '11',
    label: '十一月'
  },
  {
    value: '12',
    label: '十二月'
  }
]
export function getYAxis (lx) {
  if (lx === '33') {
    return [{name: '万千瓦时'}, {name: '产量(辆)'}]
  } else if (lx === '00') {
    return [{name: '千吨'}, {name: '产量(辆)'}]
  } else if (lx === '32') {
    return [{name: '吉焦'}, {name: '产量(辆)'}]
  } else if (lx === '15') {
    return [{name: '万立方米'}, {name: '产量(辆)'}]
  } else if (lx === '40') {
    return [{name: '万吨标煤'}, {name: '产量(辆)'}]
  } else if (lx === '33_d') {
    return [{name: '千瓦时/辆'}, {name: '产量(辆)'}]
  } else if (lx === '00_d') {
    return [{name: '吨/辆'}, {name: '产量(辆)'}]
  } else if (lx === '32_d') {
    return [{name: '吉焦/辆'}, {name: '产量(辆)'}]
  } else if (lx === '15_d') {
    return [{name: '立方米/辆'}, {name: '产量(辆)'}]
  } else if (lx === '40_d') {
    return [{name: '吨标煤/辆'}, {name: '产量(辆)'}]
  } else {
    return []
  }
}
