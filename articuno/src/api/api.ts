import axios from 'axios'

const baseURL = `${process.env.MOLTRES}`

export default axios.create({
  baseURL,
  withCredentials: false,
})
