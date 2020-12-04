<template>
  <vx-card>
    <div slot="no-body" class="vx-col md:w-full flex">
      <template v-if="classLocal.logoUrl == null">
        <div class="w-1/3">
          <img src="https://kidbox.vn/media/default/no-image.png" alt="content-img" class="logo-custom responsive card-img-left">
        </div>
      </template>
      <template v-else>
        <div class="logo-custom" :style="{ backgroundImage: 'url(' + classLocal.logoUrl.path + ')' }"></div>
      </template>
      <div class="p-2 w-2/3">
        <h5 class="mb-2">{{ classLocal.name }}</h5>
        <h5 class="mb-2">{{ classLocal.room }}</h5>
      </div>
      <vs-dropdown class="button-height">
        <a class="flex self-start" href="#">
          <i class="material-icons p-2"> more_vert </i>
        </a>
        <vs-dropdown-menu>
          <vs-dropdown-item :classId="classLocal.id" @click="displayPrompt">Thông tin lớp</vs-dropdown-item>
          <vs-dropdown-item :classId="classLocal.id" @click="closeClassAction">Đóng lớp</vs-dropdown-item>
          <vs-dropdown-item :classId="classLocal.id"><router-link :to="{ name: 'class-menu', query: {classId: classLocal.id}}">Thực đơn và lịch học</router-link></vs-dropdown-item>
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
      classId: {
        type: Number,
        require: true
      }
    },
    data() {
      return {
        classLocal: this.$store.getters['class/getClassById'](this.classId)
      }
    },
    methods: {
      displayPrompt() {
        this.$emit('showDisplayPrompt', this.classId)
      },
      async closeClassAction() {
        let response = await this.$store.dispatch('class/closeClass', this.classId)
        if (response.status === 200) {
          this.$store.dispatch('class/getClassBySchoolId', this.$route.params)
          this.$vs.notify({
            title:'Đóng lớp thành công',
            position: 'top-right',
            color:'success',
            iconPack: 'feather',
            icon:'icon-check'
          });
        } else {
          this.$vs.notify({
            title:'Đóng lớp không thành công',
            position: 'top-right',
            color:'danger',
            iconPack: 'feather',
            icon:'icon-x'
          });
        }
      }
    }
  }
</script>
