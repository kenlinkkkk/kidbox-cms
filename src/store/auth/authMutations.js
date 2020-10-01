const mutations = {
  SET_AUTHORIZATION (state, response) {
    if (response) {
      state.isAuthorization = response;
    }
  },
  SET_USERINFO(state, response) {
    if (response) {
      state.userInfo = response
    }
  }
}

export default mutations
