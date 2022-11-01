const { EmbedBuilder, ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: "embed",
    description: "Create an embed",
    options: [
        {
            name: "title",
            description: "What you want your embeds title to be",
            required: false,
            type: ApplicationCommandOptionType.String,
        },
        {
            name: "description",
            description: "What you want your embeds description to be",
            required: false,
            type: ApplicationCommandOptionType.String,
        },
        {
            name: "footer",
            description: "What you want your embeds footer to be",
            required: false,
            type: ApplicationCommandOptionType.String,
        },
        {
            name: "hex-code",
            description: "What you want your embeds colour to be",
            required: false,
            type: ApplicationCommandOptionType.String,
        },
        {
            name: "image-url",
            description: "What you want your embeds image to be",
            required: false,
            type: ApplicationCommandOptionType.String,
        },
        {
            name: "thumbnail-url",
            description: "What you want your embeds thumbnail to be",
            required: false,
            type: ApplicationCommandOptionType.String,
        },
    ],
    async execute(interaction) {

        const message = interaction.options.getString('description');
        const footer = interaction.options.getString('footer');
        const title = interaction.options.getString('title');
        const colour = interaction.options.getString('hex-code');
        const image = interaction.options.getString('image-url');
        const thumbnail = interaction.options.getString('thumbnail-url');

        if(colour) if(!colour == "Red" && !colour.startsWith('#')) return interaction.reply({content: "<a:obcross:1018078642607239218> An error occured. You may have used some invalid information.", ephemeral: true});
        if(colour) if(colour.startsWith('#') && colour.size !== 7) return interaction.reply({content: "<a:obcross:1018078642607239218> An error occured. You may have used some invalid information.", ephemeral: true});

        if(!message && !title && !colour && !image && !thumbnail && !footer) return interaction.reply({content: "<a:obcross:1018078642607239218> An error occured. You may have used some invalid information.", ephemeral: true});
        if(!message && !title && colour && !image && !thumbnail && !footer) return interaction.reply({content: "<a:obcross:1018078642607239218> An error occured. You may have used some invalid information.", ephemeral: true});

        const embed = new EmbedBuilder()
        .setTitle(title || null)
        .setDescription(message || null)
        .setColor(colour || "#2f3136")
        .setImage(image || null)
        .setThumbnail(thumbnail || null)
        .setFooter({ text: footer || null })

        await interaction.reply(".");
        await interaction.deleteReply().catch(() => {return});
        await interaction.channel.send({embeds: [embed]}).catch(() => {return interaction.reply({content: "<a:obcross:1018078642607239218> An error occured. You may have used some invalid information.", ephemeral: true})});

    }
}