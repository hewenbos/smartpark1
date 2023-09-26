<template>
  <div class="Rod">
    <div class="main">
      <gloabelFrom :select-list="selectList" @search="search" />
      <div class="addBtn">
        <el-button type="primary" size="small" @click="renewEvent">添加一体杆</el-button>
        <el-button type="default" size="small" @click="delPole">批量删除</el-button>
      </div>

      <globelTabel :tabel-list="tabelList" @handleSelectionChange="handleSelectionChange" />
      <globelPage :page-info="pageInfo" :layout="layout" @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange" />
      <PoleAddAndEditPopUp ref="PoleAddAndEditPopUps" :dialog-visible.sync="dialogVisible" :title="title" @updateBuding="getPoleInfoList" />
    </div>
  </div>

</template>

<script>

import globelTabel from '@/components/globelTabel.vue'
import globelPage from '@/components/globelPage.vue'
import { getPoleInfoListApi, getDelPoleInfoApi } from '@/api/poleinfo'
import { MixinMessageBox } from '@/composable/index'
import PoleAddAndEditPopUp from './components/PoleAddAndEditPopUp.vue'
import gloabelFrom from '@/components/gloabelFrom.vue'
export default {
  components: { globelTabel, globelPage, PoleAddAndEditPopUp, gloabelFrom },
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
        isFlag: true,
        tabelInfo: [
          {
            prop: 'poleName',
            label: '一体杆名称',
            width: '150px'
          },
          {
            prop: 'poleNumber',
            label: '一体杆编号',
            width: '200px'
          },
          {
            prop: 'poleIp',
            label: '一体杆IP'
          },
          {
            prop: 'areaName',
            label: '安装区域'
          },
          {
            prop: 'poleType',
            label: '一体杆类型'
          },
          {
            prop: 'poleStatus',
            label: '运行状态'
          },
          {
            label: '操作',
            name2: '详情',
            name4: '删除'
          }
        ],
        tabelEvent: {
          lookEvent: (row) => {
            this.renewEvent(row)
          },
          SurrenderEvent: (row) => {
            this.delBuding(row)
          }
        }
      },
      dellist: [],
      dialogVisible: false,
      title: '',
      selectList: [
        {
          name: '全部',
          value: ''
        },
        {
          name: '正常',
          value: '0'
        },
        {
          name: '异常',
          value: '1'
        }
      ]
    }
  },
  computed: {},
  watch: {},
  created() {
    this.getPoleInfoList()
  },
  mounted() {},
  methods: {
    handleSizeChange(value) {
      this.pageInfo.page = 1
      this.pageInfo.pageSize = value
      this.getPoleInfoList()
    },
    handleCurrentChange(value) {
      this.pageInfo.page = value
      this.getPoleInfoList()
    },
    async getPoleInfoList(from) {
      const { data } = await getPoleInfoListApi({ ...this.pageInfo, ...from })
      console.log(data.rows)
      this.tabelList.tableData = data.rows
      this.pageInfo.total = data.total
    },
    search(from) {
      this.pageInfo.page = 1
      this.getPoleInfoList(from)
    },
    handleSelectionChange(data) {
      console.log(data)
      this.dellist = data
    },
    async delPole() {
      await MixinMessageBox(this.dellist, getDelPoleInfoApi)
      this.getPoleInfoList()
    },
    async delBuding(row) {
      await MixinMessageBox(row.id, getDelPoleInfoApi)
      this.getPoleInfoList()
    },
    renewEvent(row) {
      this.dialogVisible = true
      if (row.id) {
        this.title = '编辑一体杆'
        this.$refs['PoleAddAndEditPopUps'].edithandel(row)
      } else {
        this.title = '添加一体杆'
        this.$refs['PoleAddAndEditPopUps'].edithandel({})
      }
    }
  }
}
</script>

<style lang="scss" scoped>

.Rod{
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
