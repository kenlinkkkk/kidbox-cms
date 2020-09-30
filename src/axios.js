// axios
import axios from 'axios'

const baseURL = "https://kidbox.vn"

export default axios.create({
  baseURL: baseURL
  // You can add your headers here
})
