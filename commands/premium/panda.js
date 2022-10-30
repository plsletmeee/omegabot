const { EmbedBuilder, ApplicationCommandOptionType } = require('discord.js');
const gen = require('images-generator')

module.exports = {
    name: 'panda',
    description: 'Get a random picture of a panda',
    options: [
        {
            name: "panda-type",
            description: "What kind of panda",
            required: true,
            type: ApplicationCommandOptionType.String,
            choices: [
                {
                    name: "panda",
                    value: "panda",
                },
                {
                    name: "red-panda",
                    value: "redpanda",
                },
            ]
        },
    ],
    async execute(interaction) {

        const pandaType = interaction.options.getString("panda-type")

        if(pandaType === "panda") {

            const pandaImage = await gen.animal.panda();
    
            const embed = new EmbedBuilder()
            .setImage(pandaImage)
            .setColor("#2f3136")
    
            interaction.reply({embeds: [embed]});

        }

        if(pandaType === "redpanda") {

            const pandaImage = await gen.animal.redPanda();
    
            const embed = new EmbedBuilder()
            .setImage(pandaImage)
            .setColor("#2f3136")
    
            interaction.reply({embeds: [embed]});

        }

    }
}