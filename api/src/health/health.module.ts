import { Module } from '@nestjs/common'
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose'
import { TerminusModule } from '@nestjs/terminus'
import { HealthController } from './health.controller'
import 'dotenv/config'

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
    TerminusModule,
    MongooseModule.forRoot(MONGO_URI, DB_OPTIONS),
  ],
  controllers: [HealthController],
})
export class HealthModule {}
