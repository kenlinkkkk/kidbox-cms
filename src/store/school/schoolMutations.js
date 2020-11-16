const mutations = {
  SET_SCHOOLS_INFO (state, schoolsInfo) {
    schoolsInfo.forEach(function (item) {
      item.logoUrl = item.logo_url
      delete item.logo_url
    })

    state.schools = schoolsInfo.filter(function (el) {
      return el !== null
    })
  }
}

export default mutations
