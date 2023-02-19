const TOKEN = process.env.DJS_TOKEN

async function getBotGuilds() {
    const response = await fetch(`https://discord.com/api/users/@me/guilds`, {
        method: 'GET',
        headers: { Authorization: `Bot ${TOKEN}` }
    })
    
    const array = await response.json()
    array.sort((a, b) => { return a.position - b.position })

    return array
}

async function getGuildRoles(guildId) {
    const response = await fetch(`https://discord.com/api/guilds/${guildId}/roles`, {
        method: 'GET',
        headers: { Authorization: `Bot ${TOKEN}` }
    })
        
    const array = await response.json()
    array.sort((a, b) => { return a.position - b.position })

    return array
}

async function getGuildChannels(guildId) {
    const response = await fetch(`https://discord.com/api/guilds/${guildId}/channels`, {
        method: 'GET',
        headers: { Authorization: `Bot ${TOKEN}` }
    })
        
    const array = await response.json()
    array.sort((a, b) => { return a.position - b.position })

    return array
}

module.exports = { getBotGuilds, getGuildRoles, getGuildChannels }