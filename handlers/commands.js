const { readdirSync } = require('fs');

module.exports = (client) => {

    try {

        const commandFiles = readdirSync(`./commands`).filter(files => files.endsWith('.js'));
        const commandsArray = [];

        commandFiles.forEach((file) => {
            const command = require(`../commands/${file}`);
            client.commands.set(command.name, command);
            commandsArray.push(command);
        });

        client.on("ready", () => {
            client.application.commands.set(commandsArray);
        })
        
        console.log("✅ Commands were loaded successfully.");

    } catch(err) {
        return console.log(err);
    }

};