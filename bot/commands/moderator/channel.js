const { ChatInputCommandInteraction, PermissionFlagsBits, ApplicationCommandOptionType, ChannelType, EmbedBuilder, ButtonBuilder, ActionRowBuilder } = require('discord.js')
const Transcripts = require('discord-html-transcripts')
const { v4: uuidv4 } = require('uuid')
const client = require('../../index')

module.exports = {
    name: 'channel',
    description: 'channel',
    defaultMemberPermissions: PermissionFlagsBits.ManageChannels,
    options: [
        {
            name: 'create',
            description: 'Create a channel',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'name',
                    description: 'The channel name',
                    type: ApplicationCommandOptionType.String,
                    required: true
                },
                {
                    name: 'type',
                    description: 'The channel type',
                    type: ApplicationCommandOptionType.String,
                    required: true,
                    choices: [
                        { name: 'Text', value: 'Text' },
                        { name: 'Voice', value: 'Voice' },
                        { name: 'News', value: 'News' },
                        { name: 'Stage', value: 'Stage' },
                        { name: 'Forum', value: 'Forum' }
                    ]
                },
                {
                    name: 'category',
                    description: 'The channel category',
                    type: ApplicationCommandOptionType.Channel,
                    channel_types: [ChannelType.GuildCategory]
                }
            ]
        },
        {
            name: 'delete',
            description: 'Delete a channel',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'channel',
                    description: 'The channel you want to delete',
                    type: ApplicationCommandOptionType.Channel,
                    required: true
                },
                {
                    name: 'reason',
                    description: 'Why you want to delete it',
                    type: ApplicationCommandOptionType.String
                }
            ]
        },
        {
            name: 'purge',
            description: 'Clear messages from a channel',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'channel',
                    description: 'The channel you want to purge',
                    type: ApplicationCommandOptionType.Channel,
                    required: true
                },
                {
                    name: 'amount',
                    description: 'The amount you want to purge (1 to 100)',
                    type: ApplicationCommandOptionType.Number,
                    required: true
                },
                {
                    name: 'target',
                    description: 'Who you want to target',
                    type: ApplicationCommandOptionType.User,
                },
                {
                    name: 'reason',
                    description: 'Why you want to purge them',
                    type: ApplicationCommandOptionType.String,
                }
            ],
        }
    ],
    /**
    * @param {ChatInputCommandInteraction} interaction
    * @param {client} client
    */
    async execute(interaction, client) {
        const { options } = interaction

        switch (options.getSubcommand()) {
            case 'create': {

                const name = options.getString('name')
                const category = options.getChannel('category')
                const community = interaction.guild.features.includes('COMMUNITY')

                let type = options.getString('type')

                const failedEmbed = new EmbedBuilder()
                .setColor('#ff3f3f')
                .setTitle('Creation Failed')
                .setDescription(`Channel creation failed because your server does not have the \`Community Server\` feature enabled in settings. `)


                if(type == 'Text') type = ChannelType.GuildText
                if(type == 'Voice') type = ChannelType.GuildVoice

                if(type == 'News') if(community) type = ChannelType.GuildAnnouncement; else return interaction.reply({ embeds: [failedEmbed], ephemeral: true })
                if(type == 'Stage') if(community) type = ChannelType.GuildStageVoice; else return interaction.reply({ embeds: [failedEmbed], ephemeral: true })
                if(type == 'Forum') if(community) type = ChannelType.GuildForum; else return interaction.reply({ embeds: [failedEmbed], ephemeral: true })

                interaction.guild.channels.create({
                    name: name,
                    parent: category,
                    channel_types: [type]
                })

                const createdEmbed = new EmbedBuilder()
                .setColor('#ff3f3f')
                .setTitle('Channel Created')
                .setDescription(`Channel was created successfully! 🎉\n\n**Name:** ${name}\n**Type:** ${ChannelType[type]}\n**Category:** ${category || 'None'}`)

                return interaction.reply({ embeds: [createdEmbed], ephemeral: true })

            }

            case 'delete': {

                const channel = options.getChannel('channel')
                const reason = options.getString('reason')

                let channelParent = 'None'
                if(channel.parent) channelParent = channel.parent.name

                const deletedEmbed = new EmbedBuilder()
                .setColor('#ff3f3f')
                .setTitle('Channel Deleted')
                .setDescription(`Channel was deleted successfully! 🎉\n\n**Name:** ${channel.name}\n**Type:** ${ChannelType[channel.type]}\n**Category:** ${channelParent}`)

                interaction.guild.channels.delete(channel, reason)

                return interaction.reply({ embeds: [deletedEmbed], ephemeral: true })

            }

            case 'purge': {

                const amount = options.getNumber('amount')
                const channel = options.getChannel('channel')
                const reason = options.getString('reason')
                const target = options.getMember('target')

                const amountErrEmbed = new EmbedBuilder()
                .setColor('#ff3f3f')
                .setTitle('Purge Failed')
                .setDescription(`Channel purge failed because you specified an invalid amount. You can only delete between 1 and 100 messages at a time! ⚠️`)

                const failedEmbed = new EmbedBuilder()
                .setColor('#ff3f3f')
                .setTitle('Move Failed')
                .setDescription(`Channel move failed because ${channel} is a category.`)

                if(channel.type == ChannelType.GuildCategory) return interaction.reply({ embeds: [failedEmbed], ephemeral: true })
        
                if(amount < 1 || amount > 100) return interaction.reply({ embeds: [amountErrEmbed], ephemeral: true })
        
                const channelMessages = await channel.messages.fetch({ limit: amount })

                let deletedMessages = []
                let i = 0
        
                channelMessages.filter(message => {
                    if(!target && amount > i) deletedMessages.push(message), i++
                    else if(message.author.id == target.id && amount > i) deletedMessages.push(message), i++
                })
        
                deletedMessages.reverse()
                
                const transcript = await Transcripts.generateFromMessages(deletedMessages, channel)
                const html = transcript.attachment.toString('utf8')
                const uuid = uuidv4()
                const transcriptData = require('../../../database/transcripts')
        
                // removing watermark
                const split1 = html.split('<div style="text-align:center;width:100%">')
                const split2 = split1[1].split('<a href="https://github.com/ItzDerock/discord-html-transcripts" style="color:lightblue">discord-html-transcripts</a>.')
                const finalHTML = split1[0]+split2[1]
        
                transcriptData.create({ transcriptId: uuid, htmlCode: finalHTML })

                const purgedEmbed = new EmbedBuilder()
                .setColor('#ff3f3f')
                .setTitle('Channel Purged')
                .setDescription(`Channel was purged successfully! 🎉\n\n**Channel:** ${channel.name}\n**Amount:** ${channelMessages.size}\n**Target:** ${target || 'None'}`)
        
                const linkButton = new ButtonBuilder()
                .setStyle('Link')
                .setURL(`https://omegabot.xyz/transcript/${uuid}`)
                .setLabel('Transcript')
        
                const row = new ActionRowBuilder().addComponents(linkButton)
        
                channel.bulkDelete(deletedMessages, true)
        
                return interaction.reply({ embeds: [purgedEmbed], components: [row] })

            }
        }

    }
}