<template>
  <vx-card no-shadow class="vx-col md:w-1/4 w-full" title="Trường tiểu học ABC" @click="popupNotify">
    <div class="vx-row">
      <div class="vx-col flex-1">
        <div class="img-container mb-4">
          <img :src="activeUserInfo.photoURL" class="rounded w-full">
        </div>
      </div>
      <div class="vx-col flex-2">
        <table>
          <tr>
            <td class="font-semibold">Email: </td>
            <td>tieuhocABC@gmail.com</td>
          </tr>
          <tr>
            <td class="font-semibold">SĐT: </td>
            <td>0123456789</td>
          </tr>
        </table>
      </div>
    </div>
  </vx-card>
</template>

<script>
  export default {
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
