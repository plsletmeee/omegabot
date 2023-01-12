const mongoose = require('mongoose')

const transcripts = new mongoose.Schema({
    transcriptId: String,
    htmlCode: String,
})

module.exports = mongoose.model('transcripts', transcripts)