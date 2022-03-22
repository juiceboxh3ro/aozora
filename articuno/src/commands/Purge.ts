import DiscordJS, { BaseCommandInteraction, Client } from 'discord.js'
import { SlashCommand } from '../typings/types'

const PurgeMessages: SlashCommand = {
  name: 'purge',
  description: 'Purge up to 50 messages',
  type: 'CHAT_INPUT',
  options: [
    {
      name: 'amount',
      description: 'Amount of messages to purge from channel',
      required: true,
      type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER,
    },
  ],
  isDevCommand: false,
  run: async (client: Client, interaction: BaseCommandInteraction) => {
    const { options } = interaction
    const amount = options.get('amount', true).value!

    if (amount) {
      console.log(amount)
    } else {
      await interaction.editReply({ content: 'Invalid value' })
    }
  },
}

export default PurgeMessages
