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
        <!--<div class="panel-box" v-loading="loading">-->
        <div class="panel-box">
          <el-button type="primary" class="btn-add" size="mini" icon="el-icon-circle-plus-outline" @click="addStation">新增电机</el-button>
          <div class="row">
            <div class="table-box">
              <el-table
                :data="tableData"
                border
                header-cell-class-name="header-cell-class-name"
                :default-sort = "{prop: 'cjrq', order: 'descending'}">
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
                  label="电机型号"
                  prop="xh">
                </el-table-column>
                <el-table-column
                  label="额定功率"
                  prop="edgl">
                </el-table-column>
                <el-table-column
                  label="有功经济负载率"
                  prop="ygjjfzl">
                </el-table-column>
                <el-table-column
                  label="电机类型">
                  <template slot-scope="scope">
                    {{ scope.row.lx === 1 ? '风机' : scope.row.lx === 2 ? '水泵' : '' }}
                  </template>
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
        <el-form-item label="电机型号" :label-width="formLabelWidth">
          <el-input v-model="form.xh" :disabled="isFormReadOnly" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="额定功率" :label-width="formLabelWidth">
          <el-input v-model="form.edgl" :disabled="isFormReadOnly" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="有功经济负载率" :label-width="formLabelWidth">
          <el-input v-model="form.ygjjfzl" :disabled="isFormReadOnly" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="电机类型" :label-width="formLabelWidth">
          <el-select
            :disabled="isFormReadOnly"
            v-model="form.lx"
            placeholder="请选择电机类型">
            <el-option
              v-for="item in options2"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
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
  import {orgSystemIdDicNoJituan} from 'utils/dic'
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
        options1: orgSystemIdDicNoJituan,
        options2: [
          {
            value: '1',
            label: '风机'
          },
          {
            value: '2',
            label: '水泵'
          }
        ],
        system_id: '904489',
        formLabelWidth: '140px',
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
          fetch('post', api.dianjiUpdate, this.form).then((res) => {
            this.fetchData()
            this.dialogFormVisible = false
          }).catch(() => {
            this.dialogFormVisible = false
          })
        } else {
          fetch('post', api.dianjiCreate, this.form).then((res) => {
            this.fetchData()
            this.dialogFormVisible = false
          }).catch(() => {
            this.dialogFormVisible = false
          })
        }
      },
      fetchData() {
        this.loading = true
        fetch('get', api.dianjiList, {system_id: this.system_id}).then((res) => {
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
    .info
      background-color: $color-background-sub
      display: flex
      flex-direction: column
      min-width: 600px
      .department-block
        display: inline-block
        width: 25px
        height: 10px
      .col-box-left-right-bottom
        .btn-add
          margin: 10px 0
          width: 100px
      .panel-box
        min-height: calc(100vh - 190px)
      .chart-box
        min-height: 350px
        border-radius: 0px
</style>
