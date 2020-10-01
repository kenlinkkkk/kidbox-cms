import axios from "../../../axios";
import qs from 'qs'
export default {
  login(payload) {
    let data = qs.stringify({
      'grant_type' : 'password',
      ...payload
    });

    let config = {
        method: 'post',
        url: 'o/token/',
        headers: {
          'Authorization': 'Basic TnNwc05UajlrbzRpVTVYY0hBams2cEw3VjZsYXFRWEVmZ1V6aktzYjpWVzJzOElzMDQ2VDNLOElvbm94ZFYzZ0I4OFJxNzZnc3ZXT3JnOTNadVRMQVVrT2ZSRzRMMUsxVERFMFNYN1BraXdoOURTTkdQT1dSU0dmY1hRUEp3am5GcTVzMUJERHZpWmJTcVB1b2hRUGN3ZzF2Znh2WEpjeVhNWEhLbFprRg==',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data
      }

    return axios(config)
  },

  getUserInfo(payload) {
    let data = {
      'username' : payload.username
    }

    let config = {
      method: 'POST',
      url: 'api/res_user/detail_by_username',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('accessToken')
      }, data
    }

    return axios(config)
  }
}
