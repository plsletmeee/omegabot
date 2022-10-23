const LinkSchema = require('../database/schemas/links');
const LevelSchema = require('../database/schemas/memberlevels')
const LevelDataSchema = require('../database/schemas/levels');

module.exports = {
    name: 'messageCreate',
    async execute(message) {

        if(message.guild === null) return;

        LinkSchema.findOne({ Guild : message.guild.id }, (err, data) => {

                const linkTypes = ["http", "://", "www.", ".com", ".co.uk", ".gg", ".gif", ".io", ".html", ".php"];

                if(!data) return;
                if(message.author.bot) return;
    
                if(data.YesNo === "true") {
    
                    if(message.member.roles.cache?.has(data.Role)) return;
    
                    linkTypes.forEach(type => {
                        if(message.content.includes(type)) message.delete().catch(() => {return});
                    })
    
                } else return;

        });


        LevelDataSchema.findOne({ Guild : message.guild.id }, (err, data) => {

            if(message.author.bot) return;
            if(!data) return;
            if(data.Spam === message.channel.id) return;

            const channel = message.guild.channels.cache.get(data.Channel);

        LevelSchema.findOne({ Guild : message.guild.id, ID : message.author.id }, async (err, data) => {

            if(err) {
                return new LevelSchema ({
                    Guild : message.guild.id,
                    ID : message.author.id,
                    Level : 0,
                    XP : 0,
                }).save();
            }
            
            if(!data) {
                return new LevelSchema ({
                    Guild : message.guild.id,
                    ID : message.author.id,
                    Level : 0,
                    XP : 0,
                }).save();
            };

            const level = data.Level;
            const xp = data.XP;
            const id = data.ID;
            const highestXP = data.Level * 1000;

            if(xp === 1000 && level === 0) { 
                data.Level = level + 1,
                data.XP = 0;
                data.save();
                channel.send(`<@${id}> you levelled up! 🥳\nYou are now level ${level + 1}.`).catch(() => {return});
            } else if(xp === highestXP && level !== 0) { 
                data.Level = level + 1,
                data.XP = 0;
                data.save();
                channel.send(`<@${id}> you levelled up! 🥳\nYou are now level ${level + 1}.`).catch(() => {return});
            } 

            if(xp < highestXP && level !== 0) {
                data.XP = xp + 50,
                data.save();
            } else if(xp < 1000 && level === 0) {
                data.XP = xp + 50,
                data.save();
            };
    
        });
        });
    }
}