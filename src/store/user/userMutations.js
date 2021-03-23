const mutations = {
  SET_LIST_USER_ROLE(state, listRole) {
    state.userListRoles = listRole
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
