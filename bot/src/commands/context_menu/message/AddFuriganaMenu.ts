import {
  Client,
  ContextMenuInteraction,
  EmbedField,
  MessageEmbed,
} from 'discord.js'
import { MessageCommand } from 'src/typings/types'
import withFurigana from '../../../util/withFurigana'

const embedWithFurigana = async (embed: MessageEmbed) => {
  let copiedEmbed = { ...embed }

  let _description
  if (copiedEmbed?.description) {
    _description = await withFurigana(copiedEmbed?.description)
  }

  const _fields: EmbedField[] = []
  if (copiedEmbed?.fields?.length) {
    const _fieldsNamesPromise = copiedEmbed.fields.map((field) => withFurigana(field.name))
    const _fieldsValuesPromise = copiedEmbed.fields.map((field) => withFurigana(field.value))

    const _fieldNames = await Promise.all(_fieldsNamesPromise)
    const _fieldValues = await Promise.all(_fieldsValuesPromise)

    copiedEmbed.fields.forEach((_, i) => {
      _fields.push({
        name: _fieldNames[i],
        value: _fieldValues[i],
        inline: _.inline,
      })
    })
  }

  let _footer
  if (copiedEmbed?.footer?.text) {
    const _text = await withFurigana(copiedEmbed.footer.text)
    _footer = { ...copiedEmbed.footer, text: _text }
  }

  copiedEmbed = {
    ...copiedEmbed,
    description: _description,
    fields: _fields,
    footer: _footer,
  }

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
      const _embedsPromise = embeds.map((embed) => embedWithFurigana(embed))
      const furiedEmbeds = await Promise.all(_embedsPromise)

      reaction = '✅'
      result = { ...result, embeds: furiedEmbeds }
    }

    await interaction.editReply(result)
    await interaction.channel?.messages.react(interaction.targetId, reaction ?? '😵‍💫')
  }
}

export default AddFuriganaMenu
