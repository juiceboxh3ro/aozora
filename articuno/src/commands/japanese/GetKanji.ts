import DiscordJS, { BaseCommandInteraction, Client, EmbedField } from 'discord.js'
import { isJapanese, isKana } from 'wanakana'
import axios from '../../api'

import { AZR_EmbedHandler, SlashCommand } from '../../typings/types'
import { KA_KanjiCharacter, KA_Response } from '../../typings/external/kanji_alive'
import { AZR_KanjiCharacter } from '../../typings/external/moltres'

import aozoraEmbedHandler from '../../util/aozoraEmbed'

const cachedSearches: { [key: string]: AZR_KanjiCharacter } = {}

const reshapeKanjiAliveResponse = ({
  kanji,
  radical,
  references,
  examples,
}: KA_KanjiCharacter): AZR_KanjiCharacter => {
  const reshaped_kanji: AZR_KanjiCharacter = {
    onyomi: kanji.onyomi.katakana,
    kunyomi: kanji.kunyomi.hiragana,
    examples: examples.map((e) => e.japanese),
    character: kanji.character,
    en_meaning: kanji.meaning.english,
    stroke_count: kanji.strokes.count,
    composition_info: {
      naritachi: '',
      radicals: [radical.character],
    },
    study_levels: {
      grade: references.grade,
      kodansha: parseInt(references.kodansha, 10),
      classic_nelson: parseInt(references.classic_nelson, 10),
    }
  }

  cachedSearches[kanji.character] = reshaped_kanji
  return reshaped_kanji
}

const getSingleDetailsFromKanjiAlive = async (kanji_char: string): Promise<AZR_KanjiCharacter | null> => {
  const rapidAPIKey = process.env?.RAPID_API_KEY || ''
  const uri = encodeURI(`https://kanjialive-api.p.rapidapi.com/api/public/kanji/${kanji_char}`)
  try {
    const response: KA_Response = await axios.get(uri, {
      headers: {
        'X-RapidAPI-Host': 'kanjialive-api.p.rapidapi.com',
        'X-RapidAPI-Key': rapidAPIKey,
      }
    })
  
    return reshapeKanjiAliveResponse(response.data)
  } catch (err) {
    console.error(err)
    return null
  }
}

const buildKanjiEmbed = (kanji: string): AZR_EmbedHandler => {
  if (cachedSearches[kanji]) {
    const {
      onyomi,
      kunyomi,
      examples,
      character,
      en_meaning,
      stroke_count,
      composition_info,
    } = cachedSearches[kanji]
  
    let description = character
    if (description && en_meaning) description += `\nMeaning: ${en_meaning}`
    if (description && stroke_count) description += `\n${stroke_count} strokes`

    const fields: EmbedField[] = [
      {
        name: 'Onyomi',
        value: onyomi || 'n/a',
        inline: true,
      },
      {
        name: 'Kunyomi',
        value: kunyomi || 'n/a',
        inline: true,
      },
      ...composition_info.radicals.map((r, i) => ({
        name: `Radical ${i + 1}`,
        value: r,
        inline: true,
      })),
      ...examples.map((e, i) => ({
        name: `Example ${i + 1}`,
        value: e,
        inline: true,
      })),
    ]
  
    return ({ description, fields })
  }
  return ({ description: `No data available for ${kanji}` })
}

const SearchKanji: SlashCommand = {
  name: 'kanji',
  description: 'Look up a kanji character',
  type: 'CHAT_INPUT',
  options: [
    {
      name: 'kanji',
      description: 'Character to search',
      required: true,
      type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING,
    },
  ],
  isDevCommand: false,
  run: async (client: Client, interaction: BaseCommandInteraction): Promise<void> => {
    const { options } = interaction
    const kanji = options.get('kanji', true).value!.toString()?.trim()

    if (kanji.length > 1) {
      await interaction.editReply({
        content: 'One kanji at a time, please!'
      })
      return
    }

    if (!isJapanese(kanji) || isKana(kanji)) {
      await interaction.reply({
        content: "That doesn't appear to be kanji.",
        ephemeral: true,
      })
      return
    }

    let content: null | string = null

    let kanjiData: AZR_EmbedHandler = {
      description: 'No data available',
      fields: [],
    }

    if (!cachedSearches?.[kanji]) {
      const uri = encodeURI(`/list_kanji/${kanji}`)
      try {
        const response = await axios.get(uri)
        if (response?.data?.kanji) {
          // if moltres is awake, store response in cache
          cachedSearches[kanji] = response.data.kanji
        } else {
          // if moltres is sleeping, try getting info from Kanji Alive and put that response in cache
          await getSingleDetailsFromKanjiAlive(kanji)
        }
      } catch (err) {
        // if everything errors out, cry deeply
        content = "Things aren't going well :("
      }
    }

    kanjiData = buildKanjiEmbed(kanji)
    const embeds = [aozoraEmbedHandler(kanjiData)]
    await interaction.editReply({ content, embeds })
  },
}

export default SearchKanji
