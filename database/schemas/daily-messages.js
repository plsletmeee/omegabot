const mongo = require('mongoose');

const Schema = new mongo.Schema({
    Guild : String,
    Channel : String,
    Message : String,
    Time : String,
});

module.exports = mongo.model('DailyMessagesSchema', Schema);