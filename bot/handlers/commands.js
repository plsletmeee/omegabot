const { readdirSync } = require('fs')
const client = require('../index')

/**
* @param {client} client 
*/
module.exports = async (client) => {
    try {
        const files = readdirSync('./bot/commands').filter(file => file.endsWith('.js'))
        const mainCommands = []
        const omegaCommands = []
        const premiumCommands = []

        for (const file of files) {
            const command = require(`../commands/${file}`)

            if(command.disabled) continue

            if(command.premium) client.premiumCommands.set(command.name, command), premiumCommands.push(command)
            else if(command.omega) client.omegaCommands.set(command.name, command), omegaCommands.push(command)
            else client.mainCommands.set(command.name, command), mainCommands.push(command)

            client.commands.set(command.name, command)
        }

        client.on('ready', () => {
            const guildSettings = require('../../database/guildSettings')
   
            client.application.commands.set([])
            client.application.commands.set(mainCommands)
            
            client.guilds.cache.forEach(guild => {
                guild.commands.set([])

                if(guild.id == '1009837302954074262') guild.commands.set(omegaCommands)

                guildSettings.findOne({ guild: guild.id }, (err, data) => {
                    if(!data || err) return
                    if(data.premium) guild.commands.set(premiumCommands)
                })

                // guild.commands.set([])
                // guild.commands.set(mainCommands)

            }) 
            
            
            // TESTING ONLY
            // client.guilds.cache.forEach(guild => {
            //     if(guild.id == '1061702951854424155') {
            //         guild.commands.set([])
            //         guild.commands.set(mainCommands)
            //     }
            // })

            // // client.application.commands.set([])
            // // client.application.commands.set(mainCommands)
        })

        console.log('✨ Commands Loaded')
    } catch(err) {return console.log(err)}
}