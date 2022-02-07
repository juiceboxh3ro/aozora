import DiscordJS, { BaseCommandInteraction, Client, EmbedFieldData } from 'discord.js'
import aozoraEmbedHandler from '../../util/aozoraEmbed'
import DeepLAPI from '../../api/helpers/DeepL.api'

import { AZR_EmbedHandler, SlashCommand } from '../../typings/types'

/*
const { SlashCommandBuilder } = require('@discordjs/builders');

const data = new SlashCommandBuilder()
	.setName('echo')
	.setDescription('Replies with your input!')
	.addStringOption(option =>
		option.setName('input')
			.setDescription('The input to echo back')
			.setRequired(true));
*/

const DeepL: SlashCommand = {
  name: 'deepl',
  description: 'Translate a word or phrase using DeepL translation services',
  type: 'CHAT_INPUT',
  options: [
    {
      name: 'translate',
      description: 'Word or phrase to translate, max 280 characters',
      required: true,
      type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING,
    },
    {
      name: 'target',
      description: 'Target language, default: JA (for list of available languages use /available)',
      required: false,
      type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING,
    },
    {
      name: 'source',
      description: 'Optional: Source language (for list of available languages use /available)',
      required: false,
      type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING,
    },
  ],
  isDevCommand: false,
  run: async (client: Client, interaction: BaseCommandInteraction) => {
    const { options } = interaction

    const token = options.get('translate', true).value!.toString()
    const target = options.get('target', false)?.value?.toString() || ''
    const source = options.get('source', false)?.value?.toString() || ''
    const token_length_limit = 280

    if (token.trim().length > token_length_limit) {
      await interaction.editReply({
        content: `Enter a shorter phrase, please! Your token is ${token.trim().length - token_length_limit} characters too long.`
      })
      return
    }

    const deepL = new DeepLAPI(token, target, source)
    const translated = await deepL.translate()

    const embed_options: AZR_EmbedHandler = {
      author: {
        name: 'DeepL Translation',
        iconURL: `${process.env.BUCKET}/images/assets/deepl.jpg`,
        url: 'https://www.deepl.com/translator',
      },
    }
    if (!translated) {
      await interaction.editReply('Something went wrong')
      return
    }
    if (typeof translated === 'string') embed_options.description = translated
    else embed_options.fields = translated as EmbedFieldData[]

    const embed = aozoraEmbedHandler(embed_options)

    await interaction.editReply({ embeds: [embed] })
  },
}

export default DeepL
