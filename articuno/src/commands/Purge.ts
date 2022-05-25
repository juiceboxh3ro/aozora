import DiscordJS, { BaseCommandInteraction, Client } from 'discord.js'
import mathClamp from 'src/util/mathClamp'
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
  isDevCommand: true,
  isAdminCommand: true,
  run: async (client: Client, interaction: BaseCommandInteraction) => {
    const { options } = interaction
    const value = options.get('amount', true).value! as string
    const amount = mathClamp(parseInt(value, 10), 1, 50)

    if (amount) {
      console.log(amount)
    } else {
      await interaction.editReply({ content: 'Invalid value' })
    }
  },
}

export default PurgeMessages
