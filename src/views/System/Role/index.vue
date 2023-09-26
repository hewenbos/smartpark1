<template>

  <div class="role-container">
    <div class="main">
      <div class="leftBox">
        <el-tooltip v-for="item,index in RuleList" :key="index" class="item" effect="dark" :content="item.remark ?item.remark:'none' " placement="top">
          <div class="list-item" :class="{active:active === index}" @click="activeStatus(index,item.roleId)">
            <div>
              <span class="el-icon-user" />
              <span class="name">{{ item.roleName }}</span>
            </div>
            <el-dropdown trigger="click" placement="bottom">
              <span class="el-dropdown-link">
                <span class="el-icon-more" />
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>编辑角色</el-dropdown-item>
                <el-dropdown-item class="del">删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-tooltip>

        <el-button class="btn">添加角色</el-button>
      </div>
      <div class="rightBox">
        <el-tabs v-model="activeName">
          <el-tab-pane label="功能权限" class="pane1" name="first"><TreeContent v-for="item,index in treeList" :key="index" :tree-list="item.children" :perms-list="permsList[index]" /></el-tab-pane>
          <el-tab-pane :label="`成员(${tabelList.tableData.length})`" name="second">
            <div class="tab">
              <globelTabel :tabel-list="tabelList" />
              <globelPage
                :page-info="pageInfo"
                :layout="layout"
                @handleSizeChange="handleSizeChange"
                @handleCurrentChange="handleCurrentChange"
              />
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import TreeContent from './componetns/TreeContent.vue'
import { getSearchRuleApi, getTreeEmployeeApi, getRoleSysApi, getRoleUserApi } from '@/api/employee'
import globelPage from '@/components/globelPage.vue'
import globelTabel from '@/components/globelTabel.vue'
export default {
  name: 'Role',
  components: { TreeContent, globelPage, globelTabel },
  data() {
    return {
      RuleList: [],
      active: 0,
      treeList: [],
      activeName: 'first',
      permsList: [],
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
            label: '员工姓名'
          },
          {
            prop: 'userName',
            label: '登录账号'
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
      ids: null
    }
  },
  watch: {

  },
  created() {
    this.getSearchRule()
    this.getTreeEmployee()
  },

  methods: {
    async getSearchRule() {
      const { data } = await getSearchRuleApi()
      this.RuleList = data
      this.ids = this.RuleList[0].roleId
      this.getRoleSys(this.ids)
      this.getRoleUser(this.ids)
    },
    async activeStatus(index, id) {
      this.active = index
      this.ids = id
      this.getRoleSys(this.ids)
      this.getRoleUser(this.ids)
    },
    async getTreeEmployee() {
      const { data } = await getTreeEmployeeApi()
      this.treeList = data
    },
    async getRoleSys(id) {
      const { data } = await getRoleSysApi(id)
      console.log(data)
      this.permsList = []
      this.permsList = data.perms
      console.log(this.permsList)
    },
    // 获取成员
    async getRoleUser(id) {
      const { data } = await getRoleUserApi({ ...this.pageInfo, id: this.ids })
      console.log(data)
      this.pageInfo.total = data.total
      this.tabelList.tableData = data.rows
    },
    handleSizeChange(value) {
      this.pageInfo.page = 1
      this.pageInfo.pageSize = value
      this.getRoleUser()
    },
    handleCurrentChange(value) {
      this.pageInfo.page = value
      this.getRoleUser()
    }
  }
}
</script>

<style scoped lang="scss">
.role-container {
  width: 100%;
  height: 100vh;
  padding-right: 15px;

  .main {
    background-color: #fff;
    width: 100%;
    // padding: 20px;
    display: flex;
    height: 100vh;
   .leftBox{
    width: 220px;
    padding: 5px;
    position: relative;
    padding-bottom: 40px;
    .list-item{
      width: 100%;
      height: 56px;
      display: flex;
      align-items: center;
      padding: 20px;
      cursor: pointer;
      justify-content: space-between;
      .name{
        font-size: 14px;
        margin-left: 10px;
      }
    }
    .list-item.active{

      background-color: #edf5ff;
      .el-icon-user{
        color: #4770ff;
      }
      .name{
        color: #4770ff;
      }
    }
    .btn{
      width: 94%;
      position: absolute;
      left: 50%;
      bottom: 0;

      transform: translate(-50%);

    }
   }
   .rightBox{
    flex: 1;
    border-left: 1px solid #e6e5e5;
   }
  }
}

::v-deep{
  .el-dropdown-menu__item:not(.is-disabled):hover, .el-dropdown-menu__item:focus{
    color: #f00;
    background-color: #fff;
  }
  .el-tabs__nav-scroll{
    padding: 0px 20px;
  }
  .el-tabs__header{
    height: 100%;
    margin: 0;
  }
  .pane1{
    display: flex;
    height: 100%;
  }
  .del{
    color: #f00;
  }
}

.tab{
  padding: 20px;
}
</style>
