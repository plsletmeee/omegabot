const { ChatInputCommandInteraction, ApplicationCommandOptionType, EmbedBuilder, ChannelType } = require('discord.js')
const client = require('../../index')

module.exports = {
    name: 'server',
    description: 'server',
    disabled: true,
    options: [
        {
            name: 'info',
            description: 'Get the server info',
            type: ApplicationCommandOptionType.Subcommand
        },
    ],
    /**
    * @param {ChatInputCommandInteraction} interaction
    * @param {client} client
    */
    async execute(interaction, client) {
        const { options, guild } = interaction

        switch (options.getSubcommand()) {
            case 'invite': {

                const channel = options.getChannel('channel')
                const length = +options.getString('length')
                const uses = +options.getString('uses')

                const invite = await channel.createInvite({ maxAge: length, maxUses: uses })

                let invMaxUses = invite.maxUses
                let invExpires = invite.expiresTimestamp
                if(invMaxUses == 0) invMaxUses = 'None'
                if(invExpires) invExpires = `<t:${parseInt(invite.expiresTimestamp / 1000)}:R>`
                else invExpires = 'Never'

                const inviteEmbed = new EmbedBuilder()
                .setColor('#ff3f3f')
                .setTitle('Created Invite')
                .setDescription(`Invite was successfully created! 🎉\n\n**Invite:** ${invite.url}\n**Expires:** ${invExpires}\n**Uses:** ${invMaxUses}`)

                return interaction.reply({ embeds: [inviteEmbed] })

            }

            case 'info': {

                let textChannels = 0
                let voiceChannels = 0
                let categoryChannels = 0
                let threadChannels = 0

                let animatedEmojis = 0
                let staticEmojis = 0
                let stickerEmojis = 0

                guild.channels.cache.forEach(channel => {
                    if(channel.type == ChannelType.GuildText) textChannels++
                    if(channel.type == ChannelType.GuildVoice) voiceChannels++
                    if(channel.type == ChannelType.GuildCategory) categoryChannels++
                    if(channel.type == ChannelType.PublicThread) threadChannels++
                    if(channel.type == ChannelType.PrivateThread) threadChannels++
                    if(channel.type == ChannelType.AnnouncementThread) threadChannels++
                })

                guild.stickers.cache.forEach(sticker => { stickerEmojis++ })

                guild.emojis.cache.forEach(emoji => {
                    if(emoji.animated) animatedEmojis++
                    else staticEmojis++
                })

                const infoEmbed = new EmbedBuilder()
                .setColor('#ff3f3f')
                .setTitle(`${guild.name}'s Info`)
                .setThumbnail(guild.iconURL())
                .addFields(
                    {
                        name: 'Description',
                        value: `${guild.description || 'None'}`
                    },
                    {
                        name: 'General',
                        value: [
                            `⏰ **Created:** <t:${parseInt(guild.createdTimestamp / 1000)}:R>`,
                            `👑 **Owner:** ${(await guild.fetchOwner()).displayName}`,
                            `🔖 **ID:** ${guild.id}`
                        ].join('\n')
                    },
                    {
                        name: `Members (${guild.memberCount})`,
                        value: [
                            `👤 **Users:** ${guild.members.cache.filter(member => !member.user.bot).size}`,
                            `🤖 **Bots:** ${guild.members.cache.filter(member => member.user.bot).size}`,
                        ].join('\n')
                    },
                    {
                        name: `Boosters (${guild.members.cache.filter(member => member.roles.premiumSubscriberRole).size})`,
                        value: [
                            `📈 **Level:** ${guild.premiumTier || 0}`,
                            `💎 **Boosts:** ${guild.premiumSubscriptionCount}`,
                            `✨ **Boosters:** ${guild.members.cache.filter(member => member.roles.premiumSubscriberRole).size}`,
                        ].join('\n')
                    },
                    {
                        name: `Channels (${guild.channels.cache.size})`,
                        value: [
                            `💬 **Text Channels:** ${textChannels}`,
                            `🎤 **Voice Channels:** ${voiceChannels}`,
                            `🧵 **Thread Channels:** ${threadChannels}`,
                            `📚 **Categories:** ${categoryChannels}`
                        ].join('\n')
                    },
                    {
                        name: `Emojis (${animatedEmojis+staticEmojis+staticEmojis})`,
                        value: [
                            `🔮 **Animated:** ${animatedEmojis}`,
                            `🗿 **Static:** ${staticEmojis}`,
                            `🎨 **Stickers:** ${stickerEmojis}`
                        ].join('\n')
                    },
                )

                interaction.reply({ embeds: [infoEmbed] })

            }
        }
    }
}