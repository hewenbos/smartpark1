<template>
  <div class="park">
    <div class="list-items">
      <p>年度累计收费（元）</p>
      <span>{{ ParkData.annualIncome ? ParkData.annualIncome:'--' }}</span>
    </div>
    <div class="list-items">
      <p>入驻企业总数（个）</p>
      <span>{{ ParkData.enterpriseTotal ? ParkData.enterpriseTotal: '--' }}</span>
    </div>
    <div class="list-items">
      <p>月卡车辆总数（辆）</p>
      <span>{{ ParkData.monthCardTotal ? ParkData.monthCardTotal:'--' }}</span>
    </div>
    <div class="list-items">
      <p>一体杆总数（台）</p>
      <span>{{ ParkData.chargePoleTotal ? ParkData.chargePoleTotal:'--' }}</span>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  filters: {},
  props: {
    ParkData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      park: {}
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.park{
  display:flex;
  align-items:center;
  justify-content: space-between;
  .list-items{

    p{
      color:var(--park-color);
      font-size:14px;
    }
    span{

      color:var(--park-color1);
      font-size: 24px;
      font-weight:500 ;
    }
  }
}
</style>
