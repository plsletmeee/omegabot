const LevelSchema = require('../../database/memberlevels')
const LevelDataSchema = require('../../database/levels')

const { Message } = require('discord.js')

module.exports = {
    name: 'messageCreate',
    /**
    * @param {Message} message 
    */
    async execute(message) {

        if(!message.guild || message.author.bot) return

        // link detector
        const linkSchema = await require('../../database/link-detector').findOne({ guild: message.guild.id })
        if(linkSchema && linkSchema.enabled) {
            if(message.deletable)
            if(!message.member.roles.cache.has(linkSchema.exception))
            if(message.content.includes('http://') || message.content.includes('https://')) message.delete()
        }

        // levels
        LevelDataSchema.findOne({ Guild : message.guild.id }, (err, data) => {

            if(message.author.bot) return
            if(!data) return
            if(data.Spam === message.channel.id) return

            const channel = message.guild.channels.cache.get(data.Channel)

        LevelSchema.findOne({ Guild : message.guild.id, ID : message.author.id }, async (err, data) => {

            if(err || !data) {
                return new LevelSchema ({
                    Guild : message.guild.id,
                    ID : message.author.id,
                    Level : 0,
                    XP : 0,
                }).save()
            }

            let level = data.Level
            let xp = data.XP
            let id = data.ID
            let highestXP = data.Level * 1000

            if(xp >= 1000 && level == 0) {
                channel.send(`<@${id}> you levelled up! 🥳\nYou are now level ${level + 1}.`).catch(() => {return})
                data.Level = level + 1
                data.XP = 0
                data.save()
            } else 
            
            if(xp >= highestXP && level > 0) { 
                channel.send(`<@${id}> you levelled up! 🥳\nYou are now level ${level + 1}.`).catch(() => {return})
                data.Level = level + 1
                data.XP = 0
                data.save()
            } else 

            if(xp <= 1000 && level == 0) {
                data.XP = xp + Math.floor(Math.random() * 100),
                data.save()
            } else 
            
            if(xp <= highestXP && level > 0) { 
                data.XP = xp + Math.floor(Math.random() * 100),
                data.save()
            }
    
        })
        })
    }
}