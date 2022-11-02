const { EmbedBuilder,  ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: 'poll',
    description: 'Make a poll',
    options: [
        {
            name: "title",
            required: true,
            description: "What you want to poll",
            type: ApplicationCommandOptionType.String,
        },
        {
            name: "option-1",
            required: false,
            description: "Poll option",
            type: ApplicationCommandOptionType.String,
        },
        {
            name: "option-2",
            required: false,
            description: "Poll option",
            type: ApplicationCommandOptionType.String,
        },
        {
            name: "option-3",
            required: false,
            description: "Poll option",
            type: ApplicationCommandOptionType.String,
        },
        {
            name: "option-4",
            required: false,
            description: "Poll option",
            type: ApplicationCommandOptionType.String,
        },
        {
            name: "option-5",
            required: false,
            description: "Poll option",
            type: ApplicationCommandOptionType.String,
        },
        {
            name: "option-6",
            required: false,
            description: "Poll option",
            type: ApplicationCommandOptionType.String,
        },
        {
            name: "option-7",
            required: false,
            description: "Poll option",
            type: ApplicationCommandOptionType.String,
        },
        {
            name: "option-8",
            required: false,
            description: "Poll option",
            type: ApplicationCommandOptionType.String,
        },
        {
            name: "option-9",
            required: false,
            description: "Poll option",
            type: ApplicationCommandOptionType.String,
        },
        {
            name: "option-10",
            required: false,
            description: "Poll option",
            type: ApplicationCommandOptionType.String,
        },
        {
            name: "option-11",
            required: false,
            description: "Poll option",
            type: ApplicationCommandOptionType.String,
        },
        {
            name: "option-12",
            required: false,
            description: "Poll option",
            type: ApplicationCommandOptionType.String,
        },
        {
            name: "option-13",
            required: false,
            description: "Poll option",
            type: ApplicationCommandOptionType.String,
        },
        {
            name: "option-14",
            required: false,
            description: "Poll option",
            type: ApplicationCommandOptionType.String,
        },
        {
            name: "option-15",
            required: false,
            description: "Poll option",
            type: ApplicationCommandOptionType.String,
        },
        {
            name: "option-16",
            required: false,
            description: "Poll option",
            type: ApplicationCommandOptionType.String,
        },
        {
            name: "option-17",
            required: false,
            description: "Poll option",
            type: ApplicationCommandOptionType.String,
        },
        {
            name: "option-18",
            required: false,
            description: "Poll option",
            type: ApplicationCommandOptionType.String,
        },
        {
            name: "option-19",
            required: false,
            description: "Poll option",
            type: ApplicationCommandOptionType.String,
        },
        {
            name: "option-20",
            required: false,
            description: "Poll option",
            type: ApplicationCommandOptionType.String,
        },

    ],
    async execute(interaction) {

        let title = interaction.options.getString("title");
        let option1 = interaction.options.getString("option-1");
        let option2 = interaction.options.getString("option-2");
        let option3 = interaction.options.getString("option-3");
        let option4 = interaction.options.getString("option-4");
        let option5 = interaction.options.getString("option-5");
        let option6 = interaction.options.getString("option-6");
        let option7 = interaction.options.getString("option-7");
        let option8 = interaction.options.getString("option-8");
        let option9 = interaction.options.getString("option-9");
        let option10 = interaction.options.getString("option-10");
        let option11 = interaction.options.getString("option-11");
        let option12 = interaction.options.getString("option-12");
        let option13 = interaction.options.getString("option-13");
        let option14 = interaction.options.getString("option-14");
        let option15 = interaction.options.getString("option-15");
        let option16 = interaction.options.getString("option-16");
        let option17 = interaction.options.getString("option-17");
        let option18 = interaction.options.getString("option-18");
        let option19 = interaction.options.getString("option-19");
        let option20 = interaction.options.getString("option-20");

        if(option1 !== null) option1 = "🇦 = " + option1; 
        if(option2 !== null) option2 = "🇧 = " + option2; 
        if(option3 !== null) option3 = "🇨 = " + option3; 
        if(option4 !== null) option4 = "🇩 = " + option4; 
        if(option5 !== null) option5 = "🇪 = " + option5; 
        if(option6 !== null) option6 = "🇫 = " + option6; 
        if(option7 !== null) option7 = "🇬 = " + option7; 
        if(option8 !== null) option8 = "🇭 = " + option8; 
        if(option9 !== null) option9 = "🇮 = " + option9; 
        if(option10 !== null) option10 = "🇯 = " + option10; 
        if(option11 !== null) option11 = "🇰 = " + option11; 
        if(option12 !== null) option12 = "🇱 = " + option12; 
        if(option13 !== null) option13 = "🇲 = " + option13; 
        if(option14 !== null) option14 = "🇳 = " + option14; 
        if(option15 !== null) option15 = "🇴 = " + option15; 
        if(option16 !== null) option16 = "🇵 = " + option16; 
        if(option17 !== null) option17 = "🇶 = " + option17; 
        if(option18 !== null) option18 = "🇷 = " + option18; 
        if(option19 !== null) option19 = "🇸 = " + option19; 
        if(option20 !== null) option20 = "🇹 = " + option20; 

        if(option1 === null) return interaction.reply({ephemeral: true, content: "You must choose have 2 or more options in your poll!"});
        if(option2 === null) return interaction.reply({ephemeral: true, content: "You must choose have 2 or more options in your poll!"});
        if(option3 === null) option3 = " ";
        if(option4 === null) option4 = " ";
        if(option5 === null) option5 = " ";
        if(option6 === null) option6 = " ";
        if(option7 === null) option7 = " ";
        if(option8 === null) option8 = " ";
        if(option9 === null) option9 = " ";
        if(option10 === null) option10 = " ";
        if(option11 === null) option11 = " ";
        if(option12 === null) option12 = " ";
        if(option13 === null) option13 = " ";
        if(option14 === null) option14 = " ";
        if(option15 === null) option15 = " ";
        if(option16 === null) option16 = " ";
        if(option17 === null) option17 = " ";
        if(option18 === null) option18 = " ";
        if(option19 === null) option19 = " ";
        if(option20 === null) option20 = " ";

        const embed = new EmbedBuilder()
        .setColor("#2f3136")
        .setTitle(title)
        .setDescription(`${option1}\r${option2}\r${option3}\r${option4}\r${option5}\r${option6}\r${option7}\r${option8}\r${option9}\r${option10}\r${option11}\r${option12}\r${option13}\r${option14}\r${option15}\r${option16}\r${option17}\r${option18}\r${option19}\r${option20}`)

        const msg = await interaction.reply({embeds: [embed], fetchReply: true});

        if(option1 !== " ") msg.react(`🇦`);
        if(option2 !== " ") msg.react(`🇧`);
        if(option3 !== " ") msg.react(`🇨`);
        if(option4 !== " ") msg.react(`🇩`);
        if(option5 !== " ") msg.react(`🇪`);
        if(option6 !== " ") msg.react(`🇫`);
        if(option7 !== " ") msg.react(`🇬`);
        if(option8 !== " ") msg.react(`🇭`);
        if(option9 !== " ") msg.react(`🇮`);
        if(option10 !== " ") msg.react(`🇯`);
        if(option11 !== " ") msg.react(`🇰`);
        if(option12 !== " ") msg.react(`🇱`);
        if(option13 !== " ") msg.react(`🇲`);
        if(option14 !== " ") msg.react(`🇳`);
        if(option15 !== " ") msg.react(`🇴`);
        if(option16 !== " ") msg.react(`🇵`);
        if(option17 !== " ") msg.react(`🇶`);
        if(option18 !== " ") msg.react(`🇷`);
        if(option19 !== " ") msg.react(`🇸`);
        if(option20 !== " ") msg.react(`🇹`);

    }
}