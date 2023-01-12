const { EmbedBuilder, ChatInputCommandInteraction } = require('discord.js')
const client = require('../index')

module.exports = {
    name: "ping",
    description: "Get the bot and API latency",
    /**
    * @param {ChatInputCommandInteraction} interaction 
    * @param {client} client 
    */
    async execute(interaction, client) {

        const pingCalc = new EmbedBuilder()
        .setTitle("🧠 Calculating latency... ")
        .setColor("#2f3136")

        const ping = await interaction.reply({ embeds: [pingCalc], fetchReply: true, ephemeral: true })

        const PingEmbed = new EmbedBuilder()
        .setTitle("🏓 Pong!")
        .setColor("#2f3136")
        .addFields(
            {name: "Bot Ping", value: `\`${ping.createdTimestamp - interaction.createdTimestamp} ms\``},
            {name: "API Ping", value: `\`${client.ws.ping} ms\``},
        )

        await interaction.editReply({ embeds: [PingEmbed] })

    }
}