const mongoose = require('mongoose')

const botStatistics = new mongoose.Schema({
    guilds: Array,
    members: Number,
    commands: Number
})

module.exports = mongoose.model('bot_statistics', botStatistics)