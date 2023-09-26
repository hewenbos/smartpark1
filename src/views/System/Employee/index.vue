<template>
  <div class="employee">
    <div class="main">
      <el-form inline :mode="form">
        <globelSearch v-model="form.name" label="员工姓名" placeholder="请输入员工姓名" />
        <el-form-item>
          <el-button type="primary" size="small" @click="search">查询</el-button>
        </el-form-item>
      </el-form>

      <div class="addBtn">
        <el-button type="primary" size="small" @click="addoredit">添加员工</el-button>
      </div>

      <globelTabel :tabel-list="tabelList" />
      <globelPage
        :page-info="pageInfo"
        :layout="layout"
        @handleSizeChange="handleSizeChange"
        @handleCurrentChange="handleCurrentChange"
      />
      <EmployeeAddOrEditPopUp ref="EmployeeAddOrEditPopUp" :dialog-visible.sync="dialogVisible" :title="title" @updateBuding="getEmployee" />
    </div>
  </div>

</template>

<script>
import globelSearch from '@/components/globelSearch.vue'
import globelTabel from '@/components/globelTabel.vue'
import globelPage from '@/components/globelPage.vue'
import { getEmployeeApi, getDEmployeeApi, getCancelEmployeeApi } from '@/api/employee'
import { MixinMessageBox, MixinCancel } from '@/composable/index'
import EmployeeAddOrEditPopUp from './components/EmployeeAddOrEditPopUp.vue'
export default {
  name: 'Employee',
  components: { globelSearch, globelTabel, globelPage, EmployeeAddOrEditPopUp },
  data() {
    return {
      form: {},
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
            label: '员工姓名',
            width: '150px'
          },
          {
            prop: 'userName',
            label: '登录账号'
          },
          {
            prop: 'phonenumber',
            label: '联系方式'
          },
          {
            prop: 'roleName',
            label: '角色'
          },
          {
            prop: 'status',
            label: '状态'
          },
          {
            prop: 'createTime',
            label: '添加时间',
            width: '150px'
          },
          {
            label: '操作',
            name1: '编辑',
            name3: '删除',
            name4: '重置密码',
            width: '180px'
          }
        ],
        tabelEvent: {
          renewEvent: (row) => {
            this.delBuding(row)
          },
          SurrenderEvent: (row) => {
            this.canel(row)
          },
          cartEvent: (row) => {
            this.addoredit(row)
          }
        }
      },
      dialogVisible: false,
      title: ''
    }
  },
  created() {
    this.getEmployee()
  },
  methods: {
    handleSizeChange(value) {
      this.pageInfo.page = 1
      this.pageInfo.pageSize = value
      this.getEmployee()
    },
    handleCurrentChange(value) {
      this.pageInfo.page = value
      this.getEmployee()
    },
    async getEmployee() {
      const { data } = await getEmployeeApi({ ...this.pageInfo, ...this.form })
      this.pageInfo.total = data.total
      this.tabelList.tableData = data.rows
    },
    // 搜索
    search() {
      this.getEmployee()
    },
    // 删除
    async delBuding(row) {
      await MixinMessageBox(row.id, getDEmployeeApi)
      this.getEmployee()
    },
    // 重置密码
    async  canel(row) {
      await MixinCancel(row.id, getCancelEmployeeApi)
    },
    // 添加或编辑
    addoredit(row) {
      if (row.id) {
        this.title = '编辑员工'
        this.dialogVisible = true
        this.$refs['EmployeeAddOrEditPopUp'].edithandel(row)
      } else {
        this.title = '添加员工'
        this.dialogVisible = true
      }
    },
    edit() {
      console.log(111)
    }
  }
}
</script>

<style lang="scss" scoped>
.employee {
  width: 100%;
  height: 100%;
  padding-right: 15px;

  .main {
    background-color: #fff;
    width: 100%;
    padding: 20px;

    .search {
      border-bottom: 1px solid #ececec;
    }

    .addBtn {
      margin: 10px 0;
    }
    .el-form{
      border-bottom: 1px solid #e5e4e4;
    }
  }
}
</style>
