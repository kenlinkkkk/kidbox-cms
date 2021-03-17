<template>
  <vx-card>
    <div>
      <!-- Avatar Row -->
      <div class="vx-row">
        <div class="vx-col w-full">
          <div class="flex items-start flex-col sm:flex-row">
            <img :src="data_local.avatar.path" class="mr-8 rounded w-24" />
            <!-- <vs-avatar :src="data.avatar" size="80px" class="mr-4" /> -->
            <div>
              <input type="file" class="hidden" ref="update_avatar_input" @change="update_avatar" accept="image/*">
              <!-- Toggle comment of below buttons as one for actual flow & currently shown is only for demo -->
              <vs-button type="border" class="mr-4" @click="$refs.update_avatar_input.click()">Đổi ảnh đại diện</vs-button>
            </div>
          </div>
        </div>
      </div>

      <!-- Content Row -->
      <div class="vx-row">
        <div class="vx-col md:w-1/2 w-full">
          <vs-input class="w-full mt-4" label="Email" v-model="data_local.email" v-validate="'required|email'" name="username" />
          <span class="text-danger text-sm"  v-show="errors.has('email')">{{ errors.first('email') }}</span>

          <vs-input class="w-full mt-4" label="Tên" v-model="data_local.name" v-validate="'required'" name="name" />
          <span class="text-danger text-sm"  v-show="errors.has('name')">{{ errors.first('name') }}</span>

          <vs-input class="w-full mt-4" label="Số điện thoại" v-model="data_local.mobile" type="text" v-validate="'required'" name="mobile" />
          <span class="text-danger text-sm"  v-show="errors.has('mobile')">{{ errors.first('mobile') }}</span>

          <vs-input class="w-full mt-4" label="Mật khẩu" v-model="data_local.password" v-validate="'required'" name="password" type="password" />
          <span class="text-danger text-sm"  v-show="errors.has('password')">{{ errors.first('password') }}</span>
        </div>

        <div class="vx-col md:w-1/2 w-full">

          <vs-input class="w-full mt-4" label="Địa chỉ" v-model="data_local.address" v-validate="'required'" name="address" />
          <span class="text-danger text-sm"  v-show="errors.has('address')">{{ errors.first('address') }}</span>

          <div class="mt-4">
            <label class="vs-input--label">Trường</label>
            <v-select :clearable="false" label="name" @input="schoolSelected" :options="optionsSelectSchool" v-validate="'required'" name="school_id" :dir="$vs.rtl ? 'rtl' : 'ltr'" />
            <span class="text-danger text-sm"  v-show="errors.has('school_id')">{{ errors.first('school_id') }}</span>
          </div>

          <div class="mt-4">
            <label class="vs-input--label">Quyền</label>
            <v-select :clearable="false" :options="roles" @input="roleSelected" v-validate="'required'" name="role" :dir="$vs.rtl ? 'rtl' : 'ltr'" />
            <span class="text-danger text-sm"  v-show="errors.has('role')">{{ errors.first('role') }}</span>
          </div>

          <div class="mt-4">
            <label class="vs-input--label">Lớp</label>
            <v-select :disabled="roleCheck" label="name" @input="classSelected" :clearable="false" :options="optionsSelectClass" v-validate="'required'" name="class_id" :dir="$vs.rtl ? 'rtl' : 'ltr'" />
            <span class="text-danger text-sm"  v-show="errors.has('role')">{{ errors.first('role') }}</span>
          </div>
        </div>
      </div>
      <div class="vx-row">
        <div class="vx-col w-full">
          <div class="mt-8 flex flex-wrap items-center justify-end">
            <vs-button class="ml-auto mt-2" @click="save_changes" :disabled="!validateForm">Lưu thông tin</vs-button>
            <vs-button class="ml-4 mt-2" type="border" color="warning" @click="reset_data">Hủy</vs-button>
          </div>
        </div>
      </div>
    </div>
  </vx-card>
</template>

<script>
  import vSelect from 'vue-select'
  import moduleSchool from '@/store/school/schoolStore.js'
  import moduleClass from '@/store/class/classStore.js'
  import axiosApiInstance from "../../axios";

  export default {
    components: {
      vSelect
    },
    data () {
      return {
        data_local: {
          name: '',
          email: '',
          mobile: '',
          address: '',
          school_id: '',
          role: '',
          class_id: '',
          password: '',
          avatar: {
            path: '',
            type: ''
          }
        },
        roleCheck: true,
        configLoadPage: {
          limit: 10,
          page: 1
        },
      }
    },
    computed: {
      validateForm () {
        return !this.errors.any()
      },
      roles() {
        let roleList = this.$store.getters['userManagement/getRoles'];

        return roleList
      },
      optionsSelectSchool() {
        return this.$store.getters['school/getSchools']
      },
      optionsSelectClass() {
        return this.$store.getters['class/getClasses']
      }
    },
    methods: {
      async save_changes () {
        /* eslint-disable */
        if (!this.validateForm) return

        // Here will go your API call for updating data
        // You can get data in "this.data_local"

        /* eslint-enable */
        let response = await this.$store.dispatch('userManagement/addNewUser', this.data_local)
        if (response.data.code === 200) {
          this.$vs.notify({
            title:'Cập nhật thông tin hành công',
            text: response.data.message,
            position: 'top-right',
            color:'success',
            iconPack: 'feather',
            icon:'icon-check'
          });
        } else {
          this.$vs.notify({
            title:'Lỗi',
            text: response.data.message,
            position: 'top-right',
            color:'danger',
            iconPack: 'feather',
            icon:'icon-x'
          });
        }
      },
      reset_data () {
        this.$router.go(-1);
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
              'Content-Type' : 'multipart/form-data'
            },
            data: formData
          }

          let response = await axiosApiInstance(config)
          let path = "https://kidbox.vn/media/";
          this.data_local.avatar.path = path.concat(String(response.data.data.path));
          this.data_local.avatar.type = response.data.data.type;
        }
      },
      schoolSelected (event) {
        this.data_local.school_id = event.id
        this.$store.dispatch('class/getClassBySchoolId', { schoolId: this.data_local.school_id });
      },
      roleSelected (event) {
        if (event.value === 61) {
          this.roleCheck = false
        }
        this.data_local.role = event.value
      },
      classSelected (event) {
        this.data_local.class_id = event.id
      }
    },
    beforeDestroy() {
      this.$store.unregisterModule('school')
      this.$store.unregisterModule('class')
    },
    created() {
      this.$store.dispatch('userManagement/getRoleList', this.configLoadPage).catch(err => { console.error(err) })
      this.$store.registerModule('school', moduleSchool);
      if (this.$acl.check('systemAdmin')) {
        this.$store.dispatch('school/getListSchool');
      } else {
        this.$store.dispatch('school/getSchoolById', { schoolId: this.$store.state.AppActiveUser.schoolId })
      }
      this.$store.registerModule('class', moduleClass);
    }
  }
</script>
