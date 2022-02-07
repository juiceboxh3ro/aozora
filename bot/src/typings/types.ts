/* eslint-disable no-shadow */
/* eslint-disable no-multi-spaces */
/* eslint-disable no-use-before-define */
/* eslint-disable max-classes-per-file */
import {
  BaseCommandInteraction,
  ChatInputApplicationCommandData,
  Client,
  ContextMenuInteraction,
  EmbedAuthorData,
  EmbedFieldData,
  EmbedFooterData,
  MessageApplicationCommandData,
  UserApplicationCommandData,
} from 'discord.js'

export type AZR_EmbedHandler = {
  description?: string,
  footer?: EmbedFooterData,
  author?: EmbedAuthorData
  fields?: EmbedFieldData[]
}

export interface SlashCommand extends ChatInputApplicationCommandData {
  isDevCommand: boolean
  run: (client: Client, interaction: BaseCommandInteraction) => Promise<void>
}

export interface MessageCommand extends MessageApplicationCommandData {
  isDevCommand: boolean
  run: (client: Client, interaction: ContextMenuInteraction) => Promise<void>
}

export interface UserCommand extends UserApplicationCommandData {
  isDevCommand: boolean
  run: (client: Client, interaction: ContextMenuInteraction) => Promise<void>
}

export interface DeepLClass {
  token: string
  translate: (arg0: string, arg1: string, arg2: string) => Promise<boolean | EmbedFieldData[]>
}

export interface DeepLResponse {
  translations: {
    text: string
    detected_source_language?: string
  }[]
}

export interface StringMap {
  [key: string]: string
}

// ***************
// KUROSHIRO TYPES
// ***************

export declare class kuroshiro {
  constructor(args: never)

  init(arg: kuroshiro_analyzer_kuromoji): any

  util(): Util

  convert(arg0: string, arg1?: ConvertOptions): Promise<string>
}

export type ConvertTo    = 'hiragana' | 'katakana' | 'romaji'
export type ConvertMode  =  'normal'  |  'spaced'  | 'okurigana' | 'furigana'
export type RomajiSystem = 'hepburn'  |  'nippon'  | 'passport'

export type ConvertOptions = {
  to?: ConvertTo
  mode?: ConvertMode
  romajiSystem?: RomajiSystem
  delimiter_start?: string | '('
  delimiter_end?: string | ')'
}

export type Convert = (arg0: string, arg1: ConvertOptions) => Promise<string>

export type CheckInput = (arg0: string) => boolean

export enum StrType {
  PureKanji = 0,
  KanjiKanaMixed,
  PureKana,
  Other,
}

export interface Util {
  // Check if input char is hiragana.
  isHiragana: CheckInput

  // Check if input char is katakana.
  isKatakana: CheckInput

  // Check if input char is kana.
  isKana: CheckInput

  // Check if input char is kanji.
  isKanji: CheckInput

  // Check if input char is Japanese.
  isJapanese: CheckInput

  // Check if input string has hiragana.
  hasHiragana: CheckInput

  // Check if input string has katakana.
  hasKatakana: CheckInput

  // Check if input string has kana.
  hasKana: CheckInput

  // Check if input string has kanji.
  hasKanji: CheckInput

  // Check if input string has Japanese.
  hasJapanese: CheckInput

  // Convert input kana string to hiragana.
  kanaToHiragana: (arg0: string) => string

  // Convert input kana string to katakana.
  kanaToKatakana: (arg0: string) => string

  // Convert input kana string to romaji. Param system accepts "nippon", "passport", "hepburn" (Default: “hepburn”).
  kanaToRomaji: (arg0: string, arg1?: RomajiSystem) => string

  // Get the type of a given string
  getStrType: (arg0: string) => StrType
}

export declare class kuroshiro_analyzer_kuromoji {
  constructor(...args: any[])

  init(): any

  parse(...args: any[]): any
}
/* eslint-enable */
