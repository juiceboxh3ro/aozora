import { AxiosResponse } from 'axios'

export interface KA_Kanji {
  character: string
  meaning: {
    english: string
  }
  strokes: {
    count: number
    timings: number[]
    images: string[]
  }
  onyomi: {
    romaji: string
    katakana: string
  }
  kunyomi: {
    romaji: string
    hiragana: string
  }
  video: {
    poster: string
    mp4: string
    webm: string
  }
}

export interface KA_Radical {
  character: string
  strokes: number
  image: string
  position: {
    hiragana: string
    romaji: string
    icon: string
  }
  name: {
    hiragana: string
    romaji: string
  }
  meaning: {
    english: string
  }
  animation: string[]
}

export interface KA_Reference {
  grade: number
  kodansha: string
  classic_nelson: string
}

export interface KA_Example {
  japanese: string
  meaning: {
    english: string
  }
  audio: {
    opus: string
    aac: string
    ogg: string
    mp3: string
  }
}

export interface KA_KanjiCharacter {
  kanji: KA_Kanji
  radical: KA_Radical
  references: KA_Reference
  examples: KA_Example[]
}

export interface KA_Response extends AxiosResponse {
  data: KA_KanjiCharacter
}
