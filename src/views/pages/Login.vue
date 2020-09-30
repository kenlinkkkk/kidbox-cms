<!-- =========================================================================================
    File Name: Login.vue
    Description: Login Page
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
  <div class="h-screen flex w-full bg-img vx-row no-gutter items-center justify-center" id="page-login">
    <div class="vx-col sm:w-1/2 md:w-1/2 lg:w-3/4 xl:w-3/5 sm:m-0 m-4">
      <vx-card>
        <div slot="no-body" class="full-page-bg-color">

          <div class="vx-row no-gutter justify-center items-center">

            <div class="vx-col hidden lg:block lg:w-1/2">
              <img src="@/assets/images/pages/login.png" alt="login" class="mx-auto">
            </div>

            <div class="vx-col sm:w-full md:w-full lg:w-1/2 d-theme-dark-bg">
              <div class="p-8 login-tabs-container">

                <div class="vx-card__title mb-4">
                  <h4 class="mb-4">Đăng nhập</h4>
                  <p>Chào mừng quay trở lại.</p>
                </div>

                <div>
                  <vs-input
                    name="username"
                    icon-no-border
                    icon="icon icon-user"
                    icon-pack="feather"
                    label-placeholder="Tài khoản"
                    v-model="username"
                    class="w-full pt-2"/>

                  <vs-input
                    type="password"
                    name="password"
                    icon-no-border
                    icon="icon icon-lock"
                    icon-pack="feather"
                    label-placeholder="Mật khẩu"
                    v-model="password"
                    class="w-full mt-6 pt-2" />

                  <div class="flex flex-wrap justify-end my-5">
                      <router-link to="">Quên mật khẩu?</router-link>
                  </div>
                  <vs-button class="float-right" @click="login">Đăng nhập</vs-button>

                  <vs-divider>Kidbox</vs-divider>

                  <div class="social-login-buttons flex flex-wrap items-center mt-4">
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </vx-card>
    </div>
  </div>
</template>

<script>
import axios from "../../axios";
import qs from "qs"
export default{
  name: 'Login',
  data() {
    return {
      username: "",
      password: "",
    }
  },
  methods: {
    async login(e) {
      e.preventDefault()

      let data = qs.stringify({
        "grant_type" : "password",
        "username" : this.username,
        "password" : this.password
      })

      let config = {
        method: 'post',
        url: 'o/token/',
        headers: {
          'Authorization': 'Basic TnNwc05UajlrbzRpVTVYY0hBams2cEw3VjZsYXFRWEVmZ1V6aktzYjpWVzJzOElzMDQ2VDNLOElvbm94ZFYzZ0I4OFJxNzZnc3ZXT3JnOTNadVRMQVVrT2ZSRzRMMUsxVERFMFNYN1BraXdoOURTTkdQT1dSU0dmY1hRUEp3am5GcTVzMUJERHZpWmJTcVB1b2hRUGN3ZzF2Znh2WEpjeVhNWEhLbFprRg==',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data : data
      };

      axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
          console.log(error);
        });

    }
  }
}
</script>

<style lang="scss">
#page-login {
  .social-login-buttons {
    .bg-facebook { background-color: #1551b1 }
    .bg-twitter { background-color: #00aaff }
    .bg-google { background-color: #4285F4 }
    .bg-github { background-color: #333 }
  }
}
</style>
