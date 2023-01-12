const mongoose = require('mongoose')

const guildSettings = new mongoose.Schema({
    guild: String,
    premium: Boolean,
})

module.exports = mongoose.model('guild_settings', guildSettings)