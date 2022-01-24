import 'dotenv/config'
import { Client } from "discord.js"
import ready from './listeners/ready'
import interactionCreate from './listeners/interactionCreate'
import mongoose from 'mongoose'

console.log("Aozora is starting...")

const TOKEN = process.env.PRIVATE_KEY

const client = new Client({
  intents: []
})

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

client.on('ready', async () => {
  await mongoose.connect(MONGO_URI || '', dbOptions)
  interactionCreate(client)
})

ready(client)

client.login(TOKEN)
