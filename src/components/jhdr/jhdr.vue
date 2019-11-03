<template>
  <div class="info-container">
    <div class="info">
      <div class="col-box">
        <!--<div class="panel-box" v-loading="loading">-->
        <div class="panel-box">
          <el-form :model="form" :rules="rules" ref="ruleForm">
            <el-form-item label="公司" :label-width="formLabelWidth" prop="org_id">
              <el-select
                v-model="form.org_id"
                placeholder="请选择">
                <el-option
                  v-for="item in options1"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="日期" :label-width="formLabelWidth"  prop="nian">
              <el-date-picker
                v-model="form.nian"
                type="year"
                value-format="yyyy"
                placeholder="选择年">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="计划导入" :label-width="formLabelWidth" prop="file">
              <el-button class="search-btn" icon="el-icon-plus" type="primary" @click="onAdd">导入台账</el-button>
              <span>{{importFile ? importFile.name : ''}}</span>
              <input type="file" name="file " style="display: none;" ref="file" @change="onFileChange" />
            </el-form-item>
          </el-form>
          <div style="margin-left: 120px">
            <el-button type="primary" @click="onSave('ruleForm')">确 定</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { api } from '@/config'
  import {orgIdDic} from 'utils/dic'
  import { Message } from 'element-ui'
  import fetch from 'utils/fetch'
  let moment = require('moment')
  moment.locale('zh-cn')
  export default {
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
        options1: orgIdDic,
        noBorder: true,
        form: {
          org_id: '',
          nian: ''
        },
        rules: {
          'org_id': [
            { required: true, message: '请选择用能单位', trigger: 'blur' }
          ],
          'nian': [
            { required: true, message: '请选择日期', trigger: 'blur' }
          ],
          'file': [
            { validator: validatePass, trigger: 'blur' }
          ]
        },
        importFile: null,
        formLabelWidth: '120px'
      }
    },
    methods: {
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
      onSave(formName) {
        this.$refs[formName].validate((valid) => {
            if (valid) {
              this.loading = true
              fetch('post', api.jihuaCreate, {org_id: this.form.org_id, nian: this.form.nian, file: this.importFile}).then(() => {
                Message({
                  message: '保存成功',
                  type: 'success'
                })
                this.loading = false
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
      .panel-box
        min-height: calc(100vh - 130px)
        padding: 30px
      .chart-box
        min-height: 350px
        border-radius: 0px
</style>
