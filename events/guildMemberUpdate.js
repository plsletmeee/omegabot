const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'guildMemberUpdate',
    async execute(oldMember, newMember) {

        if(!oldMember.premiumSince && newMember.premiumSince) {

            const BoostSchema = require('../database/schemas/boosts');

            BoostSchema.findOne({ Guild : newMember.guild.id }, (err, data) => {

                if(!data) return;
           
                const channel = newMember.guild.channels.cache.get(data.Channel);

                const embed = new EmbedBuilder()
                .setColor("#2f3136")
                .setDescription(`${newMember} started boosting the server! 🥳`)
                .setImage('https://i.imgur.com/7u9kVDS.jpg')

                channel.send({embeds: [embed]}).catch(() => {return})

            });

        }

        if(oldMember.pending && !newMember.pending) {

            const AutoroleSchema = require('../database/schemas/autorole');

            AutoroleSchema.findOne({ Guild : newMember.guild.id }, (err, data) => {

                if(!data) return;
           
                const role = newMember.guild.roles.cache.get(data.Role);
    
                if(data.Screening === "true") newMember.roles.add(role).catch(() => {return});
    
            });

        }

    }
}