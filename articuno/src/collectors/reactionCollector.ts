import {
  BaseCommandInteraction,
  Collection,
  GuildEmoji,
  Message,
  MessageReaction,
  ReactionEmoji,
} from 'discord.js'

// collect n reactions for y amount of time
const reactionCollector = (
  message: Message,
  interaction: BaseCommandInteraction,
  callback?: (collectedEmoji: Collection<string, MessageReaction>) => void,
  options = { max: 30, time: 1000 * 30 },
) => {
  if (!interaction.channel) return
  const collector = message.createReactionCollector({
    max: options.max,
    time: options.time,
  })

  collector.on('collect', (emoji: GuildEmoji | ReactionEmoji) => {
    console.log(emoji.name)
  })

  collector.on('end', (collected) => {
    console.log(collected)

    if (callback) callback(collected)
  })
}

export default reactionCollector
