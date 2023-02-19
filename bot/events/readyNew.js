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

        // DB Message Function
        async function sendMessages() {
            client.guilds.cache.forEach(async guild => {
                const reactionRoleSchema = require('../../database/reaction-roles')
                const reactionRoleData = await reactionRoleSchema.find({ guild: guild.id })
                if(!reactionRoleData) return
                
                reactionRoleData.forEach(async schema => {
                    const channel = guild.channels.cache.get(schema.channel)
                    if(!channel) return

                    if(schema.sentStatus == false) {
                        const sendEvent = await channel.send(schema.message)
                
                        schema.reactions.forEach(reaction => sendEvent.react(reaction.emoji))
        
                        schema.sentStatus = true
                        schema.messageId = sendEvent.id
                        schema.save()
                    }

                    channel.messages.fetch(schema.messageId).catch(() => {return})
                })
            })
        }

        console.log(`✨ ${client.user.username} Online.`)

        // Functions
        refreshStats()
        sendMessages()
        
        setInterval(() => refreshStats(), 1000 * 60 * 5)
        setInterval(() => sendMessages(), 1000 * 5)
    }
}