const { ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: "music",
    description: "Music commands",
    options: [
        {
            name: "play",
            description: "Play music in a voice channel",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "song",
                    description: "Song you want to listen to",
                    required: true,
                    type: ApplicationCommandOptionType.String,
                },
            ],
        },
        {
            name: "stop",
            description: "Stop music in a voice channel",
            type: ApplicationCommandOptionType.Subcommand,
        },
        {
            name: "pause",
            description: "Pause music in a voice channel",
            type: ApplicationCommandOptionType.Subcommand,
        },
        {
            name: "resume",
            description: "Resume music in a voice channel",
            type: ApplicationCommandOptionType.Subcommand,
        },
        {
            name: "leave",
            description: "Leave the voice channel",
            type: ApplicationCommandOptionType.Subcommand,
        },
    ],
    async execute(interaction, premium) {

    try {

        if (!interaction.member.voice.channel) return interaction.reply("Join a voice channel first!");
        const queue = premium.distube.getQueue(interaction)
        const string = interaction.options.getString('song')

        if (interaction.options.getSubcommand() === 'play') {

            if (queue) {

                queue.stop().then(
                    premium.distube.play(interaction.member.voice.channel, string, {
                        member: interaction.member,
                        textChannel: interaction.channel,
                        interaction
                      })
                ).then(await interaction.reply(`Playing first result for: \`${string}\``))

            } else {

                premium.distube.play(interaction.member.voice.channel, string, {
                    member: interaction.member,
                    textChannel: interaction.channel,
                    interaction
                  }).then(await interaction.reply(`Playing first result for: \`${string}\``))

            }
        }

        if (interaction.options.getSubcommand() === 'stop') {

            if (!queue) return interaction.reply("No music to stop!");

            premium.distube.stop(interaction);
            interaction.reply("Music stopped!"); 

        }

        if (interaction.options.getSubcommand() === 'pause') {

            if (!queue) return interaction.reply("No music to pause!");

            premium.distube.pause(interaction);
            interaction.reply("Music paused!");

        }

        if (interaction.options.getSubcommand() === 'resume') {

            if (!queue) return interaction.reply("No music to resume!");

            premium.distube.resume(interaction);
            interaction.reply("Music resumed!");

        }

        if (interaction.options.getSubcommand() === 'leave') {

            premium.distube.voices.get(interaction)?.leave()
            interaction.reply("I left the voice channel!");

        }

    } catch(err) { return console.log(err) };

}};