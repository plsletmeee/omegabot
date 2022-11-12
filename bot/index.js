// -- Dev Notice --
// Please do not add anything here without permission from Xictul as any changes could break the bot.


// Welcome to the Omega Bot Index file. This is the main file for the discord bot. All other files, relating to the bot itself, are activated from here.

require('events').defaultMaxListeners = 40; // see this for info on event listeners: https://nodejs.org/api/events.html

// this is for setting up the bot clients
const { Client, Collection, Partials } = require('discord.js');
const client = new Client({intents: 3276799}, { partials: [Partials.Message, Partials.Channel, Partials.Reaction] });
const premium = new Client({intents: 3276799}, { partials: [Partials.Message, Partials.Channel, Partials.Reaction] });

module.exports = client;
module.exports = premium;

// this is for setting up the distube package
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

// this is adding the global variables for use in other files
client.commands = new Collection();
premium.commands = new Collection();
premium.enabled = false;

require('./handlers/mongodb')(client, premium); // loads the database
require('./handlers/commands')(client, premium); // loads the bot commands
require('./handlers/events')(client, premium); // loads the bot events
require('dotenv').config();

client.login(process.env.MAIN_BOT_TOKEN || process.env.TEST_BOT_TOKEN); // logs in the main or testing bot (main bot token stored on bot server)
if(premium.enabled) premium.login(process.env.PREMIUM_BOT_TOKEN); // logs in the premium bot (when allowed to)