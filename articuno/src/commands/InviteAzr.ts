import { BaseCommandInteraction, Client } from 'discord.js'
import { SlashCommand } from '../typings/types'

const InviteAozora: SlashCommand = {
  name: 'invite',
  description: 'Generate an invite link for Aozora bot',
  type: 'CHAT_INPUT',
  isDevCommand: false,
  run: async (client: Client, interaction: BaseCommandInteraction) => {
    const app_id = process.env.APPLICATION_ID ?? ''
    const invite_link = process.env.AZR_INVITE?.replace('<APPLICATION_ID>', app_id)
    await interaction.editReply({ content: invite_link })
  },
}

export default InviteAozora
