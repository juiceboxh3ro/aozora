import DiscordJS, { BaseCommandInteraction, Client, MessageEmbed } from 'discord.js'
import { Command, ConvertOptions } from '../../typings/types'
import WithFurigana from '../../util/WithFurigana'

export const AddFurigana: Command = {
  name: 'furigana',
  description: 'Add kanji readings to a Japanese word or phrase',
  type: 'CHAT_INPUT',
  options: [
    {
      name: 'token',
      description: 'Word or phrase to add furigana to, max 280 characters',
      required: true,
      type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING,
    },
  ],
  run: async (client: Client, interaction: BaseCommandInteraction) => {
    const { options } = interaction
    const token = options.get('token', true).value!.toString()

    if (token.trim().length > 280) {
      await interaction.editReply({
        content: `Enter a shorter phrase, please! Your token is ${token.trim().length - 280} characters too long.`
      })
      return 
    }

    const furiOptions: ConvertOptions = {
      to: 'hiragana',
      mode: 'normal',
      romajiSystem: 'hepburn',
      delimiter_start: '(',
      delimiter_end: ')',
    }

    const withFurigana: string = await WithFurigana.convert(token, furiOptions)

    // const embed = new MessageEmbed()
    //   .setColor('#4D8DE6')
    //   .setTitle('title')
    //   .setURL('https://www.deepl.com/translator')
    //   .setAuthor({
    //     name: 'DeepL Translation',
    //     iconURL: process.env.BUCKET + '/images/assets/deepl.jpg',
    //     url: 'https://www.deepl.com/translator',
    //   })
    //   .setFooter({
    //     text: 'Translation by DeepL',
    //     iconURL: process.env.S3_BUCKET + '/images/assets/deepl.jpg',
    //   })
    //   .setTimestamp()

    
    // embed.setDescription(parsed)
    

    await interaction.editReply({ content: withFurigana })
  },
}
