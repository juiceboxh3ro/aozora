import DiscordJS, { BaseCommandInteraction, Client, ContextMenuInteraction } from 'discord.js'
import { MessageCommand, SlashCommand, UserCommand } from 'src/typings/types'

const _SlashCommandTemplate: SlashCommand = {
  name: 'ping',
  description: '',
  type: 'CHAT_INPUT',
  options: [
    {
      name: 'example1',
      description: 'description of example 1',
      required: false,
      type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING,
    }
  ],
  isDevCommand: true,
  run: async (
    client: Client,
    interaction: BaseCommandInteraction,
  ) => {
    // `options` is the array of options described above
    // const { options } = interaction
    // await interaction.editReply()
    await interaction.followUp({ content: '' })
  }
}

const _UserCommandTemplate: UserCommand = {
  name: 'name',
  type: 'USER',
  isDevCommand: true,
  run: async (
    client: Client,
    interaction: ContextMenuInteraction
  ): Promise<void> => {
    const user = await client.users.fetch(interaction.targetId)

    await interaction.followUp({
      content: user.username
    })
  }
}

const _MessageCommandTemplate: MessageCommand = {
  name: 'name',
  type: 'MESSAGE',
  isDevCommand: true,
  run: async (
    client: Client,
    interaction: ContextMenuInteraction
  ): Promise<void> => {
    const message = interaction.targetId

    await interaction.followUp({
      content: message
    })
  }
}
