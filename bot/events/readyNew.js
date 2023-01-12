const { ActivityType } = require('discord.js')

module.exports = {
    name: "ready",
    once: true,
    async execute(client) {
        client.user.setActivity(`The Robot Uprising`, { type: ActivityType.Watching })
        client.user.setStatus("idle")

        console.log(`✨ ${client.user.username} Online.`)
    }
}