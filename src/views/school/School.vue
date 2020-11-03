<template>
  <div class="vx-row">
    <div class="vx-col w-full md:w-1/4 mb-base inline-flex" v-for="school in schools">
      <vx-card @click="popupNotify">
        <div slot="no-body" class="vx-col md:w-full flex ">
<!--          <template v-if="school.logo_url == null">-->
            <img :src="activeUserInfo.photoURL" alt="content-img" class="md:w-1/3 card-img-left">
<!--          </template>-->
<!--          <template v-else>-->
<!--            <img :src="school.logo_url.path" alt="content-img" class="w-1/3 responsive card-img-left">-->
<!--          </template>-->
          <div class="p-2 w-2/3">
            <h5 class="mb-2">{{ school.name }}</h5>
            <p><a :href="'mailto:' + school.email " class="text-black">Email: {{ school.email }}</a></p>
            <p><a :href="'tel:' + school.phone_number" class="text-black">SĐT: {{ school.phone_number }}</a></p>
          </div>
          <vs-dropdown class="button-height">
            <a class="flex self-start" href="#">
              <i class="material-icons p-2"> more_vert </i>
            </a>
            <vs-dropdown-menu>
              <vs-dropdown-item @click="popupNotify">Xem thông tin trường</vs-dropdown-item>
              <vs-dropdown-item @click="popupNotify">Cập nhật thông tin trường học</vs-dropdown-item>
            </vs-dropdown-menu>
          </vs-dropdown>
        </div>
      </vx-card>
    </div>
  </div>
</template>
<style>
  .button-height {
    height: 10px;
  }
</style>
<script>
  import { VueContext } from 'vue-context'
  export default {
    mounted() {
      this.getSchoolList().then(data => {
        this.schools = data
      })
    },
    data() {
      return {
        schools: []
      }
    },
    components: {
      VueContext
    },
    computed: {
      activeUserInfo() {
        return this.$store.state.AppActiveUser
      }
    },
    methods: {
      async getSchoolList() {
        let response = await this.$store.dispatch('getListSchool');
        if (response.status === 200) {
          return response.data.data.data;
        }
      },
      async popupNotify() {
        console.log('click');
      }
    }
  }
</script>
