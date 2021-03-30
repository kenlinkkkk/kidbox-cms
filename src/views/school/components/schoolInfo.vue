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
      <perfect-scrollbar>
        <form>
          <vs-tabs alignment="fixed">
            <vs-tab label="Thông tin cơ bản">
              <div class="vx-row m-1">
                <div class="vs-col lg:w-1/3">
                  <img :src="schoolInfo.logoUrl.path" class="mr-8 rounded w-24" v-if="schoolInfo.logoUrl.path"/>
                  <div>
                    <input type="file" class="hidden" ref="update_avatar_input" @change="update_avatar" accept="image/*">
                    <!-- Toggle comment of below buttons as one for actual flow & currently shown is only for demo -->
                    <vs-button type="border" class="mr-4" size="small" @click="$refs.update_avatar_input.click()">Thêm ảnh</vs-button>
                  </div>
                </div>
                <div class="vs-col lg:w-2/3">
                  <vs-input class="w-full" icon-pack="feather" icon="icon-home" icon-no-border label="Tên trường" v-model="schoolInfo.name" placeholder="Mầm non ..."/>
                  <vs-input class="w-full" icon-pack="feather" icon="icon-map-pin" icon-no-border label="Địa chỉ" v-model="schoolInfo.address" placeholder="Cầu Giấy"/>
                </div>
              </div>
              <div class="vx-row mt-3">
                <div class="vx-col w-full m-1" v-if="$acl.check('Admin')">
                  <label class="vs-input--label">Gói</label>
                  <v-select class="mr-3 w-full" label="name" :options="listSubPackage" v-model="schoolInfo.package.name" :dir="$vs.rtl ? 'rtl' : 'ltr'" />
                </div>
                <div class="vx-col w-full m-1">
                  <vs-input class="w-full mb-3" icon-pack="feather" icon="icon-mail" icon-no-border label="Địa chỉ email" v-model="schoolInfo.email" placeholder="mamnon@gmail.com"/>
                  <vs-input class="w-full mb-3" icon-pack="feather" icon="icon-phone" icon-no-border label="Số điện thoại" v-model="schoolInfo.phone_number" placeholder="0123456789"/>
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
      </perfect-scrollbar>
  </vs-prompt>
</template>
<style lang="scss">
  .con-vs-dialog .vs-dialog {
    max-width: 600px !important;
  }

</style>

<script>
  import flatPickr from 'vue-flatpickr-component';
  import PerfectScrollbar from 'vue-perfect-scrollbar'
  import 'flatpickr/dist/flatpickr.css';
  import vSelect from 'vue-select'
  import axiosApiInstance from "../../../axios";

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
        schoolInfo: Object.assign({}, this.$store.getters['school/getSchool'](this.schoolId)),
        configDateTimePicker: {
          enableTime: true,
          time_24hr: true,
          noCalendar: true
        }
      }
    },
    components:{
      flatPickr,
      PerfectScrollbar,
      vSelect
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
      },
      listSubPackage() {
        return this.$store.getters['subpackage/getPackages']
      }
    },
    methods: {
      init() {
        this.schoolInfo = Object.assign({}, this.$store.getters['school/getSchool'](this.schoolId))
      },
      async submitInfo() {
        let schoolLocal = JSON.parse(JSON.stringify(this.schoolInfo))
        this.$store.dispatch('school/updateSchoolInfo', schoolLocal).then((resp) => {
          this.$store.dispatch('school/getListSchool', this.configLoadPage);
          this.$vs.notify({
            title:'Cập nhật thông tin hành công',
            text: resp.data.message,
            position: 'top-right',
            color:'success',
            iconPack: 'feather',
            icon:'icon-check'
          });
        }).catch((error) => {
          console.log(error)
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
      async update_avatar (input) {
        let formData = new FormData();
        if (input.target.files && input.target.files[0]) {
          let file = input.target.files[0];
          formData.append('file', file);

          let config = {
            url: "/api/upload",
            method: "POST",
            headers: {
              'Content-Type': 'multipart/form-data'
            },
            data: formData
          }

          let response = await axiosApiInstance(config)
          let path = "https://kidbox.vn/media/";
          this.schoolInfo.logoUrl.path = path.concat(String(response.data.data.path));
          this.schoolInfo.logoUrl.type = response.data.data.type;
        }
      }
    }
  }
</script>
