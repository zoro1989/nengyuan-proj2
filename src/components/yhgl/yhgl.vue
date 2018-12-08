<template>
  <div class="info-container">
    <div class="info">
      <div class="col-box">
        <div class="panel-box" v-loading="loading">
          <el-button type="primary" class="btn-add" size="mini" icon="el-icon-circle-plus-outline" @click="addStation">新增用户</el-button>
          <div class="row">
            <div class="table-box">
              <el-table
                :data="tableData"
                border
                :header-cell-style="{background: '#f5f8fa'}"
                :default-sort = "{prop: 'cjrq', order: 'descending'}"
                style="width: 100%">
                <el-table-column
                  label="用户名"
                  prop="code">
                </el-table-column>
                <el-table-column
                  label="角色">
                  <template slot-scope="scope">
                    <span>{{scope.row.role === 1 ? '管理员' : '普通用户'}}</span>
                  </template>
                </el-table-column>
                <el-table-column label="操作" width="130">
                  <template slot-scope="scope">
                    <el-button type="success" icon="el-icon-edit" circle @click="editRow(scope.$index)"></el-button>
                    <el-button icon="el-icon-search" circle @click="viewRow(scope.$index)"></el-button>
                    <el-button type="danger" icon="el-icon-delete" circle @click="deleteRow(scope.$index)"></el-button>
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
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.username" :disabled="isFormReadOnly" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.password" :disabled="isFormReadOnly" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色" :label-width="formLabelWidth">
          <el-select
            :disabled="isFormReadOnly"
            v-model="form.role"
            placeholder="请选择">
            <el-option label="管理员" value="1"></el-option>
            <el-option label="普通用户" value="0"></el-option>
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
        system_id: '',
        formLabelWidth: '120px',
        isFormReadOnly: false,
        dialogFormVisible: false,
        form: {}
      }
    },
    methods: {
      addStation() {
        this.dialogFormVisible = true
        this.isFormReadOnly = false
        this.form = {}
      },
      editRow(index) {
        this.dialogFormVisible = true
        this.isFormReadOnly = false
        fetch('get', api.userFind, {id: this.tableData[index].id}).then((res) => {
          this.form = res.data
        }).catch(() => {
        })
      },
      viewRow(index) {
        this.dialogFormVisible = true
        this.isFormReadOnly = true
        this.form = this.tableData[index]
      },
      deleteRow(index) {
        this.$confirm('确认要删除该用户吗？')
          .then(_ => {
            fetch('post', api.userDelete, {id: this.tableData[index].id}, false, true).then((res) => {
              this.tableData.splice(index, 1)
            }).catch(() => {
            })
          })
          .catch(_ => {})
      },
      onSave() {
        if (this.form.id) {
          fetch('post', api.userUpdate, this.form).then((res) => {
            this.fetchData()
            this.dialogFormVisible = false
          }).catch(() => {
            this.dialogFormVisible = false
          })
        } else {
          fetch('post', api.userCreate, this.form).then((res) => {
            this.fetchData()
            this.dialogFormVisible = false
          }).catch(() => {
            this.dialogFormVisible = false
          })
        }
      },
      fetchData() {
        this.loading = true
        fetch('get', api.userList, {}).then((res) => {
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
      min-width: 600px
      .department-block
        display: inline-block
        width: 25px
        height: 10px
      .col-box-left-right-bottom
        .btn-add
          height: 30px
          margin: 10px 0
          width: 120px
      .panel-box
        padding-top: 20px
        >.row
          min-height: calc(100vh - 150px)
      .chart-box
        min-height: 350px
        border-radius: 0px
</style>
