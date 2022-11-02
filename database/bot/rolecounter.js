const mongo = require('mongoose');

const Schema = new mongo.Schema({
    Guild : String,
    Channel : String,
    Role : String,
    Name : String,
});

module.exports = mongo.model('RoleCounterSchema', Schema);