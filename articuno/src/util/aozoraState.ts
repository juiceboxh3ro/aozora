import { Client } from 'discord.js'
import create from 'zustand/vanilla'

const aozoraStore = create(() => ({
  client: Client
}))

// const {
//   getState,
//   setState,
//   subscribe,
//   destroy,
// } = aozoraStore

export default aozoraStore
