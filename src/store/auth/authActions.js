import auth from '../../http/requests/auth/index.js'
const actions = {
  async login({ commit, dispatch }, payload) {
    try{
      const response = await auth.login(payload)
      if (response.data) {
        localStorage.setItem('accessToken', response.data.token_type +' '+ response.data.access_token)
        localStorage.setItem('refreshToken', response.data.refresh_token)
        localStorage.setItem('tokenExpires', response.data.expires_in)
        localStorage.setItem('isAuthorization', 'true')

        commit('SET_AUTHORIZATION', true)
        let resp = await dispatch('getUserInfo', payload)
        return resp.data
      }
    }catch (e) {
      return {error: true }
    }
  },
  async getUserInfo({ commit }, payload){
    try {
      const userInfo = await auth.getUserInfo(payload)
      if(userInfo.data){
        localStorage.setItem('userInfo', JSON.stringify(userInfo.data.data))
        localStorage.setItem('schoolId', userInfo.data.school_id)
        commit('SET_USERINFO', userInfo.data)
        commit('SET_SCHOOL_ID', userInfo.data.school_id)
      }
      return userInfo
    }catch (e) {
      return {error: true }
    }
  },
  async logout() {
    try {
      const logout = await auth.destroyToken()
      if (logout.status === 200) {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('tokenExpires')
        localStorage.setItem('isAuthorization', 'false')
        localStorage.removeItem('userInfo')
      }
      return logout.status
    } catch (e) {
      return { error: true }
    }
  }
}
export default actions
