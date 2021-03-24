const mutations = {
  SET_LIST_USER_ROLE(state, listRole) {
    state.userListRoles = listRole
  },

  SET_LIST_USER(state, listUser) {
    state.userList = []
    listUser.forEach((item) => {
      if (item !== null) {
        state.userList.push(item)
      }
    })
  },
  SET_PAGINATE(state, data) {
    state.paginate = {
      page: state.paginate.page + 1,
      totalPages: data.totalPages
    }
  },
  SET_LIST_PARENTS(state, parents) {
    state.parents = parents
  },
  SET_CROLL_PARENTS(state, parents) {
    parents.forEach(element => {
      state.parents.push(element)
    });

  },
}

export default mutations
