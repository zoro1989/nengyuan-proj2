// let apiPath = '/api/';
// let apiPath = 'http://47.95.14.172:8088/web/';
// let apiPath = 'http://rancode.jymenu.com/';
// let apiPath = '/yqny/'
let apiPath = '/'
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
  queryNyEyHtLFx: apiPath + 'queryNyEyHtLFx',
  hourNy: apiPath + 'hour_ny',
  dayNy: apiPath + 'day_ny',
  yueNy: apiPath + 'yue_ny',
  nyylfxJituan: apiPath + 'nyylfx/jituan',
  nyylfxDay: apiPath + 'nyylfx/day',
  nyfyfx: apiPath + 'nyfyfx',
  bianyaqiList: apiPath + 'api/bianyaqi/list',
  bianyaqiUpdate: apiPath + 'api/bianyaqi/update',
  bianyaqiCreate: apiPath + 'api/bianyaqi/create',
  kongyajiList: apiPath + 'api/kongyaji/list',
  kongyajiUpdate: apiPath + 'api/kongyaji/update',
  kongyajiCreate: apiPath + 'api/kongyaji/create',
  dianjiList: apiPath + 'api/dianji/list',
  dianjiUpdate: apiPath + 'api/dianji/update',
  dianjiCreate: apiPath + 'api/dianji/create'
}

const apiDict = {

}

const apiStatus = {
  success: 0
}

export { api, apiDict, apiStatus }
