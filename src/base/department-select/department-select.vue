<template>
  <div class="department-select">
    <el-popover
      placement="bottom"
      width="400"
      trigger="click">
      <el-tree
        :data="data2"
        show-checkbox
        default-expand-all
        node-key="id"
        ref="tree"
        highlight-current
        :props="defaultProps">
      </el-tree>
      <el-input v-model="input" slot="reference" placeholder="请选择组织机构" readonly size="mini"></el-input>
    </el-popover>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        input: '',
        data2: [{
          id: 1,
          label: '整车制造',
          children: [{
            id: 5,
            label: '红旗工厂'
          }, {
            id: 6,
            label: '一汽大众',
            children: [{
                id: 25,
                label: '长春工厂'
              }, {
                id: 26,
                label: '天津工厂'
              }, {
                id: 27,
                label: '青岛工厂'
              }, {
                id: 28,
                label: '佛山工厂'
              }, {
                id: 29,
                label: '成都工厂'
              }
            ]
          }, {
            id: 7,
            label: '一汽轿车股份有限公司'
          }, {
            id: 8,
            label: '一汽解放汽车有限公司'
          }, {
            id: 9,
            label: '一汽吉林汽车有限公司'
          }, {
            id: 10,
            label: '一汽客车有限公司'
          }, {
            id: 11,
            label: '一汽丰越'
          }, {
            id: 12,
            label: '天津夏利'
          }, {
            id: 13,
            label: '一汽丰田'
          }, {
            id: 14,
            label: '一汽通用轻型商用汽车有限公司'
          }, {
            id: 15,
            label: '四川丰田'
          }]
        }, {
          id: 2,
          label: '零部件加工',
          children: [{
            id: 16,
            label: '一汽富维'
          }, {
            id: 17,
            label: '一汽模具制造有限公司'
          }, {
            id: 18,
            label: '一汽锻造吉林有限公司'
          }, {
            id: 19,
            label: '一汽铸造有限公司'
          }, {
            id: 20,
            label: '一汽丰发'
          }, {
            id: 21,
            label: '天津丰发'
          }, {
            id: 22,
            label: '无锡泽根弹簧有限公司'
          }]
        }, {
          id: 3,
          label: '其它',
          children: [{
            id: 23,
            label: '动能分公司'
          }, {
            id: 24,
            label: '一汽物流公司'
          }]
        }, {
          id: 4,
          label: '集团'
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      }
    }
  }
</script>
<style scoped lang="stylus">
  .department-select
    display: inline-block
</style>
