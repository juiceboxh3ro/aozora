import DiscordJS, { BaseCommandInteraction, Client } from 'discord.js'
import { SlashCommand } from '../../typings/types'

const cachedSearches = {}

const SearchDictionary: SlashCommand = {
  name: 'lookup',
  description: 'Look up a word in the dictionary',
  type: 'CHAT_INPUT',
  options: [
    {
      name: 'word',
      description: 'Word to search',
      required: true,
      type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING,
    },
  ],
  isDevCommand: true,
  run: async (client: Client, interaction: BaseCommandInteraction): Promise<void> => {
    const { options } = interaction
    const word = options.get('word', true).value!.toString()

    if (word.trim().length > 280) {
      await interaction.editReply({
        content: `Enter something shorter, please! Your word or phrase is ${word.trim().length - 280} characters too long.`
      })
      return
    }

    const content = word.trim()
    cachedSearches[word] = word
    await interaction.editReply({ content })
  },
}

export default SearchDictionary
