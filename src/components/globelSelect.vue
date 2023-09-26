<template>
  <el-form-item :label="label">
    <el-select :value="value" size="small" placeholder="请选择" @change="selsectChange">
      <el-option v-for="item,index in selectList" :key="index" :label="item.name" :value="item.value" />
    </el-select>
  </el-form-item>
</template>

<script>
export default {
  components: {},
  filters: {},
  props: {
    label: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    },
    selectList: {
      type: Array,
      default: () => []
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
    selsectChange(e) {
      console.log(e)
      this.$emit('input', e + '')
    }
  }
}
</script>

<style lang="less" scoped>

</style>
