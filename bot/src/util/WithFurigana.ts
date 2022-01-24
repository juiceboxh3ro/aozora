import Kuroshiro from 'kuroshiro'
import KuromojiAnalyzer from 'kuroshiro-analyzer-kuromoji'
import { ConvertOptions, kuroshiro } from 'src/typings/types'
import wanakana from 'wanakana'

export default class WithFurigana {
  static async convert (token: string, options: ConvertOptions) {
    if (!wanakana.isJapanese(token)) return 'Non-Japanese value passed in'
    const ks: kuroshiro = new Kuroshiro()
    ks.init(new KuromojiAnalyzer())

    const result: string = await ks.convert(token, options)
    return result
  }
}
