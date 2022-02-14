import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { PokemonInput } from './inputs/pokemon.input'
import { Pokemon } from './pokemon.model'

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel('Pokemon') private readonly pokemonModel: Model<Pokemon>
  ) {}

  async addPokemon(payload: PokemonInput): Promise<Pokemon> {
    return new this.pokemonModel(payload).save()
  }

  async catchEmAll(): Promise<Pokemon[]> {
    return this.pokemonModel.find().exec()
  }
}
