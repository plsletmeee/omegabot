const { Router } = require('express')
const router = Router()

router.get('/', async (req, res) => { return res.sendFile('website/public/html/policies.html', { root: '.' }) })
router.get('/terms', async (req, res) => { return res.sendFile('website/public/html/terms.html', { root: '.' }) })
router.get('/privacy', async (req, res) => { return res.sendFile('website/public/html/privacy.html', { root: '.' }) })

module.exports = router