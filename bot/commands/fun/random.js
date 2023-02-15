const { ChatInputCommandInteraction, ApplicationCommandOptionType, EmbedBuilder } = require('discord.js')
const gen = require('images-generator')
const client = require('../../index')

module.exports = {
    name: 'random',
    description: 'random',
    options: [
        {
            name: 'word',
            description: 'Get a random word (unfiltered)',
            type: ApplicationCommandOptionType.Subcommand
        },
        {
            name: 'joke',
            description: 'Get a random joke',
            type: ApplicationCommandOptionType.Subcommand
        },
    ],
    /**
    * @param {ChatInputCommandInteraction} interaction
    * @param {client} client
    */
    async execute(interaction, client) {
        const { options } = interaction

        switch(options.getSubcommand()) {
            case 'word': {
                await interaction.deferReply()

                const words = await fetch('https://random-word-api.herokuapp.com/word')
                const word = (await words.text()).replace('[','').replace(']','').replaceAll('"','')

                const embed = new EmbedBuilder()
                .setTitle('Random Word')
                .setFooter({ text: 'Warning: Random words are unfiltered.' })
                .setDescription(`**Word:** ${word}`)
                .setColor('#ff3f3f')

                return interaction.editReply({ embeds: [embed] })
            }

            case 'joke': {
                await interaction.deferReply()

                const json = await (await fetch('https://api.popcat.xyz/joke')).json()

                const embed = new EmbedBuilder()
                .setTitle('Random Joke')
                .setDescription(json.joke)
                .setColor('#ff3f3f')

                return interaction.editReply({ embeds: [embed] })
            }
        }
    }
}