import axiosApiInstance from "../../axios";
// import qs from 'qs'

export default {
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
        'Content-Type': 'application/json'
      },
      data
    }

    let response = axiosApiInstance(config)
    return response
  }
}
