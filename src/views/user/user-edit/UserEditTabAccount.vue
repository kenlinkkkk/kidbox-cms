<template>
  <div id="user-edit-tab-info">

    <!-- Avatar Row -->
    <div class="vx-row">
      <div class="vx-col w-full">
        <div class="flex items-start flex-col sm:flex-row">
          <img :src="data.image_url.path" class="mr-8 rounded h-24 w-24" />
          <!-- <vs-avatar :src="data.avatar" size="80px" class="mr-4" /> -->
          <div>
            <p class="text-lg font-medium mb-2 mt-4 sm:mt-0">{{ data.name  }}</p>
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
        <vs-input class="w-full mt-4" label="Tài khoản" v-model="data_local.login" v-validate="'required'" name="login" disabled="true"/>
        <span class="text-danger text-sm"  v-show="errors.has('login')">{{ errors.first('login') }}</span>

        <vs-input class="w-full mt-4" label="Tên" v-model="data_local.full_name" v-validate="'required'" name="full_name" />
        <span class="text-danger text-sm"  v-show="errors.has('full_name')">{{ errors.first('name') }}</span>

        <vs-input class="w-full mt-4" label="Email" v-model="data_local.email" type="email" v-validate="'required|email'" name="email" />
        <span class="text-danger text-sm"  v-show="errors.has('email')">{{ errors.first('email') }}</span>

        <vs-input class="w-full mt-4" label="Số điện thoại" v-model="data_local.phone_number" type="text" v-validate="'required'" name="phone_number" />
        <span class="text-danger text-sm"  v-show="errors.has('phone_number')">{{ errors.first('phone_number') }}</span>

        <vs-input class="w-full mt-4" label="Địa chỉ" v-model="data_local.address" v-validate="'alpha_spaces'" name="address" />
        <span class="text-danger text-sm"  v-show="errors.has('address')">{{ errors.first('address') }}</span>
      </div>

      <div class="vx-col md:w-1/2 w-full">

        <div class="mt-4">
          <div class="mt-4">
            <label class="vs-input--label">Trường</label>
            <v-select :clearable="false" label="name" @input="schoolSelected" :options="optionsSelectSchool" v-validate="'required'" v-model="data_local.school_name" name="school_id" :dir="$vs.rtl ? 'rtl' : 'ltr'" />
            <span class="text-danger text-sm"  v-show="errors.has('school_id')">{{ errors.first('school_id') }}</span>
          </div>

          <div class="mt-4">
            <label class="vs-input--label">Quyền</label>
            <v-select :clearable="false" :options="roles" @input="roleSelected" v-validate="'required'" v-model="data_local.user.role_name" name="role" :dir="$vs.rtl ? 'rtl' : 'ltr'" />
            <span class="text-danger text-sm"  v-show="errors.has('role')">{{ errors.first('role') }}</span>
          </div>

          <div class="mt-4">
            <label class="vs-input--label">Lớp</label>
            <v-select :disabled="roleCheck" label="name" @input="classSelected" :clearable="false" :options="optionsSelectClass" v-validate="'required'" name="class_id" :dir="$vs.rtl ? 'rtl' : 'ltr'" />
            <span class="text-danger text-sm"  v-show="errors.has('class_id')">{{ errors.first('class_id') }}</span>
          </div>
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
</template>

<script>
import vSelect from 'vue-select'
import axiosApiInstance from "../../../axios";
import moduleSchool from '@/store/school/schoolStore.js'
import moduleClass from '@/store/class/classStore.js'

export default {
  components: {
    vSelect
  },
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      data_local: JSON.parse(JSON.stringify(this.data)),
      configLoadPage: {
        limit: 10,
        page: 1
      },
      roleCheck: true,
    }
  },
  computed: {
    validateForm () {
      return !this.errors.any()
    },
    roles() {
      if (this.$acl.check('Admin')) {
        let listRole = [];
        return this.$store.getters['userManagement/getRoles'](listRole)
      } else if (this.$acl.check('Master')){
        let listRole = [64, 60];
        return this.$store.getters['userManagement/getRoles'](listRole)
      } else if (this.$acl.check('Teacher')) {
        let listRole = [64, 60, 61];
        return this.$store.getters['userManagement/getRoles'](listRole)
      }
    },
    optionsSelectSchool() {
      return this.$store.getters['school/getSchools']
    },
    optionsSelectClass() {
      return this.$store.getters['class/getClasses']
    }
  },
  methods: {
    save_changes () {
      /* eslint-disable */
      // if (!this.validateForm) {
        this.$store.dispatch('userManagement/updateUserInfo', this.data_local)
      // }
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
            'Content-Type': 'multipart/form-data'
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
  created() {
    this.$store.dispatch('userManagement/getRoleList', this.configLoadPage).catch(err => { console.error(err) })
    this.$store.registerModule('school', moduleSchool);
    if (this.$acl.check('Admin')) {
      this.$store.dispatch('school/getListSchool');
    } else {
      this.$store.dispatch('school/getSchoolById', { schoolId: this.$store.state.AppActiveUser.schoolId })
    }
    this.$store.registerModule('class', moduleClass);
  }
}
</script>
