<template>
  <div>
    <div class="vx-card p-3 mb-4 flex">
      <div class="flex-1">
        <label>Chọn trường</label>
        <v-select class="mr-3" label="name" :options="optionsSelectSchool" @input="schoolSelected" :v-model="inputQuery.schoolId" :dir="$vs.rtl ? 'rtl' : 'ltr'" />
      </div>
      <div class="flex-1">
        <label>Chọn lớp</label>
        <v-select class="mr-3" label="name" :disabled="classPickerCheck" :options="optionsSelectClass" @input="classSelected" :v-model="inputQuery.classId" :dir="$vs.rtl ? 'rtl' : 'ltr'" />
      </div>
      <div class="flex-1">
        <label>Chọn ngày</label>
        <datepicker
          :monday-first="true"
          :language="datePickerConfig.langVi"
          :format="datePickerConfig.formatDate"
          :disabled-dates="datePickerConfig.disabledDates"
          calendar-class="my-datepicker_calendar"
          v-model="inputQuery.date"
          @selected="dateSelected"
          :disabled="datePickerCheck"
          class="mr-3" />
      </div>
    </div>
    <div class="vx-card p-3 mb-4">
      <template v-if="menuLocal.menu">
        <div class="pl-3 pr-3 ">
          <div class="pl-3 pr-3 flex">
            <p class="flex-grow">Thực đơn ngày {{ inputQuery.date.toISOString().split('T')[0] }}</p>
            <div class="flex-none" v-if="action.canAction">
              <vs-button class="small">Sửa thực đơn</vs-button>
            </div>
          </div>
          <div class="pl-3 pr-3 flex flex-grow items-center" v-for="item in menuLocal.menu" :key="item.id">
            <div>
              <vs-avatar size="large" :src="item.image_url.path"/>
            </div>
            <div>
              <p>{{ item.name }}</p>
              <p>{{ item.time }}</p>
            </div>
          </div>
        </div>
      </template>
      <template v-if="menuLocal.data === null">
        <div class="pl-3 pr-3 flex">
          <p class="flex-grow">Chưa có thông tin thực đơn</p>
          <div class="flex-none" v-if="action.canAction">
            <vs-button class="small">Thêm mới thực đơn</vs-button>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
  import Datepicker from 'vuejs-datepicker'
  import vSelect from 'vue-select'
  import moduleMenu from '@/store/menu/menuStore.js'
  import moduleSchool from '@/store/school/schoolStore.js'
  import moduleClass from '@/store/class/classStore.js'
  import { vi } from 'vuejs-datepicker/src/locale'
  export default {
    components: {
      Datepicker,
      'v-select' : vSelect
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
          schoolId: '',
          classId: '',
          date: new Date()
        },
        datePickerCheck: true,
        classPickerCheck: true,
        action: {
          name: '',
          canAction: true,
          itemToEdit: 0,
        }
      }
    },
    computed: {
      optionsSelectSchool() {
        return this.$store.getters['school/getSchools']
      },
      optionsSelectClass() {
        return this.$store.getters['class/getClasses']
      },
      menuLocal() {
        return this.$store.getters['menu/getMenu']
      }
    },
    methods: {
      schoolSelected(event) {
        this.inputQuery.schoolId = event.id
        this.$store.dispatch('class/getClassBySchoolId', {schoolId: this.inputQuery.schoolId});
        this.classPickerCheck = false
      },
      classSelected(event) {
        this.inputQuery.classId = event.id
        this.$store.dispatch('menu/getMenuByDate', this.inputQuery)
        this.datePickerCheck = false
      },
      dateSelected(event) {
        this.inputQuery.date = event
        if (event < new Date()) {
          this.action.canAction = false
        }
        this.$store.dispatch('menu/getMenuByDate', this.inputQuery)
      },
    },
    created() {
      this.$store.registerModule('menu', moduleMenu);
      this.$store.registerModule('school', moduleSchool)
      if (this.$store.state.AppActiveUser.schoolId === null) {
        this.$store.dispatch('school/getListSchool');
      } else {
        this.$store.dispatch('school/getSchoolById', {schoolId: this.$store.state.AppActiveUser.schoolId})
      }
      this.$store.registerModule('class', moduleClass);
    },
    beforeDestroy() {
      this.$store.unregisterModule('menu')
      this.$store.unregisterModule('school')
      this.$store.unregisterModule('class')
    }
  }
</script>
