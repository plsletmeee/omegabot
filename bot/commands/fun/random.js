const { ChatInputCommandInteraction, ApplicationCommandOptionType, EmbedBuilder } = require('discord.js')
const gen = require('images-generator')
const client = require('../../index')

module.exports = {
    name: 'random',
    description: 'random',
    options: [
        {
            name: 'cat',
            description: 'Get a random picture of a cat',
            type: ApplicationCommandOptionType.Subcommand
        },
        {
            name: 'dog',
            description: 'Get a random picture of a dog',
            type: ApplicationCommandOptionType.Subcommand
        },
        {
            name: 'koala',
            description: 'Get a random picture of a koala',
            type: ApplicationCommandOptionType.Subcommand
        },
        {
            name: 'panda',
            description: 'Get a random picture of a panda',
            type: ApplicationCommandOptionType.Subcommand
        },
        {
            name: 'fox',
            description: 'Get a random picture of a fox',
            type: ApplicationCommandOptionType.Subcommand
        },
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
        {
            name: 'coin-flip',
            description: 'Get a random coinflip',
            type: ApplicationCommandOptionType.Subcommand
        },
        {
            name: 'dice-roll',
            description: 'Get a random dice roll',
            type: ApplicationCommandOptionType.Subcommand
        }
    ],
    /**
    * @param {ChatInputCommandInteraction} interaction
    * @param {client} client
    */
    async execute(interaction, client) {
        const { options } = interaction

        switch(options.getSubcommand()) {
            case 'cat': {
                await interaction.deferReply()

                const cat = await gen.animal.cat()
                const embed = new EmbedBuilder()
                .setTitle('Meowww! 😺')
                .setColor('#ff3f3f')
                .setImage(cat)

                return interaction.editReply({ embeds: [embed] })
            }

            case 'dog': {
                await interaction.deferReply()

                const dog = await gen.animal.dog()
                const embed = new EmbedBuilder()
                .setTitle('Woofff! 🐶')
                .setColor('#ff3f3f')
                .setImage(dog)

                return interaction.editReply({ embeds: [embed] })
            }

            case 'koala': {
                await interaction.deferReply()

                const koala = await gen.animal.koala()
                const embed = new EmbedBuilder()
                .setTitle('Roarrr! 🐨')
                .setColor('#ff3f3f')
                .setImage(koala)

                return interaction.editReply({ embeds: [embed] })
            }

            case 'panda': {
                await interaction.deferReply()

                const panda = await gen.animal.panda()
                const embed = new EmbedBuilder()
                .setTitle('Yippp! 🐼')
                .setColor('#ff3f3f')
                .setImage(panda)

                return interaction.editReply({ embeds: [embed] })
            }

            case 'fox': {
                await interaction.deferReply()

                const fox = await gen.animal.fox()
                const embed = new EmbedBuilder()
                .setTitle('What *does* the fox say? 🦊')
                .setColor('#ff3f3f')
                .setImage(fox)

                return interaction.editReply({ embeds: [embed] })
            }

            case 'word': {
                await interaction.deferReply()

                const words = await fetch('https://random-word-api.herokuapp.com/word')
                const word = (await words.text()).replace('[','').replace(']','').replaceAll('"','')

                const embed = new EmbedBuilder()
                .setTitle('<:book:1062539186487435354> Random Word')
                .setFooter({ text: 'Warning: Random words are unfiltered.' })
                .setDescription(`**Word:** ${word}`)
                .setColor('#ff3f3f')

                return interaction.editReply({ embeds: [embed] })
            }

            case 'joke': {
                await interaction.deferReply()

                const json = await (await fetch('https://api.popcat.xyz/joke')).json()

                const embed = new EmbedBuilder()
                .setTitle('<:book:1062539186487435354> Random Joke')
                .setDescription(json.joke)
                .setColor('#ff3f3f')

                return interaction.editReply({ embeds: [embed] })
            }

            case 'coin-flip': {
                await interaction.deferReply()

                let num = Math.floor(Math.random() * 2)
                if(num) num = 'Heads!'
                else num = 'Tails!'

                const embed = new EmbedBuilder()
                .setTitle('<:question:1062761532376756275> Random Coinflip')
                .setDescription(`Coin says **${num}**`)
                .setColor('#ff3f3f')

                return interaction.editReply({ embeds: [embed] })
            }

            case 'dice-roll': {
                await interaction.deferReply()

                let num = Math.floor(Math.random() * 6)

                const embed = new EmbedBuilder()
                .setTitle('<:question:1062761532376756275> Random Dice Roll')
                .setDescription(`Dice says **${num+1}**`)
                .setColor('#ff3f3f')

                return interaction.editReply({ embeds: [embed] })
            }
        }
    }
}