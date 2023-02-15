const { Router } = require('express')
const { v4: uuidv4 } = require('uuid')
const authData = require('../../database/dashboard-auth')
const router = Router()

router.get('/', (req, res) => {
    if(process.env.URL == 'http://localhost:3005')
    return res.redirect('https://discord.com/api/oauth2/authorize?client_id=1046548033552273469&redirect_uri=http%3A%2F%2Flocalhost%3A3005%2Fauth%2Fredirect&response_type=code&scope=identify%20guilds')

    else
    return res.redirect('https://discord.com/api/oauth2/authorize?client_id=988620875622391839&redirect_uri=https%3A%2F%2Fomegabot.xyz%2Fauth%2Fredirect&response_type=code&scope=identify%20guilds')
})

router.get('/redirect', async (req, res) => {
    
    const clientId = process.env.DJS_CI
    const clientSecret = process.env.DJS_CS
    const code = req.query.code
    const authCookie = req.cookies.omegaAuth

    if(!code) return res.redirect('/auth') // if user has no auth cookie they need to get one
    else if(authCookie) res.clearCookie('omegaAuth') // else if user has one we need to clear it

    // using the auth code from discord, we fetch an access token
    const responseData = await fetch('https://discord.com/api/oauth2/token', {
        method: 'POST',
        body: new URLSearchParams({
            client_id: clientId,
            client_secret: clientSecret,
            code,
            grant_type: 'authorization_code',
            redirect_uri: `${process.env.URL}/auth/redirect`,
            scope: 'identify guilds',
        }).toString(),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })

    const { access_token, refresh_token, token_type } = await responseData.json()

    // using the token to fetch the user's data from discord
    const identityData = await (await fetch('https://discord.com/api/users/@me', {headers: {authorization: `${token_type} ${access_token}`}})).json()
    const newUUID = uuidv4()

    res.cookie('omegaAuth', newUUID, { maxAge: 1209600000 }) // saving the new UUID in a cookie

    const schema = await authData.findOne({ user: identityData.id })
    if(schema) schema.delete()

    new authData({
        user: identityData.id,
        cookie: newUUID,
        refreshToken: refresh_token
    }).save()

    setTimeout(() => {
        return res.redirect('/dashboard')
    }, 1000)

})

module.exports = router
