<template>
  <el-dialog
    :title="title"
    :visible="dialogVisible"
    width="40%"
    :before-close="handleClose"
  >
    <div class="content">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" class="demo-ruleForm">
        <el-form-item label="一体杆名称" prop="poleName">
          <el-input v-model="ruleForm.poleName" size="small" placeholder="请输入一体杆名称" />
        </el-form-item>
        <el-form-item label="一体杆编号" prop="poleNumber">
          <el-input v-model="ruleForm.poleNumber" :disabled="title == '编辑一体杆'" size="small" placeholder="请输入一体杆编号" />
        </el-form-item>
        <el-form-item label="一体杆IP" prop="poleIp">
          <el-input v-model="ruleForm.poleIp" size="small" placeholder="请输入一体杆IP" />
        </el-form-item>
        <el-form-item label="关联区域" prop="areaId">
          <el-select v-model="ruleForm.areaId" placeholder="请选择关联区域" style="width: 100%;" size="small">
            <el-option v-for="item,index in DropList" :key="index" :label="item.areaName" :value="item.areaId" />

          </el-select>
        </el-form-item>
        <el-form-item label="一体杆类型" prop="poleType">
          <el-select v-model="ruleForm.poleType" placeholder="请选择一体杆类型" style="width: 100%;" size="small">
            <el-option label="正常" value="0" />
            <el-option label="异常" value="1" />
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
import { getParkingDropListApi, getAddPoleApi, getEditPoleApi } from '@/api/poleinfo'
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
        poleName: '',
        poleNumber: '',
        poleIp: '',
        areaId: '',
        poleType: ''
      },
      rules: {
        poleName: [
          { required: true, message: '请输入一体杆名称', trigger: 'blur' }
        ],
        poleNumber: [
          { required: true, message: '请输入一体杆编号', trigger: 'blur' }
        ],
        poleIp: [
          { required: true, message: '请输入一体杆IP', trigger: 'blur' }
        ],
        areaId: [
          { required: true, message: '请选择关联区域', trigger: 'change' }
        ],
        poleType: [
          { required: true, message: '请选择一体杆类型', trigger: 'change' }
        ]
      },
      DropList: []
    }
  },
  computed: {},
  watch: {},
  created() {
    this.getParkingDropLists()
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
            const res = await getEditPoleApi(this.ruleForm)
            if (res.code === 10000) {
              utils.SuccessEvent('编辑一体杆成功')
            }
            utils.SuccessEvent('编辑一体杆成功')
          } else {
            // 添加
            const res = await getAddPoleApi(this.ruleForm)
            if (res.code === 10000) {
              utils.SuccessEvent('添加一体杆成功')
            }
          }
          this.$emit('updateBuding')
          this.handleClose()
        }
      })
    },
    edithandel(row) {
      this.ruleForm = {
        ...row
      }
      delete this.ruleForm.areaName
      delete this.ruleForm.poleStatus
    },
    async getParkingDropLists() {
      const { data } = await getParkingDropListApi()
      this.DropList = data
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
