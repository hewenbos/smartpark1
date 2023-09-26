<template>
  <div class="viewMonthCard">
    <div class="header">
      <el-page-header :content="$route.query.id ? '编辑月卡':'添加月卡'" @back="$router.back()" />
      <span>{{ username }}</span>
    </div>
    <div class="ant-card">
      <div class="ant-card-Header">
        车辆信息
      </div>
      <el-row type="flex" justify="space-around">
        <el-col :span="8"><span>车主姓名: </span>{{ lookInfo.personName }}</el-col>
        <el-col :span="8"><span>联系方式: </span>{{ lookInfo.phoneNumber }}</el-col>
      </el-row>
      <el-row type="flex" justify="space-around">
        <el-col :span="8"><span>车牌号码: </span>{{ lookInfo.carNumber }}</el-col>
        <el-col :span="8"><span>车辆品牌: </span>{{ lookInfo.carBrand }}</el-col>
      </el-row>
    </div>
    <div class="ant-card">
      <div class="ant-card-Header">
        月卡缴费记录
      </div>
      <div class="table">
        <globelTabel :tabel-list="tabelList" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import globelTabel from '@/components/globelTabel.vue'
import { getLookDetailParkingCardApi } from '@/api/parking'
export default {
  components: { globelTabel },
  filters: {},
  data() {
    return {
      lookInfo: {},
      tabelList: {
        tableData: [],
        isIndex: true,
        tabelInfo: [
          {
            prop: 'cardStartDate',
            label: '有效时间',
            width: '180px'
          },
          {
            prop: 'paymentAmount',
            label: '支付金额'
          },
          {
            prop: 'paymentMethod',
            label: '支付方式'
          },
          {
            prop: 'createTime',
            label: '办理时间'
          },
          {
            prop: 'createUser',
            label: '办理人'
          }
        ],
        tabelEvent: {
          renewEvent: (row) => {
            this.AddOrEdit(row)
          },
          SurrenderEvent: (row) => {
            this.delParking(row)
          },
          lookEvent: (row) => {
            this.lookDetail(row)
          },
          cartEvent: (row) => {
            this.cartRenew(row)
          }
        }
      }
    }
  },
  computed: {
    ...mapGetters(['username'])
  },
  watch: {},
  created() {
    this.$route.query.id && this.getLookDetailParkingCard()
  },
  mounted() {},
  methods: {
    async getLookDetailParkingCard() {
      const { data } = await getLookDetailParkingCardApi(this.$route.query.id)
      console.log(data)
      this.lookInfo = data
      this.tabelList.tableData = data.rechargeList
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
.ant-card{
  width: 1200px;
  margin: 30px auto;
  .ant-card-Header{
    height: 60px;
    padding:  0 20px;
    display: flex;
    align-items: center;
  }
  .el-row{
    margin: 20px 0;
    .el-col{
     span{
      font-size: 14px;
      color: #909399;
     }
    }
  }
  .table{
    width: 1100px;
    margin:  0 auto;
  }
}
</style>
