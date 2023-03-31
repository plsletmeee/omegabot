const { ChatInputCommandInteraction, ApplicationCommandOptionType, EmbedBuilder } = require('discord.js')
const client = require('../../index')

module.exports = {
    name: 'music',
    description: 'music',
    options: [
        {
            name: 'play',
            description: 'Play voice channel music',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'query',
                    description: 'The name or link to a Spotify song',
                    type: ApplicationCommandOptionType.String,
                    required: true
                }
            ]
        },
        {
            name: 'volume',
            description: 'Change voice channel music volume',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'percent',
                    description: '50 = 50% volume',
                    type: ApplicationCommandOptionType.Number,
                    required: true
                }
            ]
        },
        {
            name: 'leave',
            description: 'Leave the voice channel',
            type: ApplicationCommandOptionType.Subcommand,
        },
        {
            name: 'queue',
            description: 'Change queue music options',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'settings',
                    description: 'Select an option',
                    type: ApplicationCommandOptionType.String,
                    required: true,
                    choices: [
                        { name: 'pause', value: 'pause' },
                        { name: 'resume', value: 'resume' },
                        { name: 'skip', value: 'skip' },
                        { name: 'stop', value: 'stop' },
                        { name: 'loop', value: 'loop' },
                        { name: 'list', value: 'list' }
                    ]
                }
            ]
        }
    ],
    /**
    * @param {ChatInputCommandInteraction} interaction
    * @param {client} client
    */
    async execute(interaction, client) {
        const voiceChannel = interaction.member.voice.channel
        const botVoiceChannel = interaction.guild.members.me.voice.channelId

        if(!voiceChannel) return interaction.reply({ content: '<:obcross:1073595895360258118> You must be in a voice channel to run this command.', ephemeral: true })
        if(botVoiceChannel && voiceChannel.id != botVoiceChannel) return interaction.reply({ content: `<:obcross:1073595895360258118> I am already playing music in another voice channel.`, ephemeral: true })

        switch (interaction.options.getSubcommand()) {
            case 'play': {
                const query = interaction.options.getString('query')

                if(query.includes('youtu')) return interaction.reply({ content: '<:obcross:1073595895360258118> You cannot use YouTube videos as a query.', ephemeral: true })

                client.distube.play( voiceChannel, query, { textChannel: interaction.channel, member: interaction.member })
                return interaction.reply('Added music to queue.')
            }

            case 'volume': {
                const percent = interaction.options.getNumber('percent')
                const queue = client.distube.getQueue(voiceChannel)

                if(percent > 100 || percent < 1) return interaction.reply({ content: '<:obcross:1073595895360258118> You can only choose between 1 and 100.', ephemeral: true })
                if(!queue) return interaction.reply({ content: '<:obcross:1073595895360258118> No music in queue.', ephemeral: true })

                client.distube.setVolume(voiceChannel, percent)
                return interaction.reply(`Volume adjusted to \`${percent}%\``)
            }

            case 'leave': {
                client.distube.voices.get(voiceChannel)?.leave()
                return interaction.reply(`Left voice channel.`)
            }

            case 'queue': {
                const queue = client.distube.getQueue(voiceChannel)
                const options = interaction.options.getString('settings')
                if(!queue) return interaction.reply({ content: '<:obcross:1073595895360258118> No music in queue.', ephemeral: true })

                const queueEmbed = new EmbedBuilder()
                .setColor('#ff3f3f')
                .setTitle('Music Queue')
                .setDescription(`${queue.songs.map(
                    (song, id) => `\n**${id + 1}**. ${song.name} - \`[${song.formattedDuration}]\``
                )}`)
                
                switch(options) {
                    case 'stop': 
                        queue.stop(voiceChannel)
                        return interaction.reply(`Music queue has been stopped.`)
                    case 'skip': 
                        queue.skip(voiceChannel)
                        return interaction.reply(`Music has been skipped.`)
                    case 'pause': 
                        queue.pause(voiceChannel)
                        return interaction.reply(`Music has been paused.`)
                    case 'resume': 
                        queue.resume(voiceChannel)
                        return interaction.reply(`Music has been resumed.`)
                    case 'loop':
                        const state = queue.repeatMode
                        if(state == 0) client.distube.setRepeatMode(voiceChannel, 1), interaction.reply(`Music looping has been enabled.`)
                        if(state == 1) client.distube.setRepeatMode(voiceChannel, 1), interaction.reply(`Music looping has been disabled.`)
                        return
                    case 'list': 
                        return interaction.reply({ embeds: [queueEmbed] })
                }
            }
        }
    }
}