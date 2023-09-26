<template>
  <el-table
    :data="tabelList.tableData"
    style="width: 100%"
    @selection-change="handleSelectionChange"
  >
    <el-table-column
      v-if="tabelList.isFlag"
      type="selection"
      width="55"
    />
    <el-table-column v-if="tabelList.isIndex" width="50px" label="序号">
      <template slot-scope="scope">
        {{ scope.$index +1 }}
      </template>
    </el-table-column>
    <el-table-column
      v-for="item,index in tabelList.tabelInfo"
      :key="index"
      :prop="item.prop"
      :label="item.label"
      :width="item.width"
    >

      <template slot-scope="scope">

        <div v-if="item.label == '操作'">
          <el-button v-if="item.name1 " :disabled="scope.row['handleStatus'] === 1 || scope.row['handleStatus'] === 3" type="text" @click="tabelList.tabelEvent.cartEvent(scope.row)">{{ item.name1 }}</el-button>
          <el-button v-if="item.name2 " type="text" @click="tabelList.tabelEvent.lookEvent(scope.row)">{{ item.name2 }}</el-button>
          <el-button type="text" @click="tabelList.tabelEvent.renewEvent(scope.row)">{{ item.name3 }}</el-button>
          <el-button type="text" :disabled="scope.row['handleStatus']=== 1" @click="tabelList.tabelEvent.SurrenderEvent(scope.row)">{{ item.name4 }}</el-button>
        </div>

        <div v-else>
          <div v-if="item.prop === 'status'">
            {{ scope.row['status'] === 0 ? '空置中':'已出租' }}
          </div>
          <div
            v-else-if="item.prop === 'cardStatus'"
          >
            {{ scope.row['cardStatus'] === 0 ? '可用':'不可用' }}
          </div>
          <div v-else-if="item.prop === 'cardStartDate'">
            {{ `${scope.row['cardStartDate']}至${scope.row['cardEndDate']}` }}
          </div>
          <div v-else-if="item.prop === 'paymentMethod'">

            {{ scope.row['paymentMethod'] === null ? '--':{Alipay:'支付宝',WeChat:'微信',Cash:'线下'}[scope.row['paymentMethod']] }}
          </div>

          <div v-else-if="item.prop === 'paymentStatus'">
            {{ scope.row['paymentStatus'] === 1 ? '已缴纳':'未缴纳' }}
          </div>
          <div v-else-if="item.prop === 'chargeType'">
            {{ {card:'月卡',temp:'临时停车',duration:'时长收费',turn:'按次收费',partition:'分段收费'}[scope.row['chargeType']] }}
          </div>
          <div v-else-if="item.prop === 'chargeCeiling'">
            {{ scope.row['chargeCeiling'] === null ? '--':scope.row['chargeCeiling'] }}
          </div>
          <div v-else-if="item.prop === 'poleType'">
            {{ {entrance:'入口',export:'出口',center:''}[scope.row['poleType']] }}
          </div>
          <div v-else-if="item.prop === 'poleStatus'">
            {{ ['正常','异常'][scope.row['poleStatus']] }}
          </div>
          <div v-else-if="item.prop === 'handleStatus'">
            {{ ['','已派单','','已完成','' ][scope.row['handleStatus']] }}
          </div>
          <div v-else-if="item.prop === 'status' && item.prop ==='roleName'">{{ ['未启用','启用'][scope.row[status]] }}</div>
          <div v-else>
            {{ scope.row[item.prop] }}
          </div>
        </div>

      </template>

    </el-table-column>

  </el-table>

</template>

<script>
export default {
  components: {},
  filters: {},
  props: {
    tabelList: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {

    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    handleSelectionChange(e) {
      const data = e.map(item => item.id)
      console.log(data)
      this.$emit('handleSelectionChange', data)
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep th.el-table__cell{
    background-color: #f4f6f8;
    font-weight: 500;
    font-size: 14px;
    color: #333;
  }

</style>
