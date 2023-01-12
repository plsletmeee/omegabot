const { Router } = require('express')
const router = Router()

router.get('/:transcriptId', async (req, res) => {
    const transcriptData = require('../../database/transcripts')
    const transcriptId = req.params.transcriptId

	transcriptData.findOne({ transcriptId: transcriptId }, async (err, data) => {
		if(!data || err) return res.redirect(301, 'https://omegabot.xyz')
        else return res.send(data.htmlCode)
	})
})

module.exports = router
