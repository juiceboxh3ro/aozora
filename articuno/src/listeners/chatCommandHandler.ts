import { Client, Message, User } from 'discord.js'
import handleAozoraMentioned from '../util/aozoraEmotion'

const CHAT_COMMANDS: {
  [key: string]: any
} = {
  test: {
    action: (message: Message, rest: string[]) => {
      console.log(rest)
      message.reply('it work')
    }
  },
}

// temporary solution to pain
// banning a user on join when mentioned by another bot
const getMentionedUsersFromMessage = (client: Client, message: Message, messageContent: string[]) => {
  const ids: string[] = []
  messageContent.forEach((w) => {
    if (w.startsWith('<@') && w.endsWith('>')) {
      const id = w.replace('<@', '').replace('>', '')
      if (!ids.includes(id)) ids.push(id)
    }
  })

  // const oneMinuteAgo = Date.now() - 6000

  ids.forEach((id) => {
    client.users.fetch(id)
      .then((user: User) => {
        console.log(user)
        if (user.id === process.env.APPLICATION_ID) {
          handleAozoraMentioned(client, message)
        }
        // const createdAt = user.createdAt.getTime()
        // if (createdAt < oneMinuteAgo) {
        //   console.log('too new user')
        //   client.guilds.cache['203238995117867008'].members.ban(user, { reason: 'too new user' })
        // }
      })
  })
}

/**
 * Sets up the classic flavor of bot interaction where a user types a prefix to a command, the command name, and any arguments.
 */
export default (client: Client): void => {
  client.on('messageCreate', async (message: Message) => {
    // carlbot's id and JFZ server id
    // if (message.author.id === '235148962103951360' && message.guildId === '203238995117867008') {
    getMentionedUsersFromMessage(client, message, message.content.split(/ +/))
    // }

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
