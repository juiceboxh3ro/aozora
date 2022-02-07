import { MessageEmbed, MessageEmbedOptions, EmbedFooterData } from 'discord.js'
import { AOZORA_NAME, AOZORA_COLOR, AOZORA_GITHUB_REPO_URL } from './constants'

interface AZR_EmbedHandler {
  options: MessageEmbedOptions
}

const aozoraEmbedHandler = ({ options }: AZR_EmbedHandler): MessageEmbed => {
  const _footer: Partial<EmbedFooterData> = options?.footer
    ?? {
      text: 'Aozora',
      iconURL: AOZORA_GITHUB_REPO_URL,
    }

  const embed = new MessageEmbed()
    .setColor(AOZORA_COLOR)
    .setTitle(AOZORA_NAME)
    .setURL(AOZORA_GITHUB_REPO_URL)
    .setFooter(_footer as EmbedFooterData)
    .setTimestamp(Date.now())
  
  if (options?.description) embed.setDescription(options?.description)
  if (options?.fields) embed.setFields(options?.fields)

  return embed
}

export default aozoraEmbedHandler
