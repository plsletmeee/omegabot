const { Router } = require('express')
const { readFileSync } = require('fs')
const { getGuildRoles } = require('./functions/discord-api')
const router = Router()

router.get('/', async (req, res) => {
    const authCookie = req.cookies.omegaAuth; if(!authCookie) return res.sendStatus(401)
    const apiResponse = await fetch(`${process.env.URL}/api/data/auth/${authCookie}`); if(apiResponse.status != 200) return res.sendStatus(401)

    const { identity, guilds } = await apiResponse.json()
    const serverArray = []
    let serverDiv

    guilds.forEach(server => {

        let iconLink = '/media/pngs/default-icon.png'
        if(server.icon) iconLink = `https://cdn.discordapp.com/icons/${server.id}/${server.icon}.webp`

        const serverHTML = 
        `<div class='server'>
            <div>
                <img src='${iconLink}'>
                <span>
                    <h5>${server.name}</h5>
                    <p>Click to manage ${server.name}'s modules.</p>
                </span>
            </div>
            <a href='/dashboard/${server.id}/modules'>Manage</a>
        </div>`

        serverArray.push(serverHTML)

    })

    if(serverArray.length) serverDiv = serverArray.toString().replaceAll('>,<', '><')
    else serverDiv = `<span>Doesn't look like you own or manage any servers with Omega Bot in them...<br><br><a href='/invite'>Let's fix that!</a></span>`

    let html = readFileSync('website/public/html/dashboard/servers.html', { encoding: 'utf8' })
    .replace(`<span id='userLogout'></span>`, `<span id='userLogout'>${identity.username}</span>`)
    .replace(`<div class='main-content'></div>`, `<div class='main-content'>${serverDiv}</div>`) 

    return res.send(html)
})

router.get('/logout', async (req, res) => {
    res.clearCookie('omegaAuth')

    return res.redirect('/')
})

router.get('/:serverId/modules', async (req, res) => {
    const authCookie = req.cookies.omegaAuth; if(!authCookie) return res.sendStatus(401)
    const apiResponse = await fetch(`${process.env.URL}/api/data/auth/${authCookie}`); if(apiResponse.status != 200) return res.sendStatus(401)
    const serverId = req.params.serverId

    const { identity, guilds } = await apiResponse.json()

    if(!guilds.some(guild => guild.id == req.params.serverId)) return res.sendStatus(403)

    let html = readFileSync('website/public/html/dashboard/modules.html', { encoding: 'utf8' })
    .replace(`<span id='userLogout'></span>`, `<span id='userLogout'>${identity.username}</span>`)
    .replaceAll(`{serverId}`, `${serverId}`)

    return res.send(html)
})

router.get('/:serverId/modules/linkdetector', async (req, res) => {
    const authCookie = req.cookies.omegaAuth; if(!authCookie) return res.sendStatus(401)
    const apiResponse = await fetch(`${process.env.URL}/api/data/auth/${authCookie}`); if(apiResponse.status != 200) return res.sendStatus(401)
    const serverId = req.params.serverId

    const { identity, guilds } = await apiResponse.json()
    const linkSchema = await require('../../database/link-detector').findOne({ guild: serverId })

    if(!guilds.some(guild => guild.id == serverId)) return res.sendStatus(403)

    const roles = await getGuildRoles(serverId)
    const roleArray = []
    let selectedRole = 'Select Role'
    let selectedColour = `style='color: #bbbbbb;'`
    let moduleStatus = 'Disabled'

    if(linkSchema && linkSchema.enabled) moduleStatus = 'Enabled'

    for (const role of roles) {
        if(role.name == '@everyone') continue

        if(linkSchema && linkSchema.exception) {
            if(linkSchema.exception == 'None') selectedRole = 'None'
            else if(role.id == linkSchema.exception) {
                selectedRole = role.name
                if(role.color) selectedColour = `style='color: #${role.color.toString(16)};'`
            }
        }

        roleArray.push(`<a data-info='${role.id}' onclick='selectOption(this)' style='color: #${role.color.toString(16)};' class='dropdown-option'>${role.name}</a>`)
    }

    let roleElements = `<a data-info='None' onclick='selectOption(this)' class='dropdown-option'>None</a>${roleArray.toString().replaceAll('>,<', '><')}`

    let html = readFileSync('website/public/html/dashboard/modules/link-detector.html', { encoding: 'utf8' })
    .replace(`<span id='userLogout'></span>`, `<span id='userLogout'>${identity.username}</span>`)
    .replace(`<div class='dropdown-content'></div>`, `<div class='dropdown-content'>${roleElements}</div>`)
    .replace(`<span class='dropdown-selected'></span>`, `<span class='dropdown-selected' ${selectedColour}>${selectedRole}</span>`)
    .replace(`{moduleStatus}`, `${moduleStatus}`)
    .replaceAll(`{serverId}`, `${serverId}`)

    return res.send(html)
})

module.exports = router