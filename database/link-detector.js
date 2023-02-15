const mongoose = require('mongoose')

const linkDetector = new mongoose.Schema({
    guild: String,
    enabled: Boolean,
    exception: String
})

module.exports = mongoose.model('link_detector', linkDetector)