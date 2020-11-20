import actions from "./infrastructureActions";
import mutations from "./infrastructureMutations";
import state from "./infrastructureState"
import getters from "./infrastructureGetters";

export default {
  namespaced: true,
  actions,
  state,
  mutations,
  getters
}
