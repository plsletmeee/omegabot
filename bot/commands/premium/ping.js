const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: "ping",
    description: "Get the bot and API latency",
    async execute(interaction, premium) {

        const pingCalc = new EmbedBuilder()
        .setTitle("🧠 Calculating latency... ")
        .setColor("#2f3136")

        const ping = await interaction.reply({ embeds: [pingCalc], fetchReply: true });

        const PingEmbed = new EmbedBuilder()
        .setTitle("🏓 Pong!")
        .setColor("#2f3136")
        .addFields(
            {name: "Bot Ping", value: `\`${ping.createdTimestamp - interaction.createdTimestamp} ms\``},
            {name: "API Ping", value: `\`${premium.ws.ping} ms\``},
        )

        await interaction.editReply({ embeds: [PingEmbed] })

    }
}