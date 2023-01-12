const { Router } = require('express')
const router = Router()

router.get('/', (req, res) => {
	return res.sendFile('website/pages/homepage.html', { root: '.' })
})

router.get('/dashboard', (req, res) => {
	return res.sendFile('website/pages/dashboard.html', { root: '.' })
})

router.get('/auth', (req, res) => {
	return res.redirect(301, 'https://discord.com/api/oauth2/authorize?client_id=988620875622391839&redirect_uri=https%3A%2F%2Fwww.omegabot.xyz%2Fdashboard&response_type=token&scope=identify%20guilds')
})

router.get('/invite', (req, res) => {
	return res.redirect(301, 'https://discord.com/api/oauth2/authorize?client_id=988620875622391839&permissions=8&scope=applications.commands%20bot')
})

module.exports = router
