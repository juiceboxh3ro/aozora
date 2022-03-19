import { EmbedFooterData, MessageEmbed } from 'discord.js'
import { AZR_EmbedHandler } from 'src/typings/types'
import { AOZORA_NAME, AOZORA_COLOR, AOZORA_GITHUB_REPO_URL } from './constants'

/**
 * @description Returns a Discord MessageEmbed from passed in options
 * @param options - the values to pass into the embed. Valid keys are:
 * @key author?: EmbedAuthorData
 * @key description?: string
 * @key fields?: EmbedFieldData[]
 * @key footer?: EmbedFooterData
 */
const aozoraEmbedHandler = (options: AZR_EmbedHandler): MessageEmbed => {
  const _footer: EmbedFooterData = options?.footer
    ?? {
      text: 'Aozora',
      iconURL: AOZORA_GITHUB_REPO_URL,
    }

  const embed = new MessageEmbed()
    .setColor(AOZORA_COLOR)
    .setTitle(AOZORA_NAME)
    .setURL(AOZORA_GITHUB_REPO_URL)
    .setFooter(_footer)
    .setTimestamp(Date.now())
  
  if (options?.description) embed.setDescription(options.description)
  if (options?.fields) embed.setFields(options.fields)
  if (options?.author) embed.setAuthor(options.author)

  return embed
}

export default aozoraEmbedHandler
