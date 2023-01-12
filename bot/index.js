require('events').defaultMaxListeners = 40

const { Client, Collection, Partials } = require('discord.js')
const client = new Client({intents: 3276799}, { partials: [Partials.Message, Partials.Channel, Partials.Reaction] })

const { DisTube } = require('distube')
const { YtDlpPlugin } = require('@distube/yt-dlp')
const distube = new DisTube(client, { searchSongs: 1, emitNewSongOnly: true, plugins: [new YtDlpPlugin()] })

module.exports = client
client.distube = distube

client.commands = new Collection()
client.mainCommands = new Collection()
client.omegaCommands = new Collection()
client.premiumCommands = new Collection()

require('./handlers/database')(client)
require('./handlers/commands')(client)
require('./handlers/events')(client)
require('dotenv').config()

client.login(process.env.DJS_TOKEN || process.env.DJS_TEST)

// todo in next update
// ban.js
// calculate.js
// embed.js
// guide.js
// kick.js
// rank.js
// rankdata.js
// rock-paper-scissors.js
// tic-tac-toe.js
// whois.js
// basically all events and database things
