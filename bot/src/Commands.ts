import { Command } from './typings/types'
import { Ping } from './commands/Ping'
import { DeepL } from './commands/deepl/DeepL'

export const Commands: Command[] = [
  Ping,
  DeepL
]
