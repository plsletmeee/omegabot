const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');

module.exports = {
    name: 'drake',
    description: 'Generate a drake meme',
    async execute(interaction) {

        const modal = new ModalBuilder()
        .setCustomId('drake')
        .setTitle('Meme Content');

        const topText = new TextInputBuilder()
        .setCustomId("drakeText1")
        .setLabel("Top Text")
        .setStyle(TextInputStyle.Short)
        .setMaxLength(40)
        .setMinLength(1)
        .setRequired(true)

        const bottomText = new TextInputBuilder()
        .setCustomId("drakeText2")
        .setLabel("Bottom Text")
        .setStyle(TextInputStyle.Short)
        .setMaxLength(40)
        .setMinLength(1)
        .setRequired(true)
    
        const firstActionRow = new ActionRowBuilder().addComponents(topText);
        const secondActionRow = new ActionRowBuilder().addComponents(bottomText);
    
        modal.addComponents(firstActionRow, secondActionRow);

        await interaction.showModal(modal);

    }
}