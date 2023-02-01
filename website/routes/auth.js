const { Router } = require('express')
const { v4: uuidv4 } = require('uuid')
const authData = require('../../database/dashboardAuth')
const router = Router()

router.get('/', (req, res) => {
	return res.redirect(301, 'https://discord.com/api/oauth2/authorize?client_id=1046548033552273469&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth%2Fredirect&response_type=code&scope=identify%20guilds')
})

router.get('/redirect', async (req, res) => {
    
    const clientId = process.env.DJS_CI || process.env.DJS_CI_TEST
    const clientSecret = process.env.DJS_CS || process.env.DJS_CS_TEST
    const code = req.query.code
    const authCookie = req.cookies.authCookie

    if(!code) res.redirect(301, '/auth')
    if(authCookie) res.clearCookie('auth')

    const responseData = await fetch('https://discord.com/api/oauth2/token', {
        method: 'POST',
        body: new URLSearchParams({
            client_id: clientId,
            client_secret: clientSecret,
            code,
            grant_type: 'authorization_code',
            redirect_uri: 'http://localhost:3000/auth/redirect',
            scope: 'identify',
        }).toString(),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })

    const oauthData = await responseData.json()
    const { access_token, refresh_token, token_type } = oauthData

    const identityData = await (await fetch('https://discord.com/api/users/@me', {headers: {authorization: `${token_type} ${access_token}`}})).json()
    const userId = identityData.id
    const newUUID = uuidv4()

    res.cookie('auth', newUUID, { maxAge: 1209600000 })

    authData.findOne({ user: userId }, async (err, data) => {
        if(data) {
            data.cookie = newUUID
            data.refreshToken = refresh_token
            data.save()
        } else {
            new authData({
                user: userId,
                cookie: newUUID,
                refreshToken: refresh_token
            }).save()
        }
    })

    return res.redirect(301, '/dash')

})

module.exports = router
