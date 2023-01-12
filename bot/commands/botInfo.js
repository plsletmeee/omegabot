const { ChatInputCommandInteraction, EmbedBuilder } = require('discord.js')
const client = require('../index')

module.exports = {
    name: 'bot-info',
    description: 'Shows the bot information',
    /**
    * @param {ChatInputCommandInteraction} interaction
    * @param {client} client
    */
    async execute(interaction, client) {

        let serverCount = client.guilds.cache.size
        let userCount = 0
        
        client.guilds.cache.forEach(guild => userCount += guild.members.cache.size)

        const embed = new EmbedBuilder()
        .setTitle('Bot Info 📋')
        .setColor('#ff3f3f')
        .setThumbnail(client.user.avatarURL())
        .setDescription(`These are the live bot statistics.\n\nServer Count: \`${serverCount}\`\nTotal User Count: \`${userCount}\``)

        interaction.reply({ embeds: [embed], ephemeral: true })

    }
}