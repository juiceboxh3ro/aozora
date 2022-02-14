import { ObjectType, Field, Int, ID } from '@nestjs/graphql'
import { PokemonNames, PokemonTypes } from '../inputs/pokemon.input'

@ObjectType()
export class PokemonReturnType {
  @Field(() => ID)
  _id: string

  @Field(() => [Int])
  pokedex_number: number[]

  @Field(() => PokemonNames)
  names: PokemonNames

  @Field(() => PokemonTypes)
  types: PokemonTypes
}
