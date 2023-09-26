<template>
  <el-dialog
    title="添加账单"
    :visible="dialogVisible"
    width="40%"
    :before-close="handleClose"
  >
    <div class="content">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" class="demo-ruleForm">
        <el-form-item label="选择租户" prop="enterpriseId">

          <el-select v-model="ruleForm.enterpriseId" placeholder="请选择选择租户" style="width: 100%;" size="small">
            <el-option v-for="item,index in EnterpriseList" :key="index" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="租赁楼宇" prop="buildingId">
          <el-select v-model="ruleForm.buildingId" placeholder="请选择租赁楼宇" style="width: 100%;" size="small" @change="handelChange">
            <el-option v-for="item,index in budingList" :key="index" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="缴费周期" prop="Date">
          <el-date-picker
            v-model="ruleForm.Date"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            size="small"
            value-format="yyyy-MM-dd"
            style="width: 100%;"
            @change="handelChange"
          />
        </el-form-item>
        <el-form-item label="支付金额" prop="paymentAmount">
          <el-input v-model="ruleForm.paymentAmount" placeholder="请输入支付金额" disabled style="width: 100%;" size="small" />
        </el-form-item>
        <el-form-item label="支付方式" prop="paymentMethod">

          <el-select v-model="ruleForm.paymentMethod" placeholder="请选择支付方式" style="width: 100%;" size="small">
            <el-option label="微信" value="1" />
            <el-option label="支付宝" value="2" />
            <el-option label="现金" value="3" />
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button size="small" type="default" @click="handleClose">取 消</el-button>
      <el-button size="small" type="primary" @click="onSumbit">确 定</el-button>
    </span>
  </el-dialog>

</template>

<script>
import { getAllPropetyEnterpriseApi, getAllPropetyBudingApi, getPropertyfeepaymentApi, getAddPropetyApi } from '@/api/propety'
export default {
  components: {},
  filters: {},
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      ruleForm: {
        enterpriseId: '',
        buildingId: '',
        startTime: '',
        endTime: '',
        Date: [],
        paymentAmount: '',
        paymentMethod: ''
      },
      rules: {
        enterpriseId: [
          { required: true, message: '请选择选择租户', trigger: 'change' }
        ],
        buildingId: [
          { required: true, message: '请选择租赁楼宇', trigger: 'change' }
        ],
        Date: [
          { required: true, message: '请选择缴费周期', trigger: 'blur' }
        ],
        paymentAmount: [
          { required: true, message: '请输入支付金额', trigger: 'blur' }
        ],
        paymentMethod: [
          { required: true, message: '请选择支付方式', trigger: 'change' }
        ]
      },
      EnterpriseList: [],
      budingList: []
    }
  },
  computed: {},
  watch: {},
  created() {
    this.getAllPropetyEnterprise()
    this.getAllPropetyBuding()
  },
  mounted() {},
  methods: {
    handleClose() {
      this.$emit('update:dialogVisible', false)
    },
    // 添加
    onSumbit() {
      this.$refs['ruleForm'].validate(async(valid) => {
        console.log(valid)
        if (valid) {
          delete this.ruleForm.Date
          await getAddPropetyApi(this.ruleForm)
          this.$emit('updateBuding')
          this.handleClose()
        }
      })
    },
    async getAllPropetyEnterprise() {
      const { data } = await getAllPropetyEnterpriseApi()
      console.log(data)
      this.EnterpriseList = data
    },
    async getAllPropetyBuding() {
      const { data } = await getAllPropetyBudingApi()
      console.log(data)
      this.budingList = data
    },
    // 计算金额
    async  handelChange() {
      if (this.ruleForm.Date && this.ruleForm.Date.length === 2) {
        this.ruleForm.startTime = this.ruleForm.Date[0]
        this.ruleForm.endTime = this.ruleForm.Date[1]
      }
      if (this.ruleForm.buildingId && this.ruleForm.endTime && this.ruleForm.startTime) {
        const { data } = await getPropertyfeepaymentApi({ buildingId: this.ruleForm.buildingId, endTime: this.ruleForm.endTime, startTime: this.ruleForm.startTime })

        this.ruleForm.paymentAmount = data
      }
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep{
  .el-dialog{
    border-radius:10px;
  }
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
  .el-form-item{
    margin-bottom: 15px;
  }
  .el-form-item__label{
    line-height:30px;
    font-weight:400;
    color:#333;

  }
}
</style>
