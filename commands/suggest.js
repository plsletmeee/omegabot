const { EmbedBuilder, ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: 'suggest',
    description: 'Make a suggestion',
    options: [
        {
            name: "idea",
            required: true,
            description: "What you want to suggest",
            type: ApplicationCommandOptionType.String,
        },
    ],   
    async execute(interaction) {

        const Schema = require('../database/schemas/suggestions');

        Schema.findOne({ Guild : interaction.guild.id }, async (err, data) => {
        
            if(!data) return interaction.reply({content: "<a:obcross:1018078642607239218> Suggestions aren't set up yet. Contact a server Administrator.", ephemeral: true});

            const suggestion = interaction.options.getString("idea");
            const channel = interaction.guild.channels.cache.get(data.Channel);

            const embed = new EmbedBuilder()
            .setDescription(suggestion)
            .setTitle(`${interaction.user.username}'s suggestion:`)
            .setTimestamp()
            .setColor("#2f3136")
            
            await channel.send({ embeds: [embed] }).catch(() => {return});
            await interaction.reply(`Your suggestion has been created in ${channel}`).catch(() => {return});

        });
    }
}