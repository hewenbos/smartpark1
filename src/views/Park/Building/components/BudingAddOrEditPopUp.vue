<template>
  <el-dialog
    :title="title"
    :visible="dialogVisible"
    width="40%"
    :before-close="handleClose"
  >
    <div class="content">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" class="demo-ruleForm">
        <el-form-item label="楼宇名称" prop="name">
          <el-input v-model="ruleForm.name" size="small" />
        </el-form-item>
        <el-form-item label="楼宇层数" prop="floors">
          <el-input-number v-model="ruleForm.floors" size="small" style="width: 100%;" controls-position="right" :min="1" />
        </el-form-item>
        <el-form-item label="在管面积" prop="area">
          <el-input v-model="ruleForm.area" size="small" placeholder="请输入内容">
            <template slot="append">m²</template>
          </el-input>
        </el-form-item>
        <el-form-item label="物业费" prop="propertyFeePrice">
          <el-input v-model="ruleForm.propertyFeePrice" size="small" placeholder="请输入内容">
            <template slot="append">元/m²</template>
          </el-input>
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
import { getAddParkBudingApi, getEditParkBudingApi } from '@/api/buding'
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
    const floorsNum = (roule, value, callback) => {
      if (value < 1 || value > 10) {
        callback(new Error('楼层不能超过10'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        name: '',
        floors: '',
        area: '',
        propertyFeePrice: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入楼宇名称', trigger: 'blur' }
        ],
        floors: [
          { required: true, message: '请输入楼宇层数', trigger: 'blur' },
          {
            validator: floorsNum
          }
        ],
        area: [
          { required: true, message: '请输入在管面积', trigger: 'blur' }
        ],
        propertyFeePrice: [
          { required: true, message: '请输入物业费', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {},
  watch: {},
  created() {

  },
  mounted() {},
  methods: {
    handleClose() {
      this.$emit('update:dialogVisible', false)
    },
    onSumbit() {
      console.log(111)
      this.$refs['ruleForm'].validate(async(valid) => {
        console.log(valid)
        if (valid) {
          console.log(valid)
          if (this.ruleForm.id) {
            // 编辑
            await getEditParkBudingApi(this.ruleForm)
            utils.SuccessEvent('编辑楼宇成功')
          } else {
            // 添加
            await getAddParkBudingApi(this.ruleForm)
            utils.SuccessEvent('添加楼宇成功')
          }
          this.$emit('updateBuding')
          this.handleClose()
        }
      })
    },
    edithandel(row) {
      this.ruleForm = {
        id: row.id,
        name: row.name,
        floors: row.floors,
        area: row.area,
        propertyFeePrice: row.propertyFeePrice
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
