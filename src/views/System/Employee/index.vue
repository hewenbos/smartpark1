<template>
  <div class="employee">
    <div class="main">
      <el-form inline :mode="form">
        <globelSearch v-model="form.name" label="员工姓名" placeholder="请输入员工姓名" />
        <el-form-item>
          <el-button type="primary" size="small">查询</el-button>
        </el-form-item>
      </el-form>

      <div class="addBtn">
        <el-button type="primary" size="small">添加员工</el-button>
      </div>

      <globelTabel :tabel-list="tabelList" />
      <globelPage
        :page-info="pageInfo"
        :layout="layout"
        @handleSizeChange="handleSizeChange"
        @handleCurrentChange="handleCurrentChange"
      />
    </div>
  </div>

</template>

<script>
import globelSearch from '@/components/globelSearch.vue'
import globelTabel from '@/components/globelTabel.vue'
import globelPage from '@/components/globelPage.vue'
import { getEmployeeApi } from '@/api/employee'
export default {
  name: 'Employee',
  components: { globelSearch, globelTabel, globelPage },
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
            label: '登录账号',
            width: '200px'
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
            label: '添加时间'
          },
          {
            label: '操作',
            name1: '派单',
            name3: '详情',
            name4: '删除'
          }
        ],
        tabelEvent: {
          renewEvent: (row) => {
            this.renewEvent(row)
          },
          SurrenderEvent: (row) => {
            this.delBuding(row)
          }
        }
      }
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
