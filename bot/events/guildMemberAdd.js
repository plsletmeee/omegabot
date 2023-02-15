const { EmbedBuilder, GuildMember } = require('discord.js')
const client = require('../index')

const joinMessagesData = require('../../database/joinMessages')
const autoroleData = require('../../database/autorole')
const memberlogData = require('../../database/memberlog')

module.exports = {
    name: 'guildMemberAdd',
    /**
    * @param {GuildMember} member 
    * @param {client} client
    */
    async execute(member, client) {
        const { user, guild, joinedTimestamp } = member

        // 1) Join Messages //

        joinMessagesData.findOne({ guild: guild.id, enabled: true }, (err, data) => {
            if(!data || !guild.channels.cache.get(data.channel)) return
            
            const channel = guild.channels.cache.get(data.channel)
            const embeded = data.embeded
            const mention = data.mention

            let picture = data.picture
            let message = data.message
            
            message = message.replaceAll('{username}', user.username)
            message = message.replaceAll('{memberCount}', guild.memberCount)
            message = message.replaceAll('{joinTimestamp}', `<t:${parseInt(joinedTimestamp / 1000)}:D>`)

            if(picture == 'false') picture = undefined

            const normalEmbed = new EmbedBuilder()
            .setColor('#ff3f3f')
            .setTimestamp()
            .setAuthor({ name: `Welcome, ${user.username}!`, iconURL: `${member.displayAvatarURL({dynamic: true})}` })
            .setThumbnail(member.displayAvatarURL({dynamic: true}))
            .setDescription(message)

            const pictureEmbed = new EmbedBuilder()
            .setColor('#ff3f3f')
            .setTimestamp()
            .setAuthor({ name: `Welcome, ${user.username}!`, iconURL: `${member.displayAvatarURL({dynamic: true})}` })
            .setImage(picture)
            .setDescription(message)

            if(embeded) {

                if(picture) {
                    if(mention) channel.send({ embeds: [pictureEmbed], content: `${member}` })
                    else channel.send({ embeds: [pictureEmbed] })
                } else {
                    if(mention) channel.send({ embeds: [normalEmbed], content: `${member}` })
                    else channel.send({ embeds: [normalEmbed] }) 
                }

            } else {

                if(picture) {
                    if(mention) channel.send({ files: [picture], content: `${member}\n${message}` })
                    else channel.send({ files: [picture], content: `${message}` })
                } else {
                    if(mention) channel.send({ content: `${member}\n${message}` })
                    else channel.send({ content: `${message}` })  
                }

            }

        })

        // 2) Autorole //

        autoroleData.findOne({ Guild : member.guild.id }, (err, data) => {

            if(!data || err) return
       
            const role = member.guild.roles.cache.get(data.Role)
            if(data.Screening == 'false' && role) member.roles.add(role).catch(() => {return})

        })

        memberlogData.findOne({ Guild : member.guild.id }, (err, data) => {

            if(!data || err) return
       
            const channel = member.guild.channels.cache.get(data.Channel)

            const embed = new EmbedBuilder()
            .setAuthor({name: `New Member`, iconURL: `${member.displayAvatarURL({dynamic: true})}`})
            .setThumbnail(member.displayAvatarURL({dynamic: true}))
            .setDescription(`**Name:** ${member.user.tag}\n**ID:** ${member.user.id}\n**Created:** <t:${parseInt(member.user.createdTimestamp / 1000)}:D>\n**Joined:** <t:${parseInt(member.joinedTimestamp / 1000)}:D>`)
            .setColor('#ff3f3f')
            .setTimestamp()

            if(channel) channel.send({embeds: [embed]}).catch(() => {return})

        })
    }
}