const mongo = require('mongoose');

const Schema = new mongo.Schema({
    Guild : String,
    Channel : String,
    Name : String,
});

module.exports = mongo.model('MemberCounterSchema', Schema);