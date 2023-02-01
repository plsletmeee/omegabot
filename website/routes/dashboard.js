const { Router } = require('express')
const router = Router()

router.get('/', async (req, res) => { return res.redirect(301, '/404?temp=0') })

module.exports = router