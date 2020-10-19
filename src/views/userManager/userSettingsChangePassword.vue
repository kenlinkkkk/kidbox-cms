<template>
  <vx-card no-shadow>
    <vs-input class="w-full mb-base" type="password" label-placeholder="Mật khẩu cũ" v-model="old_password" />
<!--    <span class="text-danger text-sm" v-show="errors.has('old_password')">{{ errors.first('old_password') }}</span>-->
    <vs-input class="w-full mb-base" type="password" label-placeholder="Mật khẩu mới" v-model="new_password" />
<!--    <span class="text-danger text-sm" v-show="errors.has('new_password')">{{ errors.first('new_password') }}</span>-->
    <vs-input class="w-full mb-base" type="password" label-placeholder="Xác nhận mật khẩu mới" v-model="confirm_new_password" />
<!--    <span class="text-danger text-sm" v-show="errors.has('confirm_new_password')">{{ errors.first('confirm_new_password') }}</span>-->

    <!-- Save & Reset Button -->
    <div class="flex flex-wrap items-center justify-end">
      <vs-button class="ml-auto mt-2" @click="changePasswordAction">Lưu thay đổi</vs-button>
      <vs-button class="ml-4 mt-2" type="border" color="warning">Reset</vs-button>
    </div>
  </vx-card>
</template>

<script>
  export default {
    data () {
      return {
        old_password: '',
        new_password: '',
        confirm_new_password: ''
      }
    },
    methods: {
      async changePasswordAction() {
        let payload = {
          'old_password': this.old_password,
          'new_password': this.new_password,
          'confirm_new_password': this.confirm_new_password
        }

        let response = await this.$store.dispatch('changePassword', payload)
        if (response.data.code  === 400) {
          this.$vs.notify({
            title: 'Lỗi',
            text: response.data.message,
            color: 'danger',
            position: 'top-right',
            iconPack: 'feather',
            icon: 'icon-alert-triangle'
          })
        } else {
          this.$vs.notify({
            title: 'Thành công',
            text: response.data.message,
            color: 'success',
            position: 'top-right',
            iconPack: 'feather',
            icon: 'icon-check'
          })
        }
      }
    }
  }
</script>
