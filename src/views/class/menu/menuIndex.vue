<template>
  <div id="simple-calendar-app">
    <div class="vx-card no-scroll-content">
      <calendar-view
        ref="calendar"
        :displayPeriodUom="calendarView"
        :show-date="showDate"
        :events="simpleEvents"
        :eventTop="windowWidth <= 400 ? '2rem' : '3rem'"
        :starting-day-of-week="startingDayOfWeek"
        eventBorderHeight="0px"
        eventContentHeight="1.65rem"
        class="theme-default"
        @click-date="openAddNewEvent"
        @click-event="openEditEvent"
        @drop-on-date="eventDragged">

        <div slot="header" class="mb-4">

          <div class="vx-row no-gutter">

            <!-- Month Name -->
            <div class="vx-col w-1/3 items-center sm:flex hidden">
              <!-- Add new event button -->
              <vs-button icon-pack="feather" icon="icon-plus" @click="promptAddNewEvent(new Date())">Add</vs-button>
            </div>

            <!-- Current Month -->
            <div class="vx-col sm:w-1/3 w-full sm:my-0 my-3 flex sm:justify-end justify-center order-last">
              <div class="flex items-center">
                <feather-icon
                  :icon="$vs.rtl ? 'ChevronRightIcon' : 'ChevronLeftIcon'"
                  @click="updateMonth(-1)"
                  svgClasses="w-5 h-5 m-1"
                  class="cursor-pointer bg-primary text-white rounded-full" />

                <span class="mx-3 text-xl font-medium whitespace-no-wrap">{{ showDate.toLocaleDateString("vi-Vi") }}</span>

                <feather-icon
                  :icon="$vs.rtl ? 'ChevronLeftIcon' : 'ChevronRightIcon'"
                  @click="updateMonth(1)"
                  svgClasses="w-5 h-5 m-1"
                  class="cursor-pointer bg-primary text-white rounded-full" />
              </div>
            </div>

            <div class="vx-col sm:w-1/3 w-full flex justify-center">
              <template v-for="(view, index) in calendarViewTypes">
                <vs-button
                  v-if="calendarView === view.val"
                  :key="String(view.val) + 'filled'"
                  type="filled"
                  class="p-3 md:px-8 md:py-3"
                  :class="{'border-l-0 rounded-l-none': index, 'rounded-r-none': calendarViewTypes.length !== index+1}"
                  @click="calendarView = view.val"
                >{{ view.label }}</vs-button>
                <vs-button
                  v-else
                  :key="String(view.val) + 'border'"
                  type="border"
                  class="p-3 md:px-8 md:py-3"
                  :class="{'border-l-0 rounded-l-none': index, 'rounded-r-none': calendarViewTypes.length !== index+1}"
                  @click="calendarView = view.val"
                >{{ view.label }}</vs-button>
              </template>

            </div>
          </div>
        </div>
      </calendar-view>


    </div>
  </div>
</template>

<script>
  import { CalendarView, CalendarViewHeader } from 'vue-simple-calendar'
  require('vue-simple-calendar/static/css/default.css')

  import Datepicker from 'vuejs-datepicker'
  import { vi } from 'vuejs-datepicker/src/locale'

  export default {
    components: {
      CalendarView,
      CalendarViewHeader,
      Datepicker
    },
    data () {
      return {
        showDate: new Date(),

        langVi: vi,
        calendarView: 'week',
        startingDayOfWeek: 1,
        eventList: [
          {
            classes: "event-success",
            endDate: "2020-11-23T07:51:53.874Z",
            id: 1,
            label: "business",
            startDate: "2020-11-23T07:51:53.874Z",
            title: "My Event ádjháljdládahgdflkagjhfdkjvbncm,bvnxìdghkjgnbv,mzxbvmcxvbkldfhjgksdjàbnmsdbxcmcnvbxcm,vbzlxvbdlkjfghkldfjghfdkjhj",
            url: ""
          },
        ],

        calendarViewTypes: [
          {
            label: 'Month',
            val: 'month'
          },
          {
            label: 'Week',
            val: 'week'
          }
        ]
      }
    },
    computed: {
      simpleEvents() {
        return this.eventList
      },
      windowWidth () {
        return this.$store.state.windowWidth
      }
    },
    methods: {
      addEvent () {
      },
      updateMonth (val) {
        this.showDate = this.$refs.calendar.getIncrementedPeriod(val)
      },
      clearFields () {
      },
      promptAddNewEvent (date) {
        this.disabledFrom = false
        this.addNewEventDialog(date)
      },
      addNewEventDialog (date) {
        this.clearFields()
        this.activePromptAddEvent = true
      },
      openAddNewEvent (date) {
        this.disabledFrom = true
        this.addNewEventDialog(date)
      },
      openEditEvent (event) {
      },
      editEvent () {
      },
      removeEvent () {
      },
      eventDragged (event, date) {
      }
    },
    created () {
    },
    beforeDestroy () {
    }
  }
</script>

<style lang="scss">
  @import "@/assets/scss/vuexy/apps/simple-calendar.scss";
</style>
