const { Router } = require('express')
const { readFileSync } = require('fs')
const router = Router()
const dotenv = require('dotenv')

dotenv.config()

let clientId = process.env.DJS_CI

// Main

router.get('/', async (req, res) => {
	let html = await editedHTML(req.cookies.omegaAuth, 'home')
	res.send(html)
})

router.get('/about', async (req, res) => {
	let html = await editedHTML(req.cookies.omegaAuth, 'about')
	res.send(html)
})

router.get('/404', async (req, res) => {
	let html = await editedHTML(req.cookies.omegaAuth, 'notfound')
	res.send(html)
})

router.get('/policies', async (req, res) => {
	let html = await editedHTML(req.cookies.omegaAuth, 'policies')
	res.send(html)
})

router.get('/terms', async (req, res) => {
	let html = await editedHTML(req.cookies.omegaAuth, 'terms')
	res.send(html)
})

router.get('/privacy', async (req, res) => {
	let html = await editedHTML(req.cookies.omegaAuth, 'privacy')
	res.send(html)
})

router.get('/stats', async (req, res) => {
	let html = await editedHTML(req.cookies.omegaAuth, 'stats')
	let apiResponse = await (await fetch(`${process.env.URL}/api/data/botstats`)).json()

	html = html.replace('{serverCount}', apiResponse.servers).replace('{userCount}', apiResponse.users).replace('{commandCount}', apiResponse.commands)
	res.send(html)
})

router.get('/discord', (req, res) => { return res.redirect('https://discord.gg/enGBYEvW6s') })
router.get('/invite', (req, res) => { return res.redirect(`https://discord.com/api/oauth2/authorize?scope=applications.commands%20bot&client_id=${clientId}&permissions=1513962695871`) })

// Transcripts
router.get('/transcript/:transcriptId', async (req, res) => {
    const transcriptData = require('../../database/transcripts')
    const transcriptId = req.params.transcriptId

	transcriptData.findOne({ transcriptId: transcriptId }, async (err, data) => {
		if(!data || err) return res.redirect('/')
        else return res.send(data.htmlCode)
	})
})



/**
 * 
 * @param {String} authCookie The auth cookie
 * @param {String} file The file name
 * @returns The edited HTML code
 */
async function editedHTML(authCookie, file) {
	let html = readFileSync(`website/public/html/main/${file}.html`, { encoding: 'utf8' })

	if(authCookie) {
		const apiResponse = await fetch(`${process.env.URL}/api/data/auth/${authCookie}`)

		if(apiResponse.status == 200) {
			const { identity } = await apiResponse.json()

			let avatarLink = '/media/pngs/default-icon.png'
			if(identity.avatar) avatarLink = `https://cdn.discordapp.com/avatars/${identity.id}/${identity.avatar}.webp`

			html = html.replaceAll(`{loginLink}`, `/dashboard`).replace(`<img class='user-icon'>`, `<img class='user-icon' src='${avatarLink}'`)
		} else html = html.replaceAll(`{loginLink}`, `/auth`).replace(`<img class='user-icon'>`, ``)
	} else html = html.replaceAll(`{loginLink}`, `/auth`).replace(`<img class='user-icon'>`, ``)

	return html
}

module.exports = router