const mutations = {
  SET_LIST_CLASSES(state, listClasses) {
    listClasses.forEach(function(item) {
      item.logoUrl = item.logo_url
      delete item.logo_url
    })

    state.listClasses = listClasses.filter(function (el) {
      return el != null;
    })
  }
}

export default mutations
