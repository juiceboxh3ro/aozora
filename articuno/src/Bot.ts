import 'dotenv/config'
import { Client, Intents } from 'discord.js'
import ready from './listeners/ready'

console.log('🌱 Aozora is starting...')

const TOKEN = process.env.PRIVATE_KEY || ''

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_BANS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  ],
})

ready(client)

client.login(TOKEN)
