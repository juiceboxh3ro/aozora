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

export interface AZR_Member {
  id: string
  discord_id: string
  discord_avatar: boolean
  discord_username: string
  discord_discriminator: string
  discord_accentColor: string
  discord_banner: string
  discord_mfa_enabled: boolean
  discord_verified: boolean

  last_study_date: Date
  saved_search_results: string[]
  study_streak: number
  total_days_studied: number
}
