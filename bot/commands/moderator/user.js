const { ChatInputCommandInteraction, PermissionFlagsBits, ApplicationCommandOptionType, EmbedBuilder } = require('discord.js')
const client = require('../../index')

module.exports = {
    name: 'user',
    description: 'user',
    defaultMemberPermissions: PermissionFlagsBits.ModerateMembers,
    options: [
        {
            name: 'ban',
            description: 'Ban a user',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'target',
                    description: 'Who to ban',
                    type: ApplicationCommandOptionType.User,
                    required: true
                },
                {
                    name: 'reason',
                    description: 'Why they are being banned',
                    type: ApplicationCommandOptionType.String,
                }
            ]
        },
        {
            name: 'unban',
            description: 'Unban a user',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'target',
                    description: 'Who to unban',
                    type: ApplicationCommandOptionType.User,
                    required: true
                },
                {
                    name: 'reason',
                    description: 'Why they are being unbanned',
                    type: ApplicationCommandOptionType.String,
                }
            ]
        },
        {
            name: 'kick',
            description: 'Kick a user',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'target',
                    description: 'Who to kick',
                    type: ApplicationCommandOptionType.User,
                    required: true
                },
                {
                    name: 'reason',
                    description: 'Why they are being kicked',
                    type: ApplicationCommandOptionType.String,
                }
            ]
        },
        {
            name: 'deafen',
            description: 'Deafen a user',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'target',
                    description: 'Who to deafen',
                    type: ApplicationCommandOptionType.User,
                    required: true
                },
                {
                    name: 'reason',
                    description: 'Why they are being deafened',
                    type: ApplicationCommandOptionType.String,
                }
            ]
        },
        {
            name: 'undeafen',
            description: 'Undeafen a user',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'target',
                    description: 'Who to undeafen',
                    type: ApplicationCommandOptionType.User,
                    required: true
                },
                {
                    name: 'reason',
                    description: 'Why they are being undeafened',
                    type: ApplicationCommandOptionType.String,
                }
            ]
        },
        {
            name: 'info',
            description: 'Get user info',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'target',
                    description: 'Who to target',
                    type: ApplicationCommandOptionType.User,
                    required: true
                },
            ]
        }
    ],
    /**
    * @param {ChatInputCommandInteraction} interaction
    * @param {client} client
    */
    async execute(interaction, client) {
        const { guild, member, options } = interaction

        switch (options.getSubcommand()) {
            case 'ban': {

                const target = options.getMember('target')
                const reason = options.getString('reason')

                const noPermsEmbed = new EmbedBuilder()
                .setColor('#ff3f3f')
                .setTitle('Ban Failed')
                .setDescription('Ban failed because you do not have the required permissions to ban that member.. Whatchu tryna do huh? 🤨')

                const bannedEmbed = new EmbedBuilder()
                .setColor('#ff3f3f')
                .setTitle('Ban Failed')
                .setDescription('Ban failed because that user is not in this server.')

                if(!target) return interaction.reply({ embeds: [bannedEmbed] })
                
                const successEmbed = new EmbedBuilder()
                .setColor('#ff3f3f')
                .setTitle('Member Banned')
                .setDescription(`Member was banned successfully! 🎉\n\n**Member:** ${target.user.username}\n**Joined:** <t:${parseInt(target.joinedTimestamp / 1000)}:R>\n**Reason:** ${reason || 'None'}`)

                if(!member.permissions.has(PermissionFlagsBits.BanMembers) || !target.bannable) return interaction.reply({ embeds: [noPermsEmbed] })

                target.ban({ reason: reason })

                return interaction.reply({ embeds: [successEmbed] })

            }

            case 'unban': {

                const target = options.getUser('target')
                const reason = options.getString('reason')

                const noPermsEmbed = new EmbedBuilder()
                .setColor('#ff3f3f')
                .setTitle('Unban Failed')
                .setDescription('Unban failed because you do not have the required permissions to unban that user.. Whatchu tryna do huh? 🤨')

                const nobanEmbed = new EmbedBuilder()
                .setColor('#ff3f3f')
                .setTitle('Unban Failed')
                .setDescription('Unban failed because that user is not banned.')

                if(!member.permissions.has(PermissionFlagsBits.BanMembers)) return interaction.reply({ embeds: [noPermsEmbed] })

                let found = false
                
                guild.bans.cache.forEach(ban => {

                    const successEmbed = new EmbedBuilder()
                    .setColor('#ff3f3f')
                    .setTitle('User Unbanned')
                    .setDescription(`User was unbanned successfully! 🎉\n\n**User:** ${target.username}\n**Reason:** ${reason || 'None'}`)

                    if(ban.user.id == target.id) {
                        guild.bans.remove(target, reason)
                        interaction.reply({ embeds: [successEmbed] })
                        return found = true
                    }

                })

                if(!found) return interaction.reply({ embeds: [nobanEmbed] })
                else return

            }

            case 'kick': {

                const target = options.getMember('target')
                const reason = options.getString('reason')

                const noPermsEmbed = new EmbedBuilder()
                .setColor('#ff3f3f')
                .setTitle('Kick Failed')
                .setDescription('Kick failed because you do not have the required permissions to kick that member.. Whatchu tryna do huh? 🤨')
                
                const successEmbed = new EmbedBuilder()
                .setColor('#ff3f3f')
                .setTitle('Member Kicked')
                .setDescription(`Member was kicked successfully! 🎉\n\n**Member:** ${target.user.username}\n**Joined:** <t:${parseInt(target.joinedTimestamp / 1000)}:R>\n**Reason:** ${reason || 'None'}`)

                if(!member.permissions.has(PermissionFlagsBits.KickMembers) || !target.kickable) return interaction.reply({ embeds: [noPermsEmbed] })

                target.kick({ reason: reason })

                return interaction.reply({ embeds: [successEmbed] })

            }

            case 'deafen': {

                const target = options.getMember('target')
                const reason = options.getString('reason')

                const noPermsEmbed = new EmbedBuilder()
                .setColor('#ff3f3f')
                .setTitle('Deafen Failed')
                .setDescription('Deafen failed because you do not have the required permissions to deafen that member.. Whatchu tryna do huh? 🤨')

                const noVoiceEmbed = new EmbedBuilder()
                .setColor('#ff3f3f')
                .setTitle('Deafen Failed')
                .setDescription('Deafen failed because the member is not connected to a voice channel.')
                
                const successEmbed = new EmbedBuilder()
                .setColor('#ff3f3f')
                .setTitle('Member Deafened')
                .setDescription(`Member was deafened successfully! 🎉\n\n**Member:** ${target.user.username}\n**Reason:** ${reason || 'None'}`)

                if(!member.permissions.has(PermissionFlagsBits.DeafenMembers) || !target.moderatable) return interaction.reply({ embeds: [noPermsEmbed] })
                if(!target.voice.channel) return interaction.reply({ embeds: [noVoiceEmbed] })

                target.voice.setDeaf(true, reason)

                return interaction.reply({ embeds: [successEmbed] })

            }

            case 'undeafen': {

                const target = options.getMember('target')
                const reason = options.getString('reason')

                const noPermsEmbed = new EmbedBuilder()
                .setColor('#ff3f3f')
                .setTitle('Undeafen Failed')
                .setDescription('Undeafen failed because you do not have the required permissions to undeafen that member.. Whatchu tryna do huh? 🤨')

                const noVoiceEmbed = new EmbedBuilder()
                .setColor('#ff3f3f')
                .setTitle('Undeafen Failed')
                .setDescription('Undeafen failed because the member is not connected to a voice channel.')
                
                const successEmbed = new EmbedBuilder()
                .setColor('#ff3f3f')
                .setTitle('Member Deafened')
                .setDescription(`Member was undeafened successfully! 🎉\n\n**Member:** ${target.user.username}\n**Reason:** ${reason || 'None'}`)

                
                if(!member.permissions.has(PermissionFlagsBits.DeafenMembers) || !target.moderatable) return interaction.reply({ embeds: [noPermsEmbed] })
                if(!target.voice.channel) return interaction.reply({ embeds: [noVoiceEmbed] })

                target.voice.setDeaf(false, reason)

                return interaction.reply({ embeds: [successEmbed] })

            }

            case 'info': {

                const target = interaction.options.getMember('target')

                const infoEmbed = new EmbedBuilder()
                .setColor('#ff3f3f')
                .setTitle(`${target.nickname || target.user.username}'s Info`)
                .setThumbnail(target.displayAvatarURL({ dynamic: true }))
                .addFields(
                    { name: 'Joined', value: `<t:${parseInt(target.joinedTimestamp / 1000)}>`, inline: true },
                    { name: 'Registered', value: `<t:${parseInt(target.user.createdTimestamp / 1000)}>`, inline: true },
                    { name: 'User ID', value: `${target.id}`},
                    { name: 'Roles', value: `${target.roles.cache.map(r => r).join(' ').replace('@everyone', '') || 'None'}` },
                )
                
                return interaction.reply({ embeds: [infoEmbed] })

            }
        }
    }
}