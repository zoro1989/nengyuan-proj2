<template>
  <div class="info-container">
    <div class="info">
      <div class="col-box">
        <select-title title1="用能单位">
          <el-select
            slot="title1"
            v-model="system_id"
            placeholder="请选择"
            @change="selectChange"
            size="mini">
            <el-option
              v-for="item in options1"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </select-title>
      </div>
      <div class="col-box-left-right-bottom">
        <div class="panel-box" v-loading="loading">
          <el-button type="primary" class="btn-add" size="mini" icon="el-icon-circle-plus-outline" @click="addStation">新增变压器</el-button>
          <div class="row">
            <div class="table-box">
              <el-table
                :data="tableData"
                border
                :header-cell-style="{background: '#f5f8fa'}"
                :default-sort = "{prop: 'cjrq', order: 'descending'}"
                style="width: 100%">
                <el-table-column
                  label="公司">
                  <template slot-scope="scope">
                    {{ gsComputed(scope.row.system_id) }}
                  </template>
                </el-table-column>
                <el-table-column
                  label="设备标识"
                  prop="code">
                </el-table-column>
                <el-table-column
                  label="位置"
                  prop="wz">
                </el-table-column>
                <el-table-column
                  label="额定视在功率"
                  prop="edszgl">
                </el-table-column>
                <el-table-column
                  label="额定空载损失"
                  prop="edkzss">
                </el-table-column>
                <el-table-column
                  label="空载电流"
                  prop="kzdl">
                </el-table-column>
                <el-table-column
                  label="短路电压"
                  prop="dldy">
                </el-table-column>
                <el-table-column
                  label="额定负载损失"
                  prop="edfzss">
                </el-table-column>
                <el-table-column label="操作" width="130">
                  <template slot-scope="scope">
                    <el-button type="success" icon="el-icon-edit" circle @click="editRow(scope.$index)"></el-button>
                    <el-button icon="el-icon-search" circle @click="viewRow(scope.$index)"></el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog title="变压器" :visible.sync="dialogFormVisible" :append-to-body="true">
      <el-form :model="form">
        <el-form-item label="公司" :label-width="formLabelWidth">
          <el-select
            :disabled="isFormReadOnly"
            v-model="form.system_id"
            placeholder="请选择">
            <el-option
              v-for="item in options1"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设备标识" :label-width="formLabelWidth">
          <el-input v-model="form.code" :disabled="isFormReadOnly" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="位置" :label-width="formLabelWidth">
          <el-input v-model="form.wz" :disabled="isFormReadOnly" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="额定视在功率" :label-width="formLabelWidth">
          <el-input v-model="form.edszgl" :disabled="isFormReadOnly" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="额定空载损失" :label-width="formLabelWidth">
          <el-input v-model="form.edkzss" :disabled="isFormReadOnly" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="空载电流" :label-width="formLabelWidth">
          <el-input v-model="form.kzdl" :disabled="isFormReadOnly" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="短路电压" :label-width="formLabelWidth">
          <el-input v-model="form.dldy" :disabled="isFormReadOnly" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="额定负载损失" :label-width="formLabelWidth">
          <el-input v-model="form.edfzss" :disabled="isFormReadOnly" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{isFormReadOnly ? '关 闭' : '取 消'}}</el-button>
        <el-button type="primary" @click="onSave" v-if="!isFormReadOnly">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import SelectTitle from 'base/select-title/select-title'
  import DataPanelTitle from 'base/data-panel-title/data-panel-title'
  import ChartPie from 'base/chart-pie/chart-pie'
  import { api } from '@/config'
  import fetch from 'utils/fetch'
  let moment = require('moment')
  moment.locale('zh-cn')
  export default {
    components: {
      SelectTitle,
      ChartPie,
      DataPanelTitle
    },
    created() {
      this.fetchData()
    },
    data() {
      return {
        loading: false,
        tableData: [],
        options1: [
          {
            value: '42052',
            label: '红旗工厂'
          }, {
            value: '41951',
            label: '一汽大众公司'
          }, {
            value: '41949',
            label: '一汽轿车股份有限公司'
          }, {
            value: '41954',
            label: '四川一汽丰田汽车有限公司'
          }, {
            value: '904489',
            label: '一汽丰越公司'
          }, {
            value: '41937',
            label: '一汽解放汽车有限公司'
          }, {
            value: '41939',
            label: '一汽吉林汽车有限公司'
          }, {
            value: '41953',
            label: '天津一汽丰田汽车有限公司'
          }, {
            value: '41950',
            label: '天津一汽夏利汽车有限公司'
          }, {
            value: '41952',
            label: '一汽通用轻型商用汽车有限公司'
          }, {
            value: '41938',
            label: '一汽客车有限公司'
          }, {
            value: '41917',
            label: '一汽新能源汽车有限公司'
          }, {
            value: '41924',
            label: '长春一汽富维汽车零部件股份有限公司'
          }, {
            value: '41944',
            label: '一汽铸锻有限公司'
          }, {
            value: '41945',
            label: '一汽模具制造有限公司'
          }, {
            value: '41955',
            label: '一汽丰田（长春）发动机有限公司'
          }, {
            value: '41956',
            label: '天津一汽丰田发动机有限公司'
          }, {
            value: '41992',
            label: '无锡泽根弹簧有限公司'
          }, {
            value: '42018',
            label: '一汽国际物流'
          }, {
            value: '41947',
            label: '一汽物流'
          }, {
            value: '41934',
            label: '动能分公司'
          }
        ],
        system_id: '',
        formLabelWidth: '120px',
        isFormReadOnly: false,
        dialogFormVisible: false,
        form: {}
      }
    },
    methods: {
      gsComputed(sysId) {
        let index = this.options1.findIndex((item) => {
          return sysId === item.value
        })
        return this.options1[index] ? this.options1[index].label : ''
      },
      selectChange() {
        this.fetchData()
      },
      addStation() {
        this.dialogFormVisible = true
        this.isFormReadOnly = false
        this.form = {}
      },
      editRow(index) {
        this.dialogFormVisible = true
        this.isFormReadOnly = false
        this.form = this.tableData[index]
        console.log(this.form)
      },
      viewRow(index) {
        this.dialogFormVisible = true
        this.isFormReadOnly = true
        this.form = this.tableData[index]
      },
      onSave() {
        if (this.form.id) {
          fetch('post', api.bianyaqiUpdate, this.form).then((res) => {
            this.fetchData()
            this.dialogFormVisible = false
          }).catch(() => {
            this.dialogFormVisible = false
          })
        } else {
          fetch('post', api.bianyaqiCreate, this.form).then((res) => {
            this.fetchData()
            this.dialogFormVisible = false
          }).catch(() => {
            this.dialogFormVisible = false
          })
        }
      },
      fetchData() {
        this.loading = true
        fetch('get', api.bianyaqiList, {system_id: this.system_id}).then((res) => {
          this.tableData = res.data
          this.loading = false
        }).catch(() => {
          this.tableData = []
          this.loading = false
        })
      }
    }
  }
</script>
<style lang="stylus" scoped>
  @import "~common/stylus/variable.styl"
  @import "~common/stylus/mixin.styl"
  .info-container
    overflow: auto
    -webkit-overflow-scrolling: touch
    position: absolute
    top: 0
    left: 0
    right: 0
    bottom: 0
    .info
      background: $color-sub-text
      display: flex
      flex-direction: column
      height: 100%
      min-width: 600px
      .department-block
        display: inline-block
        width: 25px
        height: 10px
      .col-box-left-right-bottom
        height: 100%
        .btn-add
          margin: 10px 0
          width: 120px
      .panel-box > .row
        height: 100%
      .chart-box
        min-height: 350px
        border-radius: 0px
</style>
