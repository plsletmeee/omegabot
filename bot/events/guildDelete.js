const { WebhookClient, EmbedBuilder, Guild } = require('discord.js')
const client = require('../index')
const dotenv = require('dotenv')
dotenv.config()

module.exports = {
    name: 'guildDelete',
    /**
    * @param {Guild} guild 
    * @param {client} client
    */
    async execute(guild, client) {

        // Leave Webhook
        const webhook = new WebhookClient({ url: process.env.DJS_LOG })

        const embed = new EmbedBuilder()
        .setTitle('Left Server')
        .setColor('#ff3f3f')
        .setThumbnail(guild.iconURL())
        .setDescription(`${client.user.username} was just removed from **${guild.name}**.\n\n**Owner ID:** ${guild.ownerId}\n**Server ID:** ${guild.id}\n**Joined:** <t:${parseInt(guild.joinedTimestamp / 1000)}:R>`)

        webhook.send({ embeds: [embed], username: 'Server Logs' })

    }
}