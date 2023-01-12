const { ChatInputCommandInteraction, ApplicationCommandOptionType, EmbedBuilder, ChannelType } = require('discord.js')
const client = require('../index')

module.exports = {
    name: 'setup',
    description: 'setup',
    options: [
        {
            name: 'join-messages',
            description: 'Setup custom join messages',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'message',
                    description: 'Variables: {username}, {memberCount}, {joinTimestamp}',
                    type: ApplicationCommandOptionType.String,
                    required: true
                },
                {
                    name: 'channel',
                    description: 'The welcome message channel',
                    type: ApplicationCommandOptionType.Channel,
                    channelType: ChannelType.GuildText,
                    required: true
                },
                {
                    name: 'embeded',
                    description: 'Make the message an embed',
                    type: ApplicationCommandOptionType.Boolean,
                    required: false
                },
                {
                    name: 'mention',
                    description: 'Mention the new member',
                    type: ApplicationCommandOptionType.Boolean,
                    required: false
                },
                {
                    name: 'picture',
                    description: 'Include a picture in the message',
                    type: ApplicationCommandOptionType.Attachment,
                    required: false
                },
            ]
        },
        {
            name: 'leave-messages',
            description: 'Setup custom leave messages',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'message',
                    description: 'Variables: {username}, {memberCount}, {joinTimestamp}',
                    type: ApplicationCommandOptionType.String,
                    required: true
                },
                {
                    name: 'channel',
                    description: 'The leave message channel',
                    type: ApplicationCommandOptionType.Channel,
                    channelType: ChannelType.GuildText,
                    required: true
                },
                {
                    name: 'embeded',
                    description: 'Make the message an embed',
                    type: ApplicationCommandOptionType.Boolean,
                    required: false
                },
                {
                    name: 'picture',
                    description: 'Include a picture in the message',
                    type: ApplicationCommandOptionType.Attachment,
                    required: false
                },
            ]
        }
    ],
    /**
    * @param {ChatInputCommandInteraction} interaction
    * @param {client} client
    */
    async execute(interaction, client) {
        const { user, channel, options, guild } = interaction

        const joinMessagesData = require('../../database/joinMessages')
        const leaveMessagesData = require('../../database/leaveMessages')

        switch(options.getSubcommand()) {

            case 'join-messages': {
                const embeded = options.getBoolean('embeded') //bool
                const mention = options.getBoolean('mention') //bool
                const channel = options.getChannel('channel') //channel
                const message = options.getString('message') //string
                const picture = options.getAttachment('picture') //attachment

                const contentType = [
                    'image/png',
                    'image/gif',
                    'image/jpeg'
                ]

                if(picture && !contentType.includes(picture.contentType.toString())) return interaction.reply({ content: '<:cross:1062133327370399884> Error! Invalid Attachment Type.', ephemeral: true })

                let pictureUrl = 'false'
                let pictureLink = false
                if(picture) pictureUrl = picture.url, pictureLink = `[${picture.name}](${picture.attachment})`

                const embed = new EmbedBuilder()
                .setColor('#ff3f3f')
                .setTitle('<:gear:1062189732622237698> Join Messages Configured')
                .setFooter({ text: 'See our Privacy Policy for more info on how we handle user data.', iconURL: 'https://cdn.discordapp.com/avatars/988620875622391839/56290e8d9871ec0f21463ee05ad0899a.webp' })
                .setDescription(`**Enabled:** true,\n**Channel:** ${channel.name},\n**Mention:** ${mention || false},\n**Embeded:** ${embeded || false},\n**Picture:** ${pictureLink},\n**Message:** ${message}\n\n*These settings can be changed by rerunning this command*`)

                // or if you simply wish to disable and enable the feature later, run the \`/setup disable\` and \`/setup enable\` commands!

                joinMessagesData.findOne({ guild: guild.id }, (err, data) => {
                    if(data) {
                        data.enabled = true,
                        data.message = message,
                        data.channel = channel.id,
                        data.mention = mention || false,
                        data.embeded = embeded || false,
                        data.picture = pictureUrl,
                        data.guild = guild.id,
                        data.save()
                    } else {
                        new joinMessagesData({
                            enabled: true,
                            message: message,
                            channel: channel.id,
                            mention: mention || false,
                            embeded: embeded || false,
                            picture: pictureUrl,
                            guild: guild.id,
                        }).save()
                    }

                    interaction.reply({ embeds: [embed] })
                })

                break
            }

            case 'leave-messages': {
                const embeded = options.getBoolean('embeded') //bool
                const channel = options.getChannel('channel') //channel
                const message = options.getString('message') //string
                const picture = options.getAttachment('picture') //attachment

                const contentType = [
                    'image/png',
                    'image/gif',
                    'image/jpeg'
                ]
    
                if(picture && !contentType.includes(picture.contentType.toString())) 
                return interaction.reply({ content: '<:cross:1062133327370399884> Error! Invalid Attachment Type.', ephemeral: true })

                let pictureUrl = 'false'
                let pictureLink = false
                if(picture) pictureUrl = picture.url, pictureLink = `[${picture.name}](${picture.attachment})`

                const embed = new EmbedBuilder()
                .setColor('#ff3f3f')
                .setTitle('<:gear:1062189732622237698> Leave Messages Configured')
                .setFooter({ text: 'See our Privacy Policy for more info on how we handle user data.', iconURL: 'https://cdn.discordapp.com/avatars/988620875622391839/56290e8d9871ec0f21463ee05ad0899a.webp' })
                .setDescription(`**Enabled:** true,\n**Channel:** ${channel.name},\n**Embeded:** ${embeded || false},\n**Picture:** ${pictureLink},\n**Message:** ${message}\n\n*These settings can be changed by rerunning this command*`)

                // or if you simply wish to disable and enable the feature later, run the \`/setup disable\` and \`/setup enable\` commands!

                leaveMessagesData.findOne({ guild: guild.id }, (err, data) => {
                    if(data) {
                        data.enabled = true,
                        data.message = message,
                        data.channel = channel.id,
                        data.embeded = embeded || false,
                        data.picture = pictureUrl,
                        data.guild = guild.id,
                        data.save()
                    } else {
                        new leaveMessagesData({
                            enabled: true,
                            message: message,
                            channel: channel.id,
                            embeded: embeded || false,
                            picture: pictureUrl,
                            guild: guild.id,
                        }).save()
                    }

                    interaction.reply({ embeds: [embed] })
                })

                break
            }

        }

    }
}