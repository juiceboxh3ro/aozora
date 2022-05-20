import { Client, Message } from 'discord.js'
import cron from 'node-cron'

const gloomyResponses = [
  '...',
  'どうして...',
  'すみません...',
  'ちょっとほっといて...',
  '誰かと遊びたいなぁ...',
]

const neutralResponses = [
  '今日も良い天気ですね',
  '元気ですか',
  '何か用かな',
  'あたし？',
]

const joyfulResponses = [
  '今日君と話してよかった！',
  '太陽をたたえよ！',
  '勉強頑張ってね！',
  '君ならきっとできるよ！',
]

const irritatedResponses = [
  '君はどうしてここに来たんだ？',
  '趣味は他にないのか？',
  '何様のつもりだ？',
  '君きっしょいなぁ',
  '勉強しないの？',
  'うるせぇ',
]

const replyGloomy = (): string => {
  const random_index = Math.round(Math.random() * gloomyResponses.length - 1)
  return gloomyResponses[random_index]
}
const replyJoyful = (): string => {
  const random_index = Math.round(Math.random() * joyfulResponses.length - 1)
  return joyfulResponses[random_index]
}
const replyNeutral = () => {
  const random_index = Math.round(Math.random() * neutralResponses.length - 1)
  return neutralResponses[random_index]
}
const replyIrritated = (): string => {
  const random_index = Math.round(Math.random() * irritatedResponses.length - 1)
  return irritatedResponses[random_index]
}

const JOYFUL = 'joyful'
const IRRITATED = 'irritated'
const GLOOMY = 'gloomy'
const NEUTRAL = 'neutral'

const emotionReplies = {
  gloomy: replyGloomy,
  neutral: replyNeutral,
  joyful: replyJoyful,
  irritated: replyIrritated,
}

let current_emotion = NEUTRAL
let minutes_uninteracted = 0
let recentlyInteracted: string[] = []

const updateEmotion = (author_id?: string) => {
  let new_emotion = NEUTRAL

  if (!author_id) minutes_uninteracted += 5
  if (minutes_uninteracted > 15) {
    // forget a random interaction
    const random_id = recentlyInteracted[Math.round(Math.random() * recentlyInteracted.length - 1)]
    recentlyInteracted.splice(recentlyInteracted.indexOf(random_id), 1)
  }

  const recentInteractionsTotal = recentlyInteracted.length
  const joyfulThreshold_2 = (recentInteractionsTotal > 4)
  const gloomyThreshold = recentInteractionsTotal < 1 && minutes_uninteracted > 55

  if (author_id) {
    const recentInteractionsFromAuthor = recentlyInteracted.filter((id) => id === author_id).length
    const irritationThreshold = recentInteractionsFromAuthor > 4
    const joyfulThreshold_1 = (recentInteractionsTotal > recentInteractionsFromAuthor)

    if (joyfulThreshold_1) new_emotion = JOYFUL
    else if (irritationThreshold) new_emotion = IRRITATED
  } else if (joyfulThreshold_2) new_emotion = JOYFUL
  else if (gloomyThreshold) new_emotion = GLOOMY

  // remove author from the recently interacted array
  if (author_id && new_emotion === IRRITATED) {
    recentlyInteracted = recentlyInteracted.filter((id) => id !== author_id)
  }

  // pure bliss achieved, purge the array to rebalance emotions
  if (new_emotion === JOYFUL) recentlyInteracted = []
  // reset gloomy counter
  if (new_emotion === GLOOMY || new_emotion !== NEUTRAL) minutes_uninteracted -= 30
  
  current_emotion = new_emotion
}

const logCurrentState = (msg?: string) => {
  if (msg) console.log('reply: ', msg)
  console.log('current emotion: ', current_emotion)
  console.log('minutes uninteracted: ', minutes_uninteracted)
  console.log('recently interacted: ', JSON.stringify(recentlyInteracted, null, 2))
}

const handleAozoraMentioned = (message: Message) => {
  recentlyInteracted.push(message.author.id)
  updateEmotion(message.author.id)

  const response = emotionReplies[current_emotion]()
  message.reply(response)
  logCurrentState(response)
}

export const emotionJob = cron.schedule('*/5 * * * *', () => {
  updateEmotion()
  logCurrentState()
})

export default handleAozoraMentioned
