const { EmbedBuilder } = require('discord.js')
const AuditLogSchema = require('../../database/audit-log')

module.exports = {
    name: 'messageUpdate',
    async execute(oldMessage, newMessage) {

        AuditLogSchema.findOne({ Guild : oldMessage.guild.id }, async (err, data) => {

            if (!data) return
            if(oldMessage.author.bot) return
            if(!oldMessage.guild.channels.cache.has(data.Channel)) return

            if(oldMessage.content === newMessage.content) return

            const count = 1950
            const original = oldMessage.content.slice(0, count) + (oldMessage.content.length > 1950 ? ' ...' : '')
            const edited = newMessage.content.slice(0, count) + (newMessage.content.length > 1950 ? ' ...' : '')
            const channel = oldMessage.guild.channels.cache.get(data.Channel)

            const embed = new EmbedBuilder()
            .setColor('#ff3f3f')
            .setTitle('Message Edited')
            .setTimestamp()
            .setDescription(`A message sent by ${oldMessage.author} was edited in ${oldMessage.channel}.\n[**Jump to message**](${newMessage.url})`)
            .addFields(
                {name: 'Before', value: `${original}`},
                {name: 'After', value: `${edited}`},
            )

            if(channel) channel.send({embeds: [embed]}).catch(() => {return})
            

        })

    }
}