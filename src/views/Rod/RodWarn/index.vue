<template>
  <div class="Rod">
    <div class="main">
      <gloabelFrom :select-list="selectList" @search="search" />
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
import gloabelFrom from '@/components/gloabelFrom.vue'
import globelTabel from '@/components/globelTabel.vue'
import globelPage from '@/components/globelPage.vue'
import { MixinMessageBox } from '@/composable/index'
import { getPoleWaringApi, getDelPoleApi } from '@/api/poleinfo'
export default {
  components: { gloabelFrom, globelTabel, globelPage },
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
            prop: 'errorType',
            label: '故障类型'
          },
          {
            prop: 'handleStatus',
            label: '处置状态'
          },
          {
            prop: 'warningTime',
            label: '告警时间'
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
      },
      selectList: [
        {
          name: '全部',
          value: ''
        },
        {
          name: '未派单',
          value: '0'
        },
        {
          name: '已派单',
          value: '1'
        },
        {
          name: '已接单',
          value: '2'
        },
        {
          name: '已完成',
          value: '3'
        }
      ]
    }
  },
  computed: {},
  watch: {},
  created() {
    this.getPoleWaring()
  },
  mounted() { },
  methods: {
    handleSizeChange(value) {
      this.pageInfo.page = 1
      this.pageInfo.pageSize = value
      this.getPoleWaring()
    },
    handleCurrentChange(value) {
      this.pageInfo.page = value
      this.getPoleWaring()
    },
    search(from) {
      this.getPoleWaring(from)
    },
    async getPoleWaring(from) {
      const { data } = await getPoleWaringApi({ ...from, ...this.pageInfo })
      this.tabelList.tableData = data.rows
      this.pageInfo.total = data.total
    },
    // 删除
    async delBuding(row) {
      await MixinMessageBox(row.id, getDelPoleApi)
      // this.getPoleWaring()
    },
    // 查看详情
    renewEvent(row) {
      this.$router.push('/warn/detail/' + row.id)
    }
  }
}
</script>

<style lang="scss" scoped>
.Rod {
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
  }
}
</style>
