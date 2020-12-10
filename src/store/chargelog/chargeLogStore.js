import actions from "./chargeLogAction.js";
import state from "./chargeLogState.js"
import mutations from "./chargeLogMutations.js"
import getters from "./chargeLogGetters.js"

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
