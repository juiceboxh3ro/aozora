import {
  Client,
  Collection,
  GuildBan,
  Message,
  User,
} from 'discord.js'
import { CARLBOT_ID } from '../util/constants'

import handleAozoraMentioned from '../util/aozoraEmotion'
import mathClamp from '../util/mathClamp'

const CHAT_COMMANDS: {
  [key: string]: any
} = {
  test: {
    action: (message: Message, rest: string[]) => {
      console.log(rest)
      message.reply('pong! ...wait')
    }
  },
  banhistory: {
    action: async (message: Message, rest: string) => {
      try {
        const banHistory: Collection<string, GuildBan> | undefined = await message.guild?.bans.fetch()
        const bannedUsers = banHistory?.map(({ user, reason }: GuildBan) => ({
          user,
          reason,
        }))
        console.log(bannedUsers)
        console.log(bannedUsers?.length)
        if (
          rest?.length
          && bannedUsers?.length
          && typeof parseInt(rest, 10) === 'number'
        ) {
          const finalIndex = bannedUsers.length - 1
          const index = mathClamp(Math.round(parseInt(rest, 10)), ((finalIndex + 1) * -1), finalIndex)
          const bannedUser = bannedUsers.at(index)?.user
          const bannedReason = bannedUsers.at(index)?.reason

          if (bannedUser) {
            const userInfo = Object.entries(bannedUser)
              .map(([key, value]) => (
                value && `${key}: ${JSON.stringify(value, null, 2)}`
              ))
              .join('\n')
            let reply = `**User info:**\n${userInfo}`

            if (bannedReason) reply = `${reply}\n\n**Reason**: ${bannedReason}`

            message.reply(reply)
          }
        }
      } catch (err) {
        console.error(err)
        message.reply('I don\'t have sufficient permissions to do that.')
      }
    }
  }
}

const attemptUserBan = (message: Message, userId: string) => {
  try {
    message.guild?.members.cache
      .get(userId)
      ?.ban({ reason: 'Automatically banned by Aozora: Username contains flag words' })
      .then(() => message.delete())
  } catch (err) {
    console.error(err)
  }
}

const checkUserAccountAge = (message: Message, user: User, minimumMinutes: number): boolean => {
  console.log(user.createdTimestamp)
  console.log(user.createdAt)
  if (user.createdTimestamp < (Date.now() - 1000 * 60 * (Math.round(minimumMinutes) || 1))) {
    console.log('fresh account')
    // attemptUserBan(message, user.id)
    return true
  }
  return false
}

const checkUserNameContainsFlagWords = (message: Message, user: User): boolean => {
  if (user.username.includes('tastes like')) {
    attemptUserBan(message, user.id)
  }
  return false
}

const getMentionedUsersFromMessage = (client: Client, message: Message, messageContent: string[]) => {
  const ids: string[] = []
  messageContent.forEach((w) => {
    if (w.startsWith('<@') && w.endsWith('>')) {
      let mention = w.slice(2, -1)
      if (mention.startsWith('!')) mention = mention.slice(1)
      if (!ids.includes(mention)) ids.push(mention)
    }
  })

  ids.forEach(async (id) => {
    const user: User = await client.users.fetch(id)
    // if (user) checkUserNameContainsFlagWords(message, user)
    checkUserAccountAge(message, user, 3)
  })
}

/**
 * Sets up the classic flavor of bot interaction where a user types a prefix to a command, the command name, and any arguments.
 */
export default (client: Client): void => {
  client.on('messageCreate', async (message: Message) => {
    // when carlbot mentions a user on join, check if the user's username for flag words
    if (message.author.id === CARLBOT_ID && message.guildId === '203238995117867008') {
      getMentionedUsersFromMessage(client, message, message.content.split(/ +/))
    }

    if (message.author.bot || message.author.system || !message.content.startsWith('!azr')) return

    const args: string[] = message.content.split(/ +/).slice(1)
    const commandName: string = args.shift()!.toLowerCase()
    
    if (!CHAT_COMMANDS[commandName]) return

    try {
      CHAT_COMMANDS[commandName].action(message, ...args)
    } catch (err) {
      console.error(err)
    }
  })
}
