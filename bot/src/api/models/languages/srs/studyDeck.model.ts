import mongoose, { Schema } from 'mongoose'

const requiredString = {
  type: String,
  required: true,
}

const studyDeckSchema = new Schema({
  created_by: { type: Schema.Types.ObjectId, ref: 'Member' },
  target_language: requiredString,
  source_language: requiredString,
  cards: [{ type: Schema.Types.ObjectId, ref: 'StudyCard' }],
  visibility: {
    type: String,
    default: 'drafting',
    enum: ['drafting', 'private', 'public', 'deleted']
  },
},
{
  timestamps: true,
})

export default mongoose.model('StudyDeck', studyDeckSchema)
