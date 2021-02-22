const mutations = {
  SET_LIST_USER_ROLE(state, listRole) {
    state.userListRoles = listRole
  },
  SET_LIST_USER(state, listUser) {
    listUser.forEach((item) => {
      state.userList.push(item)
    })
  }
}

export default mutations
