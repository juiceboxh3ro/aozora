import { Client } from 'discord.js';
import { ActivityOptions } from 'src/typings/types';

const updateStatus = (client: Client, options: ActivityOptions): boolean => {
  let result: boolean
  try {
    client.user?.setPresence(options)
    result = true
  } catch (err) {
    console.error(err)
    result = false
  }
  return result
}

export default updateStatus
