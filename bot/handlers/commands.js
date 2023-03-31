const { readdirSync } = require('fs')
const client = require('../index')

/**
* @param {client} client 
*/
module.exports = async (client) => {

    try {
        const folders = readdirSync('./bot/commands')
        const mainCmd = []
        const omegCmd = []
        let cmdsCount = 0

        for(const folder of folders) {
            const files = readdirSync(`./bot/commands/${folder}`).filter(file => file.endsWith('.js'))

            for (const file of files) {
                const command = require(`../commands/${folder}/${file}`)

                if(command.disabled) continue
                
                client.mainCommands.set(command.name, command), mainCmd.push(command)
                client.commands.set(command.name, command)
    
            }
        }

        // Updating Command Count
        for(const command of mainCmd) {
            if(command.name != command.description) cmdsCount++
            else { command.options.forEach(commandOption => {
                    if(commandOption.type == 1) cmdsCount++
                    if(commandOption.type == 2) { commandOption.options.forEach(commandGroupOption => {
                    if(commandGroupOption.type == 1) cmdsCount++ }) }
                })
            }
        }

        client.on('ready', async () => {
            // Pushing New Commands (Dev)
            client.guilds.cache.forEach(guild => {
                guild.commands.set([])
                guild.commands.set(mainCmd)
            })

            // Pushing New Commands (Prod)
            client.application.commands.set([])
            // client.application.commands.set(mainCmd)

            // Updating Bot Statistics
            if(client.user.id != '1046548033552273469') {
                const botStatistics = await require('../../database/botStatistics').findById('63c4559e6b831d6faa89d5d7')

                botStatistics.commands = cmdsCount
                botStatistics.save()
            }

        })

        console.log('✨ Commands Loaded')
    } catch(err) {return console.log(err)}
}
