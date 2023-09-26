<template>
  <div class="CarArea">
    <div class="main">
      <el-button class="addBtn" type="primary" size="small" @click="AddOrEdit">添加区域</el-button>

      <globelTabel :tabel-list="tabelList" />
      <globelPage :page-info="pageInfo" :layout="layout" @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange" />
      <ParkingAreaAddOrEditPopUp ref="ParkingAreaAddOrEditPopUp" :dialog-visible.sync="dialogVisible" :title="title" @updateParkingArea="getParkingArea" />
    </div>

  </div>
</template>

<script>
import globelTabel from '@/components/globelTabel.vue'
import globelPage from '@/components/globelPage.vue'
import ParkingAreaAddOrEditPopUp from './component/ParkingAreaAddOrEditPopUp.vue'
import { MixinMessageBox } from '@/composable/index'
import { getParkingAreaApi, getDelParkingApi } from '@/api/parking'
export default {
  components: { globelTabel, globelPage, ParkingAreaAddOrEditPopUp },
  filters: {},
  data() {
    return {
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
            prop: 'areaName',
            label: '区域名称',
            width: '150px'
          },
          {
            prop: 'spaceNumber',
            label: '车位数'
          },
          {
            prop: 'remark',
            label: '面积(m²)'
          },
          {
            prop: 'ruleName',
            label: '计费规则'
          },
          {
            prop: 'areaProportion',
            label: '备注'
          },
          {
            label: '操作',
            name1: '编辑',
            name2: '删除'
          }
        ],
        tabelEvent: {
          renewEvent: (row) => {
            this.AddOrEdit(row)
          },
          SurrenderEvent: (row) => {
            this.delParking(row)
          }
        }
      },
      dialogVisible: false,
      title: ''
    }
  },
  computed: {},
  watch: {},
  created() {
    this.getParkingArea()
  },
  mounted() {},
  methods: {
    async getParkingArea() {
      const { data } = await getParkingAreaApi(this.pageInfo)
      this.pageInfo.total = data.total
      this.tabelList.tableData = data.rows
    },
    handleCurrentChange(value) {
      this.pageInfo.page = value
      this.getParkingArea()
    },
    handleSizeChange(value) {
      this.pageInfo.page = 1
      this.pageInfo.pageSize = value
      this.getParkingArea()
    },
    AddOrEdit(row) {
      if (row.id) {
        // 编辑
        this.title = '编辑区域'
        this.$refs['ParkingAreaAddOrEditPopUp'].edithandel(row)
      } else {
        // 添加
        this.title = '添加区域'
        this.$refs['ParkingAreaAddOrEditPopUp'].edithandel({})
      }
      this.dialogVisible = true
    },
    async delParking(row) {
      await MixinMessageBox(row.id, getDelParkingApi)
      this.getParkingArea()
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
  }
}
</style>
