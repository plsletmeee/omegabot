const { EmbedBuilder, ButtonBuilder, ActionRowBuilder } = require('discord.js');
const client = require('../index');

module.exports = {
    name: 'guide',
    description: 'Read the bot guide',
    async execute(interaction) {

        const embed = new EmbedBuilder()
        .setTitle("**Omega Bot Guide**")
        .setDescription("Omega Bot can be confusing for new users, that's where the guide comes in.\r\rIf you ever need help with a command or bot feature, the guide has detailed descriptions of everything you'll need to know to use this bot.")
        .setColor("#2f3136")
        .setThumbnail("https://cdn.discordapp.com/avatars/988620875622391839/b6c0770832a33d5899119459a87617a6.webp")
        
        const button1 = new ButtonBuilder()
        .setStyle("Danger")
        .setLabel("Commands")
        .setCustomId("guideCommands")

        const button2 = new ButtonBuilder()
        .setStyle("Danger")
        .setLabel("Setting Up")
        .setCustomId("guideSettingUp")
        .setDisabled(true)

        const button3 = new ButtonBuilder()
        .setStyle("Danger")
        .setLabel("Features")
        .setCustomId("guideFeatures")
        .setDisabled(true)

        const button4 = new ButtonBuilder()
        .setStyle("Danger")
        .setLabel("Support Server")
        .setCustomId("guideSupportServer")

        const buttons = new ActionRowBuilder().setComponents(button1, button2, button3, button4)

        interaction.reply({embeds: [embed], components: [buttons]})

    }
}