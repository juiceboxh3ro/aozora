export interface AZR_KanjiCharacter {
  onyomi: string
  kunyomi: string
  examples: string[]
  character: string
  en_meaning: string
  stroke_count: number
  composition_info: {
    naritachi: string
    radicals: string[]
  }
  study_levels: {
    jlpt?: number
    grade?: number
    kodansha?: number
    wanikani?: number
    frequency?: number
    classic_nelson?: number
  }
}
