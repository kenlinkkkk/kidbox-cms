const mutations = {
  SET_LIST_USER_ROLE(state, listRole) {
    state.userListRoles = listRole
  },
  SET_LIST_USER(state, listUser) {
      state.userList = listUser
  },
  SET_PAGINATE(state, data) {
    state.paginate = {
      page: state.paginate.page + 1,
      totalPages: data.totalPages
    }
  },
}

export default mutations
