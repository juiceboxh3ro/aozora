import { EmbedFieldData } from 'discord.js'
import { AZR_EmbedHandler } from '../typings/types'
import aozoraEmbedHandler from '../util/aozoraEmbed'
import { translate } from '../api/helpers/DeepL.api'

interface WithDPL {
  content?: string
  embeds?: AZR_EmbedHandler[]
}

const cachedTranslations = {}

const withDeepLTranslate = async (token: string, target: string, source = ''): Promise<WithDPL> => {
  const token_length_limit = 280
  let content = ''
  let embed
  let success = true

  if (token.trim().length > token_length_limit) {
    content = `Enter a shorter phrase, please! Your token is ${token.trim().length - token_length_limit} characters too long.`
    success = false
  }

  let translated
  let embed_options: AZR_EmbedHandler = {}

  if (success) {
    if (cachedTranslations?.[token]) {
      translated = cachedTranslations[token]
    } else {
      translated = await translate(token, target, source)
      cachedTranslations[token] = translated
    }

    embed_options = {
      author: {
        name: 'DeepL Translation',
        iconURL: `${process.env.BUCKET}/images/assets/deepl.jpg`,
        url: 'https://www.deepl.com/translator',
      },
    }
  }

  if (!translated) {
    content = 'Something went wrong'
    success = false
  } else {
    if (typeof translated === 'string') embed_options.description = translated
    else embed_options.fields = translated as EmbedFieldData[]
    embed = aozoraEmbedHandler(embed_options)
  }

  if (content.trim().length) return ({ content })
  return ({ embeds: [embed] })
}

// eslint-disable-next-line import/prefer-default-export
export default withDeepLTranslate
