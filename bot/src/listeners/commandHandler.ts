import { Client, Message } from 'discord.js'

const commands: {
  [key: string]: any
} = {
  'test': {
    callback: (message: Message, rest: string[]) => {
      console.log(rest)
      message.reply('it work')
    }
  }
}

export default (client: Client): void => {
  client.on('messageCreate', async (message: Message) => {
    console.log('\n')
    console.log('message:')
    console.log(message)
    console.log('\n')
    if (message.author.bot || message.author.system || !message.content.startsWith('!azr')) return

    const args = message.content.slice(1).split(/ +/)
    const commandName: string = args.shift()!.toLowerCase()
    
    if (!commands[commandName]) return

    try {
      commands[commandName].callback(message, ...args)
    } catch (err) {
      console.error(err)
    }
  })
}
