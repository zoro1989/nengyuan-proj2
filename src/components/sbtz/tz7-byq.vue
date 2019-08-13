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
            type="year"
            size="mini"
            value-format="yyyy"
            placeholder="选择年">
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
                  header-cell-class-name="header-cell-class-name"
                  style="width: 99%">
                  <el-table-column
                    prop="xuhao"
                    width="50"
                    label="序号">
                  </el-table-column>
                  <el-table-column
                    align="center"
                    prop="code"
                    label="变压器编号">
                  </el-table-column>
                  <el-table-column
                    align="center"
                    prop="name"
                    label="变压器名称">
                  </el-table-column>
                  <el-table-column
                    align="center"
                    prop="xinghao"
                    label="型号规格">
                  </el-table-column>
                  <el-table-column
                    align="center"
                    prop="rl"
                    label="容量(KVA)">
                  </el-table-column>
                  <el-table-column
                    align="center"
                    prop="azdd"
                    label="安装地点">
                  </el-table-column>
                  <el-table-column
                    align="center"
                    prop="fzl"
                    label="负载率(%)">
                  </el-table-column>
                  <el-table-column
                    align="center"
                    prop="xl"
                    label="效率(%)">
                  </el-table-column>
                  <el-table-column
                    align="center"
                    prop="bcrl"
                    label="无功补偿容量">
                  </el-table-column>
                  <el-table-column
                    align="center"
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
            type="year"
            value-format="yyyy"
            placeholder="选择年">
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
  let moment = require('moment')
  moment.locale('zh-cn')
  export default {
    components: {
      SelectTitle
    },
    created() {
      this.onSearch()
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
        system_id: '41949',
        date: moment().subtract(1, 'years').format('YYYY') || '',
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
        fetch('get', api.sbByqList, {system_id: this.system_id, nian: this.date}).then((res) => {
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
              fetch('post', api.sbByqCreate, {system_id: this.form.system_id, nian: this.form.date, file: this.importFile}, true, true).then(() => {
                this.dialogFormVisible = false
                this.loading = false
                this.date = this.form.date
                this.system_id = this.form.system_id
                this.onSearch()
              }).catch(() => {
                this.loading = false
              })
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
    .info
      background-color: $color-background-sub
      display: flex
      flex-direction: column
      min-width: 600px
      .search-btn
        margin: 10px 0
      .date-type
        width: 60px
      .department-block
        display: inline-block
        width: 25px
        height: 10px
      .panel-box > .row
        min-height: calc(100vh - 160px)
      .chart-box
        min-height: 350px
        border-radius: 0px
</style>
