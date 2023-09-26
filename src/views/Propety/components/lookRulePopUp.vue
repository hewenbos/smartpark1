<template>
  <el-dialog
    title="查看账单"
    :visible="dialogVisibleLook"
    width="40%"
    :before-close="handleClose"
  >

    <div v-if="row">
      <el-row type="flex" justify="space-around">
        <el-col :span="16">
          <span>租户名称:{{ row.enterpriseName }}</span>
        </el-col>
      </el-row>
      <el-row type="flex" justify="space-around">
        <el-col :span="16">
          <span>租赁楼宇:</span>{{ row.buildingName }}
        </el-col>
      </el-row>
      <el-row type="flex" justify="space-around">
        <el-col :span="16">
          <span>缴费周期:</span>{{ row.startTime + '至' + row.endTime }}
        </el-col>
      </el-row>
      <el-row type="flex" justify="space-around">
        <el-col :span="16">
          <span>物业费(元/m²):</span>{{ row.propertyFeePrice }}
        </el-col>
      </el-row>
      <el-row type="flex" justify="space-around">
        <el-col :span="16">
          <span>账单金额(元):</span>{{ row.paymentAmount }}
        </el-col>
      </el-row>
      <el-row type="flex" justify="space-around">
        <el-col :span="16">
          <span>支付方式:</span>{{ ['','微信','支付宝','现金'][row.paymentMethod] }}
        </el-col>
      </el-row>
      <el-row type="flex" justify="space-around">
        <el-col :span="16">
          <span>缴费时间:</span>
        </el-col>
      </el-row>

    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getLookDetailPropetyApi } from '@/api/propety'
export default {
  components: {},
  filters: {},
  props: {
    dialogVisibleLook: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      row: {}
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    handleClose() {
      this.$emit('update:dialogVisibleLook', false)
    },
    async getLookDetailPropety(id) {
      const { data } = await getLookDetailPropetyApi(id)

      this.row = data
    }
  }
}
</script>

<style lang="scss" scoped>
.el-row{
  margin:20px 0;
  span{
color:#909399;
  }
}
::v-deep{
  .el-dialog__footer{
    background-color:#f4f6f8;
    border-radius:0 0 10px 10px;
}
.el-button{
    border:none;
    border-radius:10px;
}
.content{
    padding:0 80px;
}
}

</style>
