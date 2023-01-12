const { ChatInputCommandInteraction, ButtonBuilder, ActionRowBuilder, EmbedBuilder } = require('discord.js')
const client = require('../index')

module.exports = {
    name: 'invite',
    description: 'Invite the bot',
    /**
    * @param {ChatInputCommandInteraction} interaction
    * @param {client} client
    */
    async execute(interaction, client) {
        const inviteButton = new ButtonBuilder()
        .setStyle('Link')
        .setURL(`https://omegabot.xyz/invite`)
        .setLabel('Bot Invite')

        const supportButton = new ButtonBuilder()
        .setStyle('Link')
        .setURL(`https://discord.gg/uwbjNB3Z2v`)
        .setLabel('Support Server')

        const embed = new EmbedBuilder()
        .setColor('#ff3f3f')
        .setDescription(`Thanks for the invite!\nNow let's make your server Omega!`)
        .setTitle('Omega Invite <:omega:1062133330914574336>')
        .setThumbnail(client.user.avatarURL())

        const row = new ActionRowBuilder().addComponents(inviteButton, supportButton)

        interaction.reply({ embeds: [embed], components: [row] })
    }
}