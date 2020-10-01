import auth from '../../http/requests/auth/index.js'
const actions = {
  async login({ commit }, payload) {
    return await auth.login(payload).then(response =>{
      if (response.data) {
        localStorage.setItem('accessToken', response.data.token_type +' '+ response.data.access_token)
        localStorage.setItem('refreshToken', response.data.refresh_token)
        localStorage.setItem('tokenExpires', response.data.expires_in)

        commit('SET_AUTHORIZATION', true)
      }
    }).catch(error => {
      console.error(error)
    })
  }
}
export default actions
