import { Client } from 'discord.js'
import { Commands } from '../Commands'
import interactionCreate from '../listeners/interactionCreate'
import mongoose from 'mongoose'
import commandHandler from './commandHandler'

const DATABASE = process.env.DATABASE || ''
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD || ''
const DATABASE_NAME = process.env.DATABASE_NAME || ''
const MONGO_URI = DATABASE.replace('<PASSWORD>', DATABASE_PASSWORD).replace('<NAME>', DATABASE_NAME)

const dbOptions = {
  keepAlive: true,
  autoIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
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
    commandHandler(client)

    await client.application.commands.set(Commands)

    console.log(`${client.user.username} is online`)
  })
}
