import DiscordJS, { BaseCommandInteraction, Client, MessageEmbed } from 'discord.js'
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
      type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING,
    },
  ],
  isDevCommand: false,
  run: async (client: Client, interaction: BaseCommandInteraction) => {
    const { options } = interaction
    let amount = options.get('amount', true).value!
    amount = parseInt(amount as string, 10)

    if (amount) {
      console.log(amount)
    } else {
      await interaction.followUp({ content: 'Invalid value' })
    }
  },
}

export default PurgeMessages
