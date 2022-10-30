const { EmbedBuilder, ButtonBuilder, ActionRowBuilder } = require('discord.js');

module.exports = {
    name: "coinflip",
    description: "Flip a coin",
    async execute(interaction) {

        const embed = new EmbedBuilder()
        .setTitle("Flip a Coin!")
        .setDescription("Press a button to start! 🪙")
        .setColor("#2f3136")

        const flip = new ActionRowBuilder()
        .addComponents(
        new ButtonBuilder()
        .setCustomId('coinFlip')
        .setLabel('Flip!')
        .setStyle('Danger')
        .setEmoji('🪙'),
        );

        await interaction.reply(".");
        await interaction.deleteReply().catch(() => {return});

        interaction.channel.send({ embeds: [embed], components: [flip] });

    }
}