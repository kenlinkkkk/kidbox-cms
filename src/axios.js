// axios
import axios from 'axios'
import auth from '../src/http/requests/auth/index.js'
const baseURL = "http://kidbox.vn:8888/"
// const baseURL = "http://localhost:8001/"

const axiosApiInstance = axios.create({
  baseURL: baseURL
})

axiosApiInstance.interceptors.request.use(function (config) {
  config.headers.Authorization = localStorage.getItem('accessToken')
  return config
})

axiosApiInstance.interceptors.response.use((response) => {
  return response
}, async function (error) {
  const originalRequest = error.config
  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true
    const accessToken = await auth.refreshToken()
    localStorage.setItem('accessToken', accessToken.data.token_type +' '+ accessToken.data.access_token)
    localStorage.setItem('refreshToken', accessToken.data.refresh_token)
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('accessToken')
    return axiosApiInstance(originalRequest)
  }
  return Promise.reject(error)
})

export default axiosApiInstance
