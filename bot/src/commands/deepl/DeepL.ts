import DiscordJS, { BaseCommandInteraction, Client, MessageEmbed } from 'discord.js'
import { Command } from '../../typings/types'
import DeepLAPI from '../../api/helpers/DeepL.api'

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

export const DeepL: Command = {
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
  run: async (client: Client, interaction: BaseCommandInteraction) => {
    const { options } = interaction

    const token = options.get('translate', true).value!.toString()
    const target = options.get('target', false)?.value?.toString() || ''
    const source = options.get('source', false)?.value?.toString() || ''

    if (token.trim().length > 280) {
      await interaction.editReply({
        content: `Enter a shorter phrase, please! Your token is ${token.trim().length - 280} characters too long.`
      })
      return 
    }

    const deepL = new DeepLAPI(token, target, source)
    const translated = await deepL.translate()

    const embed = new MessageEmbed()
      .setColor('#4D8DE6')
      // .setTitle('title')
      // .setURL('https://www.deepl.com/translator')
      .setAuthor({
        name: 'DeepL Translation',
        iconURL: process.env.BUCKET + '/images/assets/deepl.jpg',
        url: 'https://www.deepl.com/translator',
      })
      // .setFooter({
      //   text: 'Translation by DeepL',
      //   iconURL: process.env.S3_BUCKET + '/images/assets/deepl.jpg',
      // })
      // .setTimestamp()

    if (typeof translated === 'string') {
      embed.setDescription(translated)
    } else {
      embed.addFields(translated)
    }

    await interaction.editReply({ embeds: [embed] })
  },
}
