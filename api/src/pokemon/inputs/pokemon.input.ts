import { Field, InputType, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
@InputType('names')
export class PokemonNames {
  @Field()
  en: string
  @Field({ nullable: true })
  jp?: string
  @Field({ nullable: true })
  kr?: string
}

@ObjectType()
@InputType('types')
export class PokemonTypes {
  @Field()
  primary: string
  @Field({ nullable: true })
  secondary?: string
}

@InputType()
export class PokemonInput {
  @Field(() => [Int])
  pokedex_number: number[]

  @Field(() => PokemonNames)
  names: PokemonNames

  @Field(() => PokemonTypes, { nullable: true })
  types: PokemonTypes
}
