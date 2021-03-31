<template>
  <div class="flex self-center">
    <vs-button @click="activePrompt = true" class="w-full">Tạo mới lớp học</vs-button>
    <vs-prompt
      title="Tạo mới trường học"
      accept-text="Thêm mới"
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
              <div class="vx-row m-1">
                <div class="vx-col lg:w-1/3">
                  <img :src="classInfo.logo_url.path" class="mr-8 rounded w-24" v-if="classInfo.logo_url.path"/>
                  <img src="https://kidbox.vn/media/default/no-image.png" class="mr-8 rounded w-24" v-else/>
                  <div>
                    <input type="file" class="hidden" ref="update_avatar_input" @change="update_avatar" accept="image/*">
                    <!-- Toggle comment of below buttons as one for actual flow & currently shown is only for demo -->
                    <vs-button type="border" class="mr-4" size="small" @click="$refs.update_avatar_input.click()">Thêm ảnh</vs-button>
                  </div>
                </div>
                <div class="vx-col lg:w-2/3">
                  <vs-input class="w-full" icon-pack="feather" icon="icon-home" icon-no-border label="Tên lớp" v-model="classInfo.name"/>
                  <vs-input class="w-full" icon-pack="feather" icon="icon-map-pin" icon-no-border label="Phòng học" v-model="classInfo.room"/>
                </div>
              </div>
              <div class="vx-row m-1">
                <div class="vx-col w-full">
                  <label class="vs-input--label">Giáo viên</label>
                  <v-select class="mr-3 w-full style-chooser" label="name" @search="searchInput" multiple :closeOnSelect="false" :options="listTeacher" v-model="classInfo.teacher_ids" :dir="$vs.rtl ? 'rtl' : 'ltr'"/>
                </div>
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
  .style-chooser .vs__dropdown-menu {
    max-height: 4rem;
  }
</style>

<script>
  import 'flatpickr/dist/flatpickr.css';
  import axiosApiInstance from "../../../axios";
  import vSelect from 'vue-select'
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
          logo_url: {
            path: "",
            type: ""
          },
          teacher_ids: [],
          school_id: this.schoolId
        },
        configLoadPage: {
          limit: 10,
          page: 1,
          school_id: this.schoolId
        }
      }
    },
    components: {
      vSelect
    },
    computed: {
      validateForm() {
        if (this.classInfo.name === '') {
          return false
        }
        return !this.errors.any()
      },
      listTeacher () {
        return this.$store.getters['userManagement/getListUser']
      }
    },
    methods: {
      async addClass() {
        this.$store.dispatch('class/addNewClass', Object.assign({}, this.classInfo)).then((resp) => {
          if (resp.data.code === 200) {
            this.$vs.notify({
              title:'Cập nhật thông tin hành công',
              text: resp.data.message,
              position: 'top-right',
              color:'success',
              iconPack: 'feather',
              icon:'icon-check'
            });
          } else {
            this.$vs.notify({
              title:'Lỗi',
              text: resp.data.message,
              position: 'top-right',
              color:'danger',
              iconPack: 'feather',
              icon:'icon-x'
            });
          }
          this.clearFields();
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
        Object.assign(this.classInfo, {
          name: "",
          room: "",
          note: "",
          logo_url: {
            path: "",
            type: ""
          },
          teacher_ids: [],
          school_id: this.schoolId
        })
      },
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
          this.classInfo.logo_url.path = path.concat(String(response.data.data.path));
          this.classInfo.logo_url.type = response.data.data.type;
        }
      },
      searchInput (input) {
        if (this.timer) {
          clearTimeout(this.timer);
          this.timer = null;
        }
        this.timer = setTimeout(() => {
          if (this.$acl.check('AdminOrMaster')) {
            let listRole = ['TEACHER']
            let listRoleId = this.$store.getters['userManagement/getRoleListByCode'](listRole);
            this.$store.dispatch('userManagement/getListUserByRole', Object.assign(this.configLoadPage, {
              role_id : listRoleId,
              name: input
            }))
          }
        }, 2000);
      }
    },
    created() {
      let listRole = ['TEACHER']
      let listRoleId = this.$store.getters['userManagement/getRoleListByCode'](listRole);
      this.$store.dispatch('userManagement/getListUserByRole', Object.assign(this.configLoadPage, {role_id : listRoleId}))
    }
  }
</script>

