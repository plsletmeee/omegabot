const { ChatInputCommandInteraction, ApplicationCommandOptionType } = require('discord.js')
const client = require('../index')

module.exports = {
    name: 'chatbot',
    description: 'Talk with Omega [BETA]',
    options: [
        {
            name: 'prompt',
            description: 'What you want to say',
            required: true,
            type: ApplicationCommandOptionType.String
        }
    ],
    /**
    * @param {ChatInputCommandInteraction} interaction
    * @param {client} client
    */
    async execute(interaction, client) {
        await interaction.deferReply()

        const prompt = interaction.options.getString('prompt').replaceAll(' ', '+')
        const string = await (await fetch(`https://api.popcat.xyz/chatbot?msg=${prompt}&owner=the+Omega+Team&botname=Omega`)).json()

        setTimeout(() => {interaction.editReply(string.response)}, 3000)
		
    }
}