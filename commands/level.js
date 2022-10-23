const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'level',
    description: 'Check your level',
    
    async execute(interaction) {

        const Schema = require('../database/schemas/memberlevels')
    
        Schema.findOne({ Guild : interaction.guild.id, ID : interaction.member.id }, async (err, data) => {
    
            if(!data) return interaction.reply({content: "<a:obcross:1018078642607239218> There is no rank data. Send some messages in this server first!", ephemeral: true})

            const level = data.Level;
            const xp = data.XP;

            const embedOne = new EmbedBuilder()
            .setTitle(`XP & Levels`)
            .setThumbnail(interaction.member.displayAvatarURL({dynamic: true}))
            .setDescription(`You are level **${level}**\nYou have **${xp}** XP\n\nYou need **${1000 - xp}** more XP to reach level **${level + 1}**`)
            .setColor("#2f3136")

            const embedTwo = new EmbedBuilder()
            .setTitle(`XP & Levels`)
            .setThumbnail(interaction.member.displayAvatarURL({dynamic: true}))
            .setDescription(`You are level **${level}**\nYou have **${xp}** XP\n\nYou need **${level * 1000 - xp}** more XP to reach level **${level + 1}**`)
            .setColor("#2f3136")

            if(level === 0) interaction.reply({embeds: [embedOne]});
            if(level !== 0) interaction.reply({embeds: [embedTwo]});
        
        });
    }
}