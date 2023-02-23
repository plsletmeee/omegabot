const { ChatInputCommandInteraction, ApplicationCommandOptionType } = require('discord.js')
const client = require('../../index')

module.exports = {
    name: 'unix',
    description: 'Convert time to unix timestamp',
    options: [
        {
            name: 'date',
            description: 'Format: DD/MM/YYYY',
            type: ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: 'time',
            description: 'Format: HH:MM',
            type: ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: 'time-zone',
            description: 'Pick your current time zone',
            type: ApplicationCommandOptionType.String,
            required: true,
            choices: [
                { name: 'UTC-1', value: '-1' },
                { name: 'UTC-2', value: '-2' },
                { name: 'UTC-3', value: '-3' },
                { name: 'UTC-4', value: '-4' },
                { name: 'UTC-5', value: '-5' },
                { name: 'UTC-6', value: '-6' },
                { name: 'UTC-7', value: '-7' },
                { name: 'UTC-8', value: '-8' },
                { name: 'UTC-9', value: '-9' },
                { name: 'UTC-10', value: '-10' },
                { name: 'UTC-11', value: '-11' },
                { name: 'UTC', value: '0' },
                { name: 'UTC+1', value: '+1' },
                { name: 'UTC+2', value: '+2' },
                { name: 'UTC+3', value: '+3' },
                { name: 'UTC+4', value: '+4' },
                { name: 'UTC+5', value: '+5' },
                { name: 'UTC+6', value: '+6' },
                { name: 'UTC+7', value: '+7' },
                { name: 'UTC+8', value: '+8' },
                { name: 'UTC+9', value: '+9' },
                { name: 'UTC+10', value: '+10' },
                { name: 'UTC+11', value: '+11' },
            ]
        },
        {
            name: 'type',
            description: 'The timestamp type',
            type: ApplicationCommandOptionType.String,
            required: true,
            choices: [
                { name: 'Time', value: 't' },
                { name: 'Date', value: 'D' },
                { name: 'Date + Time', value: 'f' },
                { name: 'Date + Day + Time', value: 'F' },
                { name: 'Relative', value: 'R' }
            ]
        }
    ],
    /**
    * @param {ChatInputCommandInteraction} interaction
    * @param {client} client
    */
    async execute(interaction, client) {
        const { options } = interaction

        const date = options.getString('date')
        const time = options.getString('time')
        const timezone = options.getString('time-zone')
        const type = options.getString('type')

        const sourceMoment = require('moment-timezone').tz(`${date} ${time}`, 'DD/MM/YYYY HH:mm', 'Europe/London')
        const targetMoment = sourceMoment.utcOffset(timezone * 60)

        interaction.reply(`Time: <t:${targetMoment.unix()}:${type}>\nTimestamp: \`<t:${targetMoment.unix()}:${type}>\``)
    }
}