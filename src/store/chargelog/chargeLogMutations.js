const mutations = {
  SET_LIST_CHARGE_LOGS(state, chargelogs) {
    state.chargelogs = chargelogs;
  },
  UPDATE_CHARGE_LOG(state, chargelog){
    state.chargelog = chargelog;
  },
  ADD_CHARGE_LOG (state, chargelogItem) {
    state.chargelogs.unshift(chargelogItem)
  },
  SET_TOTAL_PAGES(state, totalPages){
    state.totalPages = totalPages
  },
}

export default mutations
