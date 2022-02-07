import { Client, Message } from 'discord.js'

const CHAT_COMMANDS: {
  [key: string]: any
} = {
  test: {
    action: (message: Message, rest: string[]) => {
      console.log(rest)
      message.reply('it work')
    }
  }
}

/**
 * Sets up the classic flavor of bot interaction where a user types a prefix to a command, the command name, and any arguments.
 */
export default (client: Client): void => {
  client.on('messageCreate', async (message: Message) => {
    console.log('\n')
    console.log('message:')
    console.log(message)
    console.log('\n')
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
