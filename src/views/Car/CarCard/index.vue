<template>
  <div class="CarArea">
    <div class="main">
      <el-form ref="form" inline :mode="form" label-width="80px">
        <globelSearch v-model="form.carNumber" label="车牌号码" placeholder="请输入车牌号码" />
        <globelSearch v-model="form.personName" label="车主姓名" placeholder="请输入车主姓名" />
        <globelSelect v-model="form.cardStatus" label="状态" placeholder="未选择" :select-list="selectList" />
        <el-form-item>
          <el-button type="primary" size="small" @click="search">查询</el-button>
        </el-form-item>
      </el-form>
      <div class="center">
        <div>
          <el-button type="primary" size="small" @click="$router.push('/car/addMonthCard')">添加月卡</el-button>
          <el-button type="primary" size="small" @click="BatchDel">批量删除</el-button>
        </div>
        <div class="alter-info">
          <span class="el-icon-warning" />
          <p>本园区共计 {{ Proportion.spaceNumber }} 个车位，月卡用户 {{ Proportion.cardCount }} 人，车位占有率 {{ Proportion.proportion }}</p>
        </div>
      </div>
      <globelTabel :tabel-list="tabelList" @handleSelectionChange="handleSelectionChange" />
      <globelPage :page-info="pageInfo" :layout="layout" @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange" />
    </div>
  </div></template>

<script>
import globelPage from '@/components/globelPage.vue'
import globelSearch from '@/components/globelSearch.vue'
import globelSelect from '@/components/globelSelect.vue'
import globelTabel from '@/components/globelTabel.vue'
import { MixinMessageBox } from '@/composable/index'
import { getParkingCardApi, getDelParkingCartApi, getProportionApi } from '@/api/parking'
import utils from '@/utils/utils'

export default {
  components: { globelSearch, globelSelect, globelTabel, globelPage },
  filters: {},
  data() {
    return {
      form: {
        carNumber: '',
        cardStatus: '',
        personName: ''
      },
      pageInfo: {
        page: 1,
        pageSize: 10,
        total: 0

      },
      layout: 'total,prev, pager, next, sizes, jumper ',
      tabelList: {
        tableData: [],
        isIndex: true,
        isFlag: true,
        tabelInfo: [
          {
            prop: 'personName',
            label: '车主名称',
            width: '150px'
          },
          {
            prop: 'phoneNumber',
            label: '联系方式'
          },
          {
            prop: 'carNumber',
            label: '车牌号码'
          },
          {
            prop: 'carBrand',
            label: '车辆品牌'
          },
          {
            prop: 'totalEffectiveDate',
            label: '剩余有效天数'
          },
          {
            prop: 'cardStatus',
            label: '状态'
          },
          {
            label: '操作',
            width: '200px',
            name1: '续费',
            name2: '查看',
            name3: '编辑',
            name4: '删除'
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
      },
      delData: [],
      selectList: [
        { name: '全部', value: '' },
        { name: '可用', value: '0' },
        { name: '已过期', value: '1' }
      ],
      Proportion: {}
    }
  },
  computed: {},
  watch: {},
  created() {
    this.getParkingCard()
    this.getProportion()
  },
  mounted() {},
  methods: {
    async getParkingCard() {
      const { data } = await getParkingCardApi({ ...this.pageInfo, ...this.form })
      this.tabelList.tableData = data.rows
      this.pageInfo.total = data.total
    },
    handleSizeChange(value) {
      this.pageInfo.page = 1
      this.pageInfo.pageSize = value
      this.getParkingCard()
    },
    handleCurrentChange(value) {
      this.pageInfo.page = value
      this.getParkingCard()
    },
    AddOrEdit(row) {
      this.$router.push('/car/addMonthCard?id=' + row.id)
    },
    async delParking(row) {
      await MixinMessageBox(row.id, getDelParkingCartApi)
      this.getParkingCard()
    },
    // 批量删除
    handleSelectionChange(data) {
      this.delData = data
    },
    async BatchDel() {
      if (this.delData.length < 0) return utils.ErrorEvent('请选择月卡')
      await MixinMessageBox(this.delData, getDelParkingCartApi)
      this.getParkingCard()
    },
    // 查看详情
    lookDetail(row) {
      this.$router.push('/car/viewMonthCard?id=' + row.id)
    },
    // 续费
    cartRenew(row) {
      this.$router.push('/car/renewMonthCard?id=' + row.id)
    },
    // 查询
    search() {
      this.getParkingCard()
    },
    // 月卡占有率
    async getProportion() {
      const res = await getProportionApi()
      console.log(res)
      this.Proportion = res.data
    }
  }
}
</script>

<style lang="scss" scoped>
.CarArea{
  width: 100%;
  height: 100%;
  padding-right:15px ;
  .main{
    background-color: #fff;
    width: 100%;
    padding: 20px;
    .search{
      border-bottom: 1px solid #ececec ;
    }
    .addBtn{
      margin: 10px 0;
    }
    .el-form{
      border-bottom: 1px solid #e9e9e9;
    }
    .center{
      margin: 10px 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .alter-info{
      height: 28px;
      padding: 20px 10px;
      border: 1px solid #91d5ff;
      background-color: #e6f7ff;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .el-icon-warning{
        margin-right: 5px;
        color: #91d5ff;
      }
      p{
        flex: 1;
        font-size: 13px;
      }
    }
  }
}
</style>
