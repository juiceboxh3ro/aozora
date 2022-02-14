import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { PokemonInput } from './inputs/pokemon.input'
import { PokemonReturnType } from './dto/pokemon.dto'
import { PokemonService } from './pokemon.service'
import { Pokemon } from './pokemon.model'

@Resolver()
export class PokemonResolver {
  constructor(private readonly pokemonService: PokemonService) {}

  @Query(() => [PokemonReturnType])
  async findPokemon(): Promise<Pokemon[]> {
    return this.pokemonService.catchEmAll()
  }

  @Mutation(() => PokemonReturnType)
  async createPokemon(
    @Args('payload') payload: PokemonInput
  ): Promise<Pokemon> {
    return this.pokemonService.addPokemon(payload)
  }
}
