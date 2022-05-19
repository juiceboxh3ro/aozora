import axios from 'axios'

// eslint-disable-next-line
const downloadImage = (url: string): Promise<any> => {
  return axios.get(url, { responseType: 'arraybuffer' })
    // eslint-disable-next-line
    .then((res) => {
      return Buffer.from(res.data, 'binary').toString('base64')
    })
    .catch((err) => {
      console.log(err)
      return null
    })
}

export default downloadImage
