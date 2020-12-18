import Vue from 'vue'
import { AclInstaller, AclCreate, AclRule} from 'vue-acl'
import router from '@/router'

Vue.use(AclInstaller)

let initialRole = 'teacher'

// const userInfo = JSON.parse(localStorage.getItem('userInfo'))
// const userListRole = userInfo.role
// if (userInfo && userInfo.userRole) initialRole = userInfo.userRole

export default new AclCreate({
  initial  : initialRole,
  notfound : '/pages/not-authorized',
  router,
  acceptLocalRules : true,
  globalRules: {
    systemAdmin :   new AclRule('systemAdmin').generate(),
    admin :         new AclRule('admin').or('systemAdmin').generate(),
    teacher:        new AclRule('teacher').or('admin').or('systemAdmin').generate(),
  }
})
