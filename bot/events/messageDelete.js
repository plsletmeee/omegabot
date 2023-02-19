const { EmbedBuilder, Message } = require('discord.js')
const client = require('../index')

module.exports = {
    name: 'messageDelete',
    /**
    * @param {Message} message 
    * @param {client} client 
    */
    async execute(message, client) {
        if(!message.guild) return

        // Audit Logs
        require('../../database/audit-log').findOne({ Guild : message.guild.id }, async (err, data) => {

            if (!data) return
            if(message.author.bot) return
            if(!message.guild.channels.cache.has(data.Channel)) return

            const channel = message.guild.channels.cache.get(data.Channel)
            if(!channel) return

            const embed = new EmbedBuilder()
            .setColor('#ff3f3f')
            .setTitle('Message Deleted')
            .setTimestamp()
            .setDescription(`A message sent by ${message.author} was deleted in ${message.channel}.`)
            .addFields({ name: 'Message', value: `${message.content ? message.content : `${message.attachments.map(a => a.url)}`}` })

            if(message.attachments.size >= 1) embed.setImage(`${message.attachments.map(a => a.url)}`)

            channel.send({embeds: [embed]}).catch(() => {return})
            

        })

    }
}