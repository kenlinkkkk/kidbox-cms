import auth from '../../http/requests/auth/index.js'
const actions = {
  async login({ commit, dispatch }, payload) {
    try{
      const response = await auth.login(payload)
      if (response.data) {
        localStorage.setItem('accessToken', response.data.token_type +' '+ response.data.access_token)
        localStorage.setItem('refreshToken', response.data.refresh_token)
        localStorage.setItem('tokenExpires', response.data.expires_in)

        commit('SET_AUTHORIZATION', true)

        dispatch('getUserInfo', payload)
      }
      return response
    }catch (e) {
      console.log('LOGIN:', e)
      return {error: true}
    }
  },
  async getUserInfo({commit, }, payload){
    try {
      const userInfo = await auth.getUserInfo(payload)

      if(userInfo.data){
        commit('SET_USERINFO', userInfo.data)
      }

      return userInfo
    }catch (e) {
      console.log('USER_INFO:', e)
      return {error: true}
    }
  }
}
export default actions
