const { EmbedBuilder, ButtonBuilder, ActionRowBuilder } = require('discord.js')

module.exports = {
    name: "rock-paper-scissors",
    description: "Play rock paper scissors",
    async execute(interaction) {

        const embed = new EmbedBuilder()
        .setTitle("Rock Paper Scissors")
        .setDescription("Press a button to start! ✊✌️🤚")
        .setColor("#ff3f3f")

        const buttons = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId('rock')
            .setLabel('Rock')
            .setStyle('Danger')
            .setEmoji('✊'),
            new ButtonBuilder()
            .setCustomId('scissors')
            .setLabel('Scissors')
            .setStyle('Danger')
            .setEmoji('✌️'),
            new ButtonBuilder()
            .setCustomId('paper')
            .setLabel('Paper')
            .setStyle('Danger')
            .setEmoji('🤚'),
        )

        await interaction.reply(".")
        await interaction.deleteReply().catch(() => {return})

        interaction.channel.send({ embeds: [embed], components: [buttons] })

    }
}