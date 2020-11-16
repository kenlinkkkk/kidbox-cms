<template>
  <vs-prompt
    title="Sửa thông tin lớp học"
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
              <vs-upload action="http://kidbox.vn:8888/api/upload" :headers="headersUpload" :accept="'jpg|png'" automatic fileName="file" limit="1" @on-success="successUpload" />
            </div>
            <div class="vx-row mb-6">
              <div class="vx-col w-full">
                <vs-input class="w-full" v-validate="'required'" icon-pack="feather" icon="icon-home" icon-no-border label="Tên lớp" v-model="classLocal.name" />
                <span class="text-danger text-sm" v-show="errors.has('classLocal.name')">{{ errors.first('classLocal.name') }}</span>
              </div>
            </div>
            <div class="vx-row mb-6">
              <div class="vx-col w-full">
                <vs-input class="w-full" icon-pack="feather" icon="icon-map-pin" icon-no-border label="Phòng học" v-model="classLocal.room" />
              </div>
            </div>
            <div class="vx-row mb-6">
              <div class="vx-col w-full">
                <vs-input class="w-full" icon-pack="feather" icon="icon-mail" icon-no-border label="Ghi chú" v-model="classLocal.note" />
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
  import 'flatpickr/dist/flatpickr.css';
  export default {
    props: {
      displayPrompt: {
        type: Boolean,
        required: true
      },
      classId: {
        type: Number,
        required: true
      }
    },
    data() {
      return {
        classLocal: Object.assign({}, this.$store.getters['class/getClassById'](this.classId)),
        headersUpload: {
          'Authorization': localStorage.getItem('accessToken')
        }
      }
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
        if (this.classLocal.name === '') {
          return false
        }
        return !this.errors.any()
      }
    },
    methods: {
      init() {
        this.classLocal = Object.assign({}, this.$store.getters['class/getClassById'](this.classId))
      },
      async submitInfo() {
        let classInfo = JSON.parse(JSON.stringify(this.classLocal))
        this.$store.dispatch('class/updateClassInfo', {classId: this.classId, classInfo: classInfo}).then((resp) => {
          this.$store.dispatch('class/getClassBySchoolId', this.$route.params);
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
      successUpload(event) {
        let response = JSON.parse(event.target.response)
        if (response.code === 200) {
          this.classLocal.logo_url = response.data
        }
      }
    }
  }
</script>
