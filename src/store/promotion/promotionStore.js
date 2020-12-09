import actions from "./promotionAction.js";
import state from "./promotionState.js"
import mutations from "./promotionMutations.js"
import getters from "./promotionGetters.js"

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
