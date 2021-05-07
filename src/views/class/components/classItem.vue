<template>
  <vx-card>
    <div slot="no-body" class="vx-col md:w-full m-auto">
      <feather-icon icon="EditIcon" svgClasses="h-6 w-6 text-primary" @click="displayPrompt" class="edit-icon"/>
      <template v-if="classLocal.logoUrl == null">
        <div class="w-full flex">
          <vs-avatar size="120px" src="https://kidbox.vn/media/default/no-image.png" class="logo-custom"/>
        </div>
      </template>
      <template v-else>
        <div class="w-full flex">
          <vs-avatar size="120px" :src="classLocal.logoUrl.path" class="logo-custom"/>
        </div>
      </template>
      <div class="p-2 w-full text-center">
        <h5 class="mb-2">Lớp: {{ classLocal.name }}</h5>
        <div class="flex justify-center">
          <feather-icon icon="MapPinIcon" svgClasses="h-5 w-5 text-grey" class="block" />
          <p class="ml-2">Phòng học: {{ classLocal.room }}</p>
        </div>
      </div>
    </div>
    <vs-button class="w-full" @click="openClassDetail">Chi tiết</vs-button>
  </vx-card>
</template>
<style lang="scss">
  .logo-custom {
    left: 50%;
    transform: translate(-50%);
    background: rgba(255, 255, 255, 0) !important;
  }
  .edit-icon {
    top: 10px;
    left: 90%;
    position: absolute;
    cursor: pointer;
    &:hover {

    }
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
      },
      openClassDetail() {
        this.$router.push('/admin/class/' + this.classId)
      }
    }
  }
</script>
