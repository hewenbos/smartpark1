<template>

  <el-form-item :label="label">
    <el-input size="small" :value="value" :placeholder="placeholder" @input="inputEvent" />
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
    placeholder: {
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
    inputEvent(e) {
      this.$emit('input', e)
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep{
  .el-form-item__label{
    font-weight: 400;
    color: #000000d9;
  }
}
</style>
