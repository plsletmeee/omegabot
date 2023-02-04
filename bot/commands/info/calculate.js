const { ApplicationCommandOptionType } = require('discord.js')

module.exports = {
    name: 'calculate',
    description: 'Use a basic calculator',
    options: [
        {
            name: 'number-1',
            description: 'The first number',
            type: ApplicationCommandOptionType.Number,
            required: true
        },
        {
            name: 'number-2',
            description: 'The second number',
            type: ApplicationCommandOptionType.Number,
            required: true
        },
        {
            name: 'method',
            description: 'Which operation should I perform?',
            required: true,
            type: ApplicationCommandOptionType.String,
            choices: [
                {
                    value: '+',
                    name: 'Add' 
                },
                {
                    value: '-',
                    name: 'Subtract' 
                },
                {
                    value: '*',
                    name: 'Multiply' 
                },
                {
                    value: '/',
                    name: 'Divide' 
                },
            ]
        },
    ],
    async execute(interaction) {

        const one = interaction.options.getNumber('number-1')
        const two = interaction.options.getNumber('number-2')
        const method = interaction.options.getString('method')

        if(method == '-') interaction.reply(`${one} - ${two} = ${one - two}`)
        if(method == '+') interaction.reply(`${one} + ${two} = ${one + two}`)
        if(method == '*') interaction.reply(`${one} x ${two} = ${one * two}`)
        if(method == '/') interaction.reply(`${one} ÷ ${two} = ${one / two}`)

    }
}