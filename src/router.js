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
            meta: {
              rule: 'teacher'
            },
          },
          {
            path: 'profile',
            name: 'profile-index  ',
            component: () => import('./views/user/userProfile.vue'),
            meta: {
              rule: 'teacher'
            },
          },
          {
            path: 'school',
            name: 'school-index',
            component: () => import('./views/school/School.vue'),
            meta: {
              rule: 'admin'
            },
          },
          {
            path: 'class',
            name: 'class-index',
            component: () => import('./views/class/classIndex.vue'),
            meta: {
              rule: 'teacher'
            },
          },
          {

            path: 'subpackage',
            name: 'subpackage-index',
            component: () => import('./views/payment/subpackage/subPackageIndex.vue'),
            meta: {
              rule: 'systemAdmin'
            },
          },
          {

            path: 'notification',
            name: 'notification-index',
            component: () => import('./views/notification/pushhistory/notificationIndex.vue'),
            meta: {
              rule: 'admin'
            },
          },
          // {
          //
          //   path: 'notificationType',
          //   name: 'notification-index',
          //   component: () => import('./views/notification/type/notificationTypeIndex.vue'),
          // },
          {
            path: 'promotion',
            name: 'promotion-index',
            component: () => import('./views/payment/promotion/promotionIndex.vue'),
            meta: {
              rule: 'systemAdmin'
            },
          },
          {
            path: 'chargelog',
            name: 'chargelog-index',
            component: () => import('./views/payment/chargelog/chargeLogIndex.vue'),
            meta: {
              rule: 'systemAdmin'
            },
          },
          {
            path: 'rate',
            name: 'rate-index',
            redirect: 'rate/all',
          },
          {
          path: 'rate/:ruleId',
          component: () => import('./views/rate/rateIndex.vue'),
            meta: {
              rule: 'admin',
              parent: 'rate-index',
              no_scroll: true
            }
          },
          {
            path: 'infrastructure',
            name: 'infrastructure-index',
            redirect: 'infrastructure/all',
            meta: {
              rule: 'admin',
              no_scroll: true
            }
          },
          {
            path: 'infrastructure/:typeId',
            name: 'infrastructure-type',
            component: () => import('./views/infrastructure/InfrastructureIndex.vue'),
            meta: {
              rule: 'admin',
              parent: 'infrastructure-index',
              no_scroll: true
            }
          },
          {
            path: 'menu',
            name: 'class-menu',
            component: () => import('./views/class/menu/menuIndex.vue'),
            meta: {
              rule: 'teacher'
            },
          },
          {
            path: 'schedule',
            name: 'class-schedule',
            component: () => import('./views/class/schedules/scheduleIndex.vue'),
            meta: {
              rule: 'teacher'
            },
          },
          {
            path: 'post',
            name: 'school-post',
            component: () => import('./views/post/postIndex.vue'),
            meta: {
              rule: 'teacher'
            }
          },
          {
            path: 'user',
            name: 'user-list',
            component: () => import('./views/user/user-list/UserList.vue'),
            meta: {
              rule: 'systemAdmin'
            }
          },
          {
            path: 'user/add',
            name: 'add-user',
            component: () => import('./views/user/UserAdd.vue'),
            meta: {
              rule: 'systemAdmin'
            }
          },
          {
            path: 'user/view/:userId',
            name: 'user-view',
            component: () => import('./views/user/UserView.vue'),
            meta: {
              rule: 'systemAdmin'
            }
          },
          {
            path: 'user/edit/:userId',
            name: 'user-edit',
            component: () => import('./views/user/user-edit/UserEdit.vue'),
            meta: {
              rule: 'systemAdmin'
            }
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
            meta: {
              rule: 'teacher'
            },
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
            component: () => import('@/views/pages/Error404.vue'),
            meta: {
              rule: 'teacher'
            }
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
