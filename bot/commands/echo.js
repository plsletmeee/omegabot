const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, ChatInputCommandInteraction } = require('discord.js')
const client = require('../index')

module.exports = {
    name: "echo",
    description: "Send a message as this bot",
    /**
    * @param {ChatInputCommandInteraction} interaction 
    * @param {client} client 
    */
    async execute(interaction, client) {

        const modal = new ModalBuilder()
        .setCustomId('echo')
        .setTitle('Echo Content')

        const content = new TextInputBuilder()
        .setCustomId("content")
        .setLabel("Message")
        .setStyle(TextInputStyle.Paragraph)
        .setMaxLength(2000)
        .setMinLength(1)
        .setRequired(true)
    
        const firstActionRow = new ActionRowBuilder().addComponents(content)
        modal.addComponents(firstActionRow)

        const show = await interaction.showModal(modal)
        Promise.resolve(show)

    }
}