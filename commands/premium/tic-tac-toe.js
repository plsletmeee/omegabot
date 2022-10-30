const { ApplicationCommandOptionType } = require('discord.js');
const TicTacToe = require('discord-tictactoe');
const game = new TicTacToe({ language: "en" })

module.exports = {
    name: 'tic-tac-toe',
    description: 'Play TicTacToe',
    options: [
        {
            name: "opponent",
            description: "Play against another user",
            required: false,
            type: ApplicationCommandOptionType.User,
        },
    ],
    async execute(interaction) {
        game.handleInteraction(interaction);
    }
}