import Vue from 'vue'
import { AclInstaller, AclCreate, AclRule} from 'vue-acl'
import router from '@/router'

Vue.use(AclInstaller)

let initialRole = 'Any'

const userInfo = JSON.parse(localStorage.getItem('userInfo'))
if (initialRole && userInfo) {
  switch (userInfo.role.code) {
    case "ADMIN":
      initialRole = "Admin";
      break;
    case "SCHOOL_MASTER":
      initialRole = "Master";
      break;
    case "TEACHER":
      initialRole = "Teacher";
      break;
    case "PARENT":
      initialRole = "Parent";
      break;
    case "DRIVER":
      initialRole = "Driver";
      break;
    default:
      initialRole = "Any";
      break;
  }
}
export default new AclCreate({
  initial  : initialRole,
  notfound : '/pages/not-authorized',
  router,
  acceptLocalRules : true,
  globalRules: {
    Admin :           new AclRule('Admin').generate(),
    Master :          new AclRule('Master').generate(),
    Teacher :         new AclRule('Teacher').generate(),
    Parent:           new AclRule('Parent').generate(),
    Driver:           new AclRule('Driver').generate(),
    AdminOrMaster:    new AclRule('Admin').or('Master').generate(),
    MasterOrTeacher:  new AclRule('Master').or('Teacher').generate(),
    Any:              new AclRule('Any').or('Admin').or('Master').or('Teacher').or('Parent').or('Driver').generate(),
  }
})
