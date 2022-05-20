import {
  BaseCommandInteraction,
  Collection,
  Message,
} from 'discord.js';

// collect n messages for y amount of time
const messageCollector = (
  message: Message,
  interaction: BaseCommandInteraction,
  callback?: (arg: Collection<string, Message>) => void,
  options = { max: 30, time: 1000 * 30 },
) => {
  if (!interaction.channel) return
  const collector = interaction.channel.createMessageCollector({
    max: options.max,
    time: options.time,
  })

  collector.on('collect', (msg) => {
    console.log(msg.content)
  })

  collector.on('end', (collected) => {
    console.log(collected)
    if (callback) callback(collected)
  })
}

export default messageCollector
