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
                <vs-upload action="http://kidbox.vn:8888/api/upload" :headers="headersUpload" v-on:change="selectedFile" automatic fileName="file" limit="1" @on-success="successUpload" />
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
        return !this.errors.any()
      }
    },
    methods: {
      init() {
        this.schoolLocal = Object.assign({}, this.$store.getters['school/getSchool'](this.schoolId))
      },
      async submitInfo() {
        let result = await this.$validator.validateAll();
          if (result) {
            let schoolInfo = JSON.parse(JSON.stringify(this.schoolLocal))
            this.$store.dispatch('school/updateSchoolInfo', schoolInfo)
          }
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
