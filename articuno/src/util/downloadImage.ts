import { Image } from 'aws-sdk/clients/rekognition'
import axios from 'axios'

// eslint-disable-next-line
const downloadImage = (url: string): Promise<Image | null> => {
  return axios.get(url, { responseType: 'arraybuffer' })
    // eslint-disable-next-line
    .then((res) => {
      return Buffer.from(res.data, 'binary').toString('base64') as Image
    })
    .catch((err) => {
      console.log(err)
      return null
    })
}

export default downloadImage
