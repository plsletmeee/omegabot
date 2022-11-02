require('events').defaultMaxListeners = 40;

const { Client, Collection, Partials } = require('discord.js');
const client = new Client({intents: 3276799}, { partials: [Partials.Message, Partials.Channel, Partials.Reaction] });
const premium = new Client({intents: 3276799}, { partials: [Partials.Message, Partials.Channel, Partials.Reaction] });

module.exports = client;
module.exports = premium;

const { DisTube } = require('distube')
const { YtDlpPlugin } = require('@distube/yt-dlp')

client.distube = new DisTube(client, { 
    searchSongs: 1, 
    emitNewSongOnly: true,
    plugins: [
        new YtDlpPlugin()
    ],
});

premium.distube = new DisTube(premium, { 
    searchSongs: 1, 
    emitNewSongOnly: true,
    plugins: [
        new YtDlpPlugin()
    ],
});

client.commands = new Collection();
premium.commands = new Collection();
premium.enabled = false;

require('./handlers/mongodb')(client, premium);
require('./handlers/commands')(client, premium);
require('./handlers/events')(client, premium);
require('dotenv').config();

client.login(process.env.MAIN_BOT_TOKEN || process.env.TEST_BOT_TOKEN);
if(premium.enabled !== false) premium.login(process.env.PREMIUM_BOT_TOKEN || process.env.TEST_BOT_TOKEN);