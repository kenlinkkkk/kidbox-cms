// axios
import axios from 'axios'
import auth from '../src/http/requests/auth/index.js'
// const baseURL = "https://kidbox.vn/"
const localBase = "http://localhost:8001/"

const axiosApiInstance = axios.create({
  baseURL: localBase
})

axiosApiInstance.interceptors.request.use(
  async config => {
    config.headers = {}
    return config;
  },
  error => {
    Promise.reject(error)
  }
);

axiosApiInstance.interceptors.response.use((response) => {
  return response
}, async function (error) {
  const originalRequest = error.config
  if (error.response.status === 401 && !originalRequest._retry()) {
    originalRequest._retry = true;
    const acessToken = await auth.refreshToken()
    localStorage.setItem('accessToken', acessToken.data.token_type +' '+ acessToken.data.access_token)
    console.log('accessToken after refrest: ' + localStorage.getItem('accessToken'))
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('accessToken')

    return axiosApiInstance(originalRequest)
  }
  return Promise.reject(error)
});

export default axiosApiInstance
