import { Client } from 'discord.js'
import mongoose from 'mongoose'
import { ActivityOptions } from 'src/typings/types'

import Commands from '../Commands'
import interactionCreate from './interactionCreate'
import chatCommandHandler from './chatCommandHandler'
import updateStatus from './status'

const DATABASE = process.env.DATABASE || ''
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD || ''
const DATABASE_NAME = process.env.DATABASE_NAME || ''
const MONGO_URI = DATABASE.replace('<PASSWORD>', DATABASE_PASSWORD).replace('<NAME>', DATABASE_NAME)
const AOZORA_GUILD_ID = process.env.AOZORA_GUILD_ID || ''

const dbOptions = {
  keepAlive: true,
  autoIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

const onBotSignin = (client: Client) => {
  const statuses: ActivityOptions[] = [
    {
      activities: [{
        name: '💤起きています',
        type: undefined,
      }],
      status: 'dnd',
    },
    {
      activities: [{
        name: '☀️今日も良い天気ですね',
        type: 3,
      }],
      status: 'online',
    },
  ]

  updateStatus(client, statuses[0])

  setTimeout(() => {
    updateStatus(client, statuses[1])
  }, 1000 * 15)
}

export default (client: Client): void => {
  client.on('ready', async () => {
    if (!client.user || !client.application) return

    await mongoose.connect(MONGO_URI || '', dbOptions)
      .then(() => {
        console.log('🍃 Connected to MongoDB')
      })
      .catch(() => {
        console.log('🍂 Could not connect to MongoDB')
      })

    interactionCreate(client)
    chatCommandHandler(client)
    onBotSignin(client)

    await client.application.commands.set(Commands.DevCommands, AOZORA_GUILD_ID)
    await client.application.commands.set(Commands.GuildCommands)

    console.log(`🌳 ${client.user.username} is online`)
  })
}
