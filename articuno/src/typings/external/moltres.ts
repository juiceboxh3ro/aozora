interface Default_PG_Columns {
  id?: string
  inserted_at?: Date
  updated_at?: Date
}

export interface AZR_KanjiCharacter extends Default_PG_Columns {
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

export interface AZR_Member extends Default_PG_Columns {
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

export interface AZR_Card extends Default_PG_Columns {
  deck_id: string
  discord_id: string
  front: string
  back: string
  burned: boolean
  progress: number
  prev_response_quality: number
  hint?: string
}
