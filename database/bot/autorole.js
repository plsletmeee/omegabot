const mongo = require('mongoose');

const Schema = new mongo.Schema({
    Guild : String,
    Screening : String,
    Role : String,
});

module.exports = mongo.model('AutoroleSchema', Schema);