const { ChatInputCommandInteraction, ApplicationCommandOptionType, EmbedBuilder, ButtonBuilder, ActionRowBuilder } = require('discord.js')
const TicTacToe = require('discord-tictactoe');
const client = require('../../index')

module.exports = {
    name: 'game',
    description: 'game',
    options: [
        {
            name: 'ttt',
            description: 'Play tic-tac-toe',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'opponent',
                    description: 'Pick a user to play against',
                    type: ApplicationCommandOptionType.User
                },
                {
                    name: 'difficulty',
                    description: 'Pick the AI difficulty',
                    type: ApplicationCommandOptionType.String,
                    choices: [
                        { name: 'Easy', value: 'Easy' },
                        { name: 'Medium', value: 'Medium' },
                        { name: 'Hard', value: 'Hard' },
                        { name: 'Unbeatable', value: 'Unbeatable' }
                    ]
                },
            ]
        },
        {
            name: 'rps',
            description: 'Play rock-paper-scissors',
            type: ApplicationCommandOptionType.Subcommand
        },
        {
            name: 'coinflip',
            description: 'Flip a coin',
            type: ApplicationCommandOptionType.Subcommand
        },
        {
            name: 'dice',
            description: 'Roll a dice',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'sides',
                    description: 'Set how many sides it has',
                    type: ApplicationCommandOptionType.String,
                    required: true,
                    choices: [
                        { name: '4 Sides', value: '4' },
                        { name: '6 Sides', value: '6' },
                        { name: '8 Sides', value: '8' },
                        { name: '10 Sides', value: '10' },
                        { name: '12 Sides', value: '12' },
                        { name: '20 Sides', value: '20' }
                    ]
                }
            ]
        }
    ],
    /**
    * @param {ChatInputCommandInteraction} interaction
    * @param {client} client
    */
    async execute(interaction, client) {
        const { options } = interaction

        switch (options.getSubcommand()) {
            case 'ttt': {

                const difficulty = options.getString('difficulty')
                const game = new TicTacToe({ language: 'en', aiDifficulty: difficulty || 'Unbeatable', embedColor: '#ff3f3f' })

                return game.handleInteraction(interaction)

            }

            case 'rps': {

                const rpsEmbed = new EmbedBuilder().setColor('#ff3f3f').setTitle('Rock Paper Scissors').setDescription('Press a button to play! ✊🤚✌️')
                const rpsRock = new ButtonBuilder().setCustomId('rpsRock').setStyle('Danger').setLabel('Rock')
                const rpsPaper = new ButtonBuilder().setCustomId('rpsPaper').setStyle('Danger').setLabel('Paper')
                const rpsScissors = new ButtonBuilder().setCustomId('rpsScissors').setStyle('Danger').setLabel('Scissors')

                const rpsRow = new ActionRowBuilder().addComponents(rpsRock, rpsPaper, rpsScissors)

                return interaction.reply({ embeds: [rpsEmbed], components: [rpsRow] })

            }

            case 'coinflip': {

                let flip = Math.floor(Math.random() * 2)
                if(flip == 0) flip = 'Heads'
                if(flip == 1) flip = 'Tails'

                const flippingEmbed = new EmbedBuilder()
                .setColor('#ff3f3f')
                .setDescription('<a:status_pending:1070821943604940842> Flipping Coin...')

                const flippedEmbed = new EmbedBuilder()
                .setColor('#ff3f3f')
                .setDescription(`🪙 Coin flipped a ${flip}`)

                interaction.reply({ embeds: [flippingEmbed], fetchReply: true })
                return setTimeout(() => { interaction.editReply({ embeds: [flippedEmbed] }) }, 3000)

            }

            case 'dice': {

                const sides = +options.getString('sides')
                const roll = Math.floor(Math.random() * sides)+1

                const rollingEmbed = new EmbedBuilder()
                .setColor('#ff3f3f')
                .setDescription('<a:status_pending:1070821943604940842> Rolling Dice...')

                const rolledEmbed = new EmbedBuilder()
                .setColor('#ff3f3f')
                .setDescription(`🎲 Dice rolled a ${roll}`)

                interaction.reply({ embeds: [rollingEmbed], fetchReply: true })
                return setTimeout(() => { interaction.editReply({ embeds: [rolledEmbed] }) }, 3000)

            }
        }
    }
}