import { SlashCommand, MessageCommand, UserCommand } from './typings/types'
import {
  AddFurigana,
  AddFuriganaMenu,
  DeepL,
  DeepLSupported,
  InviteAozora,
  TranslateMessage,
} from './commands/index'

const DevCommands: (SlashCommand | MessageCommand | UserCommand)[] = [
  AddFurigana,
  AddFuriganaMenu,
  DeepL,
  DeepLSupported,
  InviteAozora,
  TranslateMessage,
]

const FZStaffCommands: (SlashCommand | MessageCommand | UserCommand)[] = [

]

const GlobalCommands: (SlashCommand | MessageCommand | UserCommand)[] = [
  AddFurigana,
  AddFuriganaMenu,
  DeepL,
  DeepLSupported,
  TranslateMessage,
]

export default {
  DevCommands,
  FZStaffCommands,
  GlobalCommands,
}
