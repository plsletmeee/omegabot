const mongo = require('mongoose');

const Schema = new mongo.Schema({
    Guild : String,
    Channel : String,
    Spam : String,
});

module.exports = mongo.model('LevelsSchema', Schema);