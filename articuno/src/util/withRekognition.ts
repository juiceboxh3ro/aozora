import AWS from 'aws-sdk'
import { Image } from 'aws-sdk/clients/rekognition'

// eslint-disable-next-line
const withRekognition = async (imageBuffer: Image): Promise<string[]> => {
  const config = new AWS.Config({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  })

  AWS.config.update({
    ...config,
    region: 'us-east-1'
  })
  const rekognition = new AWS.Rekognition()
  const params = { Image: imageBuffer }

  const detectedText: string[] = []

  // FIXME: this isn't working
  rekognition.detectText(params, (err, res) => {
    if (err) {
      console.log(err)
    } else {
      console.log(res)
      res.TextDetections?.forEach((label) => {
        console.log(label.DetectedText)
        if (label.DetectedText) detectedText.push(label.DetectedText)
      })
    }
  })

  return detectedText
}

export default withRekognition
