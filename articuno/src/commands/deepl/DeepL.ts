import DiscordJS, { BaseCommandInteraction, Client } from 'discord.js'
import withDeepLTranslate from '../withDeepLTranslate'
import { SlashCommand } from '../../typings/types'

const DeepL: SlashCommand = {
  name: 'deepl',
  description: 'Translate a word or phrase using DeepL translation services',
  type: 'CHAT_INPUT',
  options: [
    {
      name: 'translate',
      description: 'Word or phrase to translate, max 280 characters',
      required: true,
      type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING,
    },
    {
      name: 'target',
      description: 'Target language, default: JA (for list of available languages use /dpl_supported)',
      required: false,
      type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING,
    },
    {
      name: 'source',
      description: 'Optional: Source language (for list of available languages use /dpl_supported)',
      required: false,
      type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING,
    },
  ],
  isDevCommand: false,
  run: async (client: Client, interaction: BaseCommandInteraction): Promise<void> => {
    const { options } = interaction

    const token = options.get('translate', true).value!.toString()
    const target = options.get('target', false)?.value?.toString() ?? ''
    const source = options.get('source', false)?.value?.toString() ?? ''
    
    const result = await withDeepLTranslate(token, target, source)

    await interaction.editReply(result)
  },
}

export default DeepL
