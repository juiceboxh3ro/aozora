import axios, { AxiosError } from 'axios'
import { EmbedFieldData } from 'discord.js'
import { DeepLResponse } from 'src/typings/types'

const DEEPL_URL = 'https://api-free.deepl.com/v2'
const DEEPL_API_KEY = process.env.DEEPL_API_KEY ?? ''
const SUPPORTED_TARGETS = ['BG', 'CS', 'DA', 'DE', 'EL', 'EN-GB', 'EN-US', 'ES', 'ET', 'FI', 'FR', 'HU', 'IT', 'JA', 'LT', 'LV', 'NL', 'PL', 'PT-BR', 'PT-PT', 'RO', 'RU', 'SK', 'SL', 'SV', 'ZH']
const SUPPORTED_SOURCES = ['BG', 'CS', 'DA', 'DE', 'EL', 'EN', 'ES', 'ET', 'FI', 'FR', 'HU', 'IT', 'JA', 'LT', 'LV', 'NL', 'PL', 'PT', 'RO', 'RU', 'SK', 'SL', 'SV', 'ZH']
const OPTIONS = {
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

  return OPTIONS[iso]
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

const translate = async (token, target, source): Promise<string | EmbedFieldData[]> => {
  let translatedResult

  if (
    !iso6391ToName(target, 'target')
    || (source.trim().length && !iso6391ToName(source, 'source'))
  ) {
    translatedResult = [{
      name: `"${token}"`,
      value: `Unsupported source "${source}" for "${token}"`,
    }]
  } else {
    const _auth = `?auth_key=${DEEPL_API_KEY}`
    const _token = `&text=${token}`
    const _target = `&target_lang=${target}`
    const _source = source?.trim().length ? `&source_lang=${source}` : ''
    const _query = `${DEEPL_URL}/translate${_auth}${_token}${_target}${_source}`
  
    try {
      const response = await axios.get<DeepLResponse>(encodeURI(_query))
      if (response.status === 200) translatedResult = deeplReducer(token, response.data)
    } catch (err) {
      const error = err as AxiosError
      console.error(error.name)
      console.error(error.message)
      translatedResult = [{
        name: `"${token}"`,
        value: "Couldn't translate that 🤕",
      }]
    }
  }

  return translatedResult
}

const supportedByDeepL = () => OPTIONS

export {
  supportedByDeepL,
  translate,
}
