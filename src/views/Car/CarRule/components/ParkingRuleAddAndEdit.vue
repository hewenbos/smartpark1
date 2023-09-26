<template>
  <el-dialog :title="title" :visible="dialogVisible" width="40%" :before-close="handleClose">
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" class="demo-ruleForm">
      <el-form-item label="计费规则编号" prop="ruleNumber">
        <el-input v-model="ruleForm.ruleNumber" size="small" style="width: 100%;" placeholder="请输入计费规则编号" />
      </el-form-item>
      <el-form-item label="计费规则名称" prop="ruleName">
        <el-input v-model="ruleForm.ruleName" size="small" style="width: 100%;" placeholder="请输入计费规则名称" />
      </el-form-item>
      <el-form-item label="计费方式（全天收费）" prop="chargeType">
        <el-radio-group v-model="ruleForm.chargeType" style="text-align: center;">
          <el-radio label="duration" border>时长收费</el-radio>
          <el-radio label="turn" border>按次收费</el-radio>
          <el-radio label="partition" border>分段收费</el-radio>
        </el-radio-group>

      </el-form-item>
      <div class="contentFlex">
        <el-form-item label="免费时长" prop="freeDuration">
          <el-input-number v-model="ruleForm.freeDuration" controls-position="right" :min="1" /><span>分</span>
        </el-form-item>
        <el-form-item label="收费上限" prop="chargeCeiling">
          <div class="price">
            <el-input v-model="ruleForm.chargeCeiling" placeholder="请输入收费上限" style="width: 90%;" /> <span>元</span>
          </div>
        </el-form-item>
      </div>

      <el-form-item label="计费规则" prop="name" />

      <div v-if="ruleForm.chargeType === 'duration'" style="display: flex; justify-content: space-between; width: 100%;">
        <br>
        <el-form-item prop="durationTime" style="width: 35%;">
          <span>每 </span>
          <el-input v-model="ruleForm.durationTime" size="small" style="width: 80%;" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="durationType" style="width: 35%;">
          <el-select v-model="ruleForm.durationType" size="small" placeholder="请选择">
            <el-option label="小时" value="hover" />
            <el-option label="分钟" value="minute" />
          </el-select>
        </el-form-item>

        <el-form-item style="width: 25%;" prop="durationPrice">
          <el-input v-model="ruleForm.durationPrice" size="small" style="width: 80%;" placeholder="请输入" /><span>元</span>
        </el-form-item>
      </div>

      <el-form-item v-if="ruleForm.chargeType === 'turn'" prop="turnPrice">
        <div style="width: 100%;">
          <span>每次</span>
          <el-input v-model="ruleForm.turnPrice" size="small" style="width: 25%;" placeholder="请输入" />
          <span>元</span>
        </div>
      </el-form-item>

      <el-form-item v-if="ruleForm.chargeType === 'partition'">
        <div>
          <p class="contentFlex">
            <el-form-item prop="partitionFrameTime" class="contentFlex">
              <el-input-number v-model="ruleForm.partitionFrameTime" :min="1" size="small" style="width: 95%; " controls-position="right" />
            </el-form-item>
            <span>小时内，每小时收费</span>
            <el-form-item prop="partitionFramePrice" class="contentFlex">
              <el-input
                v-model="ruleForm.partitionFramePrice
                "
                size="small"
                style="width:  95%;"
                placeholder="请输入"
              />
            </el-form-item>
            <span>元</span>
          </p>
          <p class="contentFlex">
            <span>每增加</span>
            <el-form-item prop="partitionIncreaseTime" class="contentFlex">
              <el-input-number
                v-model="ruleForm.partitionIncreaseTime
                "
                :min="1"
                size="small"
                style="width: 95%; "
                controls-position="right"
              />
            </el-form-item>
            <span>小时</span>, <span>增加</span>
            <el-form-item prop="partitionIncreasePrice" class="contentFlex">
              <el-input v-model="ruleForm.partitionIncreasePrice" size="small" style="width: 95%;" placeholder="请输入" />
            </el-form-item>
            <span>元</span>
          </p>
        </div>
      </el-form-item>

    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button size="small" type="default" @click="handleClose">取 消</el-button>
      <el-button size="small" type="primary" @click="onSumbit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getDetailParkingRuleApi, getAddParkingRuleApi, getEditParkingRuleApi } from '@/api/parking'
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
    const durationTime = (rule, value, callback) => {
      if (value) {
        callback()
      } else {
        callback(new Error('请输入计费时间'))
      }
    }
    return {
      ruleForm: {
        chargeCeiling: '',
        chargeType: 'duration',
        durationPrice: '',
        durationTime: '',
        durationType: '',
        freeDuration: '',
        ruleName: '',
        ruleNumber: '',
        turnPrice: '',
        partitionFrameTime: '',
        partitionIncreaseTime: '',
        partitionFramePrice: '',
        partitionIncreasePrice: ''
      },
      rules: {
        ruleNumber: [
          { required: true, message: '请输入计费规则编号', trigger: 'blur' }
        ],
        ruleName: [
          { required: true, message: '请输入计费规则名称', trigger: 'blur' }
        ],
        chargeType: [
          { required: true, message: '请选择计费方式', trigger: 'blur' }
        ],
        chargeCeiling: [
          { required: true, message: '请输入收费上线', trigger: 'blur' }
        ],
        durationTime: [
          { validator: durationTime }
        ],
        durationType: [
          { required: true, message: '请选择计费时间单位!', trigger: 'blur' }
        ],
        durationPrice: [
          { required: true, message: '请输入计费金额!!', trigger: 'blur' }
        ],
        turnPrice: [
          { required: true, message: '请输入计费金额!', trigger: 'blur' }
        ],
        partitionFrameTime: [
          { required: true, message: '请输入计费时间!', trigger: 'blur' }
        ],
        partitionFramePrice: [
          { required: true, message: '请输入计费金额!', trigger: 'blur' }
        ],
        partitionIncreaseTime: [
          { required: true, message: '请输入计费时间!', trigger: 'blur' }
        ],
        partitionIncreasePrice: [
          { required: true, message: '请输入计费金额!', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {},
  watch: {},
  mounted() { },
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
            await getEditParkingRuleApi(this.ruleForm)
            utils.SuccessEvent('编辑规则成功')
          } else {
            // 添加
            const res = await getAddParkingRuleApi(this.ruleForm)
            if (res.code === 10000) {
              utils.SuccessEvent('添加规则成功')
            }
          }
          this.$emit('updateParkingArea')
          this.handleClose()
        }
      })
    },
    async  edithandel(row) {
      const { data } = await getDetailParkingRuleApi(row.id)
      this.ruleForm = {
        ...data
      }
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep {
  .el-dialog {
    border-radius: 10px;
  }

  .el-dialog__footer {
    background-color: #f4f6f8;
    border-radius: 0 0 10px 10px;
  }

  .el-button {
    border: none;
    border-radius: 10px;
  }

  .content {
    padding: 0 80px;
  }

  .el-form-item {
    margin-bottom: 15px;
  }

  .el-form-item__label {
    line-height: 30px;
    font-weight: 400;
    color: #333;

  }
}

.contentFlex{
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
}

</style>
