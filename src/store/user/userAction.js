import axiosApiInstance from "../../axios";
// import qs from 'qs'

const actions = {
  async changePassword(_,payload) {
    let userInfo = JSON.parse(localStorage.getItem('userInfo'));
    let data = {
      "username": userInfo.username,
      ...payload
    }

    let config = {
      method: 'POST',
      url: '/api/res_user/change_password',
      headers: {
        'Authorization': localStorage.getItem('accessToken'),
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      data
    }

    let response = axiosApiInstance(config)
    return response
  }
}

export default actions
