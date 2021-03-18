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
        <vs-input class="w-full mt-4" label="Tên tài khoản" v-model="data_local.email" v-validate="'required|alpha_num'" name="username" disabled="true"/>
        <span class="text-danger text-sm"  v-show="errors.has('email')">{{ errors.first('email') }}</span>

        <vs-input class="w-full mt-4" label="Tên" v-model="data_local.name" v-validate="'required|alpha_spaces'" name="name" />
        <span class="text-danger text-sm"  v-show="errors.has('name')">{{ errors.first('name') }}</span>

        <vs-input class="w-full mt-4" label="Email" v-model="data_local.email" type="email" v-validate="'required|email'" name="email" />
        <span class="text-danger text-sm"  v-show="errors.has('email')">{{ errors.first('email') }}</span>

        <vs-input class="w-full mt-4" label="Số điện thoại" v-model="data_local.phone_number" type="text" v-validate="'required'" name="phone_number" />
        <span class="text-danger text-sm"  v-show="errors.has('phone_number')">{{ errors.first('phone_number') }}</span>

        <vs-input class="w-full mt-4" label="Địa chỉ" v-model="data_local.address" v-validate="'alpha_spaces'" name="address" />
        <span class="text-danger text-sm"  v-show="errors.has('address')">{{ errors.first('address') }}</span>
      </div>

      <div class="vx-col md:w-1/2 w-full">

        <div class="mt-4">
          <div>
            <label class="vs-input--label">Trường</label>
            <v-select :clearable="false" :options="roles" label="role_name" v-model="data_local.user" v-validate="'required'" name="role" :dir="$vs.rtl ? 'rtl' : 'ltr'" />
            <span class="text-danger text-sm"  v-show="errors.has('role')">{{ errors.first('role') }}</span>
          </div>

          <div class="mt-4">
            <label class="vs-input--label">Quyền</label>
            <v-select :clearable="false" :options="roles" label="role_name" v-model="data_local.user" v-validate="'required'" name="role" :dir="$vs.rtl ? 'rtl' : 'ltr'" />
            <span class="text-danger text-sm"  v-show="errors.has('role')">{{ errors.first('role') }}</span>
          </div>

          <div class="mt-4">
            <label class="vs-input--label">Lớp</label>
            <v-select :clearable="false" :options="roles" label="role_name" v-model="data_local.user" v-validate="'required'" name="role" :dir="$vs.rtl ? 'rtl' : 'ltr'" />
            <span class="text-danger text-sm"  v-show="errors.has('role')">{{ errors.first('role') }}</span>
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
  },
  methods: {
    save_changes () {
      /* eslint-disable */
      if (!this.validateForm) return

      // Here will go your API call for updating data
      // You can get data in "this.data_local"

      /* eslint-enable */
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
    }
  },
  created() {
    this.$store.dispatch('userManagement/getRoleList', this.configLoadPage).catch(err => { console.error(err) })
  }
}
</script>
