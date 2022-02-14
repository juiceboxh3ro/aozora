import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { PokemonSchema } from './pokemon.model'
import { PokemonResolver } from './pokemon.resolver'
import { PokemonService } from './pokemon.service'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Pokemon', schema: PokemonSchema }
    ]),
  ],
  providers: [PokemonResolver, PokemonService]
})
export class PokemonModule {}
