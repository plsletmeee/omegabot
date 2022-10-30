const { EmbedBuilder, ApplicationCommandOptionType, } = require('discord.js');

module.exports = {
    name: "avatar",
    description: "Get a member's avatar",
    options: [
        {
            name: "guild",
            description: "Get a member's guild avatar",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "member",
                    description: "Whose avatar you want",
                    required: true,
                    type: ApplicationCommandOptionType.User,
                },
            ],
        },
        {
            name: "user",
            description: "Get a member's user avatar",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "member",
                    description: "Whose avatar you want",
                    required: true,
                    type: ApplicationCommandOptionType.User,
                },
            ],
        },
    ],
    async execute(interaction) {

        if(interaction.options.getSubcommand() === 'guild') {

            const member = interaction.options.getMember('member');

            const embed = new EmbedBuilder()
            .setTitle(`${member.user.username}'s avatar!`)
            .setImage(member.displayAvatarURL({dynamic: true}))
            .setColor("#2f3136")
    
            interaction.reply({embeds: [embed]});  

        }

        if(interaction.options.getSubcommand() === 'user') {

            const member = interaction.options.getUser('member');

            const embed = new EmbedBuilder()
            .setTitle(`${member.username}'s avatar!`)
            .setImage(member.displayAvatarURL({dynamic: true}))
            .setColor("#2f3136")
    
            interaction.reply({embeds: [embed]});  

        }

    }
}