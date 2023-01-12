const { ChatInputCommandInteraction, ApplicationCommandOptionType, EmbedBuilder } = require('discord.js')
const client = require('../index')

module.exports = {
    name: 'vc',
    description: 'vc',
    options: [
        {
            name: 'music',
            description: 'music',
            type: ApplicationCommandOptionType.SubcommandGroup,
            options: [
                {
                    name: 'play',
                    description: 'Play voice channel music',
                    type: ApplicationCommandOptionType.Subcommand,
                    options: [
                        {
                            name: 'query',
                            description: 'The name or link to a YouTube song',
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
                    name: 'options',
                    description: 'Change voice channel music options',
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
                                { name: 'queue', value: 'queue' }
                            ]
                        }
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

        if(!voiceChannel) return interaction.reply({ content: '<:cross:1062133327370399884> You must be in a voice channel to run this command.', ephemeral: true })
        if(botVoiceChannel && voiceChannel.id != botVoiceChannel) return interaction.reply({ content: `<:cross:1062133327370399884> I am already playing music in another voice channel.`, ephemeral: true })

        if(interaction.options.getSubcommandGroup() == 'music') {
            switch (interaction.options.getSubcommand()) {
                case 'play': {
                    const query = interaction.options.getString('query')

                    client.distube.play( voiceChannel, query, { textChannel: interaction.channel, member: interaction.member })
                    return interaction.reply('<:music_song:1062132646341267466> Added music to queue.')
                }

                case 'volume': {
                    const percent = interaction.options.getNumber('percent')
                    const queue = client.distube.getQueue(voiceChannel)

                    if(percent > 99 || percent < 1) return interaction.reply({ content: '<:cross:1062133327370399884> You can only choose between 1 and 100.', ephemeral: true })
                    if(!queue) return interaction.reply({ content: '<:cross:1062133327370399884> No music in queue.', ephemeral: true })

                    client.distube.setVolume(voiceChannel, percent)
                    return interaction.reply(`<:music_volume:1062132652041326652> Volume adjusted to \`${percent}%\``)
                }

                case 'options': {
                    const queue = client.distube.getQueue(voiceChannel)
                    const options = interaction.options.getString('settings')
                    if(!queue) return interaction.reply({ content: '<:cross:1062133327370399884> No music in queue.', ephemeral: true })

                    const queueEmbed = new EmbedBuilder()
                    .setColor('#ff3f3f')
                    .setTitle('<:music_song:1062132646341267466> Music Queue')
                    .setDescription(`${queue.songs.map(
                        (song, id) => `\n**${id + 1}**. ${song.name} - \`${song.formattedDuration}\``
                    )}`)
                    
                    switch(options) {
                        case 'stop': 
                            queue.stop(voiceChannel)
                            return interaction.reply(`<:music_stop:1062132650812395631> Music queue stopped.`)
                        case 'skip': 
                            queue.skip(voiceChannel)
                            return interaction.reply(`<:music_skip:1062132642977419374> Music has been skipped.`)
                        case 'pause': 
                            queue.pause(voiceChannel)
                            return interaction.reply(`<:music_pause:1062132647641501736> Music has been paused.`)
                        case 'resume': 
                            queue.resume(voiceChannel)
                            return interaction.reply(`<:music_resume:1062132649608630472> Music has been resumed.`)
                        case 'loop':
                            const state = queue.repeatMode

                            if(state == 0) client.distube.setRepeatMode(voiceChannel, 1), interaction.reply(`<:music_loop:1062761497094262854> Music looping has been enabled.`)
                            if(state == 1) client.distube.setRepeatMode(voiceChannel, 1), interaction.reply(`<:music_loop:1062761497094262854> Music looping has been disabled.`)

                            return
                        case 'queue': 
                            return interaction.reply({ embeds: [queueEmbed] })
                    }
                }
            }
        }
    }
}