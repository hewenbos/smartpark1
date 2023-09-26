<template>
  <el-form inline :mode="from">
    <globelSearch v-model="from.poleName" label="一体杆名称" placeholder="请输入一体杆名称" />
    <globelSearch v-model="from.poleNumber" label="一体杆编号" placeholder="请输入一体杆编号" />
    <globelSelect v-model="from.poleStatus" label="运行状态" :select-list="selectList" />
    <el-form-item>
      <el-button type="primary" size="small" @click="search">
        查询
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import globelSearch from '@/components/globelSearch.vue'
import globelSelect from '@/components/globelSelect.vue'
export default {
  components: { globelSearch, globelSelect },
  filters: {},
  props: {
    selectList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      from: {
        poleName: '',
        poleStatus: '',
        poleNumber: ''
      }

    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    search() {
      this.$emit('search', this.from)
    }
  }
}
</script>

<style lang="less" scoped>

</style>
