<template>
  <div>
    <vx-card title="Thể chất" class="mt-base">
      <template slot="actions">
        <vs-dropdown class="button-height" vs-trigger-click>
          <a class="flex self-start" href="#">
            <feather-icon icon="MoreHorizontalIcon"></feather-icon>
          </a>
          <vs-dropdown-menu>
            <vs-dropdown-item @click="displayHealthPrompt">Cập nhật thông tin</vs-dropdown-item>
          </vs-dropdown-menu>
        </vs-dropdown>
      </template>
      <div class="flex" v-if="Physical">
        <vx-card title="Cân nặng" class="m-base">
          <template slot="actions">
            <h4 class="text-danger" >{{ Physical.weight.old_date | templateDate }}</h4>
          </template>
          <div class="flex justify-around">
            <h2 class="text-danger mr-2">{{ Physical.weight.data }} Kg</h2>
            <feather-icon icon="ArrowUpIcon" v-if="Physical.weight.develope === 'INCREASE'" svgClasses="text-success w-10 h-10"></feather-icon>
            <feather-icon icon="ArrowDownIcon" v-if="Physical.weight.develope === 'DECREASE'" svgClasses="text-danger w-10 h-10"></feather-icon>
            <feather-icon icon="CircleIcon" v-if="Physical.weight.develope === 'BALANCE'" svgClasses="w-10 h-10"></feather-icon>
          </div>
        </vx-card>
        <vx-card title="Chiều cao" class="m-base">
          <template slot="actions">
            <h4 class="text-danger mr-2">{{ Physical.height.old_date | templateDate }}</h4>
          </template>
          <div class="flex justify-around">
            <h2 class="text-danger">{{ Physical.height.data }} Cm</h2>
            <feather-icon icon="ArrowUpIcon" v-if="Physical.height.develope === 'INCREASE'" svgClasses="text-success w-10 h-10"></feather-icon>
            <feather-icon icon="ArrowDownIcon" v-if="Physical.height.develope === 'DECREASE'" svgClasses="text-danger w-10 h-10"></feather-icon>
            <feather-icon icon="CircleIcon" v-if="Physical.height.develope === 'BALANCE'" svgClasses="w-10 h-10"></feather-icon>
          </div>
        </vx-card>
      </div>
    </vx-card>
    <vx-card title="Quá trình phát triển" class="mt-base">
      <vue-apex-charts
        :type="chartType"
        height="450"
        :options="columnChart.chartOptions"
        :series="Series"
      ></vue-apex-charts>
    </vx-card>
    <health-update
      :childId="configLoadData.child_id"
      :childHealthPrompt="activeHealthPrompt"
      @hiddenHealthPrompt="hiddenHealthPrompt"/>
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
import HealthUpdate from "@/views/class/child/chart/HealthUpdate";

export default {
  name: "HealthChart",
  data () {
    return {
      configLoadData: {
        child_id: Number.parseInt(this.$route.params.childId),
        year: new Date().getFullYear().toString()
      },
      activeHealthPrompt: false,
      columnChart: {
        chartOptions: {
          colors: ['#FF7D59', '#2F80ED', '#EA5455', '#FF9F43', '#1E1E1E'],
          plotOptions: {
            bar: {
              horizontal: false,
              endingShape: 'rounded',
              columnWidth: '35%',
            },
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
          },
          xaxis: {
            categories: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
          },
          fill: {
            opacity: 0.9

          },
          tooltip: {
            y: {
              formatter: function(val) {
                return val
              }
            }
          }
        }
      }
    }
  },
  components: {
    VueApexCharts,
    HealthUpdate
  },
  methods: {
    displayHealthPrompt () {
      this.activeHealthPrompt = true;
    },
    hiddenHealthPrompt () {
      this.activeHealthPrompt = false;
    },
  },
  computed: {
    Series () {
      let weight = this.$store.getters['child/getWeightArr']
      let height = this.$store.getters['child/getHeightArr']
      return [weight, height]
    },
    Physical () {
      return this.$store.getters['child/getPhysical']
    },
    chartType () {
      return 'bar'
    }
  },
  created() {
    this.$store.dispatch('child/healthStatistics', this.configLoadData)
  }
}
</script>

<style scoped>

</style>
