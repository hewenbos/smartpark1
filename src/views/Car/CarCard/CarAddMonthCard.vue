<template>
  <div class="mothcard">
    <div class="header">
      <el-page-header :content="$route.query.id ? '编辑月卡':'添加月卡'" @back="$router.back()" />
      <span>{{ username }}</span>
    </div>
    <el-form ref="ruleForm" :model="ruleForm" inline :rules="rules" label-width="100px" class="demo-ruleForm">
      <div class="cardInfo">

        <div class="cardInfoHeader">
          <p>车辆信息</p>
        </div>

        <el-form-item label="车主姓名" prop="personName">
          <el-input v-model="ruleForm.personName" size="small" style="width: 400px;" />
        </el-form-item>
        <el-form-item label="联系方式" prop="phoneNumber">
          <el-input v-model="ruleForm.phoneNumber" size="small" style="width: 400px;" />
        </el-form-item>
        <el-form-item label="车牌号码" prop="carNumber">
          <el-input v-model="ruleForm.carNumber" size="small" style="width: 400px;" />
        </el-form-item>
        <el-form-item label="车辆品牌" prop="carBrand">
          <el-input v-model="ruleForm.carBrand" size="small" style="width: 400px;" />
        </el-form-item>

      </div>
      <div class="MonthInfo">
        <div class="MonthInfoHeader">
          <p>最近一次月卡缴费信息</p>
        </div>

        <el-form-item label="有效日期" prop="Datavalue">
          <el-date-picker
            v-model="ruleForm.Datavalue"
            size="small"
            style="width: 400px;"
            type="daterange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['', '']"
            value-format="yyyy-MM-dd"
          />
        </el-form-item>
        <el-form-item label="支付金额" prop="paymentAmount">
          <el-input v-model="ruleForm.paymentAmount" size="small" style="width: 400px;" />
        </el-form-item>
        <el-form-item label="支付方式" prop="paymentMethod">
          <el-select v-model="ruleForm.paymentMethod" size="small" style="width: 400px;" placeholder="请选择">
            <el-option v-for="item,index in paymentMethod" :key="index" :value="item.value" :label="item.name" />
          </el-select>
        </el-form-item>

      </div>

      <footer>
        <el-button type="default" size="small" @click="cancel">重置</el-button>
        <el-button type="primary" size="small" @click="submit">确定</el-button>
      </footer>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getAddParkingCarApi, getDetailParkingApi, getEditParkingCartApi } from '@/api/parking'
import utils from '@/utils/utils'
export default {
  components: {},
  filters: {},
  data() {
    const dataValid = (rule, value, callback) => {
      if (value) {
        if (value.length < 0) {
          callback(new Error('请选择开始日期'))
        } else if (value.length === 1) {
          callback(new Error('请选择结束日期'))
        } else {
          callback()
        }
      } else {
        callback(new Error('请选择日期'))
      }
    }
    const payPrice = (rule, value, callback) => {
      if (value) {
        if (!/[0-9]/.test(value)) {
          callback(new Error('金额必须为数字'))
        } else {
          callback()
        }
      } else {
        callback(new Error('请输入金额'))
      }
    }
    const phone = (rule, value, callback) => {
      if (value) {
        if (!/^1[2-9][0-9]{9}$/.test(value)) {
          callback(new Error('请输入正确手机号'))
        } else {
          callback()
        }
      } else {
        callback(new Error('请输入手机号'))
      }
    }
    return {
      ruleForm: {
        personName: '',
        phoneNumber: '',
        carNumber: '',
        carBrand: '',
        cardStartDate: '',
        cardEndDate: '',
        paymentAmount: '',
        paymentMethod: '',
        Datavalue: []
      },
      value: '',
      rules: {
        personName: [
          { required: true, message: '请输入车主姓名', trigger: 'blur' }
        ],
        phoneNumber: [
          { required: true, message: '请输入联系方式', trigger: 'blur' },
          {
            validator: phone
          }
        ],
        carNumber: [
          { required: true, message: '请输入车牌号码', trigger: 'blur' }
        ],
        carBrand: [
          { required: true, message: '请输入车辆品牌', trigger: 'blur' }
        ],
        Datavalue: [
          {
            validator: dataValid
          }
        ],
        paymentAmount: [
          { required: true, message: '请输入支付金额', trigger: 'blur' },
          {
            validator: payPrice
          }
        ],
        paymentMethod: [
          { required: true, message: '请输入支付方式', trigger: 'blur' }
        ]

      },
      paymentMethod: [
        {
          name: '支付宝',
          value: 'Alipay'
        },
        {
          name: '微信',
          value: 'WeChat'
        },
        {
          name: '线下',
          value: 'Cash'
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['username'])
  },
  watch: {},
  created() {
    this.$route.query.id && this.getDetailParking()
  },
  mounted() {},
  methods: {
    submit() {
      this.$refs['ruleForm'].validate(async(valid) => {
        console.log(valid)
        if (valid) {
          console.log(111)
          if (this.$route.query.id) {
            // 编辑
            delete this.ruleForm.Datavalue
            delete this.ruleForm.cardStatus
            await getEditParkingCartApi(this.ruleForm)
            utils.SuccessEvent('编辑月卡成功')
          } else {
            // 添加
            console.log(111)
            this.ruleForm.cardStartDate = this.ruleForm.Datavalue[0]
            this.ruleForm.cardEndDate = this.ruleForm.Datavalue[1]
            delete this.ruleForm.Datavalue
            const res = await getAddParkingCarApi(this.ruleForm)
            if (res.code === 10000) {
              utils.SuccessEvent('添加月卡成功')
              this.$router.push('/parking/card')
            }
          }
        }
      })
    },
    cancel() {
      this.$refs['ruleForm'].resetFields()
    },
    async getDetailParking() {
      const { data } = await getDetailParkingApi(this.$route.query.id)
      this.ruleForm = data
      this.ruleForm.Datavalue = [data.cardStartDate, data.cardEndDate]
    }
  }
}
</script>

<style lang="scss" scoped>
.header{
  height: 60px;
  display: flex;
  align-items: center;
  padding: 0 10px;
  justify-content: space-between;
  background-color: #fff;

}
.mothcard{
    background-color: #f4f6f8;
    height: 100%;
    width: 100%;
  .cardInfo{
    background-color: #fff;
    width: 1200px;
    margin: 20px auto;
    .cardInfoHeader{
      height: 50px;
      padding: 0 20px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #e7e7e7;
      margin-bottom: 20px;
    }
  }
  .MonthInfo{
    background-color: #fff;
    width: 1200px;
    margin: 20px auto;
    .MonthInfoHeader{
      height: 50px;
      padding: 0 20px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #e7e7e7;
      margin-bottom: 20px;
    }
  }
  footer{
    width: 100%;
    height: 60px;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    left: 0;
    bottom: 0;
  }
}
</style>
