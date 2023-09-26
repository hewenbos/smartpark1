<template>
  <div class="detail">
    <div class="header">
      <el-page-header content="告警详情" @back="$router.back()" />
      <span>{{ username }}</span>
    </div>

    <div class="info-wrapper">
      <div class="header"><span>告警详情</span></div>
      <div class="main">
        <el-row>
          <el-col :span="12"><span>告警时间:</span>{{ warnInfo.warningTime }}</el-col>
          <el-col :span="12"><span>一体杆名称:</span>{{ warnInfo.poleName }}</el-col>
        </el-row>
        <el-row>
          <el-col :span="12"><span>告警区域:</span>{{ warnInfo.areaName }}</el-col>
          <el-col :span="12"><span>一体杆编号:</span>{{ warnInfo.poleNumber }}</el-col>
        </el-row>
        <el-row>
          <el-col :span="12"><span>故障类型:</span>{{ warnInfo.errorType }}</el-col>
          <el-col :span="12"><span>处置状态:</span>{{ ['未派单','已派单','已接单','已完成'][warnInfo.handleStatus] }}</el-col>
        </el-row>
      </div>
    </div>
    <div class="info-wrapper warpper">
      <div class="header"><span>告警处理</span></div>
      <div class="main">
        <el-row>
          <el-col :span="12"><span>处理人:</span>{{ warnInfo.handleUser }}</el-col>
          <el-col :span="12"><span>联系方式:</span>{{ warnInfo.phonenumber }}</el-col>
        </el-row>
        <el-row>
          <el-col :span="12"><span>处理结果:</span>{{ warnInfo.handleResult }}</el-col>
          <el-col :span="12"><span>完成时间:</span>{{ warnInfo.handleTime }}</el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getPoleDetailApi } from '@/api/poleinfo'
export default {
  components: {},
  filters: {},
  data() {
    return {
      warnInfo: {}
    }
  },
  computed: { ...mapGetters(['username']) },
  watch: {},
  created() { this.$route.params.id && this.getPoleDetail() },
  mounted() { },
  methods: {
    async getPoleDetail() {
      const { data } = await getPoleDetailApi(this.$route.params.id)
      this.warnInfo = data
    }
  }
}
</script>

<style lang="scss" scoped>
.detail {
  background-color: #f4f6f8;
  height: 100%;
  width: 100%;

  .header {
    height: 60px;
    display: flex;
    align-items: center;
    padding: 0 10px;
    justify-content: space-between;
    background-color: #fff;
  }

  .info-wrapper{
    width: 1200px;

    margin: 0 auto;
    margin-top: 30px;
    background-color: #fff;
    .header{
      padding: 0;
      height: 60px;
      font-size: 14px;
      span{
        width: 100px;
        height: 20px;
        border-left: 2px solid blue;
        line-height: 20px;
        text-align: center;
      }
    }
    .main{
      margin: 0 auto;
      padding: 60px 80px;
      .el-row{
        margin: 15px 0;
        .el-col{
          font-size: 14px;
          span{
            display: inline-block;
            font-size: 14px;
            width: 100px;
            text-align: right;
            color: #909399;
            margin-right: 10px;
          }
        }
      }
    }
  }
  .warpper{
    .main{
      padding: 30px 80px;
    }
  }
}
</style>
