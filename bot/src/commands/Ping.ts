import { BaseCommandInteraction, Client } from 'discord.js'
import { SlashCommand } from '../typings/types'

const Ping: SlashCommand = {
  name: 'ping',
  description: 'Ping Pong Bing Bong',
  type: 'CHAT_INPUT',
  isDevCommand: true,
  run: async (client: Client, interaction: BaseCommandInteraction) => {
    const content = 'Pong!'

    await interaction.followUp({
      ephemeral: true,
      content,
    })
  },
}

export default Ping
