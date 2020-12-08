import actions from "./scheduleActions";
import mutations from "./scheduleMutations";
import state from "./scheduleState"
import getters from "./scheduleGetters";

export default {
  namespaced: true,
  actions,
  state,
  mutations,
  getters
}
