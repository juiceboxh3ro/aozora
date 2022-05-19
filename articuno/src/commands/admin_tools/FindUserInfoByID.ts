import DiscordJS, { BaseCommandInteraction, Client } from 'discord.js'
import { SlashCommand } from '../../typings/types'

/* return info
{
  "id": string,
  "bot": false,
  "system": false,
  "flags": 640,
  "username": string,
  "discriminator": string,
  "avatar": "a_66d11e27ac3a48c2df0fb3e1177133eb",
  "createdTimestamp": 1467473203863,
  "defaultAvatarURL": "https://cdn.discordapp.com/embed/avatars/4.png",
  "tag": ${`${username}`#`${discriminator}`},
  "avatarURL": `https://cdn.discordapp.com/avatars/198821769853927425/${avatar}.webp`,
  "displayAvatarURL": `https://cdn.discordapp.com/avatars/198821769853927425/${avatar}.web`,
}
*/

const FindUser: SlashCommand = {
  name: 'admin-user-search',
  description: 'Search for a user\'s info',
  type: 'CHAT_INPUT',
  options: [
    {
      name: 'user_id',
      description: 'User ID to search',
      required: true,
      type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING,
    },
  ],
  isDevCommand: true,
  isAdminCommand: true,
  run: async (client: Client, interaction: BaseCommandInteraction) => {
    const { options } = interaction
    const user_id = options.get('user_id', true).value!.toString()

    const user = await client.users.fetch(user_id)
    
    const content = JSON.stringify(user, null, 2)
    await interaction.editReply({ content })
  },
}

export default FindUser
