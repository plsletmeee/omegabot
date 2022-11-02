const mongo = require('mongoose');

const Schema = new mongo.Schema({
    Guild : String,
    ID : String,
    Level : Number,
    XP : Number,
});

module.exports = mongo.model('MemberLevelsSchema', Schema);