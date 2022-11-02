const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');

module.exports = {
    name: "echo",
    description: "Send a message as this bot",
    async execute(interaction) {

        const modal = new ModalBuilder()
        .setCustomId('echo')
        .setTitle('Echo Content');

        const content = new TextInputBuilder()
        .setCustomId("content")
        .setLabel("Message")
        .setStyle(TextInputStyle.Paragraph)
        .setMaxLength(2000)
        .setMinLength(1)
        .setRequired(true)
    
        const firstActionRow = new ActionRowBuilder().addComponents(content);
    
        modal.addComponents(firstActionRow);

        await interaction.showModal(modal);

    }
}