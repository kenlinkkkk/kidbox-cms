import actions from "./subPackageAction.js";
import state from "./subPackageState.js"
import mutations from "./subPackageMutations.js"
import getters from "./subPackageGetters.js"

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
