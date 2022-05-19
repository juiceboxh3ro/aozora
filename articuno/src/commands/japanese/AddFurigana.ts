import DiscordJS, { BaseCommandInteraction, Client } from 'discord.js'
import { SlashCommand } from '../../typings/types'
import withFurigana from '../../util/withFurigana'

const AddFurigana: SlashCommand = {
  name: 'furigana',
  description: 'Add kanji readings to a Japanese word or phrase',
  type: 'CHAT_INPUT',
  options: [
    {
      name: 'token',
      description: 'Word or phrase to add furigana to, max 280 characters',
      required: true,
      type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING,
    },
  ],
  isDevCommand: false,
  run: async (client: Client, interaction: BaseCommandInteraction): Promise<void> => {
    const { options } = interaction
    const token = options.get('token', true).value!.toString()

    if (token.trim().length > 280) {
      await interaction.editReply({
        content: `Enter something shorter, please! Your message is ${token.trim().length - 280} characters too long.`
      })
      return
    }

    const content: string = await withFurigana(token)
    await interaction.editReply({ content })
  },
}

export default AddFurigana
