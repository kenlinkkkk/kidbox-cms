// axios
import axios from 'axios'
// import auth from '../src/http/requests/auth/index.js'
const baseURL = "http://kidbox.vn:8888/"
// const baseURL = "http://localhost:8001/"

const axiosApiInstance = axios.create({
  baseURL: baseURL
})

export default axiosApiInstance
