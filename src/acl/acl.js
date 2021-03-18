import Vue from 'vue'
import { AclInstaller, AclCreate, AclRule} from 'vue-acl'
import router from '@/router'

Vue.use(AclInstaller)

let initialRole = 'systemAdmin'

const userInfo = JSON.parse(localStorage.getItem('userInfo'))
if (initialRole && userInfo) {
  switch (userInfo.role.code) {
    case "ADMIN":
      console.log('ADMIN');
      initialRole = "systemAdmin";
      break;
    case "SCHOOL_MASTER":
      console.log('MASTER');
      initialRole = "admin";
      break;
    case "TEACHER":
      console.log('TEACHER');
      initialRole = "teacher";
      break;
  }
}
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
