const { EmbedBuilder } = require('discord.js');
const WelcomeSchema = require('../../../database/bot/welcomes');
const AutoroleSchema = require('../../../database/bot/autorole');
const MemberlogSchema = require('../../../database/bot/memberlog')

module.exports = {
    name: 'guildMemberAdd',
    async execute(member) {

        WelcomeSchema.findOne({ Guild : member.guild.id }, (err, data) => {

            if(!data) return;
       
            const channel = member.guild.channels.cache.get(data.Channel);

            const embed = new EmbedBuilder()
            .setColor("#2f3136")
            .setDescription(data.Message)
            .setThumbnail(member.displayAvatarURL({dynamic: true}))
            .setAuthor({name: `Welcome, ${member.user.username}!`, iconURL: `${member.displayAvatarURL({dynamic: true})}`})

            channel.send({embeds: [embed], content: `${member}`}).catch(() => {return})

        });

        AutoroleSchema.findOne({ Guild : member.guild.id }, (err, data) => {

            if(!data) return;
       
            const role = member.guild.roles.cache.get(data.Role);

            if(data.Screening === "false") member.roles.add(role).catch(() => {return});

        });

        MemberlogSchema.findOne({ Guild : member.guild.id }, (err, data) => {

            if(!data) return;
       
            const channel = member.guild.channels.cache.get(data.Channel);

            const embed = new EmbedBuilder()
            .setAuthor({name: `New Member`, iconURL: `${member.displayAvatarURL({dynamic: true})}`})
            .setThumbnail(member.displayAvatarURL({dynamic: true}))
            .setDescription(`**Name:** ${member.user.tag}\n**ID:** ${member.user.id}\n**Created:** <t:${parseInt(member.user.createdTimestamp / 1000)}:D>\n**Joined:** <t:${parseInt(member.joinedTimestamp / 1000)}:D>`)
            .setColor("#2f3136")
            .setTimestamp();

            channel.send({embeds: [embed]}).catch(() => {return});

        });

    }
}