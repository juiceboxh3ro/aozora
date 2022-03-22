import {
  Client,
  ContextMenuInteraction,
  EmbedField,
  MessageEmbed,
} from 'discord.js'
import { MessageCommand } from 'src/typings/types'
import withFurigana from '../../../util/withFurigana'

const embedWithFurigana = async (embed: MessageEmbed) => {
  // const transform = R.evolve({
  //   description: withFuri,
  //   footer: { text: withFuri },
  //   fields: R.map(R.evolve({ value: withFuri, name: withFuri }))
  // })
  // const evolved = R.map(transform, embeds)
  let copiedEmbed = { ...embed }

  let description
  if (copiedEmbed?.description) description = await withFurigana(copiedEmbed?.description)

  let fields: EmbedField[] = []
  if (copiedEmbed?.fields?.length) {
    const fieldsNamesPromise = copiedEmbed.fields.map((field) => withFurigana(field.name))
    const fieldsValuesPromise = copiedEmbed.fields.map((field) => withFurigana(field.value))
    const fieldNames = await Promise.all(fieldsNamesPromise)
    const fieldValues = await Promise.all(fieldsValuesPromise)

    fields = copiedEmbed.fields
      .map((f, i) => ({ name: fieldNames[i], value: fieldValues[i], inline: f.inline }))
  }

  let footer
  if (copiedEmbed?.footer?.text) {
    const text = await withFurigana(copiedEmbed.footer.text)
    footer = { ...copiedEmbed.footer, text }
  }

  copiedEmbed = { ...copiedEmbed, description, footer }
  if (fields.length) copiedEmbed.fields = fields
  return copiedEmbed
}

const AddFuriganaMenu: MessageCommand = {
  name: 'Add furigana to message',
  type: 'MESSAGE',
  isDevCommand: false,
  run: async (
    client: Client,
    interaction: ContextMenuInteraction,
  ): Promise<void> => {
    const fetchMessage = await interaction.channel?.messages.fetch(interaction.targetId)

    const content: string | null = fetchMessage?.content.trim().length ? fetchMessage.content : null
    const embeds: MessageEmbed[] | null = fetchMessage?.embeds.length ? fetchMessage.embeds : null

    let result = {}
    let reaction: string | null = null

    if (content) {
      const furiedContent = await withFurigana(content)
      reaction = '✅'
      result = { content: furiedContent }
    }

    if (embeds) {
      const embedsPromise = embeds.map((embed) => embedWithFurigana(embed))
      const furiedEmbeds = await Promise.all(embedsPromise)

      reaction = '✅'
      result = { ...result, embeds: furiedEmbeds }
    }

    if (!content && !embeds) result = "I can't translate that"

    await interaction.editReply(result)
    await interaction.channel?.messages.react(interaction.targetId, reaction ?? '😵‍💫')
  }
}

export default AddFuriganaMenu
