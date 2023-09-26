<template>
  <div class="page">
    <el-pagination
      :current-page="pageInfo.page"
      :page-sizes="[10, 15, 20]"
      :page-size="pageInfo.pageSize"
      :layout="layout"
      :total="pageInfo.total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
export default {
  components: {},
  filters: {},
  props: {
    pageInfo: {
      type: Object,
      default: () => ({
        page: 1,
        pageSize: 10,
        total: 1
      })
    },
    layout: {
      type: String,
      default: ''
    }
  },
  data() {
    return {

    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    handleCurrentChange(value) {
      this.$emit('handleCurrentChange', value)
    },
    handleSizeChange(value) {
      this.$emit('handleSizeChange', value)
    }
  }
}
</script>

<style lang="scss" scoped>
.page{
  text-align: right;
  margin-top: 10px;
}
</style>
