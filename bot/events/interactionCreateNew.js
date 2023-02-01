const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ChannelType, InteractionType, BaseInteraction, WebhookClient } = require('discord.js')
const client = require('../index')
const dotenv = require('dotenv')
dotenv.config()

module.exports = {
    name: 'interactionCreate',
    /**
    * @param {BaseInteraction} interaction 
    * @param {client} client 
    */
    async execute(interaction, client) {

        // Command Use Event //
        if (interaction.type == InteractionType.ApplicationCommand) {
            const command = client.commands.get(interaction.commandName)
            const webhook = new WebhookClient({ url: process.env.DJS_LOG || process.env.DJS_LOG_TEST })

            command.execute(interaction, client).catch(async err => {

                console.log(err)

                const errEmbed = new EmbedBuilder()
                .setColor('#ff3f3f')
                .setTitle('An Error Occured!')
                .setDescription('A transcript of this error has been sent to the Omega Team and they will work to fix the issue!\n\nWe apologise for the inconvenience.')

                const cmdErrEmbed = new EmbedBuilder()
                .setColor('#ff3f3f')
                .setTitle('Command Failed')
                .setDescription(`A command failed in **${interaction.guild.name}**.\n\n**Command:** ${interaction.commandName}\n**Server ID:** ${interaction.guildId}\n**Executed:** <t:${parseInt(interaction.createdAt / 1000)}:R>\n**Error:** \`\`\`${err}\`\`\``)

                webhook.send({ embeds: [cmdErrEmbed], username: 'Command Logs' })
                interaction.reply({ embeds: [errEmbed], ephemeral: true }).catch(() => {return})

            })
        }

        // Select Menu Use Event //
        if(interaction.isAnySelectMenu()) {

            if(interaction.customId === 'dropdown-roles') {

                const Schema = require('../../database/dropdown-roles')

                Schema.findOne({ Guild : interaction.guild.id, MessageID : interaction.message.id }, async (err, data) => {

                    const roleList = data.Roles
                    const roleListArray = roleList.split(' ')

                    roleListArray.forEach((id) => {
                        const role = interaction.member.guild.roles.cache.get(id)
                        interaction.member.roles.remove(role).catch(() => {return})
                    })

                    interaction.values.forEach((id) => {
                        if(roleList.includes(id)) {
                            const role = interaction.member.guild.roles.cache.get(id)
                            interaction.member.roles.add(role).catch(() => {return})
                        }
                    })

                    interaction.deferUpdate()

                })
            }

        }

        // Button Use Event //
        if(interaction.isButton()) {
            switch (interaction.customId) {

                case 'ticketClose': {

                    const closedEmbed = new EmbedBuilder()
                    .setColor('#ff3f3f')
                    .setTitle('Ticket Closed 🔒')
                    .setDescription(`Ticket was closed by ${interaction.member}\nThis channel will be deleted in 1 minute. Cya!`)

                    setTimeout(() => interaction.channel.delete(), 60 * 1000).catch(()=>{return})
                
                    interaction.channel.send({ embeds: [closedEmbed] })
                    interaction.deferUpdate()

                }

                case 'ticketCreate': {

                    const Schema = require('../../database/tickets.js')
    
                    Schema.findOne({ Guild : interaction.guild.id, PanelChannel : interaction.channel.id }, async (err, data) => {
                        
                    if(!data) return
        
                    const category = interaction.member.guild.channels.cache.get(data.TicketCategory)
                    const role = interaction.member.guild.roles.cache.get(data.TicketRole)

                    if(!category || !role) return
        
                    const ticketEmbed = new EmbedBuilder()
                    .setDescription(data.TicketMessage)
                    .setColor('#ff3f3f')
    
                    const row = new ActionRowBuilder()
                    .addComponents(
                    new ButtonBuilder()
                    .setCustomId('ticketClose')
                    .setLabel('Close Ticket')
                    .setStyle('Danger')
                    .setEmoji('🗑️'),
                    )
        
                    interaction.guild.channels.create({
                        name: interaction.user.username,
                        channel_types: [ChannelType.GuildText],
                        parent: category,
                        permissionOverwrites: [
    
                        {
                            id: interaction.guild.id,
                            deny: ['ViewChannel'],
                        },
                        {
                            id: interaction.user.id,
                            allow: ['SendMessages', 'ViewChannel', 'ReadMessageHistory'],
                        },
                        {
                            id: role,
                            allow: ['SendMessages', 'ViewChannel', 'ReadMessageHistory'],
                        },
                    ]
                    }).then((channelMessage) => {
    
                        channelMessage.send({ content: `${role}`, embeds: [ticketEmbed], components: [row] }).catch((err) => {return console.log(err)})
                        interaction.reply({ content: `${channelMessage}`, ephemeral: true }).catch((err) => {return console.log(err)})
    
                    })
    
                    })

                }

                default: {
                    let customId = interaction.customId

                    if(customId.includes('&')) {
                        customId = customId.split('&')

                        const pollData = await require('../../database/polls').findOne({ guild: interaction.guild.id, uuid: customId[0] })

                        if(!pollData) return interaction.reply({ content: '<:cross:1062133327370399884> An error occured, please try again later.', ephemeral: true })
                        if(pollData.voters.includes(interaction.user.id)) return interaction.reply({ content: '<:cross:1062133327370399884> You are already entered into this poll.', ephemeral: true })

                        else pollData.voters.push(interaction.user.id), pollData.save()

                        const pollDescription = interaction.message.embeds[0].description
                        const pollTitle = interaction.message.embeds[0].title
                        const pollNumber = `**${customId[1]})** `
                        const pollName = pollDescription.split(pollNumber)[1].split(' - `')[0]
                        const pollVotes = pollDescription.split(pollNumber)[1].split(' - `')[1].split(' votes`')[0]

                        const newDescription = pollDescription.replace(`${pollNumber}${pollName} - \`${pollVotes} votes\``, `${pollNumber}${pollName} - \`${+pollVotes+1} votes\``)

                        const pollEmbed = new EmbedBuilder()
                        .setTitle(pollTitle)
                        .setDescription(newDescription)
                        .setColor('ff3f3f')

                        interaction.message.edit({ embeds: [pollEmbed] })
                        interaction.deferUpdate()
                        
                    }
                }

            }
        }

        // Modal Submit Event
        if(interaction.isModalSubmit()) {
            switch (interaction.customId) {
                case 'send': {
                    const content = interaction.fields.getTextInputValue('send-content')
                    return interaction.reply(content)
                }

                case 'embed': {

                    const title = interaction.fields.getTextInputValue('embed-title')
                    const description = interaction.fields.getTextInputValue('embed-description')
                    const colour = interaction.fields.getTextInputValue('embed-colour')
                    const image = interaction.fields.getTextInputValue('embed-image')
                    const thumbnail = interaction.fields.getTextInputValue('embed-thumbnail')

                    const hexErrEmbed = new EmbedBuilder()
                    .setColor('#ff3f3f')
                    .setTitle('Embed Failed')
                    .setDescription('Embed failed because the specified colour is an invalid hex code.')
                    
                    const imgErrEmbed = new EmbedBuilder()
                    .setColor('#ff3f3f')
                    .setTitle('Embed Failed')
                    .setDescription('Embed failed because the specified image URL is invalid.')
                    
                    const thumbErrEmbed = new EmbedBuilder()
                    .setColor('#ff3f3f')
                    .setTitle('Embed Failed')
                    .setDescription('Embed failed because the specified thumbnail URL is invalid.')

                    if(colour) if(!/^#[0-9A-F]{6}$/i.test(colour)) return interaction.reply({ embeds: [hexErrEmbed], ephemeral: true })
                    if(image) if(!/(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|png|webp))/i.test(image)) return interaction.reply({ embeds: [imgErrEmbed], ephemeral: true })
                    if(thumbnail) if(!/(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|png|webp))/i.test(thumbnail)) return interaction.reply({ embeds: [thumbErrEmbed], ephemeral: true })

                    const newEmbed = new EmbedBuilder()
                    if(colour) newEmbed.setColor(colour)
                    if(title) newEmbed.setTitle(title)
                    if(description) newEmbed.setDescription(description)
                    if(image) newEmbed.setImage(image)
                    if(thumbnail) newEmbed.setThumbnail(thumbnail)

                    return interaction.reply({ embeds: [newEmbed] })

                }
            }
        }
    }
}