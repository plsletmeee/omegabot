const mongo = require('mongoose');

const Schema = new mongo.Schema({
    Guild : String,
    PanelChannel : String,
    PanelMessage : String,
    TicketCategory : String,
    TicketMessage : String,
    TicketRole : String,
});

module.exports = mongo.model('TicketSchema', Schema);