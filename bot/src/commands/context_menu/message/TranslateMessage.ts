import { Client, ContextMenuInteraction, MessageResolvable } from 'discord.js'
import { isJapanese } from 'wanakana'
import { MessageCommand } from 'src/typings/types'
import withDeepLTranslate from '../../withDeepLTranslate'

const TranslateMessage: MessageCommand = {
  name: 'Translate to / from JP',
  type: 'MESSAGE',
  isDevCommand: true,
  run: async (
    client: Client,
    interaction: ContextMenuInteraction,
  ): Promise<void> => {
    const fetchMessage = await interaction.channel?.messages.fetch(interaction.targetId)
    await interaction.channel?.messages.react(interaction.targetId, '🔁')

    if (fetchMessage?.content.trim().length) {
      const token = fetchMessage.content
      const isJA = isJapanese(token)
      const source = isJA ? 'JA' : 'EN'
      const target = !isJA ? 'JA' : 'EN-US'
      const result = await withDeepLTranslate(token, target, source)
      await interaction.editReply(result)
    }
  }
}

export default TranslateMessage
