<template>
  <vx-card no-shadow>
    <vs-input class="w-full mb-base" label-placeholder="Mật khẩu cũ" v-model="old_password" />
    <vs-input class="w-full mb-base" label-placeholder="Mật khẩu mới" v-model="new_password" />
    <vs-input class="w-full mb-base" label-placeholder="Xác nhận mật khẩu mới" v-model="confirm_new_password" />

    <!-- Save & Reset Button -->
    <div class="flex flex-wrap items-center justify-end">
      <vs-button class="ml-auto mt-2">Lưu thay đổi</vs-button>
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
    computed: {
      activeUserInfo () {
        return this.$store.state.AppActiveUser
      }
    }
  }
</script>
