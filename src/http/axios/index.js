import axios from "axios"

const baseURL = "https://kidbox.vn/"
// const baseURL = "http://localhost:8001/"

export default axios.create({
  baseURL: baseURL
})
