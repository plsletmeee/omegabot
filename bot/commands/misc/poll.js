const { ChatInputCommandInteraction, ApplicationCommandOptionType, EmbedBuilder, PermissionFlagsBits } = require('discord.js')
const client = require('../../index')

module.exports = {
    name: 'poll',
    description: 'poll',
    defaultMemberPermissions: PermissionFlagsBits.ManageMessages,
    options: [
        {
            name: 'create',
            description: 'Create a new poll',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'name',
                    description: 'Poll name',
                    type: ApplicationCommandOptionType.String,
                    required: true
                },
                {
                    name: 'choice-1',
                    description: 'Poll option',
                    type: ApplicationCommandOptionType.String,
                    required: true
                },
                {
                    name: 'choice-2',
                    description: 'Poll option',
                    type: ApplicationCommandOptionType.String
                },
                {
                    name: 'choice-3',
                    description: 'Poll option',
                    type: ApplicationCommandOptionType.String
                },
                {
                    name: 'choice-4',
                    description: 'Poll option',
                    type: ApplicationCommandOptionType.String
                },
                {
                    name: 'choice-5',
                    description: 'Poll option',
                    type: ApplicationCommandOptionType.String
                },
                {
                    name: 'choice-6',
                    description: 'Poll option',
                    type: ApplicationCommandOptionType.String
                },
                {
                    name: 'choice-7',
                    description: 'Poll option',
                    type: ApplicationCommandOptionType.String
                },
                {
                    name: 'choice-8',
                    description: 'Poll option',
                    type: ApplicationCommandOptionType.String
                },
                {
                    name: 'choice-9',
                    description: 'Poll option',
                    type: ApplicationCommandOptionType.String
                }
            ]
        },
        {
            name: 'end',
            description: 'End a poll',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'poll',
                    description: 'The ID of the poll message',
                    type: ApplicationCommandOptionType.String,
                    required: true
                }
            ]
        }
    ],
    /**
    * @param {ChatInputCommandInteraction} interaction
    * @param {client} client
    */
    async execute(interaction, client) {
        const { options } = interaction

        switch (options.getSubcommand()) {
            case 'create': {

                const name = options.getString('name')
                const pollOptions = [
                    options.getString('choice-1'),
                    options.getString('choice-2'),
                    options.getString('choice-3'),
                    options.getString('choice-4'),
                    options.getString('choice-5'),
                    options.getString('choice-6'),
                    options.getString('choice-7'),
                    options.getString('choice-8'),
                    options.getString('choice-9')
                ]

                const pollEmbed = new EmbedBuilder()
                .setColor('#ff3f3f')
                .setFooter({ text: `Poll by ${interaction.user.username}#${interaction.user.discriminator}` })
                .setTimestamp()
                .setTitle(name)

                let description = ''
                let emojiNum = 0
                let emoji

                for(const option of pollOptions) {
                    if(!option) continue

                    if(emojiNum == 0) emoji = '<:num_one:1071210751584370688>'
                    if(emojiNum == 1) emoji = '<:num_two:1071210758567899176>'
                    if(emojiNum == 2) emoji = '<:num_three:1071210756571418655>'
                    if(emojiNum == 3) emoji = '<:num_four:1071210748086333541>'
                    if(emojiNum == 4) emoji = '<:num_five:1071210746421186590>'
                    if(emojiNum == 5) emoji = '<:num_six:1071210755115982888>'
                    if(emojiNum == 6) emoji = '<:num_seven:1071210753606025287>'
                    if(emojiNum == 7) emoji = '<:num_eight:1071210745104171088>'
                    if(emojiNum == 8) emoji = '<:num_nine:1071210750183489536>'

                    description += `${emoji} = ${option}\n\n`
                    emojiNum++
                }

                pollEmbed.setDescription(description)

                const pollSend = await interaction.reply({ embeds: [pollEmbed], fetchReply: true })

                for(let i = 0; i < emojiNum; i++) {

                    if(i == 0) pollSend.react('<:num_one:1071210751584370688>')
                    if(i == 1) pollSend.react('<:num_two:1071210758567899176>')
                    if(i == 2) pollSend.react('<:num_three:1071210756571418655>')
                    if(i == 3) pollSend.react('<:num_four:1071210748086333541>')
                    if(i == 4) pollSend.react('<:num_five:1071210746421186590>')
                    if(i == 5) pollSend.react('<:num_six:1071210755115982888>')
                    if(i == 6) pollSend.react('<:num_seven:1071210753606025287>')
                    if(i == 7) pollSend.react('<:num_eight:1071210745104171088>')
                    if(i == 8) pollSend.react('<:num_nine:1071210750183489536>')

                }

                return

            }

            case 'end': {

                const pollID = options.getString('poll')

                const notfoundEmbed = new EmbedBuilder()
                .setColor('#ff3f3f')
                .setDescription('<:obcross:1073595895360258118> Could not find poll.')


                interaction.channel.messages.fetch(pollID).then((message) => {

                    const title = message.embeds[0].title
                    const description = message.embeds[0].description
                    const footer = message.embeds[0].footer
                    const reactions = message.reactions.cache

                    let pollResults = ''

                    let allowedReactions = [
                        '<:num_one:1071210751584370688>',
                        '<:num_two:1071210758567899176>',
                        '<:num_three:1071210756571418655>',
                        '<:num_four:1071210748086333541>',
                        '<:num_five:1071210746421186590>',
                        '<:num_six:1071210755115982888>',
                        '<:num_seven:1071210753606025287>',
                        '<:num_eight:1071210745104171088>',
                        '<:num_nine:1071210750183489536>'
                    ]

                    reactions.forEach(reaction => {
                        if(allowedReactions.includes(`<:${reaction.emoji.name}:${reaction.emoji.id}>`)) {

                            const row = description.split(`<:${reaction.emoji.name}:${reaction.emoji.id}>`)

                            const emoji = `<:${reaction.emoji.name}:${reaction.emoji.id}>`
                            const option = row[1].split(' = ')[1].split('\n\n')[0]
                            const count = reaction.count - 1

                            pollResults += `${emoji} = ${option} **(${count} votes)**\n\n`

                        }
                    })

                    const endEmbed = new EmbedBuilder()
                    .setColor('#ff3f3f')
                    .setTitle(title)
                    .setDescription(pollResults)
                    .setFooter(footer)
                    .setTimestamp()

                    const editedEmbed = new EmbedBuilder()
                    .setColor('#43b581')
                    .setDescription('<:obcheck:1073595892701069362> Ended poll.')

                    message.reactions.removeAll()
                    message.edit({ embeds: [endEmbed] })
                    interaction.reply({ embeds: [editedEmbed] })

                }).catch((err) => { return interaction.reply({ embeds: [notfoundEmbed] }), console.log(err) })

                return 

            }
        }
    }
}