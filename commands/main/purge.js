const { ApplicationCommandOptionType, PermissionFlagsBits } = require('discord.js');

module.exports = {
    name: 'purge',
    description: 'Purges up to 100 messages from a channel',
    defaultMemberPermissions: PermissionFlagsBits.ManageMessages,
    options: [
        {
            name: "amount",
            description: "How many should I delete?",
            type: ApplicationCommandOptionType.Number,
            required: true
        }
    ],
    async execute(interaction) {

        const number = interaction.options.getNumber('amount');

        if(number >= 101) return interaction.reply({content: `<a:obcross:1018078642607239218> I cannot delete ${number} messages! Maximum is 100.`, ephemeral: true});
        if(number <= 0) return interaction.reply({content: `<a:obcross:1018078642607239218> I cannot delete ${number} messages! Minimum is 1.`, ephemeral: true});

        const msgs = await interaction.channel.messages.fetch({limit: number});

        await interaction.channel.bulkDelete(msgs, true).then(
            interaction.reply({content: `<a:obtick:1018078610130751528> Successfully deleted ${msgs.size} messages!`, ephemeral: true})
        );

    }
}