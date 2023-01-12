const { EmbedBuilder, ApplicationCommandOptionType, PermissionFlagsBits } = require('discord.js')

module.exports = {
    name: 'ban',
    description: 'Ban a member from your server',
    defaultMemberPermissions: PermissionFlagsBits.BanMembers,
    options: [
        {
            name: "member",
            description: "Who you want to ban",
            type: ApplicationCommandOptionType.User,
            required: true
        },
        {
            name: "reason",
            description: "Why you're banning them",
            type: ApplicationCommandOptionType.String,
            required: false
        },
        {
            name: "evidence",
            description: "Evidence of what they did",
            type: ApplicationCommandOptionType.Attachment,
            required: false
        }
    ],
    async execute(interaction) {

        const member = interaction.options.getMember('member')
        const reason = interaction.options.getString('reason')
        const evidence = interaction.options.getAttachment('evidence')

        let evidenceLink = undefined
        if(evidence !== null) evidenceLink = `[${evidence.name}](${evidence.attachment})`

        const embed = new EmbedBuilder()
        .setColor("#ff3f3f")
        .setAuthor({name: `${member.user.username}`, iconURL: `${member.displayAvatarURL({dynamic: true})}`})
        .setDescription(`**__Member Banned__**\n**Name:** ${member.user.tag}\n**ID:** ${member.user.id}\n**Joined:** <t:${parseInt(member.joinedTimestamp / 1000)}:R>\n**Evidence:** ${evidenceLink || "None"}\n**Reason:** ${reason || "None"}`)

        if(!member.permissions.has(PermissionFlagsBits.Administrator)) {
            member.ban(reason)
            interaction.reply({embeds: [embed]})
        } else if(member.permissions.has(PermissionFlagsBits.Administrator)) {
            interaction.reply({content: "<:cross:1062133327370399884> You cannot ban a member with the Administrator permission using this command!", ephemeral: true})
        }

    }
}