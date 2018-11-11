/**
 * Created by Administrator on 2018/9/26.
 */
export function filterArr(arr) {
  let resultArr = []
  for (let item of arr) {
    let temp = ''
    switch (item) {
      case '四川一汽丰田汽车有限公司':
        temp = '四川丰田'
        break
      case '一汽轿车股份有限公司':
        temp = '一汽轿车'
        break
      case '一汽吉林汽车有限公司':
        temp = '吉林汽车'
        break
      case '一汽丰越公司':
        temp = '一汽丰越'
        break
      case '天津一汽夏利汽车有限公司':
        temp = '天津夏利'
        break
      case '天津一汽丰田汽车有限公司':
        temp = '天津丰田'
        break
      case '一汽大众公司':
        temp = '一汽大众'
        break
      case '一汽通用轻型商用汽车有限公司':
        temp = '一汽通用'
        break
      case '一汽解放汽车有限公司':
        temp = '一汽解放'
        break
      case '一汽新能源汽车有限公司':
        temp = '新能源'
        break
      case '一汽铸锻有限公司':
        temp = '一汽铸锻'
        break
      case '天津一汽丰田发动机有限公司':
        temp = '天津丰发'
        break
      case '一汽丰田（长春）发动机有限公司':
        temp = '长春丰发'
        break
      case '长春一汽富维汽车零部件股份有限公司':
        temp = '一汽富维'
        break
      case '一汽模具制造有限公司':
        temp = '一汽模具'
        break
      default:
        temp = item
    }
    resultArr.push(temp)
  }
  return resultArr
}

export function filter(str) {
  let resultStr = ''
  switch (str) {
    case '四川一汽丰田汽车有限公司':
      resultStr = '四川丰田'
      break
    case '一汽轿车股份有限公司':
      resultStr = '一汽轿车'
      break
    case '一汽吉林汽车有限公司':
      resultStr = '吉林汽车'
      break
    case '一汽丰越公司':
      resultStr = '一汽丰越'
      break
    case '天津一汽夏利汽车有限公司':
      resultStr = '天津夏利'
      break
    case '天津一汽丰田汽车有限公司':
      resultStr = '天津丰田'
      break
    case '一汽大众公司':
      resultStr = '一汽大众'
      break
    case '一汽通用轻型商用汽车有限公司':
      resultStr = '一汽通用'
      break
    case '一汽解放汽车有限公司':
      resultStr = '一汽解放'
      break
    case '一汽新能源汽车有限公司':
      resultStr = '新能源'
      break
    case '一汽铸锻有限公司':
      resultStr = '一汽铸锻'
      break
    case '天津一汽丰田发动机有限公司':
      resultStr = '天津丰发'
      break
    case '一汽丰田（长春）发动机有限公司':
      resultStr = '长春丰发'
      break
    case '长春一汽富维汽车零部件股份有限公司':
      resultStr = '一汽富维'
      break
    case '一汽模具制造有限公司':
      resultStr = '一汽模具'
      break
    default:
      resultStr = str
  }
  return resultStr
}

export function tableDataFilter(tableData) {
  let copyTableData = JSON.parse(JSON.stringify(tableData))
  return copyTableData.map((item) => {
    for (let i in item) {
      if (Object.prototype.toString.call(item[i]) === '[object Number]') {
        item[i] = Math.round(item[i])
      }
    }
    return item
  })
}

export function tableDataBMFilter(tableData) {
  let copyTableData = JSON.parse(JSON.stringify(tableData))
  return copyTableData.map((item) => {
    for (let i in item) {
      if (Object.prototype.toString.call(item[i] * 1) === '[object Number]' && (i === 'zhnh' || i === 'tqzhnh')) {
        item[i] = Math.round(item[i])
      }
    }
    return item
  })
}
