<template>
  <vs-prompt
      title="Sửa thông tin trường học"
      accept-text="Cập nhật"
      cancel-text="Hủy"
      button-cancel="border"
      @cancel="cancel"
      @accept="submitInfo"
      @close="init"
      :active.sync="activePrompt">
      <div>
        <form>
          <vs-tabs alignment="fixed">
            <vs-tab label="Thông tin cơ bản">
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
                  <flat-pickr :config="configdateTimePicker" v-model="schoolLocal.start_time" class="w-full" placeholder="Chọn giờ" />
                </div>
              </div>
              <div class="vx-row mb-6">
                <div class="vx-col w-full form-group">
                  <label>Giờ nghỉ trưa</label>
                  <flat-pickr :config="configdateTimePicker" v-model="schoolLocal.break_lunch" class="w-full" placeholder="Chọn giờ" />
                </div>
              </div>
              <div class="vx-row mb-6">
                <div class="vx-col w-full form-group">
                  <label>Giờ vào học buổi chiều</label>
                  <flat-pickr :config="configdateTimePicker" v-model="schoolLocal.start_afternoon" class="w-full" placeholder="Chọn giờ" />
                </div>
              </div>
              <div class="vx-row mb-6">
                <div class="vx-col w-full form-group">
                  <label>Giờ kết thúc buổi chiều</label>
                  <flat-pickr :config="configdateTimePicker" v-model="schoolLocal.end_time" class="w-full" placeholder="Chọn giờ" />
                </div>
              </div>
            </vs-tab>
          </vs-tabs>
        </form>
      </div>
  </vs-prompt>
</template>
<style>

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
        configdateTimePicker: {
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
      }
    },
    methods: {
      init() {
        this.schoolLocal = Object.assign({}, this.$store.getters['school/getSchool'](this.schoolId))
      },
      async submitInfo() {
        this.$validator.validateAll().then(result => {
          if (result) {
            console.log(this.schoolLocal)
          }
        })
      },
      cancel() {
        console.log('cancel')
      }
    }
  }
</script>
