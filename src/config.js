// let apiPath = '/api/';
// let apiPath = 'http://47.95.14.172:8088/web/';
// let apiPath = 'http://rancode.jymenu.com/';
let apiPath = '/yqny/'
// let apiPath = '/'
const api = {
  getHomeData: apiPath + 'queryShouYeList',
  queryZhiBiaoList: apiPath + 'queryZhiBiaoList',
  queryNyZListZc: apiPath + 'queryNyZList?pid=2',
  queryNyZListLbj: apiPath + 'queryNyZList?pid=23',
  queryXinXiList: apiPath + 'queryXinXiList',
  queryNyYLListDl: apiPath + 'queryNyYLList',
  queryNyYLListDf: apiPath + 'queryNyDLList',
  queryNyDBList: apiPath + 'queryNyDBList',
  queryShouYeNhJn: apiPath + 'queryShouYeNhJn',
  queryNyZlFx: apiPath + 'queryNyZlFx',
  queryNyZcZzYl: apiPath + 'queryNyZcZzYl',
  queryNyFyJg: apiPath + 'queryNyFyJg',
  queryNyZcFyDb: apiPath + 'queryNyZcFyDb',
  queryNyEyHtLFx: apiPath + 'queryNyEyHtLFx'
}

const apiDict = {

}

const apiStatus = {
  success: 0
}

export { api, apiDict, apiStatus }
