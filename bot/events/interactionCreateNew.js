const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ChannelType, InteractionType, BaseInteraction } = require('discord.js')
const client = require('../index')

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
            await command.execute(interaction, client).catch((err) => {
                return console.log(err),
                interaction.reply({ content: '<:cross:1062133327370399884> An error occured, please try again later.', ephemeral: true })
            })
        }

        // Button Use Event //
        if(interaction.isButton()) {
            switch (interaction.customId) {

                default: {
                    let customId = interaction.customId

                    if(customId.includes('&')) {
                        customId = customId.split('&')

                        const pollData = require('../../database/polls')

                        pollData.findOne({ guild: interaction.guild.id, uuid: customId[0] }, (err, data) => {
                            if(!data || err) return interaction.reply({ content: '<:cross:1062133327370399884> An error occured, please try again later.', ephemeral: true })

                            if(!data.voters.length) data.voters.push(interaction.user.id), data.save()
                            else for (const voter of data.voters) {
                                if(voter == interaction.user.id) 
                                return interaction.reply({ content: '<:cross:1062133327370399884> You are already entered into this poll.', ephemeral: true })

                                else data.voters.push(interaction.user.id), data.save()
                            }

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
                            .setFooter({ text: 'Omega Bot is not responsible for user-generated content.' })

                            interaction.message.edit({ embeds: [pollEmbed] })
                            interaction.deferUpdate()
                        })
                    } else return interaction.reply({ content: '<:cross:1062133327370399884> An error occured, please try again later.', ephemeral: true })
                }
            }
        }

        // Modal Submit Event
        if(interaction.isModalSubmit()) {
            switch (interaction.customId) {
                case 'echo': {
                    interaction.reply({ content: '<:check:1062133324329517138> Omega has echoed your message!', ephemeral: true })
    
                    const content = interaction.fields.getTextInputValue('content')
                    interaction.channel.send(content)
                    break
                }

                default: {
                    interaction.reply({ content: '<:cross:1062133327370399884> An error occured, please try again later.', ephemeral: true })
                    break
                }
            }
        }
    }
}