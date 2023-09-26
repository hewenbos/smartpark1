<template>

  <div ref="AnnualIncome" class="AnnualIncomes" />

</template>

<script>
import * as echarts from 'echarts'
export default {
  components: {},
  filters: {},
  data() {
    return {

    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
  },
  beforeUpdate() { },
  methods: {
    echartsBar(annualIncomeArray) {
      const chartDom = this.$refs['AnnualIncome']
      const myChart = echarts.init(chartDom)
      const option = {
        xAxis: {
          type: 'category',
          data: annualIncomeArray.xmonth.map(item => {
            return item
          })
        },
        tooltip: {
          trigger: 'axis',
          formatter: function(params) {
            return `
            <div>${params[0].axisValue}</div>
            <div>总收入: ${params[0].data + params[1].data}</div>
            <div>物业费: ${params[0].data}</div>
            <div>行车收费: ${params[1].data}</div>
                   `
          },
          show: true,
          axisPointer: {
            type: 'shadow'
          }
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: function(params) {
              return `${params * 2}`
            }
          }
        },
        grid: {
          left: '10px',
          top: '40px',
          bottom: '10px',
          right: '10px',

          containLabel: true
        },
        legend: {
          show: true,
          data: ['物业费', '行车收费']
        },
        series: [
          {
            data: annualIncomeArray.ybuilding.map(item => item),
            type: 'bar',
            barWidth: 10,
            name: '物业费',
            tooltip: {
              valueFormatter: function(value) {
                return value + ' ml'
              }
            },
            color: 'blue',
            stack: 'x'
            // color: 'rgba(0,0,0,0)'
          },
          {
            data: annualIncomeArray.yparking.map(item => item),
            type: 'bar',
            barWidth: 10,
            name: '行车收费',
            tooltip: {
              valueFormatter: function(value) {
                return value + ' ml'
              }
            },
            color: '#ccc',
            barGap: '-100%',
            stack: 'x'
          }
        ]
      }
      myChart && myChart.setOption(option)
    }
  }
}
</script>

<style lang="scss" scoped>
.AnnualIncomes{
  width: 100%;
  height: 90%;
}
</style>
