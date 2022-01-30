import mongoose, { Schema } from 'mongoose'

const requiredString = {
  type: String,
  required: true,
}

const resultSchema = new Schema({
  result: requiredString,
  target_language: requiredString,
  translation_source: requiredString,
  voice_samples: [{
    url: String,
    speaker: String,
    gender: {
      type: String,
      enum: ['male', 'female', 'non-binary'],
    },
    recorded_on: Date,
  }]
},
{
  timestamps: true,
})

export default mongoose.model('TranslationResult', resultSchema)
