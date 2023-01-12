const mongoose = require('mongoose')

const joinMessages = new mongoose.Schema({
    guild: String,
    message: String,
    picture: String,
    channel: String,
    embeded: Boolean,
    mention: Boolean,
    enabled: Boolean
})

module.exports = mongoose.model('join_messages', joinMessages)