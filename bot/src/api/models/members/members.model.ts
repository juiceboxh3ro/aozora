import mongoose, { Schema } from 'mongoose'

const requiredString = {
  type: String,
  required: true,
}

const dateField = {
  type: Date,
  default: Date.now,
}

const memberSchema = new Schema({
  _id: requiredString,
  username: requiredString,
  discriminator: requiredString,
  avatar: String,
  banner: String,
  accentColor: String,
  locale: {
    type: String,
    default: 'en-US'
  },
  guilds: [{ // guilds where member and aozora bot intersect
    _id: String,
    roles: [String],
    isAdmin: { type: Boolean, default: false, },
  }],
  patreonSupporter: {
    active: { type: Boolean, default: false, },
    duration: { type: Number, default: 0, },
    tier: String,
  },
  study_decks: [{ type: Schema.Types.ObjectId, ref: 'Deck', }],
},
{
  timestamps: true,
})

export default mongoose.model('Member', memberSchema)
