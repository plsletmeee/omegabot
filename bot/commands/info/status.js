const { EmbedBuilder, ChatInputCommandInteraction } = require('discord.js')
const client = require('../../index')
const cpuStat = require('cpu-stat')

module.exports = {
    name: 'status',
    description: 'Get the bot status',
    /**
    * @param {ChatInputCommandInteraction} interaction 
    * @param {client} client 
    */
    async execute(interaction, client) {

        const ping = await interaction.deferReply({ fetchReply: true })

        cpuStat.usagePercent(function (error, percent) {

            if(error) return

            const memoryUsage = formatBytes(process.memoryUsage().heapUsed)
            const cpu = percent.toFixed(2)

            const pingEmbed = new EmbedBuilder()
            .setTitle('💡 Beep Boop!')
            .setColor('#ff3f3f')
            .setDescription(`Omega Bot live statistics successfully retrieved from server.\n\n**Bot Latency:** ${ping.createdTimestamp - interaction.createdTimestamp} ms\n**API Latency:** ${client.ws.ping} ms\n\n**CPU Usage:** ${cpu}%\n**RAM Usage:** ${memoryUsage}\n\n**Online Since:** <t:${parseInt(client.user.createdTimestamp / 1000)}:d>\n**Last Reboot:** <t:${parseInt(new Date().getTime() / 1000) - Math.round(client.uptime / 1000)}:R>`)
    
            interaction.editReply({ embeds: [pingEmbed] })
            
        })

        function formatBytes(bytes,decimals) {
            if(bytes == 0) return '0 Bytes';
            var k = 1024,
                dm = decimals || 2,
                sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
                i = Math.floor(Math.log(bytes) / Math.log(k));
            return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
         }

    }
}