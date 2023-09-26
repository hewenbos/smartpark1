<template>
  <div class="tree">
    <div class="title">
      园区管理
    </div>
    <el-tree
      :data="treeList"
      show-checkbox
      node-key="id"
      disabled
      default-expand-all
      :default-checked-keys="permsList"
      :props="defaultProps"
    />

  </div>
</template>

<script>
import { MixinTree } from '@/composable/index'
export default {
  components: {},
  filters: {},
  props: {
    treeList: {
      type: Array,
      default: () => []
    },
    permsList: {
      type: Array,
      default: () => []
    }

  },
  data() {
    return {
      defaultProps: {
        children: 'children',
        label: 'title'
      },
      list: []
    }
  },
  computed: {},
  watch: {

  },
  created() {
    this.treeList = MixinTree(this.treeList)
  },
  mounted() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.tree{
  width: 183px;
  padding: 20px;
  border-right: 1px solid #e6e5e5;

  .title{
    width: 100%;
    height: 42px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f5f7fa;
    margin-bottom:10px;
  }
  ::v-deep{
    .el-tree-node__label{
      white-space: wrap;
    }
    .el-tree-node__content{
      margin:10px 0;
    }
  }
}
</style>
