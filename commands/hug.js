const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const gen = require('images-generator')

module.exports = {
    name: 'hug',
    description: 'Hug another member',
    options: [
        {
        name: "member",
        description: "The member you wish to hug",
        required: true,
        type: ApplicationCommandOptionType.User,
        },
    ],
    async execute(interaction) {

        const member = interaction.options.getMember("member");

        const animeHug = await gen.anime.hug();

        const embed = new EmbedBuilder()
        .setDescription(`${interaction.member.user.username} hugged ${member.user.username}!`)
        .setImage(animeHug)
        .setColor("#2f3136")

        interaction.reply({embeds: [embed]});      

},
};