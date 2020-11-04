import actions from "./schoolAction.js";
import state from "./schoolState.js"
import mutations from "./schoolMutations.js"
import getters from "./schoolGetters.js"

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
