const { readdirSync } = require('fs');

module.exports = async (client, premium) => {

    try {

        const eventFiles = readdirSync(`./events/main`).filter(files => files.endsWith('.js'));

        eventFiles.forEach((file) => {
            const event = require(`../events/main/${file}`);
            if(event.once) client.once(event.name, (...args) => event.execute(...args, client));
            else client.on(event.name, (...args) => event.execute(...args, client));
        });

        console.log("[MAIN] Events were loaded successfully.");

    } catch(err) {
        return console.log(err);
    }

    try {

        if(premium.enabled == false) return;

        const eventFiles = readdirSync(`./events/premium`).filter(files => files.endsWith('.js'));

        eventFiles.forEach((file) => {
            const event = require(`../events/premium/${file}`);
            if(event.once) premium.once(event.name, (...args) => event.execute(...args, premium));
            else premium.on(event.name, (...args) => event.execute(...args, premium));
        });

        console.log("[PREMIUM] Events were loaded successfully.");

    } catch(err) {
        return console.log(err);
    }

}