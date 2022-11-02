const { getdadjoke } = require('get-dadjoke');

module.exports = {
    name: "dadjoke",
    description: "Get a random dad joke",
    async execute(interaction) {

        const joke = await getdadjoke()

        interaction.reply(joke);
        
    }
}