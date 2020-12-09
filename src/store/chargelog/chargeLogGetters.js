const getters = {
  getChargeLogs: state =>{
    return state.chargelogs;
  },
  getChargeLog: state => chargelogId => state.chargelogs.find((p) => p.id === chargelogId),
  getTotalPages: state =>{
    return state.totalPages;
  },
}

export default getters
