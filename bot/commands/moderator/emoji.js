const { ApplicationCommandOptionType, ChatInputCommandInteraction, PermissionFlagsBits, EmbedBuilder } = require('discord.js')
const client = require('../../index')

module.exports = {
    name: 'emoji',
    description: 'emoji',
    defaultMemberPermissions: PermissionFlagsBits.ManageEmojisAndStickers,
    options: [
        {
            name: 'add',
            description: 'Add an emoji to your server',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'image',
                    description: 'The emoji image',
                    type: ApplicationCommandOptionType.Attachment,
                    required: true
                },
                {
                    name: 'name',
                    description: 'The emoji name',
                    type: ApplicationCommandOptionType.String,
                    required: true
                }
            ]
        },
        {
            name: 'delete',
            description: 'Delete an emoji from your server',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'emoji',
                    description: 'The emoji to delete',
                    type: ApplicationCommandOptionType.String,
                    required: true
                }
            ]
        },
        {
            name: 'large',
            description: 'Enlarge an emoji',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'emoji',
                    description: 'The emoji to enlarge',
                    type: ApplicationCommandOptionType.String,
                    required: true
                }
            ]
        },
        {
            name: 'copy',
            description: 'Copy an emoji from another server',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'emoji',
                    description: 'The emoji to copy',
                    type: ApplicationCommandOptionType.String,
                    required: true
                },
                {
                    name: 'name',
                    description: 'The new emoji name',
                    type: ApplicationCommandOptionType.String,
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
        const { options, guild } = interaction

        const errorEmbed = new EmbedBuilder().setColor('#ff3f3f')
        const successEmbed = new EmbedBuilder().setColor('#43b581')

        switch(options.getSubcommand()) {

            case 'add': {
                const attachment = options.getAttachment('image')
                const name = options.getString('name')
    
                const imgType = [
                    'image/png',
                    'image/gif',
                    'image/jpeg'
                ]

                if(!imgType.includes(attachment.contentType.toString())) return interaction.reply({ embeds: [errorEmbed.setDescription('<:obcross:1073595895360258118> Invalid file type.')] })
                if(name.length < 2 || name.length > 31) return interaction.reply({ embeds: [errorEmbed.setDescription('<:obcross:1073595895360258118> Invalid name length.')] })
                if(attachment.size > 33554432) return interaction.reply({ embeds: [errorEmbed.setDescription('<:obcross:1073595895360258118> Invalid file size.')] })

                guild.emojis.create({ attachment: attachment.url, name: name }).then(emoji => {
                    return interaction.reply({ embeds: [successEmbed.setDescription(`<:obcheck:1073595892701069362> Added **${emoji.name}** successfully.`)] })
                }).catch(() => {
                    return interaction.reply({ embeds: [errorEmbed.setDescription('<:obcross:1073595895360258118> Server emoji limit reached.')] })
                })

                break
            }

            case 'delete': {
                const emoji = options.getString('emoji')

                if(/<a?:[^:]+:\d{19}>/.test(emoji)) {

                    const id = /<a?:[^:]+:(\d{19})>/.exec(emoji)[1]

                    guild.emojis.fetch(id).then(emoji => {
                        if(emoji.deletable) emoji.delete().then(emoji => {
                            return interaction.reply({ embeds: [successEmbed.setDescription(`<:obcheck:1073595892701069362> Deleted **${emoji.name}** successfully.`)] })
                        })
                        
                        else return interaction.reply({ embeds: [errorEmbed.setDescription('<:obcross:1073595895360258118> Could not delete emoji.')] })
                    }).catch(() => {
                        return interaction.reply({ embeds: [errorEmbed.setDescription('<:obcross:1073595895360258118> Could not find emoji.')] })
                    })

                }

                break
            }

            case 'large': {
                const emoji = options.getString('emoji')

                if(/<:[^:]+:\d{19}>/.test(emoji)) {

                    const name = /<:([^a:]+a?[^:]+):(\d{19})>/.exec(emoji)[1]
                    const id = /<:([^a:]+a?[^:]+):(\d{19})>/.exec(emoji)[2]
                    const largeEmoji = `https://cdn.discordapp.com/emojis/${id}.webp?quality=lossless` 
    
                    interaction.reply({ embeds: [successEmbed.setDescription(`<:obcheck:1073595892701069362> Enlarged **${name}** successfully.`).setImage(largeEmoji)] })

                } else if(/<a:[^:]+:\d{19}>/.test(emoji)) {

                    const name = /<a:([^a:]+a?[^:]+):(\d{19})>/.exec(emoji)[1]
                    const id = /<a:([^a:]+a?[^:]+):(\d{19})>/.exec(emoji)[2]
                    const largeEmoji = `https://cdn.discordapp.com/emojis/${id}.gif?quality=lossless` 
    
                    interaction.reply({ embeds: [successEmbed.setDescription(`<:obcheck:1073595892701069362> Enlarged **${name}** successfully.`).setImage(largeEmoji)] })

                } else return interaction.reply({ embeds: [errorEmbed.setDescription('<:obcross:1073595895360258118> Could not find emoji.')] })

                break
            }

            case 'copy': {
                const emoji = options.getString('emoji')
                const name = options.getString('name')

                if(/<:[^:]+:\d{19}>/.test(emoji)) {

                    const id = /<:[^:]+:(\d{19})>/.exec(emoji)[1]
                    const newEmoji = `https://cdn.discordapp.com/emojis/${id}.webp?quality=lossless` 
    
                    guild.emojis.create({ attachment: newEmoji, name: name }).then(emoji => {
                        return interaction.reply({ embeds: [successEmbed.setDescription(`<:obcheck:1073595892701069362> Copied **${emoji.name}** successfully.`)] })
                    }).catch(() => {
                        return interaction.reply({ embeds: [errorEmbed.setDescription('<:obcross:1073595895360258118> Server emoji limit reached.')] })
                    })

                } else if(/<a:[^:]+:\d{19}>/.test(emoji)) {

                    const id = /<a:[^:]+:(\d{19})>/.exec(emoji)[1]
                    const newEmoji = `https://cdn.discordapp.com/emojis/${id}.gif?quality=lossless` 
    
                    guild.emojis.create({ attachment: newEmoji, name: name }).then(emoji => {
                        return interaction.reply({ embeds: [successEmbed.setDescription(`<:obcheck:1073595892701069362> Copied **${emoji.name}** successfully.`)] })
                    }).catch(() => {
                        return interaction.reply({ embeds: [errorEmbed.setDescription('<:obcross:1073595895360258118> Server emoji limit reached.')] })
                    })

                } else return interaction.reply({ embeds: [errorEmbed.setDescription('<:obcross:1073595895360258118> Could not find emoji.')] })

                break
            }

        }
    }
}