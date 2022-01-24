import { BaseCommandInteraction, Client } from 'discord.js'
import { Command } from '../typings/types'

export const Ping: Command = {
  name: 'ping',
  description: 'Ping Pong Bing Bong',
  type: 'CHAT_INPUT',
  run: async (client: Client, interaction: BaseCommandInteraction) => {
    console.log('client')
    console.log(client)
    console.log('\n')
    console.log('interaction:')
    console.log(interaction)

    const content = 'Pong!'

    await interaction.followUp({
      ephemeral: true,
      content,
    })
  },
}
