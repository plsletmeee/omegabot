const { readdirSync } = require('fs')
const client = require('../index')

/**
* @param {client} client 
*/
module.exports = async (client) => {
    try {
        const files = readdirSync('./bot/events').filter(file => file.endsWith('.js'))

        for (const file of files) {
            const event = require(`../events/${file}`)
            
            if(event.once) client.once(event.name, (...args) => event.execute(...args, client))
            else client.on(event.name, (...args) => event.execute(...args, client))
        }

        console.log('✨ Events Loaded')
    } catch(err) {return console.log(err)}
}