const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ApplicationCommandOptionType, ChannelType, PermissionFlagsBits, SelectMenuBuilder } = require('discord.js');

module.exports = {
    name: "setup",
    description: "Setup various bot systems",
    defaultMemberPermissions: PermissionFlagsBits.Administrator,
    options: [
        {
            name: "tickets",
            description: "Setup the ticket system",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "panel-channel",
                    description: "The channel the ticket-create message will be sent to",
                    required: true,
                    type: ApplicationCommandOptionType.Channel,
                    channelTypes: [ChannelType.GuildText],
                },
                {
                    name: "panel-message",
                    description: "The content of the ticket-create message",
                    required: true,
                    type: ApplicationCommandOptionType.String,
                },
                {
                    name: "ticket-category",
                    description: "The category tickets will be created in",
                    required: true,
                    type: ApplicationCommandOptionType.Channel,
                    channelTypes: [ChannelType.GuildCategory],
                },
                {
                    name: "ticket-message",
                    description: "The content of the ticket message",
                    required: true,
                    type: ApplicationCommandOptionType.String,
                },
                {
                    name: "ticket-role",
                    description: "Who will be able to view and delete tickets",
                    required: true,
                    type: ApplicationCommandOptionType.Role,
                },
            ],
        },
        {
            name: "link-detector",
            description: "Setup the link detection system",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "status",
                    description: "Set the status of the link detector",
                    required: true,
                    type: ApplicationCommandOptionType.String,
                    choices: [
                        {
                            name: "on",
                            value: "true",
                        },
                        {
                            name: "off",
                            value: "false",
                        },
                    ]
                },
                {
                    name: "excluded-role",
                    description: "Who will be excluded from it",
                    required: true,
                    type: ApplicationCommandOptionType.Role,
                },
            ],
        },
        {
            name: "boost-tracker",
            description: "Setup the boost tracker system",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "boost-channel",
                    description: "The channel I'll send the message to",
                    required: true,
                    type: ApplicationCommandOptionType.Channel,
                    channelTypes: [ChannelType.GuildText],
                },
            ]
        },
        {
            name: "levels",
            description: "Setup the level system",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "levelup-channel",
                    description: "The channel I'll send the message to",
                    required: true,
                    type: ApplicationCommandOptionType.Channel,
                    channelTypes: [ChannelType.GuildText],
                },
                {
                    name: "excluded-channel",
                    description: "Set this to your server spam channel",
                    required: true,
                    type: ApplicationCommandOptionType.Channel,
                    channelTypes: [ChannelType.GuildText],
                },
            ]
        },
        {
            name: "suggestions",
            description: "Setup the suggestion system",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "suggestions-channel",
                    description: "The channel I'll send the suggestion to",
                    required: true,
                    type: ApplicationCommandOptionType.Channel,
                    channelTypes: [ChannelType.GuildText],
                },
            ]
        },
        {
            name: "role-counter",
            description: "Setup a role counter system",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "rolecounter-channel",
                    description: "The channel I'll update",
                    required: true,
                    type: ApplicationCommandOptionType.Channel,
                    channelTypes: [ChannelType.GuildVoice],
                },
                {
                    name: "rolecounter-name",
                    description: "The name of the counter",
                    required: true,
                    type: ApplicationCommandOptionType.String,
                },
                {
                    name: "rolecounter-role",
                    description: "The role I'll be counting",
                    required: true,
                    type: ApplicationCommandOptionType.Role,
                },
            ]
        },
        {
            name: "member-counter",
            description: "Setup a member counter system",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "membercounter-channel",
                    description: "The channel I'll update",
                    required: true,
                    type: ApplicationCommandOptionType.Channel,
                    channelTypes: [ChannelType.GuildVoice],
                },
                {
                    name: "membercounter-name",
                    description: "The name of the counter",
                    required: true,
                    type: ApplicationCommandOptionType.String,
                },
            ]
        },
        {
            name: "bot-counter",
            description: "Setup a bot counter system",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "botcounter-channel",
                    description: "The channel I'll update",
                    required: true,
                    type: ApplicationCommandOptionType.Channel,
                    channelTypes: [ChannelType.GuildVoice],
                },
                {
                    name: "botcounter-name",
                    description: "The name of the counter",
                    required: true,
                    type: ApplicationCommandOptionType.String,
                },
            ]
        },
        {
            name: "online-counter",
            description: "Setup an online counter system",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "onlinecounter-channel",
                    description: "The channel I'll update",
                    required: true,
                    type: ApplicationCommandOptionType.Channel,
                    channelTypes: [ChannelType.GuildVoice],
                },
                {
                    name: "onlinecounter-name",
                    description: "The name of the counter",
                    required: true,
                    type: ApplicationCommandOptionType.String,
                },
            ]
        },
        {
            name: "welcomes",
            description: "Setup the welcome message system",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "welcome-channel",
                    description: "The channel I'll send the message to",
                    required: true,
                    type: ApplicationCommandOptionType.Channel,
                    channelTypes: [ChannelType.GuildText],
                },
                {
                    name: "welcome-message",
                    description: "What will be in the welcome message",
                    required: true,
                    type: ApplicationCommandOptionType.String,
                },
            ]
        },
        {
            name: "autorole",
            description: "Setup the autorole system",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "auto-role",
                    description: "What role do you want to add",
                    required: true,
                    type: ApplicationCommandOptionType.Role,
                },
                {
                    name: "after-screening",
                    description: "Do I add the role after they've passed membership screening (community only)",
                    required: true,
                    type: ApplicationCommandOptionType.String,
                    choices: [
                        {
                            name: "yes",
                            value: "true",
                        },
                        {
                            name: "no",
                            value: "false",
                        },
                    ]
                },
            ],
        },
        {
            name: "member-log",
            description: "Setup the member join log system",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "memberlog-channel",
                    description: "The channel I'll send the message to",
                    required: true,
                    type: ApplicationCommandOptionType.Channel,
                    channelTypes: [ChannelType.GuildText],
                },
            ]
        },
        {
            name: "audit-log",
            description: "Setup the audit log system",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "audit-channel",
                    description: "The channel I'll send the messages to",
                    required: true,
                    type: ApplicationCommandOptionType.Channel,
                    channelTypes: [ChannelType.GuildText],
                },
            ]
        },
        {
            name: "daily-messages",
            description: "Setup the daily message system system",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "message-channel",
                    description: "The channel I'll send the messages to",
                    required: true,
                    type: ApplicationCommandOptionType.Channel,
                    channelTypes: [ChannelType.GuildText],
                },
                {
                    name: "message-content",
                    description: "The message I'll send daily",
                    required: true,
                    type: ApplicationCommandOptionType.String,
                },
                {
                    name: "message-time",
                    description: "What time I'll send the message",
                    required: true,
                    type: ApplicationCommandOptionType.String,
                    choices: [
                        {
                            name: "0am (UTC)",
                            value: "0am",
                        },
                        {
                            name: "1am (UTC)",
                            value: "1am",
                        },
                        {
                            name: "2am (UTC)",
                            value: "2am",
                        },
                        {
                            name: "3am (UTC)",
                            value: "3am",
                        },
                        {
                            name: "4am (UTC)",
                            value: "4am",
                        },
                        {
                            name: "5am (UTC)",
                            value: "5am",
                        },
                        {
                            name: "6am (UTC)",
                            value: "6am",
                        },
                        {
                            name: "7am (UTC)",
                            value: "7am",
                        },
                        {
                            name: "8am (UTC)",
                            value: "8am",
                        },
                        {
                            name: "9am (UTC)",
                            value: "9am",
                        },
                        {
                            name: "10am (UTC)",
                            value: "10am",
                        },
                        {
                            name: "11am (UTC)",
                            value: "11am",
                        },
                        {
                            name: "12pm (UTC)",
                            value: "12pm",
                        },
                        {
                            name: "1pm (UTC)",
                            value: "1pm",
                        },
                        {
                            name: "2pm (UTC)",
                            value: "2pm",
                        },
                        {
                            name: "3pm (UTC)",
                            value: "3pm",
                        },
                        {
                            name: "4pm (UTC)",
                            value: "4pm",
                        },
                        {
                            name: "5pm (UTC)",
                            value: "5pm",
                        },
                        {
                            name: "6pm (UTC)",
                            value: "6pm",
                        },
                        {
                            name: "7pm (UTC)",
                            value: "7pm",
                        },
                        {
                            name: "8pm (UTC)",
                            value: "8pm",
                        },
                        {
                            name: "9pm (UTC)",
                            value: "9pm",
                        },
                        {
                            name: "10pm (UTC)",
                            value: "10pm",
                        },
                        {
                            name: "11pm (UTC)",
                            value: "11pm",
                        },
                    ]
                },
            ]
        },
        {
            name: "dropdown-roles",
            description: "Setup a dropdown role system",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "message",
                    description: "The message that'll appear on the dropdown role embed",
                    required: true,
                    type: ApplicationCommandOptionType.String,
                },
                {
                    name: "message-type",
                    description: "The type of message you want",
                    required: true,
                    type: ApplicationCommandOptionType.String,
                    choices: [
                        {
                            name: "Embed",
                            value: "embed",
                        },
                        {
                            name: "Regular",
                            value: "regular",
                        },
                    ]
                },
                {
                    name: "role-1",
                    description: "The role you want to give",
                    required: true,
                    type: ApplicationCommandOptionType.Role,
                },
                {
                    name: "role-2",
                    description: "The role you want to give",
                    required: false,
                    type: ApplicationCommandOptionType.Role,
                },
                {
                    name: "role-3",
                    description: "The role you want to give",
                    required: false,
                    type: ApplicationCommandOptionType.Role,
                },
                {
                    name: "role-4",
                    description: "The role you want to give",
                    required: false,
                    type: ApplicationCommandOptionType.Role,
                },
                {
                    name: "role-5",
                    description: "The role you want to give",
                    required: false,
                    type: ApplicationCommandOptionType.Role,
                },
                {
                    name: "role-6",
                    description: "The role you want to give",
                    required: false,
                    type: ApplicationCommandOptionType.Role,
                },
                {
                    name: "role-7",
                    description: "The role you want to give",
                    required: false,
                    type: ApplicationCommandOptionType.Role,
                },
                {
                    name: "role-8",
                    description: "The role you want to give",
                    required: false,
                    type: ApplicationCommandOptionType.Role,
                },
                {
                    name: "role-9",
                    description: "The role you want to give",
                    required: false,
                    type: ApplicationCommandOptionType.Role,
                },
                {
                    name: "role-10",
                    description: "The role you want to give",
                    required: false,
                    type: ApplicationCommandOptionType.Role,
                },
            ]
        },
    ],
    
    async execute(interaction) {

        if(interaction.options.getSubcommand() === 'tickets') {

            const PanelChannel = interaction.options.getChannel("panel-channel");
            const PanelMessage = interaction.options.getString("panel-message");
            const TicketCategory = interaction.options.getChannel("ticket-category");
            const TicketMessage = interaction.options.getString("ticket-message");
            const TicketRole = interaction.options.getRole("ticket-role");
            const Schema = require('../database/schemas/tickets');
        
                    const Embed = new EmbedBuilder()
                        .setTitle("🎟️ Tickets")
                        .setDescription(PanelMessage)
                        .setColor("#2f3136");
        
                    const TicketCreate = new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setCustomId('ticketCreate')
                                .setLabel('Create Ticket')
                                .setStyle('Danger')
                                .setEmoji('📩')
                        );
        
                    Schema.findOne({ PanelChannel : PanelChannel.id }, (err, data) => {
                        if (data) {

                            data.PanelChannel = PanelChannel.id,
                            data.PanelMessage = PanelMessage,
                            data.TicketCategory = TicketCategory.id,
                            data.TicketMessage = TicketMessage,
                            data.TicketRole = TicketRole.id,
                            data.save();

                        } else {

                        new Schema ({
                            Guild : interaction.guild.id,
                            PanelChannel : PanelChannel.id,
                            PanelMessage : PanelMessage,
                            TicketCategory : TicketCategory.id,
                            TicketMessage : TicketMessage,
                            TicketRole : TicketRole.id,
                        }).save();

                        }
                    });
        
                interaction.reply({ content: "<a:obtick:1018078610130751528> Ticket setup successful.", ephemeral: true })
                PanelChannel.send({ embeds: [Embed], components: [TicketCreate] })

        }

        if(interaction.options.getSubcommand() === 'link-detector') {


                const choice = interaction.options.getString("status");
                const Schema = require('../database/schemas/links');
                const role = interaction.options.getRole("excluded-role");

                if(choice === "true") {

                    Schema.findOne({ Guild : interaction.guild.id }, (err, data) => {
                        if (data) {
                            data.YesNo = "true",
                            data.Role = role.id,
                            data.save();
                        } else {
                        new Schema ({
                            Guild : interaction.guild.id,
                            YesNo : "true",
                            Role : role.id,
                        }).save();
                    }});
    
                    interaction.reply({ content: "<a:obtick:1018078610130751528> Link Detection setup successful.", ephemeral: true })

                } else if(choice === "false") {

                    Schema.findOne({ Guild : interaction.guild.id }, (err, data) => {
                        if (data) {
                            data.YesNo = "false",
                            data.Role = "N/A",
                            data.save();
                        } else {
                        new Schema ({
                            Guild : interaction.guild.id,
                            YesNo : "false",
                            Role : "N/A",
                        }).save();
                    }});
    
                    interaction.reply({ content: "<a:obtick:1018078610130751528> Link Detection setup successful.", ephemeral: true })

                }

        }

        if(interaction.options.getSubcommand() === 'boost-tracker') {

            const channel = interaction.options.getChannel('boost-channel');
            const Schema = require('../database/schemas/boosts');

            Schema.findOne({ Guild : interaction.guild.id }, (err, data) => {
                if (data) {
                    data.Channel = channel.id,
                    data.save();
                } else {
                new Schema ({
                    Guild : interaction.guild.id,
                    Channel : channel.id,
                }).save();
            }});

            interaction.reply({ content: "<a:obtick:1018078610130751528> Boost Tracker setup successful.", ephemeral: true });

        }

        if(interaction.options.getSubcommand() === 'levels') {

            const channel = interaction.options.getChannel('levelup-channel');
            const spam = interaction.options.getChannel('excluded-channel');
            const Schema = require('../database/schemas/levels');

            Schema.findOne({ Guild : interaction.guild.id }, (err, data) => {
                if (data) {
                    data.Channel = channel.id,
                    data.Spam = spam.id,
                    data.save();
                } else {
                new Schema ({
                    Guild : interaction.guild.id,
                    Channel : channel.id,
                    Spam : spam.id,
                }).save();
            }});

            interaction.reply({ content: "<a:obtick:1018078610130751528> Levels setup successful.", ephemeral: true });

        }

        if(interaction.options.getSubcommand() === 'suggestions') {

            const channel = interaction.options.getChannel('suggestions-channel');
            const Schema = require('../database/schemas/suggestions');

            Schema.findOne({ Guild : interaction.guild.id }, (err, data) => {
                if (data) {
                    data.Channel = channel.id,
                    data.save();
                } else {
                new Schema ({
                    Guild : interaction.guild.id,
                    Channel : channel.id,
                }).save();
            }});

            interaction.reply({ content: "<a:obtick:1018078610130751528> Suggestions setup successful.", ephemeral: true });

        }

        if(interaction.options.getSubcommand() === 'role-counter') {

            const channel = interaction.options.getChannel('rolecounter-channel');
            const name = interaction.options.getString('rolecounter-name');
            const role = interaction.options.getRole('rolecounter-role');
            const Schema = require('../database/schemas/rolecounter');

            Schema.findOne({ Guild : interaction.guild.id }, (err, data) => {
                if (data) {
                    data.Channel = channel.id,
                    data.Role = role.id,
                    data.Name = name,
                    data.save();
                } else {
                new Schema ({
                    Guild : interaction.guild.id,
                    Channel : channel.id,
                    Role : role.id,
                    Name : name,
                }).save();
            }});

            interaction.reply({ content: "<a:obtick:1018078610130751528> Role Counter setup successful.", ephemeral: true });

        }

        if(interaction.options.getSubcommand() === 'member-counter') {

            const channel = interaction.options.getChannel('membercounter-channel');
            const name = interaction.options.getString('membercounter-name');
            const Schema = require('../database/schemas/membercounter');

            Schema.findOne({ Guild : interaction.guild.id }, (err, data) => {
                if (data) {
                    data.Channel = channel.id,
                    data.Name = name,
                    data.save();
                } else {
                new Schema ({
                    Guild : interaction.guild.id,
                    Channel : channel.id,
                    Name : name,
                }).save();
            }});

            interaction.reply({ content: "<a:obtick:1018078610130751528> Member Counter setup successful.", ephemeral: true });

        }

        if(interaction.options.getSubcommand() === 'bot-counter') {

            const channel = interaction.options.getChannel('botcounter-channel');
            const name = interaction.options.getString('botcounter-name');
            const Schema = require('../database/schemas/botcounter');

            Schema.findOne({ Guild : interaction.guild.id }, (err, data) => {
                if (data) {
                    data.Channel = channel.id,
                    data.Name = name,
                    data.save();
                } else {
                new Schema ({
                    Guild : interaction.guild.id,
                    Channel : channel.id,
                    Name : name,
                }).save();
            }});

            interaction.reply({ content: "<a:obtick:1018078610130751528> Bot Counter setup successful.", ephemeral: true });

        }

        if(interaction.options.getSubcommand() === 'online-counter') {

            const channel = interaction.options.getChannel('onlinecounter-channel');
            const name = interaction.options.getString('onlinecounter-name');
            const Schema = require('../database/schemas/onlinecounter');

            Schema.findOne({ Guild : interaction.guild.id }, (err, data) => {
                if (data) {
                    data.Channel = channel.id,
                    data.Name = name,
                    data.save();
                } else {
                new Schema ({
                    Guild : interaction.guild.id,
                    Channel : channel.id,
                    Name : name,
                }).save();
            }});

            interaction.reply({ content: "<a:obtick:1018078610130751528> Online Counter setup successful.", ephemeral: true });

        }

        if(interaction.options.getSubcommand() === 'welcomes') {

            const channel = interaction.options.getChannel('welcome-channel');
            const message = interaction.options.getString('welcome-message');
            const Schema = require('../database/schemas/welcomes');

            Schema.findOne({ Guild : interaction.guild.id }, (err, data) => {
                if (data) {
                    data.Channel = channel.id,
                    data.Message = message,
                    data.save();
                } else {
                new Schema ({
                    Guild : interaction.guild.id,
                    Channel : channel.id,
                    Message : message,
                }).save();
            }});

            interaction.reply({ content: "<a:obtick:1018078610130751528> Welcomes setup successful.", ephemeral: true });

        }

        if(interaction.options.getSubcommand() === 'autorole') {

            const choice = interaction.options.getString("after-screening");
            const Schema = require('../database/schemas/autorole');
            const role = interaction.options.getRole("auto-role");

            if(choice === "true") {

                Schema.findOne({ Guild : interaction.guild.id }, (err, data) => {
                    if (data) {
                        data.Screening = "true",
                        data.Role = role.id,
                        data.save();
                    } else {
                    new Schema ({
                        Guild : interaction.guild.id,
                        Screening : "true",
                        Role : role.id,
                    }).save();
                }});

                interaction.reply({ content: "<a:obtick:1018078610130751528> Autorole setup successful.", ephemeral: true })

            } else if(choice === "false") {

                Schema.findOne({ Guild : interaction.guild.id }, (err, data) => {
                    if (data) {
                        data.Screening = "false",
                        data.Role = role.id,
                        data.save();
                    } else {
                    new Schema ({
                        Guild : interaction.guild.id,
                        Screening : "false",
                        Role : role.id,
                    }).save();
                }});

                interaction.reply({ content: "<a:obtick:1018078610130751528> Autorole setup successful.", ephemeral: true })

            }

        }

        if(interaction.options.getSubcommand() === 'member-log') {

            const channel = interaction.options.getChannel('memberlog-channel');
            const Schema = require('../database/schemas/memberlog');

            Schema.findOne({ Guild : interaction.guild.id }, (err, data) => {
                if (data) {
                    data.Channel = channel.id,
                    data.save();
                } else {
                new Schema ({
                    Guild : interaction.guild.id,
                    Channel : channel.id,
                }).save();
            }});

            interaction.reply({ content: "<a:obtick:1018078610130751528> Member Log setup successful.", ephemeral: true });

        }

        if(interaction.options.getSubcommand() === 'audit-log') {

            const channel = interaction.options.getChannel('audit-channel');
            const Schema = require('../database/schemas/audit-log');

            Schema.findOne({ Guild : interaction.guild.id }, (err, data) => {
                if (data) {
                    data.Channel = channel.id,
                    data.save();
                } else {
                new Schema ({
                    Guild : interaction.guild.id,
                    Channel : channel.id,
                }).save();
            }});

            interaction.reply({ content: "<a:obtick:1018078610130751528> Audit Log setup successful.", ephemeral: true });

        }

        if(interaction.options.getSubcommand() === 'daily-messages') {

            const channel = interaction.options.getChannel('message-channel');
            const content = interaction.options.getString('message-content');
            const time = interaction.options.getString('message-time');
            const Schema = require('../database/schemas/daily-messages');

            Schema.findOne({ Guild : interaction.guild.id }, (err, data) => {
                if (data) {
                    data.Channel = channel.id,
                    data.Message = content,
                    data.Time = time,
                    data.save();
                } else {
                new Schema ({
                    Guild : interaction.guild.id,
                    Channel : channel.id,
                    Message : content,
                    Time : time
                }).save();
            }});

            interaction.reply({ content: "<a:obtick:1018078610130751528> Daily Messages setup successful.", ephemeral: true });     

        }

        if(interaction.options.getSubcommand() === 'dropdown-roles') {

            const { v4: uuidv4 } = require('uuid');
            const Schema = require('../database/schemas/dropdown-roles');
            const type = interaction.options.getString('message-type');
            const content = interaction.options.getString('message');
            let role1 = interaction.options.getRole('role-1');
            let role2 = interaction.options.getRole('role-2');
            let role3 = interaction.options.getRole('role-3');
            let role4 = interaction.options.getRole('role-4');
            let role5 = interaction.options.getRole('role-5');
            let role6 = interaction.options.getRole('role-6');
            let role7 = interaction.options.getRole('role-7');
            let role8 = interaction.options.getRole('role-8');
            let role9 = interaction.options.getRole('role-9');
            let role10 = interaction.options.getRole('role-10'); 

            let role1Name = undefined;
            let role2Name = undefined;
            let role3Name = undefined;
            let role4Name = undefined;
            let role5Name = undefined;
            let role6Name = undefined;
            let role7Name = undefined;
            let role8Name = undefined;
            let role9Name = undefined;
            let role10Name = undefined;

            let role1Id = undefined;
            let role2Id = undefined;
            let role3Id = undefined;
            let role4Id = undefined;
            let role5Id = undefined;
            let role6Id = undefined;
            let role7Id = undefined;
            let role8Id = undefined;
            let role9Id = undefined;
            let role10Id = undefined;

            if(role1 == null) role1Name = 'null', role1Id = uuidv4();
            else if(role1 !== null) role1Name = role1.name, role1Id = role1.id;

            if(role2 == null) role2Name = 'null', role2Id = uuidv4();
            else if(role2 !== null) role2Name = role2.name, role2Id = role2.id;

            if(role3 == null) role3Name = 'null', role3Id = uuidv4();
            else if(role3 !== null) role3Name = role3.name, role3Id = role3.id;
            
            if(role4 == null) role4Name = 'null', role4Id = uuidv4();
            else if(role4 !== null) role4Name = role4.name, role4Id = role4.id;

            if(role5 == null) role5Name = 'null', role5Id = uuidv4();
            else if(role5 !== null) role5Name = role5.name, role5Id = role5.id;

            if(role6 == null) role6Name = 'null', role6Id = uuidv4();
            else if(role6 !== null) role6Name = role6.name, role6Id = role6.id;

            if(role7 == null) role7Name = 'null', role7Id = uuidv4();
            else if(role7 !== null) role7Name = role7.name, role7Id = role7.id;

            if(role8 == null) role8Name = 'null', role8Id = uuidv4();
            else if(role8 !== null) role8Name = role8.name, role8Id = role8.id;

            if(role9 == null) role9Name = 'null', role9Id = uuidv4();
            else if(role9 !== null) role9Name = role9.name, role9Id = role9.id;

            if(role10 == null) role10Name = 'null', role10Id = uuidv4();
            else if(role10 !== null) role10Name = role10.name, role10Id = role10.id;
            
            const dropdown10 = new SelectMenuBuilder()
            .setCustomId('dropdown-roles')
            .setMaxValues(10)
            .setMinValues(0)
            .setPlaceholder('Select to add/remove roles')
            .setOptions(
                {
                    label: role1Name,
                    description: `Select to add/remove the ${role1Name} role`,
                    value: role1Id,
                },
                {
                    label: role2Name,
                    description: `Select to add/remove the ${role2Name} role`,
                    value: role2Id,
                },
                {
                    label: role3Name,
                    description: `Select to add/remove the ${role3Name} role`,
                    value: role3Id,
                },
                {
                    label: role4Name,
                    description: `Select to add/remove the ${role4Name} role`,
                    value: role4Id,
                },
                {
                    label: role5Name,
                    description: `Select to add/remove the ${role5Name} role`,
                    value: role5Id,
                },
                {
                    label: role6Name,
                    description: `Select to add/remove the ${role6Name} role`,
                    value: role6Id,
                },
                {
                    label: role7Name,
                    description: `Select to add/remove the ${role7Name} role`,
                    value: role7Id,
                },
                {
                    label: role8Name,
                    description: `Select to add/remove the ${role8Name} role`,
                    value: role8Id,
                },
                {
                    label: role9Name,
                    description: `Select to add/remove the ${role9Name} role`,
                    value: role9Id,
                },
                {
                    label: role10Name,
                    description: `Select to add/remove the ${role10Name} role`,
                    value: role10Id,
                },
            );

            const dropdown9 = new SelectMenuBuilder()
            .setCustomId('dropdown-roles')
            .setMaxValues(9)
            .setMinValues(0)
            .setPlaceholder('Select to add/remove roles')
            .setOptions(
                {
                    label: role1Name,
                    description: `Select to add/remove the ${role1Name} role`,
                    value: role1Id,
                },
                {
                    label: role2Name,
                    description: `Select to add/remove the ${role2Name} role`,
                    value: role2Id,
                },
                {
                    label: role3Name,
                    description: `Select to add/remove the ${role3Name} role`,
                    value: role3Id,
                },
                {
                    label: role4Name,
                    description: `Select to add/remove the ${role4Name} role`,
                    value: role4Id,
                },
                {
                    label: role5Name,
                    description: `Select to add/remove the ${role5Name} role`,
                    value: role5Id,
                },
                {
                    label: role6Name,
                    description: `Select to add/remove the ${role6Name} role`,
                    value: role6Id,
                },
                {
                    label: role7Name,
                    description: `Select to add/remove the ${role7Name} role`,
                    value: role7Id,
                },
                {
                    label: role8Name,
                    description: `Select to add/remove the ${role8Name} role`,
                    value: role8Id,
                },
                {
                    label: role9Name,
                    description: `Select to add/remove the ${role9Name} role`,
                    value: role9Id,
                },
            );

            const dropdown8 = new SelectMenuBuilder()
            .setCustomId('dropdown-roles')
            .setMaxValues(8)
            .setMinValues(0)
            .setPlaceholder('Select to add/remove roles')
            .setOptions(
                {
                    label: role1Name,
                    description: `Select to add/remove the ${role1Name} role`,
                    value: role1Id,
                },
                {
                    label: role2Name,
                    description: `Select to add/remove the ${role2Name} role`,
                    value: role2Id,
                },
                {
                    label: role3Name,
                    description: `Select to add/remove the ${role3Name} role`,
                    value: role3Id,
                },
                {
                    label: role4Name,
                    description: `Select to add/remove the ${role4Name} role`,
                    value: role4Id,
                },
                {
                    label: role5Name,
                    description: `Select to add/remove the ${role5Name} role`,
                    value: role5Id,
                },
                {
                    label: role6Name,
                    description: `Select to add/remove the ${role6Name} role`,
                    value: role6Id,
                },
                {
                    label: role7Name,
                    description: `Select to add/remove the ${role7Name} role`,
                    value: role7Id,
                },
                {
                    label: role8Name,
                    description: `Select to add/remove the ${role8Name} role`,
                    value: role8Id,
                },
            );

            const dropdown7 = new SelectMenuBuilder()
            .setCustomId('dropdown-roles')
            .setMaxValues(7)
            .setMinValues(0)
            .setPlaceholder('Select to add/remove roles')
            .setOptions(
                {
                    label: role1Name,
                    description: `Select to add/remove the ${role1Name} role`,
                    value: role1Id,
                },
                {
                    label: role2Name,
                    description: `Select to add/remove the ${role2Name} role`,
                    value: role2Id,
                },
                {
                    label: role3Name,
                    description: `Select to add/remove the ${role3Name} role`,
                    value: role3Id,
                },
                {
                    label: role4Name,
                    description: `Select to add/remove the ${role4Name} role`,
                    value: role4Id,
                },
                {
                    label: role5Name,
                    description: `Select to add/remove the ${role5Name} role`,
                    value: role5Id,
                },
                {
                    label: role6Name,
                    description: `Select to add/remove the ${role6Name} role`,
                    value: role6Id,
                },
                {
                    label: role7Name,
                    description: `Select to add/remove the ${role7Name} role`,
                    value: role7Id,
                },
            );

            const dropdown6 = new SelectMenuBuilder()
            .setCustomId('dropdown-roles')
            .setMaxValues(6)
            .setMinValues(0)
            .setPlaceholder('Select to add/remove roles')
            .setOptions(
                {
                    label: role1Name,
                    description: `Select to add/remove the ${role1Name} role`,
                    value: role1Id,
                },
                {
                    label: role2Name,
                    description: `Select to add/remove the ${role2Name} role`,
                    value: role2Id,
                },
                {
                    label: role3Name,
                    description: `Select to add/remove the ${role3Name} role`,
                    value: role3Id,
                },
                {
                    label: role4Name,
                    description: `Select to add/remove the ${role4Name} role`,
                    value: role4Id,
                },
                {
                    label: role5Name,
                    description: `Select to add/remove the ${role5Name} role`,
                    value: role5Id,
                },
                {
                    label: role6Name,
                    description: `Select to add/remove the ${role6Name} role`,
                    value: role6Id,
                },
            );

            const dropdown5 = new SelectMenuBuilder()
            .setCustomId('dropdown-roles')
            .setMaxValues(5)
            .setMinValues(0)
            .setPlaceholder('Select to add/remove roles')
            .setOptions(
                {
                    label: role1Name,
                    description: `Select to add/remove the ${role1Name} role`,
                    value: role1Id,
                },
                {
                    label: role2Name,
                    description: `Select to add/remove the ${role2Name} role`,
                    value: role2Id,
                },
                {
                    label: role3Name,
                    description: `Select to add/remove the ${role3Name} role`,
                    value: role3Id,
                },
                {
                    label: role4Name,
                    description: `Select to add/remove the ${role4Name} role`,
                    value: role4Id,
                },
                {
                    label: role5Name,
                    description: `Select to add/remove the ${role5Name} role`,
                    value: role5Id,
                },
            );

            const dropdown4 = new SelectMenuBuilder()
            .setCustomId('dropdown-roles')
            .setMaxValues(4)
            .setMinValues(0)
            .setPlaceholder('Select to add/remove roles')
            .setOptions(
                {
                    label: role1Name,
                    description: `Select to add/remove the ${role1Name} role`,
                    value: role1Id,
                },
                {
                    label: role2Name,
                    description: `Select to add/remove the ${role2Name} role`,
                    value: role2Id,
                },
                {
                    label: role3Name,
                    description: `Select to add/remove the ${role3Name} role`,
                    value: role3Id,
                },
                {
                    label: role4Name,
                    description: `Select to add/remove the ${role4Name} role`,
                    value: role4Id,
                },
            );

            const dropdown3 = new SelectMenuBuilder()
            .setCustomId('dropdown-roles')
            .setMaxValues(3)
            .setMinValues(0)
            .setPlaceholder('Select to add/remove roles')
            .setOptions(
                {
                    label: role1Name,
                    description: `Select to add/remove the ${role1Name} role`,
                    value: role1Id,
                },
                {
                    label: role2Name,
                    description: `Select to add/remove the ${role2Name} role`,
                    value: role2Id,
                },
                {
                    label: role3Name,
                    description: `Select to add/remove the ${role3Name} role`,
                    value: role3Id,
                },
            );

            const dropdown2 = new SelectMenuBuilder()
            .setCustomId('dropdown-roles')
            .setMaxValues(2)
            .setMinValues(0)
            .setPlaceholder('Select to add/remove roles')
            .setOptions(
                {
                    label: role1Name,
                    description: `Select to add/remove the ${role1Name} role`,
                    value: role1Id,
                },
                {
                    label: role2Name,
                    description: `Select to add/remove the ${role2Name} role`,
                    value: role2Id,
                },
            );

            const dropdown1 = new SelectMenuBuilder()
            .setCustomId('dropdown-roles')
            .setMaxValues(1)
            .setMinValues(0)
            .setPlaceholder('Select to add/remove roles')
            .setOptions(
                {
                    label: role1Name,
                    description: `Select to add/remove the ${role1Name} role`,
                    value: role1Id,
                },
            );

            let firstActionRow = undefined;

            if(role10 !== null) firstActionRow = new ActionRowBuilder().addComponents(dropdown10);
            else if (role9 !== null) firstActionRow = new ActionRowBuilder().addComponents(dropdown9);
            else if (role8 !== null) firstActionRow = new ActionRowBuilder().addComponents(dropdown8);
            else if (role7 !== null) firstActionRow = new ActionRowBuilder().addComponents(dropdown7);
            else if (role6 !== null) firstActionRow = new ActionRowBuilder().addComponents(dropdown6);
            else if (role5 !== null) firstActionRow = new ActionRowBuilder().addComponents(dropdown5);
            else if (role4 !== null) firstActionRow = new ActionRowBuilder().addComponents(dropdown4);
            else if (role3 !== null) firstActionRow = new ActionRowBuilder().addComponents(dropdown3);
            else if (role2 !== null) firstActionRow = new ActionRowBuilder().addComponents(dropdown2);
            else if (role1 !== null) firstActionRow = new ActionRowBuilder().addComponents(dropdown1);

            const embed = new EmbedBuilder()
            .setDescription(content)
            .setColor("#2f3136")

            let msg = undefined;
            if(type == 'regular') msg = await interaction.channel.send({content: content, components: [firstActionRow]});
            if(type == 'embed') msg = await interaction.channel.send({embeds: [embed], components: [firstActionRow]});

            Schema.findOne({ Guild : interaction.guild.id }, (err, data) => {
                if (data) {
                    data.MessageID = msg.id,
                    data.Roles = role1Id + ' ' + role2Id + ' ' + role3Id + ' ' + role4Id + ' ' + role5Id + ' ' + role6Id + ' ' + role7Id + ' ' + role8Id + ' ' + role9Id + ' ' + role10Id
                    data.save();
                } else {
                new Schema ({
                    Guild : interaction.guild.id,
                    MessageID : msg.id,
                    Roles : role1Id + ' ' + role2Id + ' ' + role3Id + ' ' + role4Id + ' ' + role5Id + ' ' + role6Id + ' ' + role7Id + ' ' + role8Id + ' ' + role9Id + ' ' + role10Id
                }).save();
            }});

            interaction.reply({ content: "<a:obtick:1018078610130751528> Reaction Role setup successful.", ephemeral: true });  

        }

    }
}