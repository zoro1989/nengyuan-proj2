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
          <el-button type="primary" class="btn-add" size="mini" icon="el-icon-circle-plus-outline" @click="addStation">新增空压机</el-button>
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
                  label="额定功率"
                  prop="edgl">
                </el-table-column>
                <el-table-column
                  label="当地大气压"
                  prop="dddqy">
                </el-table-column>
                <el-table-column
                  label="冷却方式修正系数"
                  prop="lqfsxzxs">
                </el-table-column>
                <el-table-column
                  label="合格用电单耗"
                  prop="hgyddh">
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
    <el-dialog title="空压机" :visible.sync="dialogFormVisible" :append-to-body="true">
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
        <el-form-item label="额定功率" :label-width="formLabelWidth">
          <el-input v-model="form.edgl" :disabled="isFormReadOnly" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="当地大气压" :label-width="formLabelWidth">
          <el-input v-model="form.dddqy" :disabled="isFormReadOnly" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="冷却方式修正系数" :label-width="formLabelWidth">
          <el-input v-model="form.lqfsxzxs" :disabled="isFormReadOnly" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="合格用电单耗" :label-width="formLabelWidth">
          <el-input v-model="form.hgyddh" :disabled="isFormReadOnly" auto-complete="off"></el-input>
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
  import {orgSystemIdDic} from 'utils/dic'
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
        options1: orgSystemIdDic,
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
          fetch('post', api.kongyajiUpdate, this.form).then((res) => {
            this.fetchData()
            this.dialogFormVisible = false
          }).catch(() => {
            this.dialogFormVisible = false
          })
        } else {
          fetch('post', api.kongyajiCreate, this.form).then((res) => {
            this.fetchData()
            this.dialogFormVisible = false
          }).catch(() => {
            this.dialogFormVisible = false
          })
        }
      },
      fetchData() {
        this.loading = true
        fetch('get', api.kongyajiList, {system_id: this.system_id}).then((res) => {
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
