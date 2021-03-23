import actions      from    "./userAction.js"
import mutations    from    "./userMutations";
import state        from    "./userState";
import getters      from    "./userGetters";

export default {
  namespaced: true,
  actions,
  mutations,
  state,
  getters
}
