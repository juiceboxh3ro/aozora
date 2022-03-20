import { SlashCommand, MessageCommand, UserCommand } from './typings/types'
import {
  DeepL,
  DeepLSupported,
  AddFurigana,
  InviteAozora,
  TranslateMessage,
} from './commands/index'

const DevCommands: (SlashCommand | MessageCommand | UserCommand)[] = [
  AddFurigana,
  DeepL,
  DeepLSupported,
  InviteAozora,
  TranslateMessage,
]

const FZStaffCommands: (SlashCommand | MessageCommand | UserCommand)[] = [

]

const GlobalCommands: (SlashCommand | MessageCommand | UserCommand)[] = [
  AddFurigana,
  DeepL,
  DeepLSupported,
  TranslateMessage,
]

export default {
  DevCommands,
  FZStaffCommands,
  GlobalCommands,
}
