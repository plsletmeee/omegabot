const clientId = '988620875622391839';
const DiscordRPC = require('discord-rpc');
const RPC = new DiscordRPC.Client({transport: 'ipc'});

DiscordRPC.register(clientId);

async function setActivity() {
    if(!RPC) return;
    RPC.setActivity({
        details: `Get Omega Bot!`,
        largeImageKey: `omegabot`,
        largeImageText: `Omega Logo`,
        instance: false,
    })
}

RPC.on('ready', async () => {
    setActivity();
    console.log('[RPC] Statuses were loaded successfully.')

    setActivity(() => {
        setActivity();
    }, 15 * 1000);
})

RPC.login({ clientId }).catch(err => {console.log(`Discord RPC Error: ${err}`)})