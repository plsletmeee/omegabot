const mongoose = require('mongoose')

const reactionRoles = new mongoose.Schema({
    guild: String,
    channel: String,
    messageId: String,
    message: String,
    reactions: Array,
    sentStatus: Boolean,
})

module.exports = mongoose.model('reaction_roles', reactionRoles)