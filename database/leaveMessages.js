const mongoose = require('mongoose')

const leaveMessages = new mongoose.Schema({
    guild: String,
    message: String,
    picture: String,
    channel: String,
    embeded: Boolean,
    mention: Boolean,
    enabled: Boolean
})

module.exports = mongoose.model('leave_messages', leaveMessages)