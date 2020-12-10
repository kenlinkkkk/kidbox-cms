import actions from "./notificationAction.js";
import state from "./notificationState.js"
import mutations from "./notificationMutations.js"
import getters from "./notificationGetters.js"

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
