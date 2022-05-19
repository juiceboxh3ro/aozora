import {
  Client,
  ContextMenuInteraction,
  EmbedField,
  // MessageAttachment,
  MessageEmbed,
  // User,
} from 'discord.js'
import {
  // AttachmentsObj,
  MessageCommand,
} from 'src/typings/types'

// import withTesseract from '../../../util/withTesseract'
import withFurigana from '../../../util/withFurigana'

// const attachmentWithFurigana = async (attachment: AttachmentsObj): Promise<string> => {
//   const _attachment = attachment.url!

//   let recognized: string[] = []
//   recognized = await withTesseract(_attachment)
//   return recognized.join('\n')
// }

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
    // const author: User | undefined = fetchMessage?.author

    const content: string | null = fetchMessage?.content.trim().length ? fetchMessage.content : null
    const embeds: MessageEmbed[] | null = fetchMessage?.embeds.length ? fetchMessage.embeds : null
    
    // let attachments: AttachmentsObj[] | undefined = []
    // const allowedAttachments = ['image/png', 'image/jpg', 'image/jpeg', 'image/webp']

    // if (fetchMessage?.attachments) {
    //   attachments = fetchMessage.attachments.map(
    //     ({
    //       contentType,
    //       id,
    //       url,
    //       size
    //     }: MessageAttachment) => {
    //       if (contentType && allowedAttachments.includes(contentType) && size < 100001) {
    //         return {
    //           author: author?.id,
    //           id,
    //           url,
    //         }
    //       }
    //       return {}
    //     }
    //   )
    // }

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

    // if (attachments?.[0]) {
    //   result = await attachmentWithFurigana(attachments[0])
    // }

    if (!content && !embeds) result = "I can't add furigana to that 🤕"

    await interaction.editReply(result)
    await interaction.channel?.messages.react(interaction.targetId, reaction ?? '😵‍💫')
  }
}

export default AddFuriganaMenu
