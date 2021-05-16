import axios from "axios"

const baseURL = process.env.VUE_APP_ENVIRONMENT === 'dev' ? process.env.VUE_APP_LOCAL_BASE_URL : process.env.VUE_APP_PROD_BASE_URL

export default axios.create({
  baseURL: baseURL
})
