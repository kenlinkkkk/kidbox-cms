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
  },
  SET_SCHOOL_ID(state, response) {
    if (response) {
      state.AppActiveUser.schoolId = response
    }
  }
}

export default mutations
