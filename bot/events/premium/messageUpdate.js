const { EmbedBuilder } = require('discord.js');
const AuditLogSchema = require('../../../database/bot/audit-log');

module.exports = {
    name: 'messageUpdate',
    async execute(oldMessage, newMessage) {

        AuditLogSchema.findOne({ Guild : oldMessage.guild.id }, async (err, data) => {

            if (!data) return;
            if(oldMessage.author.bot) return;
            if(!oldMessage.guild.channels.cache.has(data.Channel)) return;

            if(oldMessage.content === newMessage.content) return;

            const count = 1950;
            const original = oldMessage.content.slice(0, count) + (oldMessage.content.length > 1950 ? " ..." : "");
            const edited = newMessage.content.slice(0, count) + (newMessage.content.length > 1950 ? " ..." : "");
            const channel = oldMessage.guild.channels.cache.get(data.Channel);

            const embed = new EmbedBuilder()
            .setColor('Red')
            .setTitle("Message Edited")
            .setDescription(`A message sent by ${oldMessage.author} was edited in ${oldMessage.channel}.\n[**Jump to message**](${newMessage.url})`)
            .addFields(
                {name: "Original Message", value: `${original}`},
                {name: "Edited Message", value: `${edited}`},
            )

            await channel.send({embeds: [embed]}).catch(() => {return});
            

        });

    }
}