const mutations = {
  SET_AUTHORIZATION (state, response) {
    if (response) {
      state.isAuthorization = response;
    }
  }
}

export default mutations
