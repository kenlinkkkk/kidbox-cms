<template>
  <vx-card>
    <div class="ribbon">
      <span class="ribbon__content" :class="schoolLocal.is_paid ? 'content__success':'content__danger'">{{ schoolLocal.is_paid ? 'Đã thanh toán' : 'Chưa thanh toán' }}</span>
    </div>
    <div class="vx-col md:w-full flex">
      <div class="w-1/3">
        <vs-avatar size="100px" :badge="schoolLocal.is_paid" src="https://kidbox.vn/media/default/no-image.png" v-if="schoolLocal.logoUrl == null"/>
        <vs-avatar size="100px" :src="schoolLocal.logoUrl.path" :badge="schoolLocal.is_paid" v-else/>
      </div>
      <div class="p-2 w-2/3">
        <h4 class="mb-2">{{ schoolLocal.name }}</h4>
        <p>Địa chỉ: {{ schoolLocal.address }}</p>
        <p><a :href="'mailto:' + schoolLocal.email" class="text-black">Email: {{ schoolLocal.email }}</a></p>
        <p><a :href="'tel:' + schoolLocal.phone_number" class="text-black">SĐT: {{ schoolLocal.phone_number }}</a></p>
      </div>
      <vs-dropdown class="button-height" vs-trigger-click>
        <a class="flex self-start" href="#">
          <i class="material-icons p-2"> more_vert </i>
        </a>
        <vs-dropdown-menu>
          <vs-dropdown-item :schoolId="schoolLocal.id" @click="displayPrompt">Thông tin trường</vs-dropdown-item>
          <vs-dropdown-item :schoolId="schoolLocal.id"><router-link :to="{ name: 'class-index', query: {c: schoolLocal.id}}">Xem danh sách lớp học</router-link></vs-dropdown-item>
        </vs-dropdown-menu>
      </vs-dropdown>
    </div>
    <vs-divider />
    <div class="flex">
      <p class="flex-grow">Gói sử dụng: {{ schoolLocal.package.name }}</p>
      <p>Số user tối đa: {{ schoolLocal.package.number_of_user }}</p>
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
        schoolLocal: this.$store.getters['school/getSchool'](this.schoolId),
        badge1: 2
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
<style lang="scss" scoped>
  .ribbon {
    width: 150px;
    height: 150px;
    overflow: hidden;
    position: absolute;
    top: -10px;
    left: -10px;
    &:before  {
      top: 0;
      right: 0;
      border-top-color: transparent;
      border-left-color: transparent;
      position: absolute;
      margin-right: 1.6rem;
      z-index: -1;
      content: '';
      display: block;
      border: 5px solid rgba(0, 0, 0, 0.2);
      box-sizing: content-box;
    }
    &:after {
      bottom: 0;
      left: 0;
      border-bottom-color: transparent;
      border-left-color: transparent;
      position: absolute;
      margin-bottom: 1.6rem;
      z-index: -1;
      content: '';
      display: block;
      border: 5px solid rgba(0, 0, 0, 0.2);
    }
    .ribbon__content {
      left: -65px;
      top: 30px;
      -webkit-transform: rotate(-45deg);
      -ms-transform: rotate(-45deg);
      transform: rotate(-45deg);
      position: absolute;
      display: block;
      width: 225px;
      padding: 5px 0;
      box-shadow: 0 5px 10px rgba(0, 0, 0, 0.192);
      color: #fff;
      text-shadow: 0 1px 1px rgba(0,0,0,.2);
      font-size: 1rem;
      text-align: center;
      border: 2px dotted #fff;
      z-index: 9999;
    }
    .content__success {
      background-color: #28C76F;
      outline : 5px solid  #28C76F;
    }

    .content__danger {
      background-color: #EA5455;
      outline : 5px solid  #EA5455;
    }
  }
</style>
