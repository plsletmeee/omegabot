const { EmbedBuilder } = require('discord.js');
const gen = require('images-generator')

module.exports = {
    name: 'dog',
    description: 'Get a random picture of a dog',
    async execute(interaction) {

        const dogImage = await gen.animal.dog();

        const embed = new EmbedBuilder()
        .setImage(dogImage)
        .setColor("#2f3136")

        interaction.reply({embeds: [embed]});

    }
}

