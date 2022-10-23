const { readdirSync } = require('fs');

module.exports = async (client) => {

    try {

        const eventFiles = readdirSync(`./events`).filter(files => files.endsWith('.js'));

        eventFiles.forEach((file) => {
            const event = require(`../events/${file}`);
            if(event.once) client.once(event.name, (...args) => event.execute(...args, client));
            else client.on(event.name, (...args) => event.execute(...args, client));
        });

        console.log("✅ Events were loaded successfully.");

    } catch(err) {
        return console.log(err);
    }

}