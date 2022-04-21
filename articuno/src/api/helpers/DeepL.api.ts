import axios, { AxiosError } from 'axios'
import { EmbedFieldData } from 'discord.js'
import { DeepLResponse } from 'src/typings/types'

const DEEPL_URL = 'https://api-free.deepl.com/v2'
const DEEPL_API_KEY = process.env.DEEPL_API_KEY ?? ''
const SUPPORTED_TARGETS = ['BG', 'CS', 'DA', 'DE', 'EL', 'EN-GB', 'EN-US', 'ES', 'ET', 'FI', 'FR', 'HU', 'IT', 'JA', 'LT', 'LV', 'NL', 'PL', 'PT-BR', 'PT-PT', 'RO', 'RU', 'SK', 'SL', 'SV', 'ZH']
const SUPPORTED_SOURCES = ['BG', 'CS', 'DA', 'DE', 'EL', 'EN', 'ES', 'ET', 'FI', 'FR', 'HU', 'IT', 'JA', 'LT', 'LV', 'NL', 'PL', 'PT', 'RO', 'RU', 'SK', 'SL', 'SV', 'ZH']
const ISO_OPTIONS = {
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
const EXONYM_OPTIONS = {
  bulgarian: 'BG',
  czech: 'CS',
  danish: 'DA',
  german: 'DE',
  greek: 'EL',
  english: 'EN-US',
  spanish: 'ES',
  estonian: 'ET',
  finnish: 'FI',
  french: 'FR',
  hungarian: 'HU',
  italian: 'IT',
  japanese: 'JA',
  lithuanian: 'LT',
  latvian: 'LV',
  dutch: 'NL',
  polish: 'PL',
  portuguese: 'PT',
  romanian: 'RO',
  russian: 'RU',
  slovak: 'SK',
  slovenian: 'SL',
  swedish: 'SV',
  chinese: 'ZH',
}

const exonymToISO6391 = (exonym: string): string | undefined => EXONYM_OPTIONS[exonym.toLowerCase()]

const iso6391ToName = (iso: string, sourceType: string): string | boolean => {
  switch (sourceType) {
    case 'target':
      if (!SUPPORTED_TARGETS.includes(iso)) return false
      break
    case 'source':
      if (!SUPPORTED_SOURCES.includes(iso)) return false
      break
    default:
  }

  return ISO_OPTIONS[iso]
}

const deeplReducer = (token: string, data: DeepLResponse): EmbedFieldData[] => {
  const fields: EmbedFieldData[] = []

  data.translations.forEach((translation) => {
    fields.push({
      name: `"${token}"`,
      value: translation.text,
      inline: data.translations.length > 1,
    })
  })
  return fields
}

const translate = async (token: string, target: string, source = ''): Promise<string | EmbedFieldData[]> => {
  let translatedResult
  const _token = token.trim()
  let _target = target.trim().toUpperCase()
  let _source = source.trim().toUpperCase()

  if (_target.length > 5) _target = exonymToISO6391(_target) ?? _target
  if (_source.length > 5) _source = exonymToISO6391(_source) ?? _source

  if (
    !iso6391ToName(target, 'target')
    || (_source.length && !iso6391ToName(_source, 'source'))
  ) {
    translatedResult = [{
      name: `"${token}"`,
      value: `Unsupported source "${_source}" for "${token}". Use /dpl_supported to see supported languages.`,
    }]
  } else {
    const _auth = `?auth_key=${DEEPL_API_KEY}`
    const _token_param = `&text=${_token}`
    const _target_param = `&target_lang=${_target}`
    const _source_param = source?.trim().length ? `&source_lang=${_source}` : ''
    const _query = `${DEEPL_URL}/translate${_auth}${_token_param}${_target_param}${_source_param}`
  
    try {
      const response = await axios.get<DeepLResponse>(encodeURI(_query))
      if (response.status === 200) translatedResult = deeplReducer(_token, response.data)
    } catch (err) {
      const error = err as AxiosError
      console.error(error.name)
      console.error(error.message)
      translatedResult = [{
        name: `"${_token}"`,
        value: "Couldn't translate that 🤕",
      }]
    }
  }

  return translatedResult
}

const supportedByDeepL = () => ISO_OPTIONS

export {
  supportedByDeepL,
  translate,
}
