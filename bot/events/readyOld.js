module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {

        //DAILY MESSAGES

        setInterval(() => {

            client.guilds.cache.forEach((guild) => {

                const DailyMessagesSchema = require('../../database/daily-messages')
    
                DailyMessagesSchema.findOne({ Guild : guild.id }, async (err, data) => {
        
                    if(!data) return
    
                    let channel = guild.channels.cache.get(data.Channel)
                    let message = data.Message
                    let time = data.Time

                    if(!channel) return
                    
                    let date = new Date()
                    let hr = date.getHours()
                    let min = date.getMinutes()
                    let sec = date.getSeconds()
                    let ampm = 'am'
                  
                    if( hr > 12 ) {
                        hr -= 12
                        ampm = 'pm'
                    }
                                    
                    let currentTime = hr + ampm
                        
                    if(currentTime === time && min === 0) {
                        if(sec == 0) channel.send(message).catch(() => {return})
                    }
        
                })
    
            })

        }, 1000)

        //COUNTERS

        client.guilds.cache.forEach((guild) => {

            const RoleCounterSchema = require('../../database/rolecounter')

            RoleCounterSchema.findOne({ Guild : guild.id }, async (err, data) => {

                if(!data) return

                try {
                    const channel = guild.channels.cache.get(data.Channel)
                    const name = data.Name
                    const roleCount = guild.members.cache.filter(member => member.roles.cache.has(data.Role)).size
    
                    await channel.setName(`${name}: ${roleCount}`)
                } catch {
                    return
                }

            })

            const MemberCounterSchema = require('../../database/membercounter')

            MemberCounterSchema.findOne({ Guild : guild.id }, async (err, data) => {

                if(!data) return

                try {
                    const channel = guild.channels.cache.get(data.Channel)
                    const name = data.Name
                    const memberCount = guild.members.cache.filter(member => !member.user.bot).size
    
                    await channel.setName(`${name}: ${memberCount}`)
                } catch {
                    return
                }

            })

            const BotCounterSchema = require('../../database/botcounter')

            BotCounterSchema.findOne({ Guild : guild.id }, async (err, data) => {

                if(!data) return

                try {
                    const channel = guild.channels.cache.get(data.Channel)
                    const name = data.Name
                    const botCount = guild.members.cache.filter(member => member.user.bot).size
    
                    await channel.setName(`${name}: ${botCount}`)
                } catch {
                    return
                }

            })

            const OnlineCounterSchema = require('../../database/onlinecounter')

            OnlineCounterSchema.findOne({ Guild : guild.id }, async (err, data) => {

                if(!data) return

                try {
                    const onl = guild.members.cache.filter(m => m.presence?.status == 'online').filter(member => !member.user.bot).size
                    const idle = guild.members.cache.filter(m => m.presence?.status == 'idle').filter(member => !member.user.bot).size
                    const dnd = guild.members.cache.filter(m => m.presence?.status == 'dnd').filter(member => !member.user.bot).size
                    const onlineCount = onl + idle + dnd
                    const channel = guild.channels.cache.get(data.Channel)
                    const name = data.Name
    
                    await channel.setName(`${name}: ${onlineCount}`)
                } catch {
                    return
                }

            })

            setInterval(() => {

                const RoleCounterSchema = require('../../database/rolecounter')

                RoleCounterSchema.findOne({ Guild : guild.id }, async (err, data) => {
    
                    if(!data) return
    
                    try {
                        const channel = guild.channels.cache.get(data.Channel)
                        const name = data.Name
                        const roleCount = guild.members.cache.filter(member => member.roles.cache.has(data.Role)).size
        
                        await channel.setName(`${name}: ${roleCount}`)
                    } catch {
                        return
                    }
    
                })
    
                const MemberCounterSchema = require('../../database/membercounter')
    
                MemberCounterSchema.findOne({ Guild : guild.id }, async (err, data) => {
    
                    if(!data) return
    
                    try {
                        const channel = guild.channels.cache.get(data.Channel)
                        const name = data.Name
                        const memberCount = guild.members.cache.filter(member => !member.user.bot).size
        
                        await channel.setName(`${name}: ${memberCount}`)
                    } catch {
                        return
                    }
    
                })
    
                const BotCounterSchema = require('../../database/botcounter')
    
                BotCounterSchema.findOne({ Guild : guild.id }, async (err, data) => {
    
                    if(!data) return
    
                    try {
                        const channel = guild.channels.cache.get(data.Channel)
                        const name = data.Name
                        const botCount = guild.members.cache.filter(member => member.user.bot).size
        
                        await channel.setName(`${name}: ${botCount}`)
                    } catch {
                        return
                    }
    
                })
    
                const OnlineCounterSchema = require('../../database/onlinecounter')
    
                OnlineCounterSchema.findOne({ Guild : guild.id }, async (err, data) => {
    
                    if(!data) return
    
                    try {
                        const onl = guild.members.cache.filter(m => m.presence?.status == 'online').filter(member => !member.user.bot).size
                        const idle = guild.members.cache.filter(m => m.presence?.status == 'idle').filter(member => !member.user.bot).size
                        const dnd = guild.members.cache.filter(m => m.presence?.status == 'dnd').filter(member => !member.user.bot).size
                        const onlineCount = onl + idle + dnd
                        const channel = guild.channels.cache.get(data.Channel)
                        const name = data.Name
        
                        await channel.setName(`${name}: ${onlineCount}`)
                    } catch {
                        return
                    }
    
                })

            }, 1000 * 60 * 5)

        })
        
    }
}