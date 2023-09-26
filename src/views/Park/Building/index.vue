<template>
  <div class="building-container">
    <div class="main">
      <div class="search">
        <el-form ref="form" :model="form" inline label-width="80px">
          <el-form-item label="楼宇名称">
            <el-input v-model="form.name" size="small" placeholder="请输入楼宇名称" />
          </el-form-item>
          <el-form-item>
            <el-button size="small " type="primary" @click="searchBuding">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="addBtn">
        <el-button size="small" type="primary" @click="addOrEdit">添加楼宇</el-button>
      </div>

      <globelTabel :tabel-list="tabelList" />
      <globelPage :layout="layout" :page-info="pageInfo" @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange" />
      <BudingAddOrEditPopUp ref="BudingAddOrEditPopUp" :dialog-visible.sync="dialogVisible" :title="title" @updateBuding="getParkBuding" />
    </div>
  </div>
</template>

<script>
import { getParkBudingApi, getDelParkBudingApi } from '@/api/buding'
import globelTabel from '@/components/globelTabel.vue'
import globelPage from '@/components/globelPage.vue'
import BudingAddOrEditPopUp from './components/BudingAddOrEditPopUp.vue'
import { MixinMessageBox } from '@/composable/index'
export default {
  components: { globelTabel, globelPage, BudingAddOrEditPopUp },
  data() {
    return {
      form: {
        name: ''
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
            prop: 'name',
            label: '楼宇名称',
            width: '150px'
          },
          {
            prop: 'floors',
            label: '层数'
          },
          {
            prop: 'area',
            label: '在管面积(m²)'
          },
          {
            prop: 'propertyFeePrice',
            label: '物业费(元/m²)'
          },
          {
            prop: 'status',
            label: '状态'
          },
          {
            label: '操作',
            name3: '编辑',
            name4: '删除'
          }
        ],
        tabelEvent: {
          renewEvent: (row) => {
            this.addOrEdit(row)
          },
          SurrenderEvent: (row) => {
            this.delBuding(row)
          }
        }
      },
      dialogVisible: false,
      title: ''
    }
  },
  created() {
    this.getParkBuding()
  },
  methods: {
    async getParkBuding() {
      const { data } = await getParkBudingApi({ ...this.pageInfo, ...this.form })
      console.log(data)
      this.pageInfo.total = data.total
      this.tabelList.tableData = data.rows
    },

    handleSizeChange(value) {
      this.pageInfo.pageSize = value
      this.pageInfo.page = 1
      this.getParkBuding()
    },
    handleCurrentChange(value) {
      this.pageInfo.page = value
      this.getParkBuding()
    },
    // 添加或修改
    addOrEdit(rows) {
      this.dialogVisible = true
      if (rows.id) {
        this.title = '编辑楼宇'
        this.$refs['BudingAddOrEditPopUp'].edithandel(rows)
      } else {
        this.title = '添加楼宇'
        this.$refs['BudingAddOrEditPopUp'].edithandel({})
      }
    },
    // 删除
    async delBuding(rows) {
      await MixinMessageBox(rows.id, getDelParkBudingApi)
      this.getParkBuding()
    },
    // 查询
    searchBuding() {
      this.pageInfo.page = 1
      this.getParkBuding()
    }
  }
}
</script>

<style lang="scss" scoped>
.building-container{
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
