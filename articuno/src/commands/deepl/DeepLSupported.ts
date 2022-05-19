import { BaseCommandInteraction, Client, EmbedFieldData } from 'discord.js'
import { supportedByDeepL } from '../../api/helpers/DeepL.api'
import aozoraEmbedHandler from '../../util/aozoraEmbed'
import { SlashCommand } from '../../typings/types'

const createFieldsFromKeyValuePairs = (toFields: { [key: string]: string }): EmbedFieldData[] => (
  Object.keys(toFields)
    .map((field) => ({
      name: `${field}`,
      value: toFields[field] ?? field,
      inline: true,
    }))
)

const DeepLSupported: SlashCommand = {
  name: 'dpl_supported',
  description: 'Outputs a list of available languages to use with DeepL slash command',
  type: 'CHAT_INPUT',
  isDevCommand: false,
  run: async (client: Client, interaction: BaseCommandInteraction): Promise<void> => {
    const availableLanguages = supportedByDeepL()
    const langsAsFields: EmbedFieldData[] = createFieldsFromKeyValuePairs(availableLanguages)
    const embed = aozoraEmbedHandler({ fields: langsAsFields })
    await interaction.editReply({ embeds: [embed] })
  },
}

export default DeepLSupported
