<template>
  <vx-card>
    <div slot="no-body" class="vx-col md:w-full flex">
      <template v-if="schoolLocal.logo_url == null">
        <div class="w-1/3">
          <img src="https://kidbox.vn/media/default/no-image.png" alt="content-img" class="logo-custom responsive card-img-left">
        </div>
      </template>
      <template v-else>
        <div class="logo-custom" :style="{ backgroundImage: 'url(' + schoolLocal.logo_url.path + ')' }">
<!--          <img :src="schoolLocal.logo_url.path" alt="content-img" class="logo-custom responsive card-img-left">-->
        </div>
      </template>
      <div class="p-2 w-2/3">
        <h5 class="mb-2">{{ schoolLocal.name }}</h5>
        <p><a :href="'mailto:' + schoolLocal.email" class="text-black">Email: {{ schoolLocal.email }}</a></p>
        <p><a :href="'tel:' + schoolLocal.phone_number" class="text-black">SĐT: {{ schoolLocal.phone_number }}</a></p>
      </div>
      <vs-dropdown class="button-height">
        <a class="flex self-start" href="#">
          <i class="material-icons p-2"> more_vert </i>
        </a>
        <vs-dropdown-menu>
          <vs-dropdown-item :schoolId="schoolLocal.id" @click="displayPrompt">Thông tin trường</vs-dropdown-item>
          <vs-dropdown-item :schoolId="schoolLocal.id"><router-link :to="{ name: 'user-index'}">Xem thông tin lớp học</router-link></vs-dropdown-item>
        </vs-dropdown-menu>
      </vs-dropdown>
    </div>
  </vx-card>
</template>

<style lang="scss">
  .logo-custom {
    max-width: 125px;
    max-height: 125px;
    min-width: 100px;
    min-height: 100px;
    border-radius: .5rem 0 0 .5rem;
    background-size: cover;
  }
</style>

<script>
export default {
  props: {
    schoolId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      schoolLocal: this.$store.getters['school/getSchool'](this.schoolId)
    }
  },
  computed: {
    activeUserInfo() {
      return this.$store.state.AppActiveUser
    },
  },
  methods: {
    displayPrompt() {
      this.$emit('showDisplayPrompt', this.schoolId)
    }
  }
}
</script>
