const { ChatInputCommandInteraction, ApplicationCommandOptionType, EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js')
const { v4: uuidv4 } = require('uuid')
const client = require('../../index')

module.exports = {
    name: 'create',
    description: 'create',
    options: [
        {
            name: 'image',
            description: 'image',
            type: ApplicationCommandOptionType.SubcommandGroup,
            options: [
                {
                    name: 'drake',
                    description: 'Create a drake meme',
                    type: ApplicationCommandOptionType.Subcommand,
                    options: [
                        {
                            name: 'top-text',
                            description: 'Top meme text',
                            required: true,
                            type: ApplicationCommandOptionType.String
                        },
                        {
                            name: 'bottom-text',
                            description: 'Bottom meme text',
                            required: true,
                            type: ApplicationCommandOptionType.String
                        }
                    ]
                },
                {
                    name: 'sad-cat',
                    description: 'Create a sad cat meme',
                    type: ApplicationCommandOptionType.Subcommand,
                    options: [
                        {
                            name: 'text',
                            description: 'Meme text',
                            required: true,
                            type: ApplicationCommandOptionType.String
                        }
                    ]
                },
                {
                    name: 'jail',
                    description: 'Create a jail meme',
                    type: ApplicationCommandOptionType.Subcommand,
                    options: [
                        {
                            name: 'image',
                            description: 'Image to create jail meme with',
                            required: false,
                            type: ApplicationCommandOptionType.Attachment
                        }
                    ]
                },
                {
                    name: 'wanted',
                    description: 'Create a wanted poster',
                    type: ApplicationCommandOptionType.Subcommand,
                    options: [
                        {
                            name: 'image',
                            description: 'Image to create wanted poster with',
                            required: false,
                            type: ApplicationCommandOptionType.Attachment
                        }
                    ]
                }
            ]
        },
        {
            name: 'poll',
            description: 'Create a poll embed',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'poll-name',
                    description: 'The name of the poll',
                    type: ApplicationCommandOptionType.String,
                    required: true
                },
                {
                    name: 'option-one',
                    description: 'The 1st poll option',
                    type: ApplicationCommandOptionType.String,
                    required: true
                },
                {
                    name: 'option-two',
                    description: 'The 2nd poll option',
                    type: ApplicationCommandOptionType.String,
                    required: true
                },
                {
                    name: 'option-three',
                    description: 'The 3rd poll option',
                    type: ApplicationCommandOptionType.String,
                    required: false
                },
                {
                    name: 'option-four',
                    description: 'The 4th poll option',
                    type: ApplicationCommandOptionType.String,
                    required: false
                },
                {
                    name: 'option-five',
                    description: 'The 5th poll option',
                    type: ApplicationCommandOptionType.String,
                    required: false
                },
                {
                    name: 'option-six',
                    description: 'The 6th poll option',
                    type: ApplicationCommandOptionType.String,
                    required: false
                },
                {
                    name: 'option-seven',
                    description: 'The 7th poll option',
                    type: ApplicationCommandOptionType.String,
                    required: false
                },
                {
                    name: 'option-eight',
                    description: 'The 8th poll option',
                    type: ApplicationCommandOptionType.String,
                    required: false
                },
                {
                    name: 'option-nine',
                    description: 'The 9th poll option',
                    type: ApplicationCommandOptionType.String,
                    required: false
                },
                {
                    name: 'option-ten',
                    description: 'The 10th poll option',
                    type: ApplicationCommandOptionType.String,
                    required: false
                }
            ]
        }
    ],
    /**
    * @param {ChatInputCommandInteraction} interaction
    * @param {client} client
    */
    async execute(interaction, client) {
        const { user, guild } = interaction

        if(interaction.options.getSubcommandGroup() == 'image') {
            switch(interaction.options.getSubcommand()) {
                case 'drake': {
                    const topText = interaction.options.getString('top-text').replaceAll(' ', '+')
                    const bottomText = interaction.options.getString('bottom-text').replaceAll(' ', '+')

                    const embed = new EmbedBuilder()
                    .setAuthor({ name: `Generated by ${user.username}`, iconURL: user.avatarURL() })
                    .setFooter({ text: 'Omega Bot is not responsible for user-generated content.' })
                    .setImage(`https://api.popcatdev.repl.co/drake?text1=${topText}&text2=${bottomText}`)
                    .setColor('#ff3f3f')

                    interaction.reply({ embeds: [embed] })

                    break
                }

                case 'sadcat': {
                    const text = interaction.options.getString('text').replaceAll(' ', '+')

                    const embed = new EmbedBuilder()
                    .setAuthor({ name: `Generated by ${user.username}`, iconURL: user.avatarURL() })
                    .setFooter({ text: 'Omega Bot is not responsible for user-generated content.' })
                    .setImage(`https://api.popcat.xyz/sadcat?text=${text}`)
                    .setColor('#ff3f3f')

                    interaction.reply({ embeds: [embed] })

                    break
                }

                case 'jail': {
                    let image = interaction.options.getAttachment('image')

                    if(image) image = image.url
                    else image = user.avatarURL().replace('.webp', '.png')

                    const embed = new EmbedBuilder()
                    .setAuthor({ name: `Generated by ${user.username}`, iconURL: user.avatarURL() })
                    .setFooter({ text: 'Omega Bot is not responsible for user-generated content.' })
                    .setImage(`https://api.popcat.xyz/jail?image=${image}`)
                    .setColor('#ff3f3f')

                    interaction.reply({ embeds: [embed] })

                    break
                }

                case 'wanted': {
                    let image = interaction.options.getAttachment('image')

                    if(image) image = image.url
                    else image = user.avatarURL().replace('.webp', '.png')

                    const embed = new EmbedBuilder()
                    .setAuthor({ name: `Generated by ${user.username}`, iconURL: user.avatarURL() })
                    .setFooter({ text: 'Omega Bot is not responsible for user-generated content.' })
                    .setImage(`https://api.popcat.xyz/wanted?image=${image}`)
                    .setColor('#ff3f3f')

                    interaction.reply({ embeds: [embed] })

                    break
                }
            }
        }

        if(interaction.options.getSubcommand() == 'poll') {
            const pollData = require('../../../database/polls')
            
            const name = interaction.options.getString('poll-name')
            const options = [
                interaction.options.getString('option-one'),
                interaction.options.getString('option-two'),
                interaction.options.getString('option-three'),
                interaction.options.getString('option-four'),
                interaction.options.getString('option-five'),
                interaction.options.getString('option-six'),
                interaction.options.getString('option-seven'),
                interaction.options.getString('option-eight'),
                interaction.options.getString('option-nine'),
                interaction.options.getString('option-ten')
            ]

            const embed = new EmbedBuilder()
            .setTitle(name)
            .setColor('ff3f3f')
            .setFooter({ text: 'Omega Bot is not responsible for user-generated content.' })

            let i = 1
            let row1 = new ActionRowBuilder()
            let row2 = new ActionRowBuilder()
            let description = ''
            let uuid = uuidv4()

            for(const option of options) {
                if(!option) continue

                description += `**${i})** ${option} - \`0 votes\`\n`

                const button = new ButtonBuilder()
                .setCustomId(uuid+'&'+i)
                .setStyle('Danger')
                .setLabel(i.toString())

                if(i < 6) row1.addComponents(button)
                if(i > 5) row2.addComponents(button)

                i++
            }

            pollData.create({ guild: guild.id, uuid: uuid, voters: [] })

            embed.setDescription(description)

            if(i < 6) interaction.reply({ embeds: [embed], components: [row1] })
            if(i > 5) interaction.reply({ embeds: [embed], components: [row1, row2] })
        }

    }
}