const { ChatInputCommandInteraction, ApplicationCommandOptionType, EmbedBuilder } = require('discord.js')
const client = require('../../index')

module.exports = {
    name: 'poll',
    description: 'poll',
    options: [
        {
            name: 'start',
            description: 'Start a new poll',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'name',
                    description: 'Poll name',
                    type: ApplicationCommandOptionType.String,
                    required: true
                },
                {
                    name: 'option-1',
                    description: 'Poll option',
                    type: ApplicationCommandOptionType.String,
                    required: true
                },
                {
                    name: 'option-2',
                    description: 'Poll option',
                    type: ApplicationCommandOptionType.String
                },
                {
                    name: 'option-3',
                    description: 'Poll option',
                    type: ApplicationCommandOptionType.String
                },
                {
                    name: 'option-4',
                    description: 'Poll option',
                    type: ApplicationCommandOptionType.String
                },
                {
                    name: 'option-5',
                    description: 'Poll option',
                    type: ApplicationCommandOptionType.String
                },
                {
                    name: 'option-6',
                    description: 'Poll option',
                    type: ApplicationCommandOptionType.String
                },
                {
                    name: 'option-7',
                    description: 'Poll option',
                    type: ApplicationCommandOptionType.String
                },
                {
                    name: 'option-8',
                    description: 'Poll option',
                    type: ApplicationCommandOptionType.String
                },
                {
                    name: 'option-9',
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
            case 'start': {

                const name = options.getString('name')
                const pollOptions = [
                    options.getString('option-1'),
                    options.getString('option-2'),
                    options.getString('option-3'),
                    options.getString('option-4'),
                    options.getString('option-5'),
                    options.getString('option-6'),
                    options.getString('option-7'),
                    options.getString('option-8'),
                    options.getString('option-9')
                ]

                const pollEmbed = new EmbedBuilder()
                .setColor('#ff3f3f')
                .setTitle(`Poll: "${name}"`)

                let description = 'Poll options:\n\n'
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

                    description += `${emoji} = ${option},\n`
                    emojiNum++
                }

                description += '\n**React to vote!**'

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
                .setTitle('End Failed <:status_warning:1071210887349809182>')
                .setDescription('Poll end failed because the poll ID is either invalid or the message does not originate from this channel.')

                interaction.channel.messages.fetch(pollID).then((message) => {

                    const title = message.embeds[0].title
                    const description = message.embeds[0].description
                    const reactions = message.reactions.cache

                    let pollResults = 'Poll results:\n\n'

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
                            const option = row[1].split(' = ')[1].split(',')[0]
                            const count = reaction.count - 1

                            pollResults += `${emoji} = ${option}, **(${count})**\n`

                        }
                    })

                    pollResults += '\nPoll has ended.\n**Thanks for voting!**'

                    const endEmbed = new EmbedBuilder()
                    .setColor('#ff3f3f')
                    .setTitle(title)
                    .setDescription(pollResults)

                    const editedEmbed = new EmbedBuilder()
                    .setColor('#ff3f3f')
                    .setTitle('Ended Successfully 🎉')

                    message.edit({ embeds: [endEmbed] })
                    interaction.reply({ embeds: [editedEmbed] })

                }).catch(() => { return interaction.reply({ embeds: [notfoundEmbed] }) })

                return 

            }
        }
    }
}