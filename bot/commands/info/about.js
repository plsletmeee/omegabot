const { ChatInputCommandInteraction, ButtonBuilder, ActionRowBuilder, EmbedBuilder, ApplicationCommandOptionType } = require('discord.js')
const client = require('../../index')

module.exports = {
    name: 'about',
    description: 'about',
    options: [
        {
            name: 'omega',
            description: 'About Omega Bot',
            type: ApplicationCommandOptionType.Subcommand
        },
        {
            name: 'member',
            description: 'About a server member',
            type: ApplicationCommandOptionType.Subcommand,
            options: [{ name: 'member', description: 'Target member', type: ApplicationCommandOptionType.User, required: true }],
        }
    ],
    /**
    * @param {ChatInputCommandInteraction} interaction
    * @param {client} client
    */
    async execute(interaction, client) {
        const { options } = interaction

        switch (options.getSubcommand()) {
            case 'omega': {

                const inviteButton = new ButtonBuilder()
                .setStyle('Link')
                .setURL(`https://omegabot.xyz/invite`)
                .setLabel('Bot Invite')

                const supportButton = new ButtonBuilder()
                .setStyle('Link')
                .setURL(`https://omegabot.xyz/discord`)
                .setLabel('Support Server')

                const aboutEmbed = new EmbedBuilder()
                .setColor('#ff3f3f')
                .setDescription(`Omega Bot was created to assist server owners in managing their ever-growing communities. With moderation commands, utility systems, fun games and so much more, Omega Bot aims to be the all-in-one Discord bot to suit your every need. And if it doesn't? You can easily send your feedback and ideas to the Omega Team!\n\nOmega Bot is updated monthly with brand new features, commands, and webpages. The bot is also completely free to use with an easy setup process and a 24/7 support team to help you with any questions you may have.`)
                .setTitle('About Omega <:omega:1062133330914574336>')
                .setThumbnail(client.user.avatarURL())

                const embedRow = new ActionRowBuilder().addComponents(inviteButton, supportButton)

                return interaction.reply({ embeds: [aboutEmbed], components: [embedRow] })

            }

            case 'member': {

                const member = interaction.options.getMember('member')

                const infoEmbed = new EmbedBuilder()
                .setColor('#ff3f3f')
                .setTitle(`${member.user.username}'s Info`)
                .setThumbnail(member.displayAvatarURL({ dynamic: true }))
                .addFields(
                    { name: 'Joined', value: `<t:${parseInt(member.joinedTimestamp / 1000)}>`, inline: true },
                    { name: 'Registered', value: `<t:${parseInt(member.user.createdTimestamp / 1000)}>`, inline: true },
                    { name: 'User ID', value: `${member.id}`},
                    { name: 'Roles', value: `${member.roles.cache.map(r => r).join(' ').replace('@everyone', '') || 'None'}` },
                )
                
                return interaction.reply({ embeds: [infoEmbed] })

            }
        }
    }
}