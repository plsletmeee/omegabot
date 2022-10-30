const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');

module.exports = {
    name: 'factbook',
    description: 'Write something in the Fact Book',
    async execute(interaction) {

        const modal = new ModalBuilder()
        .setCustomId('factbook')
        .setTitle('Meme Content');

        const fact = new TextInputBuilder()
        .setCustomId("fact")
        .setLabel("Fact")
        .setStyle(TextInputStyle.Short)
        .setMaxLength(40)
        .setMinLength(1)
        .setRequired(true)
    
        const firstActionRow = new ActionRowBuilder().addComponents(fact);
    
        modal.addComponents(firstActionRow);

        await interaction.showModal(modal);

    }
}