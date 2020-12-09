import actions from "./rateAction.js";
import state from "./rateState.js"
import mutations from "./rateMutations.js"
import getters from "./rateGetters.js"

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
