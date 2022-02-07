import Kuroshiro from 'kuroshiro'
import KuromojiAnalyzer from 'kuroshiro-analyzer-kuromoji'
import { ConvertOptions, kuroshiro } from 'src/typings/types'
import { tokenize, isJapanese } from 'wanakana'

const withFurigana = async (token: string, options?: ConvertOptions): Promise<string> => {
  try {
    // separate English and Japanese
    const tokens: string[] = tokenize(token, { compact: true })

    const ks: kuroshiro = new Kuroshiro()
    await ks.init(new KuromojiAnalyzer())

    const defaultOptions: ConvertOptions = {
      to: 'hiragana',
      mode: 'okurigana',
      romajiSystem: 'hepburn',
      delimiter_start: '(',
      delimiter_end: ')',
    }
    const convertOptions = options || defaultOptions

    const preconvertedTokens: any[] = []
    tokens.forEach((_token) => {
      if (_token.trim().length) {
        if (isJapanese(_token)) {
          preconvertedTokens.push(ks.convert(_token, convertOptions))
        } else {
          preconvertedTokens.push(_token)
        }
      }
    })

    const converted = await Promise.all(preconvertedTokens)

    const convertedTokens: string[] = []
    converted.forEach((cToken) => {
      const appendedFuri = cToken === token ? token : cToken
      convertedTokens.push(appendedFuri)
    })

    return convertedTokens.join(' ')
  } catch (err) {
    console.error(err)
    return 'i am error'
  }
}

export default withFurigana
