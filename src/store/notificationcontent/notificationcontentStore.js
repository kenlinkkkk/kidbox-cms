import actions from "./notificationcontentAction.js";
import state from "./notificationState.js"
import mutations from "./notificationcontentMutations.js"
import getters from "./notificationcontentGetters.js"

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
