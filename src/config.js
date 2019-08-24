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
  queryNyZListWl: apiPath + 'queryNyZList?pid=30',
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
  dayolumnOrder: apiPath + 'day_column_order',
  nyylfxJituan: apiPath + 'nyylfx/jituan',
  nyylfxDay: apiPath + 'nyylfx/day',
  nyfyfx: apiPath + 'nyfyfx',
  tanfx: apiPath + 'tanfx',
  bumenyongnengfx: apiPath + 'bumenyongnengfx',
  dianjiafenxi: apiPath + 'dianjiafenxi',
  byqJituan: apiPath + 'byq/jituan',
  byqGs: apiPath + 'byq/gs',
  byqList: apiPath + 'byq/list',
  kyjJituan: apiPath + 'kyj/jituan',
  kyjGs: apiPath + 'kyj/gs',
  kyjList: apiPath + 'kyj/list',
  djJituan: apiPath + 'dj/jituan',
  djGs: apiPath + 'dj/gs',
  djList: apiPath + 'dj/list',
  bianyaqiList: apiPath + 'api/bianyaqi/list',
  bianyaqiUpdate: apiPath + 'api/bianyaqi/update',
  bianyaqiCreate: apiPath + 'api/bianyaqi/create',
  kongyajiList: apiPath + 'api/kongyaji/list',
  kongyajiUpdate: apiPath + 'api/kongyaji/update',
  kongyajiCreate: apiPath + 'api/kongyaji/create',
  dianjiList: apiPath + 'api/dianji/list',
  dianjiUpdate: apiPath + 'api/dianji/update',
  dianjiCreate: apiPath + 'api/dianji/create',
  kipList: apiPath + 'api/kpi/list',
  kpiNd: apiPath + 'api/kpi/nd',
  bjToken: apiPath + 'log/bj/token',
  bjList: apiPath + 'log/bj/list',
  zbKpiPjList: apiPath + 'api/ZbKpiPj/list',
  zbKpiPjCreate: apiPath + 'api/ZbKpiPj/create',
  sbLyList: apiPath + 'sb/ly/list',
  sbLyCreate: apiPath + 'sb/ly/create',
  sbGlList: apiPath + 'sb/gl/list',
  sbGlCreate: apiPath + 'sb/gl/create',
  sbKyjList: apiPath + 'sb/kyj/list',
  sbKyjCreate: apiPath + 'sb/kyj/create',
  sbFjList: apiPath + 'sb/fj/list',
  sbFjCreate: apiPath + 'sb/fj/create',
  sbSbList: apiPath + 'sb/sb/list',
  sbSbCreate: apiPath + 'sb/sb/create',
  sbByqList: apiPath + 'sb/byq/list',
  sbByqCreate: apiPath + 'sb/byq/create',
  sbQtList: apiPath + 'sb/qt/list',
  sbQtCreate: apiPath + 'sb/qt/create',
  jihuaCreate: apiPath + 'jihua/create',
  ycFind: apiPath + 'api/yc/find',
  userList: apiPath + 'api/user/list',
  userFind: apiPath + 'api/user/find',
  userCreate: apiPath + 'api/user/create',
  userDelete: apiPath + 'api/user/delete',
  userUpdate: apiPath + 'api/user/update',
  userUfind: apiPath + 'api/user/ufind',
  orgShow: apiPath + 'api/org/show',
  orgFind: apiPath + 'api/org/find',
  orgCreate: apiPath + 'api/org/create',
  orgDelete: apiPath + 'api/org/delete',
  orgUpdate: apiPath + 'api/org/update'
}

const apiDict = {

}

const apiStatus = {
  success: 0
}

export { api, apiDict, apiStatus }
