const mutations = {
  APPEND_LIST_INFRASTRUCTURE_TYPE(state, infrastructureType) {
    infrastructureType.forEach((item) => {
      state.infrastructureTypes.push(item)
    })
  },
  SET_LIST_INFRASTRUCTURE_TYPE(state, infrastructureType) {
    state.infrastructureTypes = infrastructureType
  },
  SET_LIST_INFRASTRUCTURE(state, infrastructures) {
    state.infrastructures = infrastructures
  },
  APPEND_LIST_INFRASTRUCTURE(state, infrastructures) {
    infrastructures.forEach((item) => {
      state.infrastructures.push(item)
    })
  }
}

export default mutations
