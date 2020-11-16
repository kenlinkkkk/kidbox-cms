<template>
  <div class="flex self-center">
    <vs-button @click="activePrompt = true" class="w-full">Tạo mới lớp học</vs-button>
    <vs-prompt
      title="Tạo mới trường học"
      accept-text="Cập nhật"
      cancel-text="Hủy"
      button-cancel="border"
      @cancel="clearFields"
      @accept="addClass"
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
                  <vs-input class="w-full" icon-pack="feather" icon="icon-home" icon-no-border label="Tên lớp" v-model="clasInfo.name"/>
                </div>
              </div>
              <div class="vx-row mb-6">
                <div class="vx-col w-full">
                  <vs-input class="w-full" icon-pack="feather" icon="icon-map-pin" icon-no-border label="Phòng học" v-model="classInfo.room"/>
                </div>
              </div>
              <div class="vx-row mb-6">
                <div class="vx-col w-full">
                  <vs-input class="w-full" icon-pack="feather" icon="icon-mail" icon-no-border label="Ghi chú" v-model="classInfo.note"/>
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
  import 'flatpickr/dist/flatpickr.css';
  export default {
    props: {
      schoolId: {
        type: Number,
        required: true
      }
    },
    data() {
      return {
        activePrompt: false,
        classInfo: {
          name: '',
          room: '',
          note: '',
          logo_url: ''
        },
        headersUpload: {
          'Authorization': localStorage.getItem('accessToken')
        }
      }
    },
    computed: {
      validateForm() {
        if (this.classInfo.name === '') {
          return false
        }
        return !this.errors.any()
      }
    },
    methods: {
      async addClass() {
        this.$store.dispatch('class/addNewClass', Object.assign({}, this.classInfo)).then((resp) => {
          this.clearFields();
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
      clearFields() {
        Object.assign(this.schoolInfo, {
          name: '',
          room: '',
          note: '',
          logo_url: ''
        })
      },
      successUpload(event) {
        let response = JSON.parse(event.target.response)
        if (response.code === 200) {
          this.classInfo.logo_url = response.data
        }
      }
    }
  }
</script>
