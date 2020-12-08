<template>
  <div>
    <div class="vx-card p-3 mb-4 flex">
      <v-select class="mr-3 flex-1" :options="optionsSelect"  :dir="$vs.rtl ? 'rtl' : 'ltr'" />
      <datepicker
        :monday-first="true"
        :language="datePickerConfig.langVi"
        :format="datePickerConfig.formatDate"
        :disabled-dates="datePickerConfig.disabledDates"
        calendar-class="my-datepicker_calendar"
        v-model="inputQuery.date"
        @selected="dateSelected"
        class="mr-3 flex-1" />
    </div>
    <div class="vx-card p-3 mb-4">
      <p>Content</p>
    </div>
  </div>
</template>

<script>
  import Datepicker from 'vuejs-datepicker'
  import vSelect from 'vue-select'
  import moduleMenu from '@/store/menu/menuStore.js'
  import KidboxScheduleTimeline from '@/components/timeline/KidboxScheduleTimeline.vue'
  import { vi } from 'vuejs-datepicker/src/locale'
  export default {
    components: {
      Datepicker,
      'v-select' : vSelect,
      KidboxScheduleTimeline
    },
    data () {
      return {
        datePickerConfig: {
          langVi: vi,
          formatDate: 'yyyy-MM-dd',
          disabledDates: {
            days: [7,0]
          },
        },
        inputQuery: {
          classId: this.$route.query.c,
          date: new Date()
        },
        optionsSelect: [
          'class 1', 'class 2'
        ],
        menuLocal: [],
        scheduleLocal: []
      }
    },
    computed: {
    },
    methods: {
      dateSelected(event) {
        console.log(event.toISOString())
        this.inputQuery.date = event
        this.$store.dispatch('menu/getMenuByDate', this.inputQuery)
      }
    },
    created() {
      this.$store.registerModule('menu', moduleMenu);
      this.$store.dispatch('menu/getMenuByDate', this.inputQuery);
    },
    beforeDestroy() {
      this.$store.unregisterModule('menu')
    }
  }
</script>
