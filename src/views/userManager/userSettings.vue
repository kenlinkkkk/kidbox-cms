<template>
  <vs-tabs :position="isSmallerScreen ? 'top' : 'left'" class="tabs-shadow-none" id="profile-tabs" :key="isSmallerScreen">
    <vs-tab icon-pack="feather" icon="icon-lock" :label="!isSmallerScreen ? 'Đổi mật khẩu' : ''">
      <div class="tab-change-pwd md:ml-4 md:mt-0 mt-4 ml-0">
        <user-settings-change-password />
      </div>
    </vs-tab>
    <vs-tab icon-pack="feather" icon="icon-user" :label="!isSmallerScreen ? 'Thông tin cá nhân' : ''">
      <div class="tab-change-pwd md:ml-4 md:mt-0 mt-4 ml-0">
        <user-update-profile />
      </div>
    </vs-tab>
  </vs-tabs>
</template>

<script>
  import UserSettingsChangePassword from './userSettingsChangePassword.vue'
  import UserUpdateProfile from './userSettingsUpdateProfile'
  export default {
    components: {
      UserSettingsChangePassword,
      UserUpdateProfile
    },
    data () {
      return {

      }
    },
    computed: {
      isSmallerScreen () {
        return this.$store.state.windowWidth < 768
      }
    }
  }
</script>

<style lang="scss">
  #profile-tabs {
    .vs-tabs--content {
      padding: 0;
    }
  }
</style>
