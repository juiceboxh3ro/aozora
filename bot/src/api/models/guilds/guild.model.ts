import mongoose, { Schema } from 'mongoose'

const requiredString = {
  type: String,
  required: true,
}

const dateField = {
  type: Date,
  default: Date.now,
}

const guildSchema = new Schema({
  _id: requiredString,
  aozora_joined: dateField,
},
{
  timestamps: true,
})

export default mongoose.model('Guild', guildSchema)
