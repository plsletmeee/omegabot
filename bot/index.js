require('events').defaultMaxListeners = 40

const { Client, Collection, Partials } = require('discord.js')
const client = new Client({ intents: 3276543 }, { partials: [Object.keys(Partials)] })

const { DisTube } = require('distube')
const { SpotifyPlugin } = require('@distube/spotify')
const distube = new DisTube(client, { searchSongs: 1, emitNewSongOnly: true, leaveOnFinish: true, plugins: [new SpotifyPlugin()] })

module.exports = client
client.distube = distube

client.commands = new Collection()
client.mainCommands = new Collection()
client.omegaCommands = new Collection()

require('./handlers/database')(client)
require('./handlers/commands')(client)
require('./handlers/events')(client)
require('dotenv').config()

client.login(process.env.DJS_TOKEN)