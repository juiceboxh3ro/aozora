import { NestFactory } from '@nestjs/core'
import { AppModule } from './app/app.module'
import 'dotenv/config'

const PORT = process.env.PORT ?? '4649'

const CORS_WHITELIST = process.env.NODE_ENV === 'development' ? [
  'http://localhost:4000',
  'http://localhost:3000',
  'api.stripe.com', 'checkout.stripe.com', 'files.stripe.com', 'js.stripe.com', 'm.stripe.com',
  'm.stripe.network', 'q.stripe.com',
] : [
  'api.stripe.com', 'checkout.stripe.com', 'files.stripe.com', 'js.stripe.com', 'm.stripe.com',
  'm.stripe.network', 'q.stripe.com',
]

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      credentials: true,
      methods: 'GET,HEAD,POST',
      origin: CORS_WHITELIST,
    },
    bodyParser: true,
  })

  await app.listen(PORT)
}
bootstrap()
