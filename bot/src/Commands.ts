import { SlashCommand, MessageCommand, UserCommand } from './typings/types'
import Ping from './commands/Ping'
import DeepL from './commands/deepl/DeepL'
import AddFurigana from './commands/japanese/AddFurigana'

const DevCommands: (SlashCommand | MessageCommand | UserCommand)[] = [
  Ping
]

const GuildCommands: (SlashCommand | MessageCommand | UserCommand)[] = [
  DeepL,
  AddFurigana
]

export default {
  DevCommands,
  GuildCommands,
}
