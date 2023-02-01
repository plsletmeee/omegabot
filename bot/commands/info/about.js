const { ChatInputCommandInteraction, ButtonBuilder, ActionRowBuilder, EmbedBuilder } = require('discord.js')
const client = require('../../index')

module.exports = {
    name: 'about',
    description: 'About Omega Bot',
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
        .setURL(`https://omegabot.xyz/discord`)
        .setLabel('Support Server')

        const embed = new EmbedBuilder()
        .setColor('#ff3f3f')
        .setDescription(`Omega Bot was created to assist server owners in managing their ever-growing communities. With moderation commands, utility systems, fun games and so much more, Omega Bot aims to be the all-in-one Discord bot to suit your every need. And if it doesn't? You can easily send your feedback and ideas to the Omega Team!\n\nOmega Bot is updated monthly with brand new features, commands, and webpages. The bot is also completely free to use with an easy setup process and a 24/7 support team to help you with any questions you may have.`)
        .setTitle('About Omega <:omega:1062133330914574336>')
        .setThumbnail(client.user.avatarURL())

        const row = new ActionRowBuilder().addComponents(inviteButton, supportButton)

        interaction.reply({ embeds: [embed], components: [row] })
    }
}