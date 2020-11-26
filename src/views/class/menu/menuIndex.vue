<template>
  <div>
    <div class="vx-card p-3 mb-4">
      <div>
        <datepicker
          class="my-datepicker"
          :monday-first="true"
          :language="langVi"
          :format="formatDate"
          calendar-class="my-datepicker_calendar"
          :inline="true" v-model="inputQuery.date"
          @selected="dateSelected"
        ></datepicker>
      </div>
    </div>
    <div class="vx-row">
      <div class="vx-col w-1/2">
        <div class="vx-card p-3">
          <div class="row flex justify-between items-start">
            <h5 class="mb-4">Thực đơn</h5>
            <vs-button size="small" icon-pack="feather" icon="icon-plus">Thêm mới</vs-button>
          </div>
          <div class="vx-row pl-3 " v-for="(item, index) in menuLocal.menu" :key="index">
            <div class="flex justify-between items-center">
              <div class="vx-col">
                <vs-avatar size="50px" :src="item.image_url.path"/>
              </div>
              <div class="vx-col">
                <h6>Giờ: {{ item.time }}</h6>
                <h6>Món: {{ item.name }}</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="vx-col w-1/2">
        <div class="vx-card p-3">
          <div class="row flex justify-between items-start">
            <h5 class="mb-4">Lịch học</h5>
            <vs-button size="small" icon-pack="feather" icon="icon-plus">Thêm mới</vs-button>
          </div>
          <div class="vx-row pl-3">
            <kidbox-schedule-timeline :data="this.scheduleLocal.schedule"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Datepicker from 'vuejs-datepicker'
  import moduleMenu from '@/store/menu/menuStore.js'
  import moduleSchedule from '@/store/schedule/scheduleStore.js'
  import KidboxScheduleTimeline from '@/components/timeline/KidboxScheduleTimeline.vue'
  import { vi } from 'vuejs-datepicker/src/locale'
  export default {
    components: {
      Datepicker,
      KidboxScheduleTimeline
    },
    data () {
      return {
        langVi: vi,
        formatDate: 'yyyy-MM-dd',
        inputQuery: {
          classId: this.$route.params.classId,
          date: new Date()
        },
        menuLocal: [],
        scheduleLocal: []
      }
    },
    computed: {
    },
    methods: {
      dateSelected(event) {
        this.menuLocal = Object.assign({}, this.$store.getters['menu/getMenuInDate'](event))
        this.scheduleLocal = Object.assign({}, this.$store.getters['schedule/getScheduleByDate'](event))
      }
    },
    created() {
      this.$store.registerModule('menu', moduleMenu);
      this.$store.dispatch('menu/getMenuInWeekByDate', this.inputQuery);
      this.$store.registerModule('schedule', moduleSchedule);
      this.$store.dispatch('schedule/getScheduleInWeek', this.inputQuery);
    },
    beforeDestroy() {
      this.$store.unregisterModule('menu')
      this.$store.unregisterModule('schedule')
    }
  }
</script>

<style scoped>
  .my-datepicker >>> .my-datepicker_calendar {
    width: 100%;
  }
</style>

<style lang="scss">
  [dir] .vdp-datepicker .cell.day {
    border-radius: 0.5rem;
  }
</style>
