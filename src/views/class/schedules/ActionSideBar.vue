<template>
  <vs-sidebar click-not-close position-right parent="body" default-index="1" color="primary" class="add-new-data-sidebar items-no-padding" spacer v-model="isSidebarActiveLocal">
    <div class="mt-6 flex items-center justify-between px-6">
      <h4>{{ this.data.id === undefined ? "THÊM MỚI" : "CẬP NHẬT" }} LỊCH HỌC</h4>
      <feather-icon icon="XIcon" @click.stop="isSidebarActiveLocal = false" class="cursor-pointer"></feather-icon>
    </div>
    <vs-divider class="mb-0"></vs-divider>

    <component :is="scrollbarTag" class="scroll-area--data-list-add-new" :settings="settings" :key="$vs.rtl">
      <div class="p-4">
        <template>
          <div>
            <vx-card v-for="(item, index) in dataList" :key="index" :id="index" class="mt-2" title="Lịch học" remove-card-action collapse-action>
              <vs-input class="w-full mt-4" label="Tiết học" v-model="item.name" name="name" />
              <label class="mt-4">Giờ bắt đầu</label>
              <flat-pickr :config="configdateTimePicker" v-model="item.start_time" class="w-full"/>
              <label class="mt-4">Giờ kết thúc</label>
              <flat-pickr :config="configdateTimePicker" v-model="item.end_time" class="w-full"/>
              <vs-input class="w-full mb-4" label="Ghi chú" v-model="item.note" name="note" />
              <vs-input class="w-full mb-4" label="Vị trí học" v-model="item.location" name="note" />
              <label>Giáo viên</label>
              <v-select class="mr-3" label="name" :id="'select-' + index" :options="listTeacher" @input="teacherPicker" :v-model="item.teacher_id" :dir="$vs.rtl ? 'rtl' : 'ltr'" />
            </vx-card>
            <vs-button class="mt-2" @click="repeatForm">Thêm</vs-button>
          </div>
        </template>
      </div>
    </component>

    <div class="flex flex-wrap items-center p-6" slot="footer">
      <vs-button class="mr-6" @click="submitData">Lưu</vs-button>
      <vs-button type="border" color="danger" @click="isSidebarActiveLocal = false">Hủy</vs-button>
    </div>
  </vs-sidebar>
</template>

<script>
  import VuePerfectScrollbar from 'vue-perfect-scrollbar'
  import flatPickr from 'vue-flatpickr-component';
  import 'flatpickr/dist/flatpickr.css';
  import vSelect from 'vue-select'

  export default {
    props: {
      isSidebarActive: {
        type: Boolean,
        required: true
      },
      data: {
        type: Object,
        default: () => {}
      }
    },
    components: {
      VuePerfectScrollbar,
      flatPickr,
      'v-select' : vSelect,
    },
    data () {
      return {
        settings: {
          maxScrollbarLength: 60,
          wheelSpeed: .20
        },
        nextItem: 2,
        dataList: [{
          name: "",
          start_time: "",
          end_time: "",
          note: "",
          teacher_id: "",
          location: ""
        }],
        note: "",
        configdateTimePicker: {
          enableTime: true,
          enableSeconds: false,
          noCalendar: true
        }
      }
    },
    watch: {
      isSidebarActive (val) {
        if (!val) return
        if (this.data.id !== 0) {
          this.initValues()
          this.$validator.reset()
        } else if(this.data.id === 0) {
          this.dataList = [{
            name: "",
            start_time: "",
            end_time: "",
            note: "",
            teacher_id: "",
            location: ""
          }]
        }
      }
    },
    computed: {
      isSidebarActiveLocal: {
        get () {
          return this.isSidebarActive
        },
        set (val) {
          if (!val) {
            this.$emit('closeSidebar')
          }
        }
      },
      isFormValid () {
        return !this.errors.any() && this.dataName && this.dataCategory && this.dataPrice > 0
      },
      scrollbarTag () { return this.$store.getters.scrollbarTag },
      listTeacher () {
        return this.$store.getters['userManagement/getListUser']
      }
    },
    methods: {
      initValues () {
        if (this.data.id !== undefined) {
          let inputQuery = {
            classId: this.data.class_room_id,
            date: this.data.date
          }
          this.$store.dispatch('menu/getMenuByDate', inputQuery).then((response) => {
            this.dataList = JSON.parse(JSON.stringify(response.data.data.menu))
          }).catch((error) => {
            console.log(error)
          })
        }
      },
      async submitData () {
        // let submitData = {
        //   class_room_id: this.data.class_room_id,
        //   date: this.data.date.toISOString().split('T')[0],
        //   data: this.dataList,
        //   note: this.note
        // }
        // let response;
        // if (this.data.id === 0) {
        //   // eslint-disable-next-line no-const-assign
        //   response = await this.$store.dispatch('menu/addMenu', submitData)
        // } else {
        //   // eslint-disable-next-line no-const-assign
        //   response = await this.$store.dispatch('menu/updateMenu', { id: this.data.id, submitData: submitData})
        // }
        //
        // if (response.data.code === 200) {
        //   this.isSidebarActiveLocal = false
        //   this.$vs.notify({
        //     title:'Cập nhật thông tin hành công',
        //     text: response.data.message,
        //     position: 'top-right',
        //     color:'success',
        //     iconPack: 'feather',
        //     icon:'icon-check'
        //   });
        // } else {
        //   this.$vs.notify({
        //     title:'Lỗi',
        //     text: response.data.message,
        //     position: 'top-right',
        //     color:'danger',
        //     iconPack: 'feather',
        //     icon:'icon-x'
        //   });
        // }
      },
      repeatForm () {
        this.dataList.push({
          name: "",
          start_time: "",
          end_time: "",
          note: "",
          teacher_id: "",
          location: ""
        })
      },
      teacherPicker(input) {
        return input
      }
    }
  }
</script>

<style lang="scss" scoped>
  .add-new-data-sidebar {
    ::v-deep .vs-sidebar--background {
      z-index: 52010;
    }

    ::v-deep .vs-sidebar {
      z-index: 52010;
      width: 400px;
      max-width: 90vw;

      .img-upload {
        margin-top: 2rem;

        .con-img-upload {
          padding: 0;
        }

        .con-input-upload {
          width: 100%;
          margin: 0;
        }
      }
    }
  }

  .scroll-area--data-list-add-new {
    // height: calc(var(--vh, 1vh) * 100 - 4.3rem);
    height: calc(var(--vh, 1vh) * 100 - 16px - 45px - 80px);

    &:not(.ps) {
      overflow-y: auto;
    }
  }
</style>
