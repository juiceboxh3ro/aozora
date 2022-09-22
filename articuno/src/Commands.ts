import { SlashCommand, MessageCommand, UserCommand } from './typings/types'
import {
  AddFurigana,
  AddFuriganaMenu,
  DeepL,
  DeepLSupported,
  GetKanji,
  Jisho,
  InviteAozora,
  TranslateMessage,
} from './commands/index'

const DevCommands: (SlashCommand | MessageCommand | UserCommand)[] = [
  AddFurigana,
  AddFuriganaMenu,
  DeepL,
  DeepLSupported,
  GetKanji,
  Jisho,
  InviteAozora,
  TranslateMessage,
]

const GlobalCommands: (SlashCommand | MessageCommand | UserCommand)[] = [
  AddFurigana,
  AddFuriganaMenu,
  DeepL,
  DeepLSupported,
  GetKanji,
  TranslateMessage,
]

export default {
  DevCommands,
  GlobalCommands,
}
