import Vue from 'vue'
import Router from 'vue-router'
import store from "./store/store";
Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    scrollBehavior () {
        return { x: 0, y: 0 }
    },
    routes: [
      {
        path: '/admin',
        component: () => import('./layouts/main/Main.vue'),
        beforeEnter: (to, from, next) => {
          if (store.getters['auth/Authentication'] !== true) {
            return next({
              name:  'page-login'
            });
          }
          next()
        },
        children: [
          {
            path: '',
            name: 'home',
            component: () => import('./views/Home.vue'),
          },
          {
            path: 'page2',
            name: 'page2',
            component: () => import('./views/Page2.vue'),
          },
          {
            path: 'user',
            name: 'user-index',
            component: () => import('./views/userManager/userManager.vue')
          },
          {
            path: 'profile',
            name: 'profile',
            component: () => import('./views/user/userProfile.vue'),
          }
        ],
      },
      {
        path: '/',
        component: () => import('@/layouts/full-page/FullPage.vue'),
        children: [
          {
            path: 'login',
            name: 'page-login',
            component: () => import('@/views/pages/Login.vue'),
            beforeEnter: (to, from, next) => {
              if (store.getters['auth/Authentication'] === true) {
                return next({
                  name:  'home'
                });
              }
              next()
            }
          },
          {
            path: 'error-404',
            name: 'page-error-404',
            component: () => import('@/views/pages/Error404.vue')
          },
        ]
      },
      // Redirect to 404 page, if no match found
      {
        path: '*',
        redirect: '/error-404'
      }
    ],
})

router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
    if (appLoading) {
        appLoading.style.display = "none";
    }
})

export default router
