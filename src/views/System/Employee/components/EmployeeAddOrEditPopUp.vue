<template>
  <el-dialog
    :title="title"
    :visible="dialogVisible"
    width="40%"
    :before-close="handleClose"
  >
    <div class="content">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" class="demo-ruleForm">
        <el-form-item label="员工姓名" prop="name">
          <el-input v-model="ruleForm.name" size="small" placeholder="请输入员工姓名" />
        </el-form-item>
        <el-form-item label="登录账号" prop="userName">
          <el-input v-model="ruleForm.userName" :disabled="title == '编辑一体杆'" size="small" placeholder="请输入登录账号" />
        </el-form-item>
        <el-form-item label="联系方式" prop="phonenumber">
          <el-input v-model="ruleForm.phonenumber" size="small" placeholder="请输入联系方式" />
        </el-form-item>
        <div style="margin:10px 0;">
          <span>默认密码</span> 123456
        </div>
        <el-form-item label="分配角色" prop="roleId">
          <el-select v-model="ruleForm.roleId" placeholder="请选择角色" style="width: 100%;" size="small">
            <el-option v-for="item,index in RuleList" :key="index" :label="item.roleName" :value="item.roleId" />

          </el-select>
        </el-form-item>

        <el-form-item label="员工状态" prop="status">
          <el-radio-group v-model="ruleForm.status" style="width: 100%;">
            <el-radio :label="0" value="0">禁用</el-radio>
            <el-radio :label="1" value="1">启用</el-radio>
          </el-radio-group>
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
import { getAddEmployeeApi, getSearchRuleApi, getEditEmployeeApi } from '@/api/employee'
import utils from '@/utils/utils'
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
        name: '',
        userName: '',
        phonenumber: '',
        roleId: '',
        status: '0'
      },
      rules: {
        name: [
          { required: true, message: '请输入员工姓名', trigger: 'blur' }
        ],
        userName: [
          { required: true, message: '请输入登录账号', trigger: 'blur' }
        ],
        phonenumber: [
          { required: true, message: '请输入联系方式', trigger: 'blur' }
        ],
        roleId: [
          { required: true, message: '请选择角色', trigger: 'change' }
        ],
        status: [
          { required: true, message: '请选择员工状态', trigger: 'change' }
        ]
      },
      RuleList: []
    }
  },
  computed: {},
  watch: {},
  created() {
    this.getSearchRule()
  },
  mounted() {},
  methods: {
    handleClose() {
      this.$refs['ruleForm'].resetFields()
      this.$emit('update:dialogVisible', false)
    },
    onSumbit() {
      this.$refs['ruleForm'].validate(async(valid) => {
        console.log(valid)
        if (valid) {
          console.log(valid)
          if (this.ruleForm.id) {
            // 编辑
            const res = await getEditEmployeeApi(this.ruleForm)
            if (res.code === 10000) {
              utils.SuccessEvent('编辑用户成功')
            }
          } else {
            // 添加
            const res = await getAddEmployeeApi(this.ruleForm)
            if (res.code === 10000) {
              utils.SuccessEvent('添加用户成功')
            }
          }
          this.$emit('updateBuding')
          this.handleClose()
        }
      })
    },
    edithandel(row) {
      console.log(row)
      this.ruleForm = {
        ...row
      }
      console.log(this.ruleForm)
      delete this.ruleForm.createTime
    },
    async getSearchRule() {
      const { data } = await getSearchRuleApi()
      console.log(data)
      this.RuleList = data
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

