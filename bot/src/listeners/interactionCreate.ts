import { BaseCommandInteraction, Client, Interaction } from 'discord.js'
import Commands from '../Commands'

const handleSlashCommand = async (
  client: Client,
  interaction: BaseCommandInteraction
): Promise<void> => {
  const slashCommand = Commands.find((c) => c.name === interaction.commandName)

  try {
    if (!slashCommand) {
      throw new Error(`Interaction ${interaction.commandName} is not a registered slash command`)
    }

    await interaction.deferReply()

    slashCommand.run(client, interaction)
  } catch (err) {
    console.error(err)
    interaction.followUp({ content: 'An error has occurred' })
  }
}

export default (client: Client): void => {
  client.on('interactionCreate', async (interaction: Interaction) => {
    if (interaction.isCommand() || interaction.isContextMenu()) {
      console.log('\n')
      console.log('client:')
      console.log(client)
      console.log('\n')
      await handleSlashCommand(client, interaction)
    }
  })
}
