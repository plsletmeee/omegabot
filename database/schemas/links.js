const mongo = require('mongoose');

const Schema = new mongo.Schema({
    Guild : String,
    YesNo : String,
    Role : String,
});

module.exports = mongo.model('LinkSchema', Schema);