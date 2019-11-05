<template>
  <div id="gl" class="info-container">
    <div class="info">
      <div class="col-box">
        <select-title ref="select" title1="用能单位" title2="选择时间" title3="安装时间" title4="类型" title5="煤" title6="气" @search="onSearch" :showSearch="true">
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
          <el-input
            slot="title3"
            size="mini"
            :clearable="true"
            placeholder="输入安装时间"
            v-model="azsj"
            auto-complete="off"></el-input>
          <el-select
            slot="title4"
            v-model="lx"
            :clearable="true"
            class="small-width"
            placeholder="请选择"
            size="mini">
            <el-option label="燃气" value="燃气"></el-option>
            <el-option label="燃煤" value="燃煤"></el-option>
          </el-select>
          <el-select
            slot="title5"
            v-model="m"
            :clearable="true"
            class="small-width"
            placeholder="请选择"
            size="mini">
            <el-option label="≥5t/h" value=">=5"></el-option>
            <el-option label="<5t/h" value="<5"></el-option>
          </el-select>
          <el-select
            slot="title6"
            v-model="q"
            :clearable="true"
            class="small-width"
            placeholder="请选择"
            size="mini">
            <el-option label="≥100m3h" value=">=100">
              <div>&ge;100m<sup style="vertical-align: super;">3</sup>h</div>
            </el-option>
            <el-option label="<100m3h" value="<100">
              <span>&lt;100m<sup style="vertical-align: super;">3</sup>h</span>
            </el-option>
          </el-select>
        </select-title>
      </div>
      <div class="col-box-left-right-bottom">
        <!--<div class="panel-box" v-loading="loading">-->
        <div class="panel-box" ref="panel">
          <div class="row">
            <div class="table-box">
              <el-button class="search-btn" icon="el-icon-plus" type="primary" size="mini" @click="addFile">导入台账</el-button>
              <div class="row">
                <el-table
                  :data="rList"
                  height="calc(100vh - 268px)"
                  border
                  header-cell-class-name="header-cell-class-name">
                  <el-table-column
                    prop="xuhao"
                    width="40"
                    fixed
                    align="center"
                    label="序号">
                  </el-table-column>
                  <el-table-column
                    align="center"
                    prop="code"
                    fixed
                    width="100"
                    label="设备编号">
                  </el-table-column>
                  <el-table-column
                    align="center"
                    width="120"
                    fixed
                    prop="name"
                    label="锅炉名称">
                  </el-table-column>
                  <el-table-column
                    align="center"
                    prop="xinghao"
                    label="型号规格">
                  </el-table-column>
                  <el-table-column
                    align="center"
                    label="动能消耗">
                    <el-table-column
                      align="center"
                      prop="m">
                      <template slot="header" slot-scope="scope">
                        <span>煤<br>(t/h)</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      align="center"
                      prop="d">
                      <template slot="header" slot-scope="scope">
                        <span>电<br>(kw)</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      align="center"
                      prop="s">
                      <template slot="header" slot-scope="scope">
                        <span>水<br>(t/h)</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      align="center"
                      prop="q">
                      <template slot="header" slot-scope="scope">
                        <span>天然气<br>(m3/h)</span>
                      </template>
                    </el-table-column>
                  </el-table-column>
                  <el-table-column
                    align="center"
                    prop="yxsj">
                    <template slot="header" slot-scope="scope">
                      <span>年运行<br>时间<br>(h)</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    align="center"
                    prop="dd"
                    label="安装地点">
                  </el-table-column>
                  <el-table-column
                    align="center"
                    prop="azsj"
                    label="安装时间">
                  </el-table-column>
                  <el-table-column
                    align="center"
                    prop="yt"
                    label="用途">
                  </el-table-column>
                  <el-table-column
                    align="center"
                    prop="srjlb">
                    <template slot="header" slot-scope="scope">
                      <span>输入能源<br>有无计量</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    align="center"
                    prop="scjlb">
                    <template slot="header" slot-scope="scope">
                      <span>产出能源<br>有无计量</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    align="center"
                    prop="xl"
                    label="效率">
                  </el-table-column>
                  <el-table-column
                    align="center"
                    prop="bz"
                    label="备注">
                  </el-table-column>
                  <el-table-column
                    align="center"
                    prop="lx"
                    label="锅炉类型">
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
        lx: '',
        m: '',
        q: '',
        azsj: '',
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
        fetch('get', api.sbGlList, {system_id: this.system_id, nian: this.date, lx: this.lx, m: this.m, q: this.q, azsj: this.azsj}).then((res) => {
          this.rList = res.data.sort(function(a, b) {
            return a.xuhao * 1 - b.xuhao * 1
          })
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
      },
      onSave(formName) {
        this.$refs[formName].validate((valid) => {
            if (valid) {
              this.loading = true
              fetch('post', api.sbGlCreate, {system_id: this.form.system_id, nian: this.form.date, file: this.importFile}, true, true).then(() => {
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
    },
    mounted() {
      setTimeout(() => {
        this.$refs.panel.style['min-height'] = 'calc(100vh - 140px - ' + this.$refs.select.$el.getBoundingClientRect().height + 'px)'
      }, 100)
    }
  }
</script>
<style lang="stylus">
  @import "~common/stylus/variable.styl"
  @import "~common/stylus/mixin.styl"
  #gl.info-container
    .info
      background-color: $color-background-sub
      display: flex
      flex-direction: column
      min-width: 600px
      .date-type
        width: 60px
      .department-block
        display: inline-block
        width: 25px
        height: 10px
      .panel-box
        padding-top: 10px
      .chart-box
        min-height: 350px
        border-radius: 0px
</style>
