import axios, { AxiosError } from 'axios'
import { EmbedFieldData } from 'discord.js'
import {
  DeepLClass,
  DeepLResponse,
  StringMap,
} from 'src/typings/types'

/**
 * A class wrapper for DeepL API interactions.
 * Offers methods {@link translate} and {@link supported} languages on DeepL.
 *
 * DeepLAPI Contructor params:
 * @param {string} `token` - the word or phrase to be translate.
 * @param {string} `target` - the target language, non-optional but falls back to Japanese.
 * @param {string} `source` - the source language, optional since it's auto-detected by DeepL.
 *
 * `DeepLAPI.translate` method:
 * @returns {string | EmbedFieldData[]} `response` - returns an array of embed fields, or a string if an error occurs.
 */
export default class DeepLAPI implements DeepLClass {
  constructor(
    public token: string,
    public target: string,
    public source: string,
  ) {
    this.token = token
    this.target = target.trim().length ? target.toUpperCase() : 'JA'
    this.source = source.trim().length ? source.toUpperCase() : ''
  }

  private DEEPL_URL = 'https://api-free.deepl.com/v2'
  
  private DEEPL_API_KEY: string | undefined = process.env.DEEPL_API_KEY
  
  private API_RESPONSE: string | EmbedFieldData[] = ''
  
  private SUPPORTED_TARGETS = ['BG', 'CS', 'DA', 'DE', 'EL', 'EN-GB', 'EN-US', 'ES', 'ET', 'FI', 'FR', 'HU', 'IT', 'JA', 'LT', 'LV', 'NL', 'PL', 'PT-BR', 'PT-PT', 'RO', 'RU', 'SK', 'SL', 'SV', 'ZH']
  
  private SUPPORTED_SOURCES = ['BG', 'CS', 'DA', 'DE', 'EL', 'EN', 'ES', 'ET', 'FI', 'FR', 'HU', 'IT', 'JA', 'LT', 'LV', 'NL', 'PL', 'PT', 'RO', 'RU', 'SK', 'SL', 'SV', 'ZH']

  async translate(): Promise<boolean | EmbedFieldData[]> {
    try {
      if (
        !this.iso6391ToName(this.target, 'target')
        || (this.source.trim().length && !this.iso6391ToName(this.source, 'source'))
      ) {
        throw new Error(`Unsupported source language: ${this.source}`)
      }

      const _auth = `?auth_key=${this.DEEPL_API_KEY}`
      const _token = `&text=${this.token}`
      const _target = `&target_lang=${this.target}`
      const _source = this.source?.trim().length ? `&source_lang=${this.source}` : ''
      const _query = `${this.DEEPL_URL}/translate${_auth}${_token}${_target}${_source}`

      const response = await axios.get<DeepLResponse>(encodeURI(_query))

      if (response.status === 200) {
        return this.deeplReducer(response.data)
      }
      throw new Error('Something went wrong!')
    } catch (e) {
      const error = e as AxiosError
      return this.onError(error)
    }
  }

  private onError(error?: AxiosError): boolean {
    console.log(error?.stack)
    console.log(error?.code)
    console.log(error?.message)

    const message = 'Something went wrong!'
    this.API_RESPONSE = message
    return false
  }

  private deeplReducer(data: DeepLResponse): EmbedFieldData[] {
    const fields: EmbedFieldData[] = []

    data.translations.forEach((translation) => {
      fields.push({
        name: `"${this.token}"`,
        value: translation.text,
        inline: true,
      })
    })
    this.API_RESPONSE = fields
    return fields
  }

  private options: StringMap = {
    'BG': 'Bulgarian',
    'CS': 'Czech',
    'DA': 'Danish',
    'DE': 'German',
    'EL': 'Greek',
    'EN': 'English (source only)',
    'EN-GB': 'English (British)',
    'EN-US': 'English (American)',
    'ES': 'Spanish',
    'ET': 'Estonian',
    'FI': 'Finnish',
    'FR': 'French',
    'HU': 'Hungarian',
    'IT': 'Italian',
    'JA': 'Japanese',
    'LT': 'Lithuanian',
    'LV': 'Latvian',
    'NL': 'Dutch',
    'PL': 'Polish',
    'PT': 'Portuguese (source only)',
    'PT-BR': 'Portuguese (Brazil)',
    'PT-PT': 'Portuguese (Portugal)',
    'RO': 'Romanian',
    'RU': 'Russian',
    'SK': 'Slovak',
    'SL': 'Slovenian',
    'SV': 'Swedish',
    'ZH': 'Chinese (Mandarin)',
  }

  private iso6391ToName(iso: string, sourceType: string): string | boolean {
    switch (sourceType) {
      case 'target':
        if (!this.SUPPORTED_TARGETS.includes(iso)) return false
        break
      case 'source':
        if (!this.SUPPORTED_SOURCES.includes(iso)) return false
        break
      default:
    }

    return this.options[iso]
  }

  get response(): any {
    console.log(this.API_RESPONSE)
    return this.API_RESPONSE
  }

  get supported(): StringMap {
    return this.options
  }
}
