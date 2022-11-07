const { ApplicationCommandOptionType, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'rankdata',
    description: 'All the rank commands',
    defaultMemberPermissions: PermissionFlagsBits.Administrator,
    options: [
        {
            name: "set",
            description: "Set data",
            type: ApplicationCommandOptionType.SubcommandGroup,
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

        if(interaction.options.getSubcommandGroup() == 'set' && interaction.options.getSubcommand() == 'level') {

            const Schema = require('../../../database/bot/memberlevels')
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

            const Schema = require('../../../database/bot/memberlevels')
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

            const Schema = require('../../../database/bot/memberlevels')
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
    }
}