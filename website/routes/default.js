const { Router } = require('express')
const router = Router()

router.get('/', (req, res) => { return res.sendFile('website/public/html/home.html', { root: '.' }) })
router.get('/about', (req, res) => { return res.sendFile('website/public/html/about.html', { root: '.' }) })
router.get('/invite', (req, res) => { return res.redirect(301, 'https://discord.com/api/oauth2/authorize?client_id=988620875622391839&permissions=8&scope=applications.commands%20bot') })
router.get('/discord', (req, res) => { return res.redirect(301, 'https://discord.gg/uwbjNB3Z2v') })

router.get('/404', (req, res) => { 
	if(req.query.temp) return res.sendFile('website/public/html/maintenance.html', { root: '.' }) 
	else return res.sendFile('website/public/html/notfound.html', { root: '.' })  
})

module.exports = router