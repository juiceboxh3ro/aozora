import { Command } from './typings/types'
import Ping from './commands/Ping'
import DeepL from './commands/deepl/DeepL'
import AddFurigana from './commands/japanese/AddFurigana'

const Commands: Command[] = [
  Ping,
  DeepL,
  AddFurigana
]

export default Commands
