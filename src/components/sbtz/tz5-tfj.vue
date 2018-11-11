<template>
  <div class="info-container">
    <div class="info">
      <div class="col-box">
        <select-title title1="用能单位" title2="选择时间" @search="onSearch" :showSearch="true">
          <el-select
            slot="title1"
            v-model="system_id"
            placeholder="请选择"
            size="mini">
            <el-option
              v-for="item in options1"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-date-picker
            slot="title2"
            v-model="date"
            type="month"
            size="mini"
            value-format="yyyy-MM"
            placeholder="选择时间">
          </el-date-picker>
        </select-title>
      </div>
      <div class="col-box-left-right-bottom">
        <div class="panel-box" v-loading="loading">
          <div class="row">
            <div class="table-box">
              <el-button class="search-btn" icon="el-icon-plus" type="primary" size="mini" @click="addFile">导入台账</el-button>
              <div class="row">
                <el-table
                  :data="rList"
                  border
                  height="100%"
                  header-cell-class-name="header-cell-class-name"
                  style="width: 99%">
                  <el-table-column
                    prop="xuhao"
                    label="序号">
                  </el-table-column>
                  <el-table-column
                    prop="code"
                    label="设备编号">
                  </el-table-column>
                  <el-table-column
                    prop="name"
                    label="风机名称">
                  </el-table-column>
                  <el-table-column
                    prop="guige"
                    label="型号规格">
                  </el-table-column>
                  <el-table-column
                    prop="xinghao"
                    label="电机型号">
                  </el-table-column>
                  <el-table-column
                    prop="gl"
                    label="额定功率(kw)">
                  </el-table-column>
                  <el-table-column
                    prop="fl"
                    label="风量(m3/h)">
                  </el-table-column>
                  <el-table-column
                    prop="fy"
                    label="风压(Pa)">
                  </el-table-column>
                  <el-table-column
                    prop="yxsj"
                    label="年运行时间(h)">
                  </el-table-column>
                  <el-table-column
                    prop="dd"
                    label="安装地点">
                  </el-table-column>
                  <el-table-column
                    prop="azsj"
                    label="安装时间">
                  </el-table-column>
                  <el-table-column
                    prop="yt"
                    label="用途">
                  </el-table-column>
                  <el-table-column
                    prop="jlb"
                    label="有无计量表">
                  </el-table-column>
                  <el-table-column
                    prop="xl"
                    label="效率(%)">
                  </el-table-column>
                  <el-table-column
                    prop="bz"
                    label="备注">
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog title="台账导入" :visible.sync="dialogFormVisible" :append-to-body="true">
      <el-form :model="form" :rules="rules" ref="ruleForm">
        <el-form-item label="公司" :label-width="formLabelWidth" prop="system_id">
          <el-select
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
        <el-form-item label="日期" :label-width="formLabelWidth"  prop="date">
          <el-date-picker
            v-model="form.date"
            type="month"
            value-format="yyyy-MM"
            placeholder="选择时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="台账导入" :label-width="formLabelWidth" prop="file">
          <el-button class="search-btn" icon="el-icon-plus" type="primary" @click="onAdd">导入台账</el-button>
          <span>{{importFile ? importFile.name : ''}}</span>
          <input type="file" name="file " style="display: none;" ref="file" @change="onFileChange" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSave('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import SelectTitle from 'base/select-title/select-title'
  import { api } from '@/config'
  import fetch from 'utils/fetch'
  import {orgSystemIdDic} from 'utils/dic'
  import { Message } from 'element-ui'
  import axios from 'axios'
  let moment = require('moment')
  moment.locale('zh-cn')
  export default {
    components: {
      SelectTitle
    },
    created() {
    },
    data() {
      var validatePass = (rule, value, callback) => {
        if (!this.importFile || !this.importFile.name) {
          callback(new Error('请选择文件'))
        } else {
          callback()
        }
      }
      return {
        loading: false,
        options1: orgSystemIdDic,
        tableData: [],
        noBorder: true,
        system_id: '',
        date: '',
        rList: [],
        form: {
          system_id: '',
          date: ''
        },
        rules: {
          'system_id': [
            { required: true, message: '请选择用能单位', trigger: 'blur' }
          ],
          'date': [
            { required: true, message: '请选择日期', trigger: 'blur' }
          ],
          'file': [
            { validator: validatePass, trigger: 'blur' }
          ]
        },
        importFile: null,
        dialogFormVisible: false,
        formLabelWidth: '120px'
      }
    },
    methods: {
      addFile() {
        this.dialogFormVisible = true
        this.form = {}
        this.importFile = null
      },
      onAdd() {
        this.$refs.file.click()
      },
      onFileChange(e) {
        let files = e.target.files || e.dataTransfer.files
        if (!files.length) {
          return
        }
        let importFile = files[0]
        if (e.target.value) {
          e.target.value = ''
        }
        if (!(/(?:xls|xlsx|csv)$/i.test(importFile.name))) {
          Message({
            message: '只允许上传xls|xlsx|csv格式的文件！',
            type: 'error'
          })
        }
        this.importFile = importFile
      },
      onSearch() {
        this.loading = true
        this.tableData = []
        fetch('get', api.sbFjList, {system_id: this.system_id, date: this.date}).then((res) => {
          this.rList = res.data
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
      },
      onSave(formName) {
        this.$refs[formName].validate((valid) => {
            if (valid) {
              this.loading = true
              let formData = new FormData()
              formData.append('system_id', this.form.system_id)
              formData.append('date', this.form.date)
              formData.append('file', this.importFile)
              axios.post(api.sbFjCreate, formData).then(() => {
                this.dialogFormVisible = false
                this.loading = false
              }).catch(() => {
                this.loading = false
              })
//              fetch('post', api.sbLyCreate, {system_id: this.form.system_id, date: this.form.date, file: this.importFile}).then((res) => {
//                this.loading = false
//              }).catch(() => {
//                this.loading = false
//              })
            } else {
              return false
            }
          }
        )
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
      .date-type
        width: 60px
      .department-block
        display: inline-block
        width: 25px
        height: 10px
      .col-box-left-right-bottom
        height: 100%
        .panel-box >.row
          height: 100%
          .table-box > .row:last-child
            height: calc(100% - 350px)
      .chart-box
        min-height: 350px
        border-radius: 0px
</style>
