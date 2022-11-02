const { ApplicationCommandOptionType } = require('discord.js');
const translate = require('@iamtraction/google-translate');

module.exports = {
    name: 'translate',
    description: 'Translate text from one language to another',
    options: [
        {
            name: "text",
            description: "What you want translated",
            type: ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: "to",
            description: "The language you want it translated to",
            required: true,
            type: ApplicationCommandOptionType.String,
            choices: [
                {
                    value: "auto",
                    name: "Automatic" 
                },
                {
                    value: "ar",
                    name: "Arabic" 
                },
                {
                    value: "zh-cn",
                    name: "Chinese"
                },
                {
                    value: "nl",
                    name: "Dutch"
                },
                {
                    value: "en",
                    name: "English"
                },
                {
                    value: "fr",
                    name: "French"
                },
                {
                    value: "de",
                    name: "German"
                },
                {
                    value: "el",
                    name: "Greek"
                },
                {
                    value: "hi",
                    name: "Hindi"
                },
                {
                    value: "ga",
                    name: "Irish"
                },
                {
                    value: "it",
                    name: "Italian"
                },
                {
                    value: "ja",
                    name: "Japanese"
                },
                {
                    value: "ko",
                    name: "Korean"
                },
                {
                    value: "la",
                    name: "Latin"
                },
                {
                    value: "pl",
                    name: "Polish"
                },
                {
                    value: "pt",
                    name: "Portuguese"
                },
                {
                    value: "ru",
                    name: "Russian"
                },
                {
                    value: "gd",
                    name: "Scots Gaelic"
                },
                {
                    value: "es",
                    name: "Spanish"
                },
                {
                    value: "sv",
                    name: "Swedish"
                },
                {
                    value: "th",
                    name: "Thai"
                },
                {
                    value: "tr",
                    name: "Turkish"
                },
                {
                    value: "uk",
                    name: "Ukrainian"
                },
                {
                    value: "vi",
                    name: "Vietnamese"
                },
                {
                    value: "cy",
                    name: "Welsh"
                },
            ]
        },
        {
            name: "from",
            description: "The language you want it translated from",
            required: true,
            type: ApplicationCommandOptionType.String,
            choices: [
                {
                    value: "auto",
                    name: "Automatic" 
                },
                {
                    value: "ar",
                    name: "Arabic" 
                },
                {
                    value: "zh-cn",
                    name: "Chinese"
                },
                {
                    value: "nl",
                    name: "Dutch"
                },
                {
                    value: "en",
                    name: "English"
                },
                {
                    value: "fr",
                    name: "French"
                },
                {
                    value: "de",
                    name: "German"
                },
                {
                    value: "el",
                    name: "Greek"
                },
                {
                    value: "hi",
                    name: "Hindi"
                },
                {
                    value: "ga",
                    name: "Irish"
                },
                {
                    value: "it",
                    name: "Italian"
                },
                {
                    value: "ja",
                    name: "Japanese"
                },
                {
                    value: "ko",
                    name: "Korean"
                },
                {
                    value: "la",
                    name: "Latin"
                },
                {
                    value: "pl",
                    name: "Polish"
                },
                {
                    value: "pt",
                    name: "Portuguese"
                },
                {
                    value: "ru",
                    name: "Russian"
                },
                {
                    value: "gd",
                    name: "Scots Gaelic"
                },
                {
                    value: "es",
                    name: "Spanish"
                },
                {
                    value: "sv",
                    name: "Swedish"
                },
                {
                    value: "th",
                    name: "Thai"
                },
                {
                    value: "tr",
                    name: "Turkish"
                },
                {
                    value: "uk",
                    name: "Ukrainian"
                },
                {
                    value: "vi",
                    name: "Vietnamese"
                },
                {
                    value: "cy",
                    name: "Welsh"
                },           
            ]
        }, 
    ],
    async execute(interaction) {

        const text = interaction.options.getString('text');
        const fromLang = interaction.options.getString('from');
        const toLang = interaction.options.getString('to');

        translate(`${text}`, { from: `${fromLang}`, to: `${toLang}` }).then(res => {
            interaction.reply(`**${interaction.user.username} says**: ${res.text}`);
        }).catch(err => {
            console.error(err);
        });

    }
}