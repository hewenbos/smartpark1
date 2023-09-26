<template>
  <el-dialog
    :title="title"
    :visible="dialogVisible"
    width="40%"
    :before-close="handleClose"
  >
    <div class="content">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" class="demo-ruleForm">
        <el-form-item label="区域名称" prop="areaName">
          <el-input v-model="ruleForm.areaName" placeholder="请输入区域名称" size="small" />
        </el-form-item>
        <el-form-item label="车位数（个）" prop="spaceNumber">
          <el-input-number v-model="ruleForm.spaceNumber" placeholder="请输入车位数" size="small" style="width: 100%;" controls-position="right" :min="1" />
        </el-form-item>
        <el-form-item label="面积（㎡）" prop="areaProportion">
          <el-input v-model="ruleForm.areaProportion" size="small" placeholder="请输入面积">
            <template #suffix>m²</template>
          </el-input>
        </el-form-item>
        <el-form-item label="关联计费规则" prop="ruleId">

          <el-select v-model="ruleForm.ruleId" size="small" style="width: 100%;" placeholder="关联计费规则">
            <el-option
              v-for="item in ruleList"
              :key="item.id"
              :label="item.ruleName"
              :value="item.id"
            />
          </el-select>

        </el-form-item>

        <el-form-item label="备注">
          <el-input v-model="ruleForm.remark" type="textarea" />
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
import { getParkingRuleApi, getAddParkingApi, getEditParkingApi } from '@/api/parking'
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
        callback(new Error('车位数不能超过10'))
      } else {
        callback()
      }
    }
    const areaProportionNum = (roule, value, callback) => {
      if (!/[0-9]/.test(value)) {
        callback(new Error('仅支持整数'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        areaName: '',
        spaceNumber: '',
        areaProportion: '',
        ruleId: '',
        remark: ''
      },
      rules: {
        areaName: [
          { required: true, message: '请输入区域名称', trigger: 'blur' }
        ],
        spaceNumber: [
          { required: true, message: '请输入车位数', trigger: 'blur' },
          {
            validator: floorsNum
          }
        ],
        areaProportion: [
          { required: true, message: '请输入面积', trigger: 'blur' },
          {
            validator: areaProportionNum
          }
        ],
        ruleId: [
          { required: true, message: '请输入关联计费规则', trigger: 'blur' }
        ]
      },
      ruleList: []
    }
  },
  computed: {},
  watch: {},
  created() {
    this.getParkingRule()
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
            await getEditParkingApi(this.ruleForm)
            utils.SuccessEvent('编辑区域成功')
          } else {
            // 添加
            await getAddParkingApi(this.ruleForm)
            utils.SuccessEvent('添加区域成功')
          }
          this.$emit('updateParkingArea')
          this.handleClose()
        }
      })
    },
    edithandel(row) {
      this.ruleForm = {
        ...row
      }
      delete this.ruleForm.ruleName
      delete this.ruleForm.hoverRuleName
    },
    async getParkingRule() {
      const { data } = await getParkingRuleApi()
      this.ruleList = data.rows
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
