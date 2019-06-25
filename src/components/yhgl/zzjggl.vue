<template>
  <div class="info-container">
    <div class="info">
      <div class="col-box">
        <div class="panel-box" v-loading="loading">
          <div class="org-menu">
            <el-tree
              ref="tree"
              class="org-tree"
              :data="treeData"
              :props="{children: 'childrens'}"
              :highlight-current="true"
              node-key="id"
              default-expand-all
              draggable
              @node-drag-end="handleDragEnd"
              @node-click="onNodeClick"
              :expand-on-click-node="false">
              <span class="custom-tree-node" slot-scope="{ node, data }">
                <span>{{ data.name }}</span>
                <span>
                  <el-dropdown @command="handleCommand">
                    <el-button size="mini" class="icon-button" circle icon="el-icon-setting"></el-button>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item :command="{name: 'append', node: node, data: data}">添加</el-dropdown-item>
                      <el-dropdown-item :command="{name: 'edit', node: node, data: data}">编辑</el-dropdown-item>
                      <el-dropdown-item :command="{name: 'remove', node: node, data: data}">删除</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </span>
              </span>
            </el-tree>
          </div>
          <div class="org-info">
            <el-form :model="info" ref="ruleForm1">
              <el-form-item label="组织名称" :label-width="formLabelWidth">
                <el-input v-model="info.name" :disabled="isFormReadOnly" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="公司类型" :label-width="formLabelWidth">
                <el-radio v-model="info.system" :disabled="isFormReadOnly" :label="0">结构化非公司</el-radio>
                <el-radio v-model="info.system" :disabled="isFormReadOnly" :label="1">直报系统</el-radio>
                <el-radio v-model="info.system" :disabled="isFormReadOnly" :label="10">之后子公司</el-radio>
              </el-form-item>
              <el-form-item label="公司等级" :label-width="formLabelWidth">
                <el-input v-model="info.levels" :disabled="isFormReadOnly" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item :label-width="formLabelWidth" v-if="!isFormReadOnly">
                <el-button type="primary" @click="submitForm('ruleForm1')">保存</el-button>
                <el-button @click="isFormReadOnly = true">取消</el-button>
              </el-form-item>
            </el-form>
            <el-dialog
              :append-to-body="true"
              title="提示"
              :visible.sync="addDialogVisible"
              width="80%"
              center>
              <el-form :model="formAdd">
                <el-form-item label="名称" :label-width="formLabelWidth">
                  <el-input v-model="formAdd.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="公司类型" :label-width="formLabelWidth">
                  <el-radio v-model="formAdd.system" label="0">结构化非公司</el-radio>
                  <el-radio v-model="formAdd.system" label="1">直报系统</el-radio>
                  <el-radio v-model="formAdd.system" label="10">之后子公司</el-radio>
                </el-form-item>
                <el-form-item label="直报系统公司" :label-width="formLabelWidth" prop="system_id">
                  <el-input v-model="formAdd.system_id" type="number" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="公司等级" :label-width="formLabelWidth">
                  <el-input v-model="formAdd.levels" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item :label-width="formLabelWidth">
                  <el-button @click="addDialogVisible = false">取 消</el-button>
                  <el-button type="primary" @click="appendNode">确 定</el-button>
                </el-form-item>
              </el-form>
            </el-dialog>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { api } from '@/config'
  import fetch from 'utils/fetch'
  import {orgSystemIdDic} from 'utils/dic'
  let moment = require('moment')
  moment.locale('zh-cn')
  export default {
    data() {
      return {
        options1: orgSystemIdDic,
        treeData: [],
        isFormReadOnly: true,
        info: {},
        formAdd: {},
        formLabelWidth: '140px',
        deleteDialogVisible: false,
        addDialogVisible: false,
        currentData: null,
        currentNode: null,
        system: '1'
      }
    },
//    computed: {
//      deleteVisible() {
//        return
//      }
//    },
    created() {
      this.listData()
    },
    methods: {
      onNodeClick(data, node) {
        this.currentData = data
        this.currentNode = node
        this.getInfo(data.id)
      },
      append(data) {
        this.info = {}
        this.addDialogVisible = true
      },
      appendNode() {
        this.formAdd.pid = this.currentData.id
        fetch('post', api.orgCreate, this.formAdd, true, true).then((res) => {
//          let newId = res.data.id
//          const newChild = { id: newId, name: res.data.name, childrens: [] }
//          if (!this.currentData.childrens) {
//            this.$set(this.currentData, 'childrens', [])
//          }
//          this.currentData.childrens.push(newChild)
//          this.$nextTick(() => {
//            this.$refs.tree.setCurrentKey(newId)
//          })
          this.listData()
          this.addDialogVisible = false
        }).catch(() => {
        })
      },
      edit(data) {
        this.isFormReadOnly = false
        this.getInfo(data.id)
      },
      remove(node, data) {
        this.$confirm('是否删除节点？（子节点也将被删除）')
          .then(_ => {
            fetch('post', api.orgDelete, {id: data.id}, true, true).then((res) => {
              const parent = this.currentNode.parent
              const childrens = parent.data.childrens || parent.data
              const index = childrens.findIndex(d => d.id === this.currentData.id)
              childrens.splice(index, 1)
            }).catch(() => {
            })
          })
          .catch(_ => {})
      },
      submitForm(formName) {
        fetch('post', api.orgUpdate, this.info, true, true).then((res) => {
          this.listData()
          this.isFormReadOnly = true
        }).catch(() => {
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
      },
      listData() {
        fetch('get', api.orgShow, {}).then((res) => {
          this.treeData = [res.data]
          this.$nextTick(() => {
            if (this.treeData.length > 0) {
              let id = this.info.id ? this.info.id : this.treeData[0].id
              this.$refs.tree.setCurrentKey(id)
              this.getInfo(id)
            }
          })
        }).catch(() => {
        })
      },
      getInfo(id) {
        fetch('get', api.orgFind, {id: id}).then((res) => {
          this.info = res.data
        }).catch(() => {
        })
      },
      handleDragEnd(draggingNode, dropNode, dropType, ev) {
        this.info.pid = dropNode.data.id
        fetch('post', api.orgUpdate, this.info, true, true).then((res) => {
          this.listData()
          this.isFormReadOnly = true
        }).catch(() => {
        })
      },
      handleCommand(command) {
        this.currentData = command.data
        this.currentNode = command.node
        if (command.name === 'append') {
          this.append(command.data)
        } else if (command.name === 'edit') {
          this.edit(command.data)
        } else if (command.name === 'remove') {
          this.remove(command.node, command.data)
        }
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
          height: 30px
          margin: 10px 0
          width: 120px
      .panel-box
        display: flex
        align-items: stretch
        padding-top: 10px
        .org-menu
          min-height: calc(100vh - 110px)
          flex: 0 0 30%
          display: flex
          align-items: stretch
          .org-tree
            width: 100%
            min-height: 500px
            .custom-tree-node
              flex: 1
              display: flex
              align-items: center
              justify-content: space-between
              font-size: 14px
              padding-right: 8px
        .org-info
          margin-left: 10px
          padding: 10px 10px 10px 0
          flex: 1
          display: inline-block
          .label
            color: #80848f
      .chart-box
        min-height: 350px
        border-radius: 0px
</style>
