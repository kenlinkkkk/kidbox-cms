import axios from "../../axios/index.js";
import qs from 'qs'
export default {
  login(payload) {
    let data = qs.stringify({
      'grant_type' : 'password',
      ...payload
    });

    let config = {
        method: 'POST',
        url: 'o/token/',
        headers: {
          'Authorization': 'Basic TnNwc05UajlrbzRpVTVYY0hBams2cEw3VjZsYXFRWEVmZ1V6aktzYjpWVzJzOElzMDQ2VDNLOElvbm94ZFYzZ0I4OFJxNzZnc3ZXT3JnOTNadVRMQVVrT2ZSRzRMMUsxVERFMFNYN1BraXdoOURTTkdQT1dSU0dmY1hRUEp3am5GcTVzMUJERHZpWmJTcVB1b2hRUGN3ZzF2Znh2WEpjeVhNWEhLbFprRg==',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: data
      }
    return axios(config)
  },
  getUserInfo(payload) {
    let data = JSON.stringify({
      'username' : payload.username
    })

    let config = {
      method: 'POST',
      url: 'api/res_user/detail_by_username',
      headers: {
        'content-type': 'application/json',
        'Authorization': localStorage.getItem('accessToken')
      },
      data: data
    }
    return axios(config)
  },
  refreshToken() {
    let data = qs.stringify({
      'grant_type' : 'refresh_token',
      'refresh_token' : localStorage.getItem('refreshToken'),
      'client_id' : 'NspsNTj9ko4iU5XcHAjk6pL7V6laqQXEfgUzjKsb',
      'client_secret' : 'VW2s8Is046T3K8IonoxdV3gB88Rq76gsvWOrg93ZuTLAUkOfRG4L1K1TDE0SX7Pkiwh9DSNGPOWRSGfcXQPJwjnFq5s1BDDviZbSqPuohQPcwg1vfxvXJcyXMXHKlZkF'
    });

    let config = {
      method: 'POST',
      url: 'o/token',
      headers: {
        'Authorization': localStorage.getItem('accessToken'),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: data
    }
    return axios(config)
  }
}
