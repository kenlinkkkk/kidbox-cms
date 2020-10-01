import auth from '../../http/requests/auth/index.js'
const actions = {
  async login({ commit }, payload) {
    return await auth.login(payload).then(response => {
      if (response.data) {
        localStorage.setItem('accessToken', response.data.token_type +' '+ response.data.access_token)
        localStorage.setItem('refreshToken', response.data.refresh_token)
        localStorage.setItem('tokenExpires', response.data.expires_in)

        commit('SET_AUTHORIZATION', true)
        new Promise(((resolve, reject) => {
          auth.getUserInfo(payload).then(response => {
            commit('SET_USERINFO', response.data)
          }).catch(error => { reject(error) })
        }))
      }
    }).catch(error => {
      console.error(error)
    })
  }
}
export default actions
