import Kuroshiro from 'kuroshiro'
import KuromojiAnalyzer from 'kuroshiro-analyzer-kuromoji'
import { ConvertOptions, kuroshiro, kuroshiro_analyzer_kuromoji } from 'src/typings/types'
import { tokenize, isJapanese } from 'wanakana'

class WithFurigana {
  static async convert (token: string, options?: ConvertOptions) {
    try {
      const tokens: string[] = tokenize(token, { compact: true })

      const ks: kuroshiro = new Kuroshiro()
      ks.init(new KuromojiAnalyzer())
  
      const defaultOptions: ConvertOptions = {
        to: 'hiragana',
        mode: 'normal',
        romajiSystem: 'hepburn',
        delimiter_start: '(',
        delimiter_end: ')',
      }
  
      const convertOptions = options ? options : defaultOptions
      const results: string[] = []

      for (let i = 0; i < tokens.length; i++) {
        if (isJapanese(tokens[i])) {
          const convertedToken = await ks.convert(tokens[i], convertOptions)
          results.push(convertedToken)
        } else {
          results.push(tokens[i])
        }
      }

      return results.join(' ')
    } catch (err) {
      console.error(err)
      return 'i am error'
    }
  }
}

export default WithFurigana
