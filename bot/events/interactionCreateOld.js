const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ChannelType } = require('discord.js')

module.exports = {
    name: "interactionCreate",
    async execute(interaction, client) {

        if (interaction.isButton()) {

            if(interaction.customId === "rock") {

                const think = Math.floor(Math.random() * 3)

                const rockEmbed = new EmbedBuilder()
                .setTitle("Rock Paper Scissors")
                .setDescription("I chose rock too. It's a tie! 🪢")
                .setColor("#ff3f3f")

                const scissorsEmbed = new EmbedBuilder()
                .setTitle("Rock Paper Scissors")
                .setDescription("I chose scissors. You win! 👑")
                .setColor("#ff3f3f")

                const paperEmbed = new EmbedBuilder()
                .setTitle("Rock Paper Scissors")
                .setDescription("I chose paper. Better luck next time... 😔")
                .setColor("#ff3f3f")

                const buttons = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setCustomId('rock')
                    .setLabel('Rock')
                    .setDisabled(true)
                    .setStyle('Danger')
                    .setEmoji('✊'),
                    new ButtonBuilder()
                    .setCustomId('scissors')
                    .setLabel('Scissors')
                    .setDisabled(true)
                    .setStyle('Danger')
                    .setEmoji('✌️'),
                    new ButtonBuilder()
                    .setCustomId('paper')
                    .setLabel('Paper')
                    .setDisabled(true)
                    .setStyle('Danger')
                    .setEmoji('🤚'),
                )

                await interaction.reply(".")
                await interaction.deleteReply().catch(() => {return})

                if(think === 0) interaction.message.edit({embeds: [rockEmbed], components: [buttons]})
                if(think === 1) interaction.message.edit({embeds: [scissorsEmbed], components: [buttons]})
                if(think === 2) interaction.message.edit({embeds: [paperEmbed], components: [buttons]})

            }

            if(interaction.customId === "scissors") {

                const think = Math.floor(Math.random() * 3)

                const rockEmbed = new EmbedBuilder()
                .setTitle("Rock Paper Scissors")
                .setDescription("I chose rock. Better luck next time... 😔")
                .setColor("#ff3f3f")

                const scissorsEmbed = new EmbedBuilder()
                .setTitle("Rock Paper Scissors")
                .setDescription("I chose scissors. It's a tie! 🪢")
                .setColor("#ff3f3f")

                const paperEmbed = new EmbedBuilder()
                .setTitle("Rock Paper Scissors")
                .setDescription("I chose paper. You win! 👑")
                .setColor("#ff3f3f")

                const buttons = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setCustomId('rock')
                    .setLabel('Rock')
                    .setDisabled(true)
                    .setStyle('Danger')
                    .setEmoji('✊'),
                    new ButtonBuilder()
                    .setCustomId('scissors')
                    .setLabel('Scissors')
                    .setDisabled(true)
                    .setStyle('Danger')
                    .setEmoji('✌️'),
                    new ButtonBuilder()
                    .setCustomId('paper')
                    .setLabel('Paper')
                    .setDisabled(true)
                    .setStyle('Danger')
                    .setEmoji('🤚'),
                )

                await interaction.reply(".")
                await interaction.deleteReply().catch(() => {return})

                if(think === 0) interaction.message.edit({embeds: [rockEmbed], components: [buttons]})
                if(think === 1) interaction.message.edit({embeds: [scissorsEmbed], components: [buttons]})
                if(think === 2) interaction.message.edit({embeds: [paperEmbed], components: [buttons]})

            }

            if(interaction.customId === "paper") {

                const think = Math.floor(Math.random() * 3)

                const rockEmbed = new EmbedBuilder()
                .setTitle("Rock Paper Scissors")
                .setDescription("I chose rock. You win! 👑")
                .setColor("#ff3f3f")

                const scissorsEmbed = new EmbedBuilder()
                .setTitle("Rock Paper Scissors")
                .setDescription("I chose scissors. Better luck next time... 😔")
                .setColor("#ff3f3f")

                const paperEmbed = new EmbedBuilder()
                .setTitle("Rock Paper Scissors")
                .setDescription("I chose paper. It's a tie! 🪢")
                .setColor("#ff3f3f")

                const buttons = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setCustomId('rock')
                    .setLabel('Rock')
                    .setDisabled(true)
                    .setStyle('Danger')
                    .setEmoji('✊'),
                    new ButtonBuilder()
                    .setCustomId('scissors')
                    .setLabel('Scissors')
                    .setDisabled(true)
                    .setStyle('Danger')
                    .setEmoji('✌️'),
                    new ButtonBuilder()
                    .setCustomId('paper')
                    .setLabel('Paper')
                    .setDisabled(true)
                    .setStyle('Danger')
                    .setEmoji('🤚'),
                )

                await interaction.reply(".")
                await interaction.deleteReply().catch(() => {return})

                if(think === 0) interaction.message.edit({embeds: [rockEmbed], components: [buttons]})
                if(think === 1) interaction.message.edit({embeds: [scissorsEmbed], components: [buttons]})
                if(think === 2) interaction.message.edit({embeds: [paperEmbed], components: [buttons]})

            }

            if(interaction.customId === "coinFlip") {

                const think = Math.floor(Math.random() * 2)

                const heads = new EmbedBuilder()
                .setTitle("Flip a Coin!")
                .setDescription("It's heads! 🪙")
                .setColor("#ff3f3f")

                const tails = new EmbedBuilder()
                .setTitle("Flip a Coin!")
                .setDescription("It's tails! 🪙")
                .setColor("#ff3f3f")
    
                const flip = new ActionRowBuilder()
                .addComponents(
                new ButtonBuilder()
                .setCustomId('coinFlip')
                .setLabel('Flip!')
                .setStyle('Danger')
                .setDisabled(true)
                .setEmoji('🪙'),
                )

                await interaction.reply(".")
                await interaction.deleteReply().catch(() => {return})

                if(think === 0) interaction.message.edit({embeds: [heads], components: [flip]})
                if(think === 1) interaction.message.edit({embeds: [tails], components: [flip]})

            }

        }

    }
}