const { ActivityType } = require('discord.js')
const client = require('../index')

module.exports = {
    name: 'ready',
    once: true,
    /**
    * @param {client} client 
    */
    async execute(client) {

        // Statistics Function
        async function refreshStats() {
            const guildArray = []
            const statsData = require('../../database/botStatistics')
            const botStatistics = await statsData.findById('63c4559e6b831d6faa89d5d7')

            let memberCount = 0

            client.guilds.cache.forEach(guild => {
                guildArray.push(guild.id)
                memberCount += guild.memberCount
            })
    
            botStatistics.guilds = guildArray
            botStatistics.members = memberCount
            botStatistics.save()
    
            client.user.setActivity(`${guildArray.length} servers!`, { type: ActivityType.Watching })
            client.user.setStatus('online') 
        }

        console.log(`✨ ${client.user.username} Online.`)

        // Repeating Statistics Update
        refreshStats()
        
        setInterval(() => refreshStats(), 1000 * 60 * 5)
    }
}