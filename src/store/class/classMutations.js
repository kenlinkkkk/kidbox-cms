const mutations = {
  SET_LIST_CLASSES(state, listClasses) {
    listClasses.forEach(function(item) {
      if (item) {
        item.logoUrl = item.logo_url
        delete item.logo_url
      }
    })

    state.listClasses = listClasses.filter(function (el) {
      return el != null;
    })
  },

  SET_CLASSES(state, classes){
    state.listClasses = classes
  },

  SET_LIST_STUDENTS (state, data) {
    if (data.action === "SET") {
      state.students = data.data
    } else if (data.action === "PUSH") {
      data.data.forEach((item) => {
        if (item) {
          state.students.push(item)
        }
      })
    }
  }

}

export default mutations
