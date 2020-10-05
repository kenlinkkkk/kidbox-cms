<template>
  <div id="profile-page">

    <!-- PROFILE HEADER -->
    <div class="profile-header">
      <div class="relative">
        <div class="cover-container rounded-t-lg">
          <img alt="user-profile-cover" :src="coverDefault" class="responsive block">
        </div>
        <div class="profile-img-container pointer-events-none">
          <div>
            <vs-avatar class="user-profile-img" :src="userInfo.photoURL" size="85px" />
          </div>
<!--          <div class="profile-actions pointer-events-auto flex">-->
<!--            <vs-button icon-pack="feather" radius icon="icon-edit-2"></vs-button>-->
<!--            <vs-button icon-pack="feather" radius icon="icon-settings" class="ml-2 lg:ml-4"></vs-button>-->
<!--          </div>-->
        </div>
      </div>
      <div class="flex items-center justify-end flex-wrap profile-header-nav p-6">
        <div class="block sm:hidden">
          <feather-icon @click="isNavOpen = !isNavOpen" icon="AlignJustifyIcon" v-show="!isNavOpen" class="vx-navbar-toggler cursor-pointer" />
          <feather-icon icon="XIcon" v-show="isNavOpen" @click="isNavOpen = !isNavOpen" class="vx-navbar-toggler cursor-pointer" />
        </div>
        <div :class="isNavOpen ? 'block': 'hidden'" class="w-full flex-grow sm:flex sm:items-center sm:w-auto">
          <div class="text-sm sm:flex-grow">
            <ul class="sm:flex justify-around mt-8 w-full md:mt-0 md:ml-auto md:w-3/4">
              <li class="p-2 sm:p-0"><router-link to="#">Thông tin cá nhân</router-link></li>
              <li class="p-2 sm:p-0"><router-link to="#">About</router-link></li>
            </ul>
          </div>
        </div>
      </div>
      <!-- <vx-navbar> -->
      <!-- </vx-navbar> -->
    </div>

    <!-- COL AREA -->
    <div class="vx-row">
      <!-- COL 1 -->
      <div class="vx-col w-full lg:w-1/4">
        <!-- ABOUT CARD -->
        <vx-card title="Thông tin cá nhân" class="mt-base">
          <!-- ACTION SLOT -->
          <template slot="actions">
            <feather-icon icon="MoreHorizontalIcon"></feather-icon>
          </template>

          <!-- USER BIO -->
          <div class="user-bio">
            <p>Tart I love sugar plum I love oat cake. Sweet roll caramels I love jujubes. Topping cake wafer.</p>
          </div>

          <!-- OTEHR DATA -->
          <div class="mt-5">
            <h6>Joined:</h6>
            <p>November 15, 2015</p>
          </div>

          <div class="mt-5">
            <h6>Lives:</h6>
            <p>New York, USA</p>
          </div>

          <div class="mt-5">
            <h6>Email:</h6>
            <p>bucketful@fiendhead.org</p>
          </div>

          <div class="mt-5">
            <h6>Website:</h6>
            <p>www.pixinvent.com</p>
          </div>

<!--          <div class="social-links flex mt-4">-->
<!--            <feather-icon svgClasses="h-7 w-7 cursor-pointer bg-primary p-1 text-white rounded" class="mr-2" icon="FacebookIcon"></feather-icon>-->
<!--            <feather-icon svgClasses="h-7 w-7 cursor-pointer bg-primary p-1 text-white rounded" class="mr-2" icon="TwitterIcon"></feather-icon>-->
<!--            <feather-icon svgClasses="h-7 w-7 cursor-pointer bg-primary p-1 text-white rounded" class="mr-2" icon="InstagramIcon"></feather-icon>-->
<!--          </div>-->
        </vx-card>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    computed: {
      userInfo() {
        return this.$store.state.AppActiveUser
      }
    },
    data() {
      return {
        isNavOpen: false,
        userPoll: '',
        coverDefault: require('@/assets/images/pages/cover.jpg')
      }
    },
    mounted () {
      this.wasSidebarOpen = this.$store.state.reduceButton
      this.$store.commit('TOGGLE_REDUCE_BUTTON', true)
    },
    beforeDestroy () {
      if (!this.wasSidebarOpen) this.$store.commit('TOGGLE_REDUCE_BUTTON', false)
    }
  }
</script>

<style lang="scss">
  @import "@/assets/scss/vuexy/pages/profile.scss";
</style>
