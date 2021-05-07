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
            name: 'dashboard',
            component: () => import('./views/Home.vue'),
            meta: {
              rule: 'Any'
            },
          },
          {
            path: 'profile',
            name: 'profile-index  ',
            component: () => import('./views/user/userProfile.vue'),
            meta: {
              rule: 'Any'
            },
          },
          {
            path: 'school',
            name: 'school-index',
            component: () => import('./views/school/School.vue'),
            meta: {
              rule: 'AdminOrMaster'
            },
          },
          {
            path: 'class',
            name: 'class-index',
            component: () => import('./views/class/classIndex.vue'),
            meta: {
              rule: 'Any'
            },
          },
          {
            path: 'class/:classId',
            name: 'class-detail',
            component: () => import('./views/class/child/ChildList.vue'),
            meta: {
              rule: 'Any'
            },
          },
          {
            path: 'child/edit/:childId',
            name: 'child-edit',
            component: () => import('./views/class/child/ChildEdit'),
            meta: {
              rule: "Any"
            }
          },
          {
            path: 'child/view/:childId',
            name: 'child-view',
            component: () => import('./views/class/child/ChildDetail'),
            meta: {
              rule: "Any"
            }
          },
          {
            path: 'checkin',
            name: 'checkin-index',
            redirect: 'checkin/all',
            meta: {
              rule: 'Teacher'
            },
          },
          {
            path: 'checkin/:classId',
            component: () => import('./views/class/classNew/ClassIndex.vue'),
            meta: {
              rule: 'Teacher',
              parent: 'checkin-index',
              no_scroll: true
            }
          },
          {

            path: 'subpackage',
            name: 'subpackage-index',
            component: () => import('./views/payment/subpackage/subPackageIndex.vue'),
            meta: {
              rule: 'Admin'
            },
          },
          {

            path: 'notification',
            name: 'notification-index',
            component: () => import('./views/notification/pushhistory/notificationIndex.vue'),
            meta: {
              rule: 'Admin'
            },
          },
          {

            path: 'notification-content',
            name: 'notification-content-index',
            component: () => import('./views/notification/content/notificationContentIndex.vue'),
            meta: {
              rule: 'AdminOrMaster'
            },
          },
          {
            path: 'promotion',
            name: 'promotion-index',
            component: () => import('./views/payment/promotion/promotionIndex.vue'),
            meta: {
              rule: 'Admin'
            },
          },
          {
            path: 'chargelog',
            name: 'chargelog-index',
            component: () => import('./views/payment/chargelog/chargeLogIndex.vue'),
            meta: {
              rule: 'Admin'
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
              rule: 'AdminOrMaster',
              parent: 'rate-index',
              no_scroll: true
            }
          },
          {
            path: 'infrastructure',
            name: 'infrastructure-index',
            redirect: 'infrastructure/all',
            meta: {
              rule: 'MasterOrTeacher',
              no_scroll: true
            }
          },
          {
            path: 'infrastructure/:typeId',
            name: 'infrastructure-type',
            component: () => import('./views/infrastructure/InfrastructureIndex.vue'),
            meta: {
              rule: 'MasterOrTeacher',
              parent: 'infrastructure-index',
              no_scroll: true
            }
          },
          {
            path: 'menu',
            name: 'class-menu',
            component: () => import('./views/class/menu/menuIndex.vue'),
            meta: {
              rule: 'MasterOrTeacher'
            },
          },
          {
            path: 'schedule',
            name: 'class-schedule',
            component: () => import('./views/class/schedules/scheduleIndex.vue'),
            meta: {
              rule: 'MasterOrTeacher'
            },
          },
          {
            path: 'post',
            name: 'school-post',
            component: () => import('./views/post/post/PostIndex.vue'),
            meta: {
              rule: 'Any'
            }
          },
          {
            path: 'user',
            name: 'user-list',
            component: () => import('./views/user/user-list/UserList.vue'),
            meta: {
              rule: 'AdminOrMaster'
            }
          },
          {
            path: 'user/add',
            name: 'add-user',
            component: () => import('./views/user/UserAdd.vue'),
            meta: {
              rule: 'AdminOrMaster'
            }
          },
          {
            path: 'user/view/:userId',
            name: 'user-view',
            component: () => import('./views/user/UserView.vue'),
            meta: {
              rule: 'Any'
            }
          },
          {
            path: 'user/edit/:userId',
            name: 'user-edit',
            component: () => import('./views/user/user-edit/UserEdit.vue'),
            meta: {
              rule: 'AdminOrMaster'
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
              rule: 'Any'
            },
            beforeEnter: (to, from, next) => {
              if (store.getters['auth/Authentication'] === true) {
                return next({
                  name:  'dashboard'
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
              rule: 'Any'
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
