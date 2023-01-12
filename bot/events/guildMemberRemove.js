const { EmbedBuilder, GuildMember } = require('discord.js')
const client = require('../index')

const leaveMessagesData = require('../../database/leaveMessages')
const memberlogData = require('../../database/memberlog')

module.exports = {
    name: 'guildMemberRemove',
    /**
    * @param {GuildMember} member 
    * @param {client} client
    */
    async execute(member, client) {
        const { user, guild, joinedTimestamp } = member

        // 1) Join Messages //

        leaveMessagesData.findOne({ guild: guild.id, enabled: true }, (err, data) => {
            if(!data || !guild.channels.cache.get(data.channel)) return
            
            const channel = guild.channels.cache.get(data.channel)
            const embeded = data.embeded

            let picture = data.picture
            let message = data.message
            
            message = message.replaceAll('{username}', member.nickname || user.username)
            message = message.replaceAll('{memberCount}', guild.memberCount)
            message = message.replaceAll('{joinTimestamp}', `<t:${parseInt(joinedTimestamp / 1000)}:D>`)

            if(picture == 'false') picture = false

            const normalEmbed = new EmbedBuilder()
            .setColor('#ff3f3f')
            .setAuthor({ name: `Goodbye, ${member.nickname || user.username}!`, iconURL: `${member.displayAvatarURL({dynamic: true})}` })
            .setThumbnail(member.displayAvatarURL({dynamic: true}))
            .setDescription(message)

            const pictureEmbed = new EmbedBuilder()
            .setColor('#ff3f3f')
            .setAuthor({ name: `Goodbye, ${member.nickname || user.username}!`, iconURL: `${member.displayAvatarURL({dynamic: true})}` })
            .setImage(picture)
            .setDescription(message)

            if(embeded) {
                if(picture) channel.send({ embeds: [pictureEmbed] })
                else channel.send({ embeds: [normalEmbed] }) 
            } else {
                if(picture) channel.send({ files: [picture], content: `${message}` })
                else channel.send({ content: `${message}` })  
            }

        })

        // 2) Member Log //

        memberlogData.findOne({ Guild : member.guild.id }, (err, data) => {

            if(!data) return
            
            const channel = member.guild.channels.cache.get(data.Channel)
    
            const embed = new EmbedBuilder()
            .setAuthor({name: `Member Left`, iconURL: `${member.displayAvatarURL({dynamic: true})}`})
            .setThumbnail(member.displayAvatarURL({dynamic: true}))
            .setDescription(`**Name:** ${member.user.tag}\n**ID:** ${member.user.id}\n**Created:** <t:${parseInt(member.user.createdTimestamp / 1000)}:D>\n**Joined:** <t:${parseInt(member.joinedTimestamp / 1000)}:D>`)
            .setColor("#ff3f3f")
            .setTimestamp()
        
            channel.send({ embeds: [embed] }).catch(() => {return})
    
            })
    }
}