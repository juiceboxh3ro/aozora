import { Client } from 'discord.js'
import mongoose from 'mongoose'
import { ActivityOptions } from 'src/typings/types'

import Commands from '../Commands'
import interactionCreate from './interactionCreate'
import chatCommandHandler from './chatCommandHandler'
import updateStatus from './status'

const DATABASE = process.env.DATABASE ?? ''
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD ?? ''
const DATABASE_NAME = process.env.DATABASE_NAME ?? ''
const MONGO_URI = DATABASE.replace('<PASSWORD>', DATABASE_PASSWORD).replace('<NAME>', DATABASE_NAME)
const AOZORA_GUILD_ID = process.env.AOZORA_GUILD_ID ?? ''
// const FZ_STAFF_GUILD_ID = process.env.FZ_STAFF_GUILD_ID ?? ''

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

const setUpCommands = async (client: Client) => {
  if (!client?.application) return

  client.application.commands.set([])

  const aozoraDevGuild = client.guilds.cache.get(AOZORA_GUILD_ID)
  // const fzStaffGuild = client.guilds.cache.get(FZ_STAFF_GUILD_ID)

  if (aozoraDevGuild) {
    await aozoraDevGuild.commands.set(Commands.DevCommands)
      .catch(console.error)
  }

  // if (fzStaffGuild) {
  //   await fzStaffGuild.commands.set(Commands.FZStaffCommands)
  //     .catch(console.error)
  // }

  await client.application.commands.set(Commands.GlobalCommands)
    .catch((err) => {
      console.error(err.requestData.json)
      console.error(err.httpStatus)
      console.error(err)
    })
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

    setUpCommands(client)
    chatCommandHandler(client)
    onBotSignin(client)
    interactionCreate(client)

    console.log(`🌳 ${client.user.username} is online from ${client.readyTimestamp}`)
  })
}
