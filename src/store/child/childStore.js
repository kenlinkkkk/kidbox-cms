import actions from "./childActions";
import mutations from "./childMutation";
import state from "./childState"
import getters from "./childGetters";

export default {
  namespaced: true,
  actions,
  state,
  mutations,
  getters
}
