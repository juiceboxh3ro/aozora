import Kuroshiro from 'kuroshiro'
import KuromojiAnalyzer from 'kuroshiro-analyzer-kuromoji'
import { ConvertOptions, kuroshiro } from 'src/typings/types'
import { tokenize, isJapanese } from 'wanakana'

class WithFurigana {
  static async convert (token: string, options?: ConvertOptions) {
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
  
      const convertOptions = options ? options : defaultOptions
      const convertedTokens: string[] = []

      for (let i = 0; i < tokens.length; i++) {
        const _token = tokens[i]
        if (!_token?.trim().length) continue

        if (isJapanese(_token)) {
          const converted = await ks.convert(_token, convertOptions)
          console.log(converted)
          const appendedFuri = converted === _token ? _token : converted
          convertedTokens.push(appendedFuri)
        } else {
          convertedTokens.push(_token)
        }
      }

      return convertedTokens.join(' ')
    } catch (err) {
      console.error(err)
      return 'i am error'
    }
  }
}

export default WithFurigana
