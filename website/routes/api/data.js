const { Router } = require('express')
const { getBotGuilds } = require('../functions/discord-api')
const { PermissionsBitField } = require('discord.js')
const router = Router()

const dashboardAuthData = require('../../../database/dashboard-auth')
const botStats = require('../../../database/botStatistics')

router.get('/auth/:auth', async (req, res) => {

    try {
        const clientId = process.env.DJS_CI
        const clientSecret = process.env.DJS_CS
        const authParam = req.params.auth
    
        const authData = await dashboardAuthData.findOne({ cookie: authParam })
        const guildList = await getBotGuilds()
    
        if(!authParam || !authData) return res.sendStatus(401)
        if(!authData.refreshToken) return res.sendStatus(401)
    
        const oauthResponse = await (await fetch('https://discord.com/api/oauth2/token', {
            method: 'POST',
            body: new URLSearchParams({ client_id: clientId, client_secret: clientSecret, refresh_token: authData.refreshToken, grant_type: 'refresh_token', scope: 'identify guilds' }).toString(),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })).json()
    
        const { access_token, refresh_token, token_type } = oauthResponse
        const identity = await (await fetch('https://discord.com/api/users/@me', {headers: {authorization: `${token_type} ${access_token}`}})).json()
        const guilds = await (await fetch('https://discord.com/api/users/@me/guilds', {headers: {authorization: `${token_type} ${access_token}`}})).json()
        const mutualGuilds = []
    
        authData.refreshToken = refresh_token
        authData.save()
    
        guildList.forEach(botGuild => { guilds.forEach(userGuild => {
            const bitPermissions = new PermissionsBitField(BigInt(userGuild.permissions))
            if(userGuild.id == botGuild.id && bitPermissions.has(PermissionsBitField.Flags.ManageGuild)) mutualGuilds.push(userGuild)
        })})
    
        const data = { identity: identity, guilds: mutualGuilds }
        return res.send(data)
    } catch {
        return res.sendStatus(500)
    }

})

router.get('/botstats', async (req, res) => {
    
    const statsData = await botStats.findById('63c4559e6b831d6faa89d5d7')

    const guilds = statsData.guilds.length
    const members = statsData.members
    const commands = statsData.commands

    const data = { servers: guilds, users: members, commands: commands }
    return res.send(data)

})

router.get('*', (req, res) => { return res.sendStatus(404) })

module.exports = router
