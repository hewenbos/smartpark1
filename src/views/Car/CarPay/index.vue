<template>
  <div class="RuleArea">

    <div class="main">
      <el-form ref="form" inline :mode="form" label-width="80px">
        <globelSearch v-model="form.carNumber" label="车牌号码" placeholder="请输入车牌号码" />
        <globelSelect v-model="form.paymentStatus" label="缴纳状态" placeholder="未选择" :select-list="selectList" />
        <el-form-item>
          <el-button type="primary" size="small" @click="getParkingPayMent">查询</el-button>
        </el-form-item>
      </el-form>
      <globelTabel :tabel-list="tabelList" />
      <globelPage :page-info="pageInfo" :layout="layout" @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange" />
    </div>
  </div></template>

<script>
import globelSearch from '@/components/globelSearch.vue'
import globelSelect from '@/components/globelSelect.vue'
import globelTabel from '@/components/globelTabel.vue'
import globelPage from '@/components/globelPage.vue'
import { getParkingPayMentApi } from '@/api/parking'
export default {
  components: { globelSearch, globelSelect, globelTabel, globelPage },
  filters: {},
  data() {
    return {
      form: {
        carNumber: '',
        paymentStatus: ''
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
        tabelInfo: [
          {
            prop: 'carNumber',
            label: '车牌号码'
          },
          {
            prop: 'chargeType',
            label: '收费类型'
          },
          {
            prop: 'parkingTime',
            label: '停车总时长'
          },
          {
            prop: 'actualCharge',
            label: '缴纳费用（元）'
          },
          {
            prop: 'paymentStatus',
            label: '缴纳状态'
          },
          {
            prop: 'paymentMethod',
            label: '缴纳方式'
          },
          {
            prop: 'paymentTime',
            label: '缴纳时间',
            width: '200px'
          }
        ]
      },
      selectList: [
        { name: '未缴纳', value: '0' },
        { name: '已缴纳', value: '1' }
      ]
    }
  },
  computed: {},
  watch: {},
  created() {
    this.getParkingPayMent()
  },
  mounted() {},
  methods: {
    handleSizeChange(value) {
      this.pageInfo.page = 1
      this.pageInfo.pageSize = value
      this.getParkingPayMent()
    },
    handleCurrentChange(value) {
      this.pageInfo.page = value
      this.getParkingPayMent()
    },
    async getParkingPayMent() {
      const { data } = await getParkingPayMentApi({ ...this.pageInfo, ...this.form })
      console.log(data)
      this.pageInfo.total = data.total
      this.tabelList.tableData = data.rows
    }
  }
}
</script>

<style lang="scss" scoped>
.RuleArea{
  width: 100%;
  height: 100%;
  padding-right:15px ;
  .main{
  background-color: #fff;
  padding: 20px;
}
}

</style>
