const mongoose = require('mongoose')

const polls = new mongoose.Schema({
    voters: Array,
    uuid: String,
    guild: String
})

module.exports = mongoose.model('polls', polls)