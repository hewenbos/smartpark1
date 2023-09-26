<template>
  <div class="RuleArea">
    <div class="main">
      <p>
        <el-button size="small" type="primary" @click="renewEvent">添加停车计费规则</el-button>
      </p>
      <globelTabel :tabel-list="tabelList" />
      <globelPage :page-info="pageInfo" :layout="layout" @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange" />
      <ParkingRuleAddAndEdit ref="ParkingRuleAddAndEdit" :dialog-visible.sync="dialogVisible" :title="title" @updateParkingArea="getParkingRuleList" />
    </div>
  </div>

</template>

<script>

import globelTabel from '@/components/globelTabel.vue'
import globelPage from '@/components/globelPage.vue'
import { getParkingRuleListApi, getDelParkingRuleApi } from '@/api/parking'
import ParkingRuleAddAndEdit from './components/ParkingRuleAddAndEdit.vue'
import { MixinMessageBox } from '@/composable/index'

export default {
  components: { globelTabel, globelPage, ParkingRuleAddAndEdit },
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
            prop: 'ruleNumber',
            label: '计费规则编号'
          },
          {
            prop: 'ruleName',
            label: '计费规则名称'
          },
          {
            prop: 'freeDuration',
            label: '免费时长（分钟）',
            width: '150px'
          },
          {
            prop: 'chargeCeiling',
            label: '收费上限（元）'
          },
          {
            prop: 'chargeType',
            label: '计费方式'
          },
          {
            prop: 'ruleNameView',
            label: '计费规则',
            width: '300px'
          },
          {
            label: '操作',
            name3: '编辑',
            name4: '删除'
          }

        ],
        tabelEvent: {
          renewEvent: (row) => {
            this.renewEvent(row)
          },
          SurrenderEvent: (row) => {
            this.delParking(row)
          }
        }
      },
      selectList: [
        { name: '未缴纳', value: '0' },
        { name: '已缴纳', value: '1' }
      ],
      dialogVisible: false,
      title: ''
    }
  },
  computed: {},
  watch: {},
  created() {
    this.getParkingRuleList()
  },
  mounted() {},
  methods: {
    handleSizeChange(value) {
      this.pageInfo.page = 1
      this.pageInfo.pageSize = value
      this.getParkingRuleList()
    },
    handleCurrentChange(value) {
      this.pageInfo.page = value
      this.getParkingRuleList()
    },
    async getParkingRuleList() {
      const { data } = await getParkingRuleListApi({ ...this.pageInfo })
      console.log(data)
      this.pageInfo.total = data.total
      this.tabelList.tableData = data.rows
    },
    // 删除
    async  delParking(row) {
      await MixinMessageBox(row.id, getDelParkingRuleApi)
      this.getParkingRuleList()
    },
    // 查看
    renewEvent(row) {
      this.dialogVisible = true
      if (row.id) {
        // 编辑
        this.title = '编辑规则'
        this.$refs['ParkingRuleAddAndEdit'].edithandel(row)
      } else {
        this.title = '添加规则'
        this.$refs['ParkingRuleAddAndEdit'].edithandel({})
      }
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
