import { SlashCommand, MessageCommand, UserCommand } from './typings/types'
import {
  Ping,
  DeepL,
  AddFurigana,
  InviteAozora,
} from './commands/index'

const DevCommands: (SlashCommand | MessageCommand | UserCommand)[] = [
  Ping,
  InviteAozora,
]

const FZStaffCommands: (SlashCommand | MessageCommand | UserCommand)[] = [

]

const GlobalCommands: (SlashCommand | MessageCommand | UserCommand)[] = [
  AddFurigana,
  DeepL,
]

export default {
  DevCommands,
  FZStaffCommands,
  GlobalCommands,
}
