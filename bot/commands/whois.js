const { EmbedBuilder, ApplicationCommandOptionType } = require('discord.js')

module.exports = {
    name: "whois",
    description: "Get info on a user",
    options: [
        {
            name: "member",
            description: "The member you want info on",
            required: true,
            type: ApplicationCommandOptionType.User,
        },
    ],
    async execute(interaction) {

        const member = interaction.options.getMember('member')

        const embed = new EmbedBuilder()
        .setColor("#ff3f3f")
        .setDescription(`${member}`)
        .setThumbnail(member.displayAvatarURL({dynamic: true}))
        .addFields(
            {name: "Joined", value: `<t:${parseInt(member.joinedTimestamp / 1000)}>`, inline: true},
            {name: "Registered", value: `<t:${parseInt(member.user.createdTimestamp / 1000)}>`, inline: true},
            {name: "ID", value: `${member.id}`},
            {name: "Roles", value: `${member.roles.cache.map(r => r).join(" ").replace("@everyone", "") || "None"}`},
        )
        
        await interaction.reply({embeds: [embed]})

    }
}