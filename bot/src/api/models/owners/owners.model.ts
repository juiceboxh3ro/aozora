import mongoose, { Schema } from 'mongoose'

const requiredString = {
  type: String,
  required: true,
}

const ownerSchema = new Schema({
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
},
{
  timestamps: true,
})

export default mongoose.model('Owner', ownerSchema)
