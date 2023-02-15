const { WebhookClient, EmbedBuilder, Guild } = require('discord.js')
const client = require('../index')
const dotenv = require('dotenv')
dotenv.config()

module.exports = {
    name: 'guildCreate',
    /**
    * @param {Guild} guild 
    * @param {client} client
    */
    async execute(guild, client) {

        // Join Webhook
        const webhook = new WebhookClient({ url: process.env.DJS_LOG })

        const embed = new EmbedBuilder()
        .setTitle('Joined Server')
        .setColor('#ff3f3f')
        .setThumbnail(guild.iconURL())
        .setDescription(`${client.user.username} was just added to **${guild.name}**.\n\n**Owner ID:** ${guild.ownerId}\n**Server ID:** ${guild.id}\n**Joined:** <t:${parseInt(guild.joinedTimestamp / 1000)}:R>`)

        webhook.send({ embeds: [embed], username: 'Server Logs' })

    }
}