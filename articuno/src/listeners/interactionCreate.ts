import { DiscordAPIError } from '@discordjs/rest'
import { BaseCommandInteraction, Client, Interaction } from 'discord.js'
import Commands from '../Commands'

const handleCommandError = async (interaction: BaseCommandInteraction, message): Promise<void> => {
  interaction.reply({
    ephemeral: true,
    content: message
  })
}

const handleSlashCommand = async (
  client: Client,
  interaction: BaseCommandInteraction
): Promise<void> => {
  const _commands = [
    ...Commands.DevCommands,
    ...Commands.FZStaffCommands,
    ...Commands.GlobalCommands,
  ]

  const slashCommand = _commands.find((c) => c.name === interaction.commandName)

  try {
    if (!slashCommand) {
      handleCommandError(
        interaction,
        `Interaction "${interaction.commandName}" is not a registered slash command`
      )
      return
    }

    if (slashCommand.isDevCommand
      && interaction.guildId !== process.env.AOZORA_GUILD_ID
    ) {
      handleCommandError(
        interaction,
        `Interaction "${interaction.commandName}" is a development only command`
      )
      return
    }

    // if (slashCommand.type === 'MESSAGE'
    //   || slashCommand.type === 'CHAT_INPUT'
    //   || slashCommand.type === 'USER'
    //   ) {
    // }

    await interaction.deferReply()

    await slashCommand.run(client, interaction as any)
  } catch (err) {
    const error = err as DiscordAPIError
    console.error(error?.name)
    console.error(error?.message)
    await interaction.followUp({ content: `An error has occurred: ${error?.name}` })
  }
}

export default (client: Client): void => {
  client.on('interactionCreate', async (interaction: Interaction) => {
    if (interaction.isCommand() || interaction.isContextMenu()) {
      await handleSlashCommand(client, interaction)
    }
  })
}
