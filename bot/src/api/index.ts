import { ApolloClient, InMemoryCache } from '@apollo/client'

const uri = `${process.env.AOZORA_API_ENDPOINT}`

const client = new ApolloClient({
  uri,
  cache: new InMemoryCache(),
  name: process.env.AOZORA_SECRET_NAME,
  version: '0.1.0',
  queryDeduplication: true,
})

export default client
