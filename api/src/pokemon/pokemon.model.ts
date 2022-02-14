import * as mongoose from 'mongoose'

export const PokemonSchema = new mongoose.Schema({
  pokedex_number: [Number],
  names: {
    en: { type: String, trim: true },
    jp: { type: String, trim: true },
    kr: { type: String, trim: true },
  },
  types: {
    primary: { type: String, trim: true },
    secondary: { type: String, trim: true },
  },
},
{
  timeseries: {
    timeField: 'timestamp',
    metaField: 'metadata',
    granularity: 'hours',
    expireAfterSeconds: 0,
  },
  optimisticConcurrency: true,
  strict: true,
  timestamps: true,
})

export interface Pokemon extends mongoose.Document {
  readonly _id: mongoose.Schema.Types.ObjectId

  readonly pokedex_number: number[]

  readonly names: {
    en: string
    jp: string
    kr: string
  }

  readonly types: {
    primary: string
    secondary: string
  }
}
