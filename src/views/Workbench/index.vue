
<template>
  <div>
    <div class="main">
      <div class="Parkdata father">
        <p class="title">园区数据</p>
        <ParkData :park-data="Parkdata" />
      </div>
      <div class="Quickaccess father">
        <p class="title">快捷入口</p>
        <Quickaccess />
      </div>
      <div class="AnnualIncome father">
        <p class="title">年度收入</p>
        <AnnualIncome ref="annual" />
      </div>

      <div class="Devicealarm father">
        <div class="title">设备告警</div>

        <svg-icon icon-class="empty" />
        <el-button round class="SeeMore" type="primary" @click="$router.push('/pole/waring')">
          更多 <i class="el-icon-arrow-right el-icon--right" />
        </el-button>
      </div>
      <div class="contract father">
        <p class="title">临期合同</p>
        <globelTabel :tabel-list="tabelList" />

        <globelPage :layout="layout" :page-info="pageInfo" @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange" />
      </div>
    </div>
  </div>
</template>
<script>
import { getParkdataApi, getRentInfoApi } from '@/api/workbench'
import AnnualIncome from './components/AnnualIncome.vue'
import ParkData from './components/ParkData.vue'
import Quickaccess from './components/Quickaccess.vue'
import SvgIcon from '@/components/SvgIcon/index.vue'
import globelTabel from '@/components/globelTabel.vue'
import globelPage from '@/components/globelPage.vue'
export default {
  components: { ParkData, AnnualIncome, Quickaccess, globelTabel, globelPage },
  filters: {},

  data() {
    return {
      Parkdata: {},
      tabelList: {
        tableData: [],
        isIndex: true,
        tabelInfo: [
          {
            prop: 'enterpriseName',
            label: '企业名称',
            width: '200px'
          },
          {
            prop: 'buildingName',
            label: '租赁楼宇'
          },
          {
            prop: 'startTime',
            label: '租赁时间'
          },
          {
            label: '操作',
            name1: '续签',
            name2: '退租'
          }
        ],
        tabelEvent: {

          renewEvent: (row) => {
            console.log(row)
          },

          SurrenderEvent: (row) => {
            console.log(row)
          }

        }
      },
      layout: 'total,prev, pager, next, sizes ',
      pageInfo: {
        page: 1,
        pageSize: 10,
        total: 1
      }
    }
  },
  created() {
    this.getParkdata()
    this.getRentInfo()
  },

  methods: {
    async getParkdata() {
      const { data } = await getParkdataApi()
      this.Parkdata = data
      this.$nextTick(() => {})
      this.$refs['annual'].echartsBar(this.Parkdata.annualIncomeArray)
    },
    async getRentInfo() {
      const { data } = await getRentInfoApi(this.pageInfo)
      console.log(data)
      this.pageInfo.total = data.total
      this.tabelList.tableData = data.rows
    },
    handleCurrentChange(value) {
      console.log(value)
    },
    handleSizeChange(value) {
      console.log(value)
    }
  }
}
</script>
<style scoped lang="scss">
.main{
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3,366px);
  grid-column-gap:20px ;
  grid-row-gap:20px ;
  .Parkdata{
    grid-column: span 2;
    background-color: #fff;
    height: 153px;

  }
  .Quickaccess{
    grid-column:span 1 ;
    height: 153px;
  }
  .AnnualIncome{
    grid-column: span 2;
    height: 382px;
  }
  .Devicealarm{
    grid-column:span 1 ;
    background-color: pink;
    height: 300px;
    .svg-icon{
      width: 100%;
      height: 70%;
    }
    .SeeMore{
      width: 100%;
    }
  }
  .contract{
    grid-column: span 2;

  }
  .father{
    padding: 20px;
    background-color: #fff;
  }
  .title{
      font-size: 14px;
      margin: 0;
      margin-bottom: 10px;
    }
}

</style>
