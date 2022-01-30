import mongoose, { Schema } from 'mongoose'

const requiredString = {
  type: String,
  required: true,
}

const managerSchema = new Schema({
  _id: requiredString,
  member: { type: Schema.Types.ObjectId, ref: 'Member' },
},
{
  timestamps: true,
})

export default mongoose.model('Manager', managerSchema)
