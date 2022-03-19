import axios from 'axios'

const baseURL = `${process.env.AOZORA_API_ENDPOINT}`

export default axios.create({
  baseURL,
  withCredentials: false,
})
