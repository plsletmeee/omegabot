const { ApplicationCommandOptionType, PermissionFlagsBits, EmbedBuilder } = require('discord.js')

module.exports = {
    name: 'rank',
    description: 'All the rank commands',
    options: [
        {
            name: "info",
            description: "Fetch your rank data for this server",
            type: ApplicationCommandOptionType.Subcommand
        },
        {
            name: "leaderboard",
            description: "Look at the rank leaderboard for this server",
            type: ApplicationCommandOptionType.Subcommand
        },
    ],
    async execute(interaction) {

        if(interaction.options.getSubcommand() == 'info') {

            const Schema = require('../../database/memberlevels')
    
            Schema.findOne({ Guild : interaction.guild.id, ID : interaction.member.id }, async (err, data) => {
        
                if(!data) return interaction.reply({content: "<:cross:1062133327370399884> There is no rank data. Send some messages in this server first!", ephemeral: true})
    
                const level = data.Level
                const xp = data.XP
    
                const embedOne = new EmbedBuilder()
                .setTitle(`XP & Levels`)
                .setThumbnail(interaction.member.displayAvatarURL({dynamic: true}))
                .setDescription(`You are level **${level}**\nYou have **${xp}** XP\n\nYou need **${1000 - xp}** more XP to reach level **${level + 1}**`)
                .setColor("#ff3f3f")
    
                const embedTwo = new EmbedBuilder()
                .setTitle(`XP & Levels`)
                .setThumbnail(interaction.member.displayAvatarURL({dynamic: true}))
                .setDescription(`You are level **${level}**\nYou have **${xp}** XP\n\nYou need **${level * 1000 - xp}** more XP to reach level **${level + 1}**`)
                .setColor("#ff3f3f")
    
                if(level === 0) interaction.reply({embeds: [embedOne]})
                if(level !== 0) interaction.reply({embeds: [embedTwo]})
            
            })

        }

        if(interaction.options.getSubcommand() == 'leaderboard') {

            const Schema = require('../../database/memberlevels')
    
            Schema.find({ Guild : interaction.guild.id }, async (err, data) => {
        
                if(!data) return interaction.reply({content: `<:cross:1062133327370399884> There is no rank data for this server.`, ephemeral: true})

                let leaderboard = []

                data.forEach(async user => {
                    let id = user.ID
                    let level = user.Level

                    interaction.guild.members.fetch(id).then(
                        leaderboard.push(`**Level ${level}** <@${id}>`)
                    ).catch(() => {return})
                })

                leaderboard.sort(function(a, b){return a.replace(/ *\<[^)]*\> */g, "").replaceAll('**', '').substring(6) - b.replace(/ *\<[^)]*\> */g, "").replaceAll('**', '').substring(6)})
                leaderboard.reverse()

                let shortLeaderboard = leaderboard.slice(0, 10)
                let string = shortLeaderboard.toString().replaceAll(',', '\r')

                const embed = new EmbedBuilder()
                .setTitle(`Top 10 Ranked Members`)
                .setDescription(string)
                .setColor('#ff3f3f')
                .setTimestamp()

                interaction.reply({embeds: [embed]})
            
            })
        }
    }
}