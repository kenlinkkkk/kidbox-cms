<template>
  <vs-prompt
      title="Sửa thông tin trường học"
      accept-text="Cập nhật"
      cancel-text="Hủy"
      button-cancel="border"
      @cancel="cancel"
      @accept="submitInfo"
      @close="init"
      :is-valid="validateForm"
      :active.sync="activePrompt">
      <div>
        <form>
          <vs-tabs alignment="fixed">
            <vs-tab label="Thông tin cơ bản">
              <div class="vx-col mb-6">
                <vs-upload action="http://kidbox.vn:8888/api/upload" :headers="headersUpload" :accept="'jpg|png'" :data="file" v-on:change="selectedFile" automatic fileName="file" limit="1" @on-success="successUpload" />
              </div>
              <div class="vx-row mb-6">
                <div class="vx-col w-full">
                  <vs-input class="w-full" v-validate="'required'" icon-pack="feather" icon="icon-home" icon-no-border label="Tên trường" v-model="schoolLocal.name" />
                  <span class="text-danger text-sm" v-show="errors.has('schoolLocal.name')">{{ errors.first('schoolLocal.name') }}</span>
                </div>
              </div>
              <div class="vx-row mb-6">
                <div class="vx-col w-full">
                  <vs-input class="w-full" icon-pack="feather" icon="icon-map-pin" icon-no-border label="Địa chỉ" v-model="schoolLocal.address" />
                </div>
              </div>
              <div class="vx-row mb-6">
                <div class="vx-col w-full">
                  <vs-input class="w-full" icon-pack="feather" icon="icon-mail" icon-no-border label="Địa chỉ email" v-model="schoolLocal.email" />
                </div>
              </div>
              <div class="vx-row mb-6">
                <div class="vx-col w-full">
                  <vs-input class="w-full" icon-pack="feather" icon="icon-phone" icon-no-border label="Số điện thoại" v-model="schoolLocal.phone_number" />
                </div>
              </div>
            </vs-tab>

            <vs-tab label="Giờ học">
              <div class="vx-row mb-6">
                <div class="vx-col w-full form-group">
                  <label>Giờ vào học</label>
                  <flat-pickr :config="configDateTimePicker" v-model="schoolLocal.start_time" class="w-full" placeholder="Chọn giờ" />
                </div>
              </div>
              <div class="vx-row mb-6">
                <div class="vx-col w-full form-group">
                  <label>Giờ nghỉ trưa</label>
                  <flat-pickr :config="configDateTimePicker" v-model="schoolLocal.break_lunch" class="w-full" placeholder="Chọn giờ" />
                </div>
              </div>
              <div class="vx-row mb-6">
                <div class="vx-col w-full form-group">
                  <label>Giờ vào học buổi chiều</label>
                  <flat-pickr :config="configDateTimePicker" v-model="schoolLocal.start_afternoon" class="w-full" placeholder="Chọn giờ" />
                </div>
              </div>
              <div class="vx-row mb-6">
                <div class="vx-col w-full form-group">
                  <label>Giờ kết thúc buổi chiều</label>
                  <flat-pickr :config="configDateTimePicker" v-model="schoolLocal.end_time" class="w-full" placeholder="Chọn giờ" />
                </div>
              </div>
            </vs-tab>
          </vs-tabs>
        </form>
      </div>
  </vs-prompt>
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
    props: {
      displayPrompt: {
        type: Boolean,
        required: true
      },
      schoolId: {
        type: Number,
        required: true
      }
    },
    data() {
      return {
        schoolLocal: Object.assign({}, this.$store.getters['school/getSchool'](this.schoolId)),
        headersUpload: {
          'Authorization': localStorage.getItem('accessToken')
        },
        file: {},
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
      activePrompt: {
        get() {
          return this.displayPrompt
        },
        set(value) {
          this.$emit('hiddenDisplayPrompt', value)
        }
      },
      validateForm() {
        if (this.schoolLocal.name === '' || this.schoolLocal.address === '') {
          return false
        }
        // eslint-disable-next-line no-useless-escape
        const regEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (regEmail.test(this.schoolLocal.email) === false) {
          return false
        }
        const phoneNumber = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
        if (phoneNumber.test(this.schoolLocal.phone_number) === false) {
          return false
        }
        return !this.errors.any()
      }
    },
    methods: {
      init() {
        this.schoolLocal = Object.assign({}, this.$store.getters['school/getSchool'](this.schoolId))
      },
      async submitInfo() {
        let schoolInfo = JSON.parse(JSON.stringify(this.schoolLocal))
        this.$store.dispatch('school/updateSchoolInfo', schoolInfo).then((resp) => {
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
      cancel() {},
      selectedFile(event) {
        console.log(event)
      },
      successUpload(event) {
        let response = JSON.parse(event.target.response)
        if (response.code === 200) {
          this.schoolLocal.logo_url = response.data
        }
      }
    }
  }
</script>
