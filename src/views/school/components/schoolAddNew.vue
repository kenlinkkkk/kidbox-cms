<template>
  <div class="flex self-center">
    <vs-button @click="activePrompt = true" class="w-full">Tạo mới trường học</vs-button>
    <vs-prompt
      title="Tạo mới trường học"
      accept-text="Cập nhật"
      cancel-text="Hủy"
      button-cancel="border"
      @cancel="clearFields"
      @accept="addSchool"
      @close="clearFields"
      :is-valid="validateForm"
      :active.sync="activePrompt">
      <div>
        <form>
          <vs-tabs alignment="fixed">
            <vs-tab label="Thông tin cơ bản">
              <div class="vx-col mb-6">
                <vs-upload action="http://kidbox.vn:8888/api/upload" :headers="headersUpload" :accept="'jpg|png'" automatic fileName="file" limit="1" @on-success="successUpload" />
              </div>
              <div class="vx-row mb-6">
                <div class="vx-col w-full">
                  <vs-input class="w-full" icon-pack="feather" icon="icon-home" icon-no-border label="Tên trường" v-model="schoolInfo.name"/>
                </div>
              </div>
              <div class="vx-row mb-6">
                <div class="vx-col w-full">
                  <vs-input class="w-full" icon-pack="feather" icon="icon-map-pin" icon-no-border label="Địa chỉ" v-model="schoolInfo.address"/>
                </div>
              </div>
              <div class="vx-row mb-6">
                <div class="vx-col w-full">
                  <vs-input class="w-full" icon-pack="feather" icon="icon-mail" icon-no-border label="Địa chỉ email" v-model="schoolInfo.email"/>
                </div>
              </div>
              <div class="vx-row mb-6">
                <div class="vx-col w-full">
                  <vs-input class="w-full" icon-pack="feather" icon="icon-phone" icon-no-border label="Số điện thoại" v-model="schoolInfo.phone_number"/>
                </div>
              </div>
            </vs-tab>

            <vs-tab label="Giờ học">
              <div class="vx-row mb-6">
                <div class="vx-col w-full form-group">
                  <label>Giờ vào học</label>
                  <flat-pickr :config="configDateTimePicker" class="w-full" placeholder="Chọn giờ" v-model="schoolInfo.start_time"/>
                </div>
              </div>
              <div class="vx-row mb-6">
                <div class="vx-col w-full form-group">
                  <label>Giờ nghỉ trưa</label>
                  <flat-pickr :config="configDateTimePicker" class="w-full" placeholder="Chọn giờ" v-model="schoolInfo.break_lunch"/>
                </div>
              </div>
              <div class="vx-row mb-6">
                <div class="vx-col w-full form-group">
                  <label>Giờ vào học buổi chiều</label>
                  <flat-pickr :config="configDateTimePicker" class="w-full" placeholder="Chọn giờ" v-model="schoolInfo.start_afternoon"/>
                </div>
              </div>
              <div class="vx-row mb-6">
                <div class="vx-col w-full form-group">
                  <label>Giờ kết thúc buổi chiều</label>
                  <flat-pickr :config="configDateTimePicker" class="w-full" placeholder="Chọn giờ" v-model="schoolInfo.end_time"/>
                </div>
              </div>
            </vs-tab>
          </vs-tabs>
        </form>
      </div>
    </vs-prompt>
  </div>
</template>
<style>
  .con-vs-dialog .vs-dialog {
    max-width: 600px !important;
  }
</style>

<script>
  import flatPickr from 'vue-flatpickr-component';
  import 'flatpickr/dist/flatpickr.css';
  export default {
    data() {
      return {
        activePrompt: false,
        schoolInfo: {
          name: '',
          address: '',
          email: '',
          phone_number: '',
          school_master: '',
          package_id: '',
          logo_url: '',
          start_time: '07:00',
          break_lunch: '11:45',
          start_afternoon: '13:30',
          end_time: '17:00',
        },
        headersUpload: {
          'Authorization': localStorage.getItem('accessToken')
        },
        configDateTimePicker: {
          enableTime: true,
          time_24hr: true,
          noCalendar: true
        }
      }
    },
    components:{
      flatPickr
    },
    computed: {
      validateForm() {
        if (this.schoolInfo.name === '' || this.schoolInfo.address === '') {
          return false
        }
        // eslint-disable-next-line no-useless-escape
        const regEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (regEmail.test(this.schoolInfo.email) === false) {
          return false
        }
        const phoneNumber = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
        if (phoneNumber.test(this.schoolInfo.phone_number) === false) {
          return false
        }
        return !this.errors.any()
      }
    },
    methods: {
      async addSchool() {
        this.$store.dispatch('school/createNewSchool', Object.assign({}, this.schoolInfo)).then((resp) => {
          this.clearFields();
          this.$store.dispatch('school/getListSchool');
          this.$vs.notify({
            title:'Cập nhật thông tin hành công',
            text: resp.data.message,
            position: 'top-right',
            color:'success',
            iconPack: 'feather',
            icon:'icon-check'
          });
        }).catch((error) => {
          this.$vs.notify({
            title:'Lỗi',
            text: error.message,
            position: 'top-right',
            color:'danger',
            iconPack: 'feather',
            icon:'icon-x'
          });
        })
      },
      clearFields() {
        Object.assign(this.schoolInfo, {
          name: '',
          address: '',
          email: '',
          phone_number: '',
          school_master: '',
          package_id: '',
          logo_url: '',
          start_time: '07:00',
          break_lunch: '11:45',
          start_afternoon: '13:30',
          end_time: '17:00',
        })
      },
      successUpload(event) {
        let response = JSON.parse(event.target.response)
        if (response.code === 200) {
          this.schoolInfo.logo_url = response.data
        }
      }
    }
  }
</script>
