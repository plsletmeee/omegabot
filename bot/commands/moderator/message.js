const { ChatInputCommandInteraction, PermissionFlagsBits, ApplicationCommandOptionType, ChannelType, EmbedBuilder, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js')
const client = require('../../index')

module.exports = {
    name: 'message',
    description: 'message',
    defaultMemberPermissions: PermissionFlagsBits.ManageMessages,
    options: [
        {
            name: 'echo',
            description: 'Echo a sent message',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'message',
                    description: 'The id of the message',
                    type: ApplicationCommandOptionType.String,
                    required: true
                },
                {
                    name: 'channel',
                    description: 'Where to send the echo',
                    type: ApplicationCommandOptionType.Channel,
                    channel_types: [ChannelType.GuildText]
                }
            ]
        },
        {
            name: 'send',
            description: 'Send a message as Omega',
            type: ApplicationCommandOptionType.Subcommand,
        },
        {
            name: 'embed',
            description: 'Send an embed as Omega',
            type: ApplicationCommandOptionType.Subcommand,
        }
    ],
    /**
    * @param {ChatInputCommandInteraction} interaction
    * @param {client} client
    */
    async execute(interaction, client) {
        const { options } = interaction

        switch (options.getSubcommand()) {
            case 'echo': {

                const notfoundEmbed = new EmbedBuilder()
                .setColor('#ff3f3f')
                .setTitle('Echo Failed')
                .setDescription('Message echo failed because the message ID is either invalid or the message does not originate from this channel.')

                const messageId = options.getString('message')
                const channel = options.getChannel('channel')

                interaction.channel.messages.fetch(messageId).then((message) => {

                    const { attachments, embeds, components, content, stickers } = message

                    const sentEmbed = new EmbedBuilder()
                    .setColor('#ff3f3f')
                    .setTitle('Echoed Message')
                    .setDescription('Message was echoed successfully. 🎉')
    
                    if(channel) channel.send({ content: content, embeds: embeds, components: components, stickers: stickers, files: attachments })
                    else interaction.channel.send({ content: content, embeds: embeds, components: components, stickers: stickers, files: attachments })
    
                    return interaction.reply({ embeds: [sentEmbed], ephemeral: true })

                }).catch(() => { return interaction.reply({ embeds: [notfoundEmbed] }) })

                return 

            }

            case 'send': {

                const modal = new ModalBuilder()
                .setCustomId('send')
                .setTitle('Send Message')
        
                const content = new TextInputBuilder()
                .setCustomId('send-content')
                .setLabel('Message')
                .setStyle(TextInputStyle.Paragraph)
                .setMaxLength(2000)
                .setMinLength(1)
                .setRequired(true)
            
                const row = new ActionRowBuilder().addComponents(content)
                modal.addComponents(row)
        
                const show = await interaction.showModal(modal)
                return Promise.resolve(show)

            }

            case 'embed': {

                const modal = new ModalBuilder()
                .setCustomId('embed')
                .setTitle('Send Embed')

                const description = new TextInputBuilder()
                .setCustomId('embed-description')
                .setLabel('Description')
                .setPlaceholder('Never gonna let you down')
                .setStyle(TextInputStyle.Paragraph)
                .setRequired(false)

                const title = new TextInputBuilder()
                .setCustomId('embed-title')
                .setLabel('Title')
                .setPlaceholder('Never gonna give you up')
                .setStyle(TextInputStyle.Short)
                .setRequired(false)

                const colour = new TextInputBuilder()
                .setCustomId('embed-colour')
                .setLabel('Hex Colour')
                .setPlaceholder('#ff3f3f')
                .setStyle(TextInputStyle.Short)
                .setRequired(false)

                const image = new TextInputBuilder()
                .setCustomId('embed-image')
                .setLabel('Image')
                .setPlaceholder('https://omegabot.xyz/media/pngs/banner.png')
                .setStyle(TextInputStyle.Short)
                .setRequired(false)

                const thumbnail = new TextInputBuilder()
                .setCustomId('embed-thumbnail')
                .setLabel('Thumbnail')
                .setPlaceholder('https://omegabot.xyz/media/pngs/logo.png')
                .setStyle(TextInputStyle.Short)
                .setRequired(false)
            
                const row1 = new ActionRowBuilder().addComponents(title)
                const row2 = new ActionRowBuilder().addComponents(description)
                const row3 = new ActionRowBuilder().addComponents(colour)
                const row4 = new ActionRowBuilder().addComponents(image)
                const row5 = new ActionRowBuilder().addComponents(thumbnail)
                modal.addComponents(row1, row2, row3, row4, row5)
        
                const show = await interaction.showModal(modal)
                return Promise.resolve(show)

            }
        }
    }
}