// import Tesseract, { createWorker } from 'tesseract.js'

/*
  supported languages
  https://tesseract-ocr.github.io/tessdoc/Data-Files#data-files-for-version-400-november-29-2016
*/

// const recognize = async (imageUrl, language) => {
//   const worker = createWorker()
//   try {
//     await worker.load()
//     await worker.loadLanguage(language)
//     await worker.initialize(language)
//     const { data: { text } } = await worker.recognize(imageUrl)
//     return text
//   } catch (e) {
//     console.error(e)
//     return null
//   } finally {
//     await worker.terminate()
//   }
// }

// FIXME: Docker can't find tesseract????
const withTesseract = async (imageUrl: string, language = 'eng'): Promise<string[]> => {
  // const recognized = await recognize(imageUrl, language)
  // return recognized ? recognized.split('\n') : []
  const ok = 'ok'
  return [ok]
}

export default withTesseract
