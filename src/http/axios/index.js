import axios from "axios"

const baseURL = "https://kidbox.vn/"
const localBase = "http://localhost:8000/"

export default axios.create({
  baseURL: localBase
})
