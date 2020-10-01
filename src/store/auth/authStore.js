import actions from "./authActions.js";
import state from "./authState.js";
import mutations from "./authMutations.js";
import getters from "./authGetters.js"

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
