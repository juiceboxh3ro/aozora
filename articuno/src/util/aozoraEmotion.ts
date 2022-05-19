import { Client, Message } from 'discord.js'
import cron from 'node-cron'

const gloomyResponses = [
  '...',
  'どうして...',
  'すみません...',
  'ちょっとほっといて...',
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
]

const irritatedResponses = [
  '君はどうしてここに来たんだ？',
  '趣味は他にないのか？',
  '何様のつもりだ？',
  '君きっしょいなぁ',
  '勉強しないの？',
  'うるせぇ',
]

const emotions = [
  'irritated',
  'gloomy',
  'neutral',
  'joyful',
]

const replyGloomy = (): string => gloomyResponses[Math.round(Math.random() * gloomyResponses.length)]
const replyJoyful = (): string => joyfulResponses[Math.round(Math.random() * joyfulResponses.length)]
const replyNeutral = () => neutralResponses[Math.round(Math.random() * neutralResponses.length)]
const replyIrritated = (): string => irritatedResponses[Math.round(Math.random() * irritatedResponses.length)]

const emotionReplies = {
  gloomy: replyGloomy,
  neutral: replyNeutral,
  joyful: replyJoyful,
  irritated: replyIrritated,
}

let current_emotion = 'neutral'
let minutes_uninteracted = 0
let recentlyInteracted: string[] = []

const updateEmotion = (author_id?: string) => {
  let new_emotion = 'neutral'

  if (!author_id) minutes_uninteracted += 5
  if (minutes_uninteracted > 15) {
    const random_id = recentlyInteracted[Math.round(Math.random() * recentlyInteracted.length)]
    recentlyInteracted.splice(recentlyInteracted.indexOf(random_id), 1)
  }

  const recentInteractionsTotal = recentlyInteracted.length
  const joyfulThreshold_2 = (recentInteractionsTotal > 4)
  const gloomyThreshold = recentInteractionsTotal < 1 && minutes_uninteracted > 60

  if (author_id) {
    const recentInteractionsFromAuthor = recentlyInteracted.filter((id) => id === author_id).length
    const joyfulThreshold_1 = (recentInteractionsTotal > recentInteractionsFromAuthor)
    const irritationThreshold = recentInteractionsFromAuthor > 4

    if (joyfulThreshold_1) {
      new_emotion = 'joyful'
    } else if (irritationThreshold) {
      new_emotion = 'irritated'
      // remove author from the recently interacted array
      recentlyInteracted = recentlyInteracted.filter((id) => id !== author_id)
    }
  } else if (joyfulThreshold_2) {
    new_emotion = 'joyful'
    // pure bliss achieved, purge the array to rebalance emotions
    recentlyInteracted = []
  } else if (gloomyThreshold) {
    new_emotion = 'gloomy'
  }

  current_emotion = new_emotion
}

const emotionJob = cron.schedule('5 * * * *', () => {
  updateEmotion()
  console.log('current emotion: ', current_emotion)
  console.log('minutes uninteracted: ', minutes_uninteracted)
})

const handleAozoraMentioned = (client: Client, message: Message) => {
  recentlyInteracted.push(message.author.id)
  updateEmotion(message.author.id)

  // restart the cron-job
  emotionJob.stop()
  emotionJob.start()

  const response = emotionReplies[current_emotion]()
  message.reply(response)

  console.log(current_emotion, response)
}

export default handleAozoraMentioned
