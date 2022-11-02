const LinkSchema = require('../../../database/bot/links');
const LevelSchema = require('../../../database/bot/memberlevels')
const LevelDataSchema = require('../../../database/bot/levels');

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

            if(err || !data) {
                return new LevelSchema ({
                    Guild : message.guild.id,
                    ID : message.author.id,
                    Level : 0,
                    XP : 0,
                }).save();
            };

            let level = data.Level;
            let xp = data.XP;
            let id = data.ID;
            let highestXP = data.Level * 1000;

            if(xp > 1000 && level == 0) {
                channel.send(`<@${id}> you levelled up! 🥳\nYou are now level ${level + 1}.`).catch(() => {return});
                data.Level = level + 1;
                data.XP = 0;
                data.save();
            } else 
            
            if(xp > highestXP && level > 0) { 
                channel.send(`<@${id}> you levelled up! 🥳\nYou are now level ${level + 1}.`).catch(() => {return});
                data.Level = level + 1;
                data.XP = 0;
                data.save();
            } else 

            if(xp < 1000 && level == 0) {
                data.XP = xp + Math.floor(Math.random() * 100),
                data.save();
            } else 
            
            if(xp < highestXP && level > 0) { 
                data.XP = xp + Math.floor(Math.random() * 100),
                data.save();
            };
    
        });
        });
    }
}