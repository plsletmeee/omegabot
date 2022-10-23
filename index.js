require('events').defaultMaxListeners = 40;

const { Client, Collection, Partials } = require('discord.js');
const client = new Client({intents: 3276799}, { partials: [Partials.Message, Partials.Channel, Partials.Reaction] });

module.exports = client;

const { DisTube } = require('distube')
const { YtDlpPlugin } = require('@distube/yt-dlp')
client.distube = new DisTube(client, { 
    searchSongs: 1, 
    emitNewSongOnly: true,
    plugins: [
        new YtDlpPlugin()
    ],
});

client.commands = new Collection();

require('./handlers/mongodb')(client);
require('./handlers/commands')(client);
require('./handlers/events')(client);
require('dotenv').config();

client.login(process.env.MAIN_BOT_TOKEN || process.env.TEST_BOT_TOKEN);