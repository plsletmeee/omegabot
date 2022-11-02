const { EmbedBuilder } = require('discord.js');
const gen = require('images-generator')

module.exports = {
    name: 'cat',
    description: 'Get a random picture of a cat',
    async execute(interaction) {

        const catImage = await gen.animal.cat();

        const embed = new EmbedBuilder()
        .setImage(catImage)
        .setColor("#2f3136")

        interaction.reply({embeds: [embed]});

    }
}