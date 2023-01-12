const { ChatInputCommandInteraction, ApplicationCommandOptionType, ButtonBuilder, ActionRowBuilder, PermissionFlagsBits } = require('discord.js')
const Transcripts = require('discord-html-transcripts')
const { v4: uuidv4 } = require('uuid')
const client = require('../index')

module.exports = {
    name: 'clear',
    description: 'Clears messages and saves a transcript',
    defaultMemberPermissions: PermissionFlagsBits.ManageMessages,
    options: [
        {
            name: 'amount',
            description: 'How many messages you want to delete',
            type: ApplicationCommandOptionType.Number,
            required: true
        },
        {
            name: 'reason',
            description: 'Why they are being deleted',
            type: ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: 'target',
            description: 'Who you want to target',
            type: ApplicationCommandOptionType.User,
        }
    ],
    /**
    * @param {ChatInputCommandInteraction} interaction
    * @param {client} client
    */
    async execute(interaction, client) {
        const { options, member, channel } = interaction
        const amount = options.getNumber('amount')
        const reason = options.getString('reason')
        const target = options.getMember('target')

        if(amount < 1 || amount > 100) return interaction.reply({ content: '<:cross:1062133327370399884> You can only delete between 1 and 100 messages at a time.', ephemeral: true })

        const channelMessages = await channel.messages.fetch({ limit: amount })
        let deletedMessages = []

        let i = 0

        channelMessages.filter(message => {
            if(!target && amount > i) deletedMessages.push(message), i++
            else if(message.author.id == target.id && amount > i) deletedMessages.push(message), i++
        })

        deletedMessages.reverse()
        
        const transcript = await Transcripts.generateFromMessages(deletedMessages, channel)
        const html = transcript.attachment.toString('utf8')
        const uuid = uuidv4()
        const transcriptData = require('../../database/transcripts')

        // removing watermark
        const split1 = html.split('<div style="text-align:center;width:100%">')
        const split2 = split1[1].split('<a href="https://github.com/ItzDerock/discord-html-transcripts" style="color:lightblue">discord-html-transcripts</a>.')

        const finalHTML = split1[0]+split2[1]

        transcriptData.create({ transcriptId: uuid, htmlCode: finalHTML })

        const linkButton = new ButtonBuilder()
        .setStyle('Link')
        .setURL(`http://localhost:3000/transcript/${uuid}`)
        .setLabel('Transcript')

        const row = new ActionRowBuilder().addComponents(linkButton)

        channel.bulkDelete(deletedMessages, true)

        interaction.reply({ content: `<:ob_trash:1061516331708579921> Cleared \`${channelMessages.size}\` messages.`, components: [row] })
    }
}