const mutations = {
  SET_SCHOOLS_INFO (state, schoolsInfo) {
    state.schools = schoolsInfo.filter(function (el) {
      return el !== null
    })
  }
}

export default mutations
