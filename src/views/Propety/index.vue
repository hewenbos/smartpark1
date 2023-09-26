<template>
  <div class="propety">
    <div class="main">
      <el-form inline :mode="from">
        <globelSearch v-model="from.enterpriseName" placeholder="请输入企业名称" label="企业名称" />
        <el-form-item>
          <el-date-picker
            v-model="from.data"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            size="small"
            value-format="yyyy-MM-dd"
          />
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary" @click="search">
            查询
          </el-button>
        </el-form-item>
      </el-form>

      <div class="addBtn">
        <el-button size="small" type="primary" @click="dialogVisible = true">添加账单</el-button>
      </div>

      <globelTabel :tabel-list="tabelList" />
      <globelPage :page-info="pageInfo" :layout="layout" @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange" />
      <PropetyPopUp :dialog-visible.sync="dialogVisible" @updateBuding="getProPety" />
      <lookRulePopUp ref="lookRulePopUp" :dialog-visible-look.sync="dialogVisibleLook" />
    </div>
  </div>

</template>
<script>
import globelSearch from '@/components/globelSearch.vue'
import globelTabel from '@/components/globelTabel.vue'
import globelPage from '@/components/globelPage.vue'
import { getProPetyApi, getDelPropetyApi } from '@/api/propety'
import PropetyPopUp from './components/PropetyPopUp.vue'
import { MixinMessageBox } from '@/composable/index'
import lookRulePopUp from './components/lookRulePopUp.vue'
import utils from '@/utils/utils'
export default {
  components: { globelSearch, globelTabel, globelPage, PropetyPopUp, lookRulePopUp },
  filters: {},
  data() {
    return {
      from: {
        enterpriseName: '',
        start: '',
        end: '',
        data: []
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
            prop: 'billNumber',
            label: '账单编号',
            width: '150px'
          },
          {
            prop: 'enterpriseName',
            label: '企业名称',
            width: '200px'
          },
          {
            prop: 'buildingName',
            label: '租聘楼宇'
          },
          {
            prop: 'propertyFeePrice',
            label: '物业费(元/m²)'
          },
          {
            prop: 'paymentAmount',
            label: '账单金额(元)'
          },
          {
            prop: 'startTime',
            label: '缴费时间'
          },
          {
            label: '操作',
            name2: '查看',
            name4: '删除'
          }
        ],
        tabelEvent: {
          lookEvent: (row) => {
            this.lookEvent(row)
          },
          SurrenderEvent: (row) => {
            this.delBuding(row)
          }
        }
      },
      dialogVisible: false,
      dialogVisibleLook: false
    }
  },
  computed: {},
  watch: {},
  created() {
    this.getProPety()
  },
  mounted() {},
  methods: {
    handleSizeChange(value) {
      this.pageInfo.page = 1
      this.pageInfo.pageSize = value
      this.getProPety()
    },
    handleCurrentChange(value) {
      this.pageInfo.page = value
      this.getProPety()
    },
    async getProPety() {
      const { data } = await getProPetyApi({ ...this.pageInfo, ...this.from })

      this.tabelList.tableData = data.rows
      this.pageInfo.total = data.total
    },
    // 搜索
    search() {
      if (this.from.data.length === 2) {
        this.from.start = this.from.data[0]
        this.from.end = this.from.data[1]
      } else {
        utils.ErrorEvent('请选择日期')
      }

      delete this.from.data

      this.getProPety()
    },
    // 删除
    async delBuding(row) {
      await MixinMessageBox(row.id, getDelPropetyApi)
      this.getProPety()
    },
    lookEvent(row) {
      this.dialogVisibleLook = true
      this.$refs['lookRulePopUp'].getLookDetailPropety(row.id)
    }

  }
}
</script>

<style lang="scss" scoped>
.propety{
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
