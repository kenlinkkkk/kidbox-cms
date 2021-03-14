<!-- =========================================================================================
  File Name: UserView.vue
  Description: User View page
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div id="page-user-view">

    <vs-alert color="danger" title="User Not Found" :active.sync="user_not_found">
      <span>User record with id: {{ $route.params.userId }} not found. </span>
      <span>
        <span>Check </span><router-link :to="{name:'user-list'}" class="text-inherit underline">All Users</router-link>
      </span>
    </vs-alert>

    <div id="user-data" v-if="user_data">

      <vx-card title="Tài khoản" class="mb-base">

        <!-- Avatar -->
        <div class="vx-row">

          <!-- Avatar Col -->
          <div class="vx-col" id="avatar-col">
            <div class="img-container mb-4">
              <img :src="user_data.image_url.path" class="rounded w-full" />
            </div>
          </div>

          <!-- Information - Col 1 -->
          <div class="vx-col flex-1" id="account-info-col-1">
            <table>
              <tr>
                <td class="font-semibold">Tài khoản</td>
                <td>{{ user_data.email }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Tên</td>
                <td>{{ user_data.name }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Email</td>
                <td>{{ user_data.email }}</td>
              </tr>
            </table>
          </div>
          <!-- /Information - Col 1 -->

          <!-- Information - Col 2 -->
          <div class="vx-col flex-1" id="account-info-col-2">
            <table>
              <tr>
                <td class="font-semibold">Số điện thoại</td>
                <td>{{ user_data.phone_number }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Quyền hạn</td>
                <td>{{ user_data.user.role_name }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Địa chỉ</td>
                <td>{{ user_data.address }}</td>
              </tr>
            </table>
          </div>
          <!-- /Information - Col 2 -->
          <div class="vx-col w-full flex" id="account-manage-buttons">
            <vs-button icon-pack="feather" icon="icon-edit" class="mr-4" :to="{name: 'user-edit', params: { userId: $route.params.userId }}">Sửa</vs-button>
            <vs-button type="border" color="danger" icon-pack="feather" icon="icon-trash" @click="confirmDeleteRecord">Xóa</vs-button>
          </div>

        </div>

      </vx-card>

<!--      <div class="vx-row">-->
<!--        <div class="vx-col lg:w-1/2 w-full">-->
<!--          <vx-card title="Thông tin liên lạc" class="mb-base">-->
<!--            <table>-->
<!--              <tr>-->
<!--                <td class="font-semibold">Birth Date</td>-->
<!--                <td>{{ user_data.name }}</td>-->
<!--              </tr>-->
<!--              <tr>-->
<!--                <td class="font-semibold">Mobile</td>-->
<!--                <td>{{ user_data.name }}</td>-->
<!--              </tr>-->
<!--              <tr>-->
<!--                <td class="font-semibold">Website</td>-->
<!--                <td>{{ user_data.name }}</td>-->
<!--              </tr>-->
<!--              <tr>-->
<!--                <td class="font-semibold">Gender</td>-->
<!--                <td>{{ user_data.name }}</td>-->
<!--              </tr>name-->
<!--            </table>-->
<!--          </vx-card>-->
<!--        </div>-->
<!--      </div>-->
    </div>
  </div>
</template>

<script>
// import moduleUserManagement from '@/store/user/userStore.js'

export default {
  data () {
    return {
      user_data: null,
      user_not_found: false
    }
  },
  computed: {
  },
  methods: {
    confirmDeleteRecord () {
      this.$vs.dialog({
        type: 'confirm',
        color: 'danger',
        title: 'Xác nhận xóa',
        text: `Bạn muốn xóa tài khoản này "${this.user_data.username}"`,
        accept: this.deleteRecord,
        acceptText: 'Xóa'
      })
    },
    deleteRecord () {
      /* Below two lines are just for demo purpose */
      this.$router.push({name:'app-user-list'})
      this.showDeleteSuccess()

      /* UnComment below lines for enabling true flow if deleting user */
      this.$store.dispatch("userManagement/deleteUserById", { userId: this.user_data.id })
        .then(()   => { this.$router.push({name:'app-user-list'}); this.showDeleteSuccess() })
        .catch(err => { console.error(err)       })
    },
    showDeleteSuccess () {
      this.$vs.notify({
        color: 'success',
        title: 'Xóa thành công',
        text: 'Xóa thông tin tài khoản thành công'
      })
    }
  },
  async created () {
    const userId = this.$route.params.userId
    let response = await this.$store.dispatch('userManagement/getDetailById', { id: userId })
    if (response.code !== 200) {
      this.user_not_found = true
    } else {
      this.user_data = response.data
    }
  }
}

</script>

<style lang="scss">
#avatar-col {
  width: 10rem;
}

#page-user-view {
  table {
    td {
      vertical-align: top;
      min-width: 140px;
      padding-bottom: .8rem;
      word-break: break-all;
    }

    &:not(.permissions-table) {
      td {
        @media screen and (max-width:370px) {
          display: block;
        }
      }
    }
  }
}

// #account-info-col-1 {
//   // flex-grow: 1;
//   width: 30rem !important;
//   @media screen and (min-width:1200px) {
//     & {
//       flex-grow: unset !important;
//     }
//   }
// }


@media screen and (min-width:1201px) and (max-width:1211px),
only screen and (min-width:636px) and (max-width:991px) {
  #account-info-col-1 {
    width: calc(100% - 12rem) !important;
  }

  // #account-manage-buttons {
  //   width: 12rem !important;
  //   flex-direction: column;

  //   > button {
  //     margin-right: 0 !important;
  //     margin-bottom: 1rem;
  //   }
  // }

}

</style>
