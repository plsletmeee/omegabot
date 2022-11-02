const { EmbedBuilder } = require('discord.js');
const gen = require('images-generator')

module.exports = {
    name: 'koala',
    description: 'Get a random picture of a koala',
    async execute(interaction) {

        const koalaImage = await gen.animal.koala();

        const embed = new EmbedBuilder()
        .setImage(koalaImage)
        .setColor("#2f3136")

        interaction.reply({embeds: [embed]});

    }
}