const { ApplicationCommandOptionType, ChatInputCommandInteraction, PermissionFlagsBits } = require('discord.js')
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
                    name: 'emoji',
                    description: 'The emoji itself',
                    type: ApplicationCommandOptionType.Attachment,
                    required: true
                },
                {
                    name: 'name',
                    description: 'The name of the emoji',
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
        if(interaction.options.getSubcommand() == 'add') {
            const attachment = interaction.options.getAttachment('emoji')
            const name = interaction.options.getString('name')

            const contentType = [
                'image/png',
                'image/gif',
                'image/jpeg'
            ]

            if(contentType.includes(attachment.contentType.toString())) 
            return interaction.reply({ content: '<:cross:1062133327370399884> Error! Invalid Attachment Type.', ephemeral: true })
            if(name.length < 2 || name.length > 31) return interaction.reply({ content: '<:cross:1062133327370399884> Error! Invalid Emoji Length.', ephemeral: true })
            if(attachment.size > 33554432) return interaction.reply({ content: '<:cross:1062133327370399884> Error! Invalid Image Size.', ephemeral: true })

            interaction.guild.emojis.create({ attachment: attachment.url, name: name }).then(emoji => {
                interaction.reply({ content: `<:check:1062133324329517138> Successfully added <${emoji.identifier}> to ${interaction.guild.name}`, ephemeral: true })
            })
        }
    }
}