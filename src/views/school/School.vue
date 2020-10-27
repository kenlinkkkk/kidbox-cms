<template>
  <div class="vx-row">
    <div class="vx-col w-full mb-base">
      <vx-card class="vx-col md:w-1/4 w-full flex" @contextmenu.prevent="$refs.menu.open" @click="popupNotify">
        <div slot="no-body" class="vx-col md:w-full flex">
          <vue-context ref="menu">
            <li>
              <a href="#" class="flex items-center text-sm">
                <feather-icon icon="PlusIcon" svgClasses="w-5 h-5" />
                <span class="ml-2">New</span>
              </a>
            </li>
          </vue-context>
          <img :src="activeUserInfo.photoURL" alt="content-img" class="w-1/3 responsive card-img-left">
          <div class="p-2">
            <h5 class="mb-2">Trường tiểu học ABC</h5>
            <p class="text-grey">Email: </p>
            <p class="text-grey">SĐT: </p>
          </div>
        </div>
      </vx-card>
    </div>
  </div>
</template>

<script>
  import { VueContext } from 'vue-context'
  export default {
    components: {
      VueContext
    },
    computed: {
      activeUserInfo() {
        return this.$store.state.AppActiveUser
      }
    },
    methods: {
      popupNotify() {
        console.log('click')
      }
    }
  }
</script>
