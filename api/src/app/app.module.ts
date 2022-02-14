import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { CacheModule, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { TerminusModule } from '@nestjs/terminus'
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose'

import { join } from 'path/posix'
import 'dotenv/config'

import { PokemonModule } from 'src/pokemon/pokemon.module';
import { HealthController } from 'src/health/health.controller'
import { HealthModule } from 'src/health/health.module'

const DATABASE = process.env.DATABASE || ''
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD || ''
const DATABASE_NAME = process.env.DATABASE_NAME || ''
const MONGO_URI = DATABASE.replace('<PASSWORD>', DATABASE_PASSWORD).replace('<NAME>', DATABASE_NAME)

const DB_OPTIONS: MongooseModuleOptions = {
  autoIndex: true,
  keepAlive: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

@Module({
  imports: [
    PokemonModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    MongooseModule.forRoot(MONGO_URI, DB_OPTIONS),
    CacheModule.register(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      path: '/api'
    }),
    HealthModule
  ],
  controllers: [AppController],
  providers: [AppService],
  
})

export class AppModule {}
