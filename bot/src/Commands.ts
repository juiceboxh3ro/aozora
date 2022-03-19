import { SlashCommand, MessageCommand, UserCommand } from './typings/types'
import {
  DeepL,
  AddFurigana,
  InviteAozora,
  TranslateMessage,
} from './commands/index'

const DevCommands: (SlashCommand | MessageCommand | UserCommand)[] = [
  AddFurigana,
  DeepL,
  InviteAozora,
  TranslateMessage,
]

const FZStaffCommands: (SlashCommand | MessageCommand | UserCommand)[] = [

]

const GlobalCommands: (SlashCommand | MessageCommand | UserCommand)[] = [
  AddFurigana,
  DeepL,
  TranslateMessage,
]

export default {
  DevCommands,
  FZStaffCommands,
  GlobalCommands,
}
