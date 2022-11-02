const { readdirSync } = require('fs');

module.exports = (client, premium) => {

    try {

        const commandFiles = readdirSync(`./bot/commands/main`).filter(files => files.endsWith('.js'));
        const commandsArray = [];

        commandFiles.forEach((file) => {
            const command = require(`../commands/main/${file}`);
            client.commands.set(command.name, command);
            commandsArray.push(command);
        });

        client.on("ready", () => {
            client.application.commands.set(commandsArray);
        })
        
        console.log("[MAIN] Commands were loaded successfully.");

    } catch(err) {
        return console.log(err);
    }

    try {

        if(premium.enabled == false) return;

        const commandFiles = readdirSync(`./commands/premium`).filter(files => files.endsWith('.js'));
        const commandsArray = [];

        commandFiles.forEach((file) => {
            const command = require(`../commands/premium/${file}`);
            premium.commands.set(command.name, command);
            commandsArray.push(command);
        });

        premium.on("ready", () => {
            premium.application.commands.set(commandsArray);
        })
        
        console.log("[PREMIUM] Commands were loaded successfully.");

    } catch(err) {
        return console.log(err);
    }

};