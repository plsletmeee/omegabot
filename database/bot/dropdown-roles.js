const mongo = require('mongoose');

const Schema = new mongo.Schema({
    Guild : String,
    MessageID : String,
    Roles : String,
});

module.exports = mongo.model('DropdownRoleSchema', Schema);