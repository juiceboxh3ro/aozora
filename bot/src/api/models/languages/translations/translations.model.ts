import mongoose, { Schema } from 'mongoose'

const requiredString = {
  type: String,
  required: true,
}

const translationSchema = new Schema({
  token: requiredString,
  token_source: requiredString,
  token_type: {
    type: String,
    enum: ['noun', 'pronoun', 'adjective', 'adverb', 'verb', 'phrase', 'conjunction', 'preposition', 'interjection', 'other'],
  },
  results: [{ type: Schema.Types.ObjectId, ref: 'TranslationResult' }],
},
{
  timestamps: true,
})

export default mongoose.model('Translation', translationSchema)
