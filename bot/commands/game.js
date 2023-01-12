const { ChatInputCommandInteraction, ApplicationCommandOptionType, EmbedBuilder, ButtonBuilder, ActionRowBuilder } = require('discord.js')
const { v4: uuidv4 } = require('uuid')
const client = require('../index')

module.exports = {
    name: 'game',
    description: 'game',
    options: [
        {
            name: 'connect-4',
            description: 'Play a game of connect 4',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'opponent',
                    description: 'Who you want to play with',
                    type: ApplicationCommandOptionType.User,
                    required: true
                }
            ]
        }
    ],
    /**
    * @param {ChatInputCommandInteraction} interaction
    * @param {client} client
    */
    async execute(interaction, client) {
        const { options, member } = interaction

        switch(options.getSubcommand()) {
            case 'connect-4': {
                const opponent = options.getMember('opponent')

                const board = '⚫⚫⚫⚫⚫⚫⚫\n⚫⚫⚫⚫⚫⚫⚫\n⚫⚫⚫⚫⚫⚫⚫\n⚫⚫⚫⚫⚫⚫⚫\n⚫⚫⚫⚫⚫⚫⚫\n⚫⚫⚫⚫⚫⚫⚫\n⚫⚫⚫⚫⚫⚫⚫\n\n1️⃣2️⃣3️⃣4️⃣5️⃣6️⃣7️⃣'

                const embed = new EmbedBuilder()
                .setColor('#ff3f3f')
                .setTitle('Connect 4')
                .setDescription(`**Players:** ${member}${opponent}\n**Turn:** ${opponent}\n\n**Game:**\n${board}`)
                .setFooter({ text: 'Having issues? Contact Omega Support.' })

                const button1 = new ButtonBuilder()
                .setCustomId(`ttt&column1`)
                .setStyle('Danger')
                .setLabel('1')
                const button2 = new ButtonBuilder()
                .setCustomId(`ttt&column2`)
                .setStyle('Danger')
                .setLabel('2')
                const button3 = new ButtonBuilder()
                .setCustomId(`ttt&column3`)
                .setStyle('Danger')
                .setLabel('3')
                const button4 = new ButtonBuilder()
                .setCustomId(`ttt&column4`)
                .setStyle('Danger')
                .setLabel('4')
                const button5 = new ButtonBuilder()
                .setCustomId(`ttt&column5`)
                .setStyle('Danger')
                .setLabel('5')
                const button6 = new ButtonBuilder()
                .setCustomId(`ttt&column6`)
                .setStyle('Danger')
                .setLabel('6')
                const button7 = new ButtonBuilder()
                .setCustomId(`ttt&column7`)
                .setStyle('Danger')
                .setLabel('7')
                const button8 = new ButtonBuilder()
                .setCustomId(`ttt&skip`)
                .setStyle('Danger')
                .setEmoji('⏩')
                const button9 = new ButtonBuilder()
                .setCustomId(`ttt&pause`)
                .setStyle('Danger')
                .setEmoji('⏸️')
                const button10 = new ButtonBuilder()
                .setCustomId(`ttt&stop`)
                .setStyle('Danger')
                .setEmoji('⏹️')

                const row1 = new ActionRowBuilder().addComponents(button1, button2, button3, button4, button5)
                const row2 = new ActionRowBuilder().addComponents(button6, button7, button8, button9, button10)

                interaction.reply({ embeds: [embed], components: [row1, row2] })
            }
        }

    }
}