const { EmbedBuilder } = require('discord.js');
const Schema = require('../database/schemas/memberlog');

module.exports = {
    name: 'guildMemberRemove',
    async execute(member) {

        Schema.findOne({ Guild : member.guild.id }, (err, data) => {

        if(!data) return;
        if(member.user.bot) return;
        
        const channel = member.guild.channels.cache.get(data.Channel);

        const embed = new EmbedBuilder()
        .setAuthor({name: `Member Left`, iconURL: `${member.displayAvatarURL({dynamic: true})}`})
        .setThumbnail(member.displayAvatarURL({dynamic: true}))
        .setDescription(`**Name:** ${member.user.tag}\n**ID:** ${member.user.id}\n**Created:** <t:${parseInt(member.user.createdTimestamp / 1000)}:D>\n**Joined:** <t:${parseInt(member.joinedTimestamp / 1000)}:D>`)
        .setColor("#2f3136")
        .setTimestamp();
    
        channel.send({ embeds: [embed] }).catch(() => {return});

        });

    }
}