import mongoose, { Schema } from 'mongoose'

const requiredString = {
  type: String,
  required: true,
}

const studyCardSchema = new Schema({
  decks: [{ type: Schema.Types.ObjectId, ref: 'StudyDeck' }],
  front: requiredString,
  back: requiredString,
  hint: String,
  card_type: String,
  times_correct: { type: Number, default: 0, },
  times_incorrect: { type: Number, default: 0, },
  reviews: [{ _id: false, correct: Boolean, date_reviewed: Date, }],
  next_review: Date,
  burned: { type: Boolean, default: false, },
  burned_on: Date,
},
{
  timestamps: true,
})

export default mongoose.model('StudyCard', studyCardSchema)
