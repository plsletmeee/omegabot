const { Router } = require('express')
const router = Router()
const dotenv = require('dotenv')

dotenv.config()

// Testing
router.post('/0', async (req, res) => {

    const authHeader = req.get('Authorization'); if(!authHeader) return res.status(401).send({ message: 'Missing Authorization Header', code: 401 })
    const apiResponse = await fetch(`${process.env.URL}/api/data/auth/${authHeader.split(' ')[1]}`); if(apiResponse.status != 200) return res.status(401).send({ message: 'Invalid Authorization Header', code: 401 })
    const { identity, guilds } = await apiResponse.json()

    if(!req.body.guild) return res.status(401).send({ message: 'Missing Guild', code: 400 })
    if(!guilds.some(guild => guild.id == req.body.guild)) return res.status(403).send({ message: 'Forbidden Guild', code: 403 })
    
    res.status(201).send({ message: 'Successful Update', code: 201 })

})

// Link Detector
router.post('/1', async (req, res) => {

    const authHeader = req.get('Authorization'); if(!authHeader) return res.status(401).send({ message: 'Missing Authorization Header', code: 401 })
    const apiResponse = await fetch(`${process.env.URL}/api/data/auth/${authHeader.split(' ')[1]}`); if(apiResponse.status != 200) return res.status(401).send({ message: 'Invalid Authorization Header', code: 401 })
    const { identity, guilds } = await apiResponse.json()

    if(!req.body.guild) return res.status(401).send({ message: 'Missing Guild String', code: 400 })
    if(!guilds.some(guild => guild.id == req.body.guild)) return res.status(403).send({ message: 'Forbidden Guild', code: 403 })

    const db = require('../../../database/link-detector')
    const schema = await db.findOne({ guild: req.body.guild })

    if(schema) {
        if(req.body.enabled != undefined) schema.enabled = req.body.enabled
        if(req.body.exception) schema.exception = req.body.exception

        schema.save()
    } else {
        new db({
            guild: req.body.guild,
            enabled: req.body.enabled || false,
            exception: req.body.exception || 'None'
        }).save()
    }

    return res.status(201).send({ message: 'Successful Update', code: 201 })

})

// Reaction Roles
router.post('/2', async (req, res) => {

    const authHeader = req.get('Authorization'); if(!authHeader) return res.status(401).send({ message: 'Missing Authorization Header', code: 401 })
    const apiResponse = await fetch(`${process.env.URL}/api/data/auth/${authHeader.split(' ')[1]}`); if(apiResponse.status != 200) return res.status(401).send({ message: 'Invalid Authorization Header', code: 401 })
    const { identity, guilds } = await apiResponse.json()

    if(!req.body.guild) return res.status(401).send({ message: 'Missing Guild String', code: 400 })
    if(!guilds.some(guild => guild.id == req.body.guild)) return res.status(403).send({ message: 'Forbidden Guild', code: 403 })

    const db = require('../../../database/reaction-roles')

    new db({
        guild: req.body.guild,
        channel: req.body.channel,
        message: req.body.message,
        reactions: req.body.reactions,
        sentStatus: false
    }).save()

    return res.status(201).send({ message: 'Successful Update', code: 201 })

})

module.exports = router
