const { ApplicationCommandOptionType, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

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
        {
            name: "set",
            description: "Set data",
            type: ApplicationCommandOptionType.SubcommandGroup,
            defaultMemberpermissions: PermissionFlagsBits.ModerateMembers,
            options: [
                {
                    name: "xp",
                    description: "Set a member's XP",
                    type: ApplicationCommandOptionType.Subcommand,
                    options: [
                        {
                            name: "member",
                            description: "Whose XP data you want to change",
                            type: ApplicationCommandOptionType.User,
                            required: true
                        },
                        {
                            name: "amount",
                            description: "The XP you want to set them to",
                            type: ApplicationCommandOptionType.Number,
                            required: true
                        }
                    ]
                },
                {
                    name: "level",
                    description: "Set a member's level",
                    type: ApplicationCommandOptionType.Subcommand,
                    options: [
                        {
                            name: "member",
                            description: "Whose Level data you want to change",
                            type: ApplicationCommandOptionType.User,
                            required: true
                        },
                        {
                            name: "amount",
                            description: "The Level you want to set them to",
                            type: ApplicationCommandOptionType.Number,
                            required: true
                        }
                    ]
                }
            ]
        },
        {
            name: "add",
            description: "Add data",
            type: ApplicationCommandOptionType.SubcommandGroup,
            defaultMemberpermissions: PermissionFlagsBits.ModerateMembers,
            options: [
                {
                    name: "xp",
                    description: "Add to a member's XP",
                    type: ApplicationCommandOptionType.Subcommand,
                    options: [
                        {
                            name: "member",
                            description: "Whose XP data you want to change",
                            type: ApplicationCommandOptionType.User,
                            required: true
                        },
                        {
                            name: "amount",
                            description: "The XP you want to add to",
                            type: ApplicationCommandOptionType.Number,
                            required: true
                        }
                    ]
                },
                {
                    name: "level",
                    description: "Add to a member's level",
                    type: ApplicationCommandOptionType.Subcommand,
                    options: [
                        {
                            name: "member",
                            description: "Whose Level data you want to change",
                            type: ApplicationCommandOptionType.User,
                            required: true
                        },
                        {
                            name: "amount",
                            description: "The Level you want to add to",
                            type: ApplicationCommandOptionType.Number,
                            required: true
                        }
                    ]
                }
            ]
        }
    ],
    async execute(interaction) {

        if(interaction.options.getSubcommand() == 'info') {

            const Schema = require('../../database/schemas/memberlevels')
    
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

        if(interaction.options.getSubcommandGroup() == 'set' && interaction.options.getSubcommand() == 'xp') {

            const Schema = require('../../database/schemas/memberlevels')
            const member = interaction.options.getMember('member');
            const amount = interaction.options.getNumber('amount');

            if(amount < 0) return interaction.reply({content: `<a:obcross:1018078642607239218> Cannot set XP to ${amount}! Minimum is 0.`, ephemeral: true})
    
            Schema.findOne({ Guild : interaction.guild.id, ID : member.id }, async (err, data) => {
        
                if(!data) {

                    new Schema ({
                        Guild : interaction.guild.id,
                        ID : member.id,
                        Level : 0,
                        XP : amount,
                    }).save();

                    interaction.reply({content: `<a:obtick:1018078610130751528> Set ${member.user.username}'s XP to ${amount}.`, ephemeral: true});
                
                } else {

                    data.XP = amount;
                    data.save();

                    interaction.reply({content: `<a:obtick:1018078610130751528> Set ${member.user.username}'s XP to ${amount}.`, ephemeral: true});

                }
            
            });
        }

        if(interaction.options.getSubcommandGroup() == 'set' && interaction.options.getSubcommand() == 'level') {

            const Schema = require('../../database/schemas/memberlevels')
            const member = interaction.options.getMember('member');
            const amount = interaction.options.getNumber('amount');

            if(amount < 0) return interaction.reply({content: `<a:obcross:1018078642607239218> Cannot set level to ${amount}! Minimum is 0.`, ephemeral: true})
    
            Schema.findOne({ Guild : interaction.guild.id, ID : member.id }, async (err, data) => {
        
                if(!data) {

                    new Schema ({
                        Guild : interaction.guild.id,
                        ID : member.id,
                        Level : amount,
                        XP : 0,
                    }).save();

                    interaction.reply({content: `<a:obtick:1018078610130751528> Set ${member.user.username}'s level to ${amount}.`, ephemeral: true});
                
                } else {

                    data.Level = amount;
                    data.save();

                    interaction.reply({content: `<a:obtick:1018078610130751528> Set ${member.user.username}'s level to ${amount}.`, ephemeral: true});
                
                }
            
            });
        }

        if(interaction.options.getSubcommandGroup() == 'add' && interaction.options.getSubcommand() == 'xp') {

            const Schema = require('../../database/schemas/memberlevels')
            const member = interaction.options.getMember('member');
            const amount = interaction.options.getNumber('amount');

            if(amount < 0) return interaction.reply({content: `<a:obcross:1018078642607239218> Cannot add ${amount} XP! Minimum is 0.`, ephemeral: true})
    
            Schema.findOne({ Guild : interaction.guild.id, ID : member.id }, async (err, data) => {
        
                if(!data) {

                    new Schema ({
                        Guild : interaction.guild.id,
                        ID : member.id,
                        Level : 0,
                        XP : amount,
                    }).save();

                    interaction.reply({content: `<a:obtick:1018078610130751528> Added ${amount} XP to ${member.user.username}.`, ephemeral: true});
                
                } else {

                    data.XP = data.XP + amount;
                    data.save();

                    interaction.reply({content: `<a:obtick:1018078610130751528> Added ${amount} XP to ${member.user.username}.`, ephemeral: true});

                }
            
            });
        }

        if(interaction.options.getSubcommandGroup() == 'add' && interaction.options.getSubcommand() == 'level') {

            const Schema = require('../../database/schemas/memberlevels')
            const member = interaction.options.getMember('member');
            const amount = interaction.options.getNumber('amount');

            if(amount < 0) return interaction.reply({content: `<a:obcross:1018078642607239218> Cannot add ${amount} levels! Minimum is 0.`, ephemeral: true})
    
            Schema.findOne({ Guild : interaction.guild.id, ID : member.id }, async (err, data) => {
        
                if(!data) {

                    new Schema ({
                        Guild : interaction.guild.id,
                        ID : member.id,
                        Level : amount,
                        XP : 0,
                    }).save();

                    interaction.reply({content: `<a:obtick:1018078610130751528> Added ${amount} levels to ${member.user.username}.`, ephemeral: true});
                
                } else {

                    data.Level = data.Level + amount;
                    data.save();

                    interaction.reply({content: `<a:obtick:1018078610130751528> Added ${amount} levels to ${member.user.username}.`, ephemeral: true});

                }
            
            });
        }

        if(interaction.options.getSubcommand() == 'leaderboard') {

            const Schema = require('../../database/schemas/memberlevels')
    
            Schema.find({ Guild : interaction.guild.id }, async (err, data) => {
        
                if(!data) return interaction.reply({content: `<a:obcross:1018078642607239218> There is no rank data for this server.`, ephemeral: true});
                
                let values = data;
                let array = []

                values.forEach(async value => {
                    let id = value.ID;
                    let level = value.Level;

                    interaction.guild.members.fetch(id).then(
                        array.push(`**Level ${level}** <@${id}>`)
                    ).catch(() => {return})
                    
                });

                leaderboard.sort(function(obj1, obj2){return obj1.substring(6) - obj2.substring(6)});
                leaderboard.reverse();
                
                let shortened = leaderboard.slice(0, 10)

                const embed = new EmbedBuilder()
                .setTitle(`Top 10 Ranked Members`)
                .setDescription(shortened.toString().replaceAll(',', '\r'))
                .setColor('#2f3136')

                interaction.reply({embeds: [embed]})
            
            });
        }
    }
}