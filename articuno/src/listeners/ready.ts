import { Client } from 'discord.js'
import { ActivityOptions } from 'src/typings/types'

import Commands from '../Commands'
import interactionCreate from './interactionCreate'
import chatCommandHandler from './chatCommandHandler'
import updateStatus from './status'
import { emotionJob } from '../util/aozoraEmotion'

const AOZORA_GUILD_ID = process.env.AOZORA_GUILD_ID ?? ''
// const FZ_STAFF_GUILD_ID = process.env.FZ_STAFF_GUILD_ID ?? ''

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

const onError = (err) => {
  console.error(err.requestData.json)
  console.error(err.httpStatus)
  console.error(err)
}

const setUpCommands = async (client: Client) => {
  if (!client?.application) return

  const aozoraDevGuild = client.guilds.cache.get(AOZORA_GUILD_ID)
  // const fzStaffGuild = client.guilds.cache.get(FZ_STAFF_GUILD_ID)

  if (aozoraDevGuild) {
    await aozoraDevGuild.commands.set(Commands.DevCommands)
      .catch(onError)
  }

  // if (fzStaffGuild) {
  //   await fzStaffGuild.commands.set(Commands.FZStaffCommands)
  //     .catch(onError)
  // }

  await client.application.commands.set(Commands.GlobalCommands)
    .then(console.log)
    .catch(onError)
}

export default (client: Client): void => {
  client.on('ready', async () => {
    if (!client.user || !client.application) {
      console.log('bad client')
      return
    }

    setUpCommands(client)
    onBotSignin(client)
    chatCommandHandler(client)
    interactionCreate(client)
    emotionJob.start()

    const readyAt = client.readyTimestamp ?? Date.now()
    const onlineFrom = new Date(readyAt)
      .toLocaleDateString('EN-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hourCycle: 'h24',
      })

    console.log(`🌳 ${client.user.username} is online from ${onlineFrom}`)
  })
}
