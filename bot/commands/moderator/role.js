const { ChatInputCommandInteraction, PermissionFlagsBits, ApplicationCommandOptionType, EmbedBuilder } = require('discord.js')
const client = require('../../index')

module.exports = {
    name: 'role',
    description: 'role',
    defaultMemeberPermissions: PermissionFlagsBits.Administrator,
    options: [
        {
            name: 'add',
            description: 'Add a role',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'role',
                    description: 'The role to add',
                    type: ApplicationCommandOptionType.Role,
                    required: true
                },
                {
                    name: 'user',
                    description: 'Who to add it to',
                    type: ApplicationCommandOptionType.User,
                    required: true
                }
            ]
        },
        {
            name: 'remove',
            description: 'Remove a role',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'role',
                    description: 'The role to remove',
                    type: ApplicationCommandOptionType.Role,
                    required: true
                },
                {
                    name: 'user',
                    description: 'Who to remove it from',
                    type: ApplicationCommandOptionType.User,
                    required: true
                }
            ]
        },
        {
            name: 'members',
            description: 'List role members (max 100)',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'role',
                    description: 'The role to list',
                    type: ApplicationCommandOptionType.Role,
                    required: true
                }
            ]
        },
        {
            name: 'list',
            description: 'List the server roles',
            type: ApplicationCommandOptionType.Subcommand,
        }
    ],
    /**
    * @param {ChatInputCommandInteraction} interaction
    * @param {client} client
    */
    async execute(interaction, client) {
        const { options, guild } = interaction

        switch (options.getSubcommand()) {
            case 'add': {

                const role = options.getRole('role')
                const member = options.getMember('user')

                const hasRoleEmbed = new EmbedBuilder()
                .setColor('#ff3f3f')
                .setTitle('Add Failed <:obcross:1073595895360258118>')
                .setDescription('Role add failed because the user already has that role.')

                const addedEmbed = new EmbedBuilder()
                .setColor('#ff3f3f')
                .setTitle('Added Role <:obcheck:1073595892701069362>')
                .setDescription(`Role was added successfully.\n\n**Role:** ${role.name}\n**User:** ${member.user.username}`)

                const hierarchyEmbed = new EmbedBuilder()
                .setColor('#ff3f3f')
                .setTitle('Add Failed <:obcross:1073595895360258118>')
                .setDescription(`Role add failed because the \`Omega Bot\` role is below \`${role.name}\` role in this server's role hierarchy. Bit rude but okay..`)

                const noPermsEmbed = new EmbedBuilder()
                .setColor('#ff3f3f')
                .setTitle('Add Failed <:obcross:1073595895360258118>')
                .setDescription('Role add failed because you do not have the required permissions to add that role to that member.. Whatchu tryna do huh? 🤨')

                if(interaction.member.roles.highest.position <= role.position) return interaction.reply({ embeds: [noPermsEmbed] })
                if(!role.editable) return interaction.reply({ embeds: [hierarchyEmbed] })
                if(member.roles.cache.find(r=>r.id==role.id)) return interaction.reply({ embeds: [hasRoleEmbed] })
                return interaction.reply({ embeds: [addedEmbed] }), member.roles.add(role)

            }

            case 'remove': {

                const role = options.getRole('role')
                const member = options.getMember('user')

                const noRoleEmbed = new EmbedBuilder()
                .setColor('#ff3f3f')
                .setTitle('Remove Failed <:obcross:1073595895360258118>')
                .setDescription('Role remove failed because the user does not have that role.')

                const removedEmbed = new EmbedBuilder()
                .setColor('#ff3f3f')
                .setTitle('Removed Role <:obcheck:1073595892701069362>')
                .setDescription(`Role was removed successfully.\n\n**Role:** ${role.name}\n**User:** ${member.user.username}`)

                const hierarchyEmbed = new EmbedBuilder()
                .setColor('#ff3f3f')
                .setTitle('Remove Failed <:obcross:1073595895360258118>')
                .setDescription(`Role remove failed because the \`Omega Bot\` role is below \`${role.name}\` role in this server's role hierarchy. Bit rude but okay..`)

                const noPermsEmbed = new EmbedBuilder()
                .setColor('#ff3f3f')
                .setTitle('Remove Failed <:obcross:1073595895360258118>')
                .setDescription('Role remove failed because you do not have the required permissions to remove that role from that member.. Whatchu tryna do huh? 🤨')

                if(interaction.member.roles.highest.position <= role.position) return interaction.reply({ embeds: [noPermsEmbed] })
                if(!role.editable) return interaction.reply({ embeds: [hierarchyEmbed] })
                if(member.roles.cache.find(r=>r.id==role.id)) return interaction.reply({ embeds: [removedEmbed] }), member.roles.remove(role)
                return interaction.reply({ embeds: [noRoleEmbed] })

            }

            case 'members': {

                const role = options.getRole('role')
                let members = ''
                let i = 1

                role.members.forEach(member => {
                    if(i == 100) return
                    members += `**${i})** ${member.user.username}\n`
                    i++
                })

                const membersEmbed = new EmbedBuilder()
                .setColor('#ff3f3f')
                .setTitle('Role Members')
                .setDescription(`List of all members that have the **${role.name}** role:\n\n` + members)

                return interaction.reply({ embeds: [membersEmbed] })

            }

            case 'list': {

                let roles = ''
                let i = 1

                guild.roles.cache.forEach(role => {
                    if(role.name != '@everyone') roles +=  `**${i})** ${role.name}\n`, i++
                })

                const rolesEmbed = new EmbedBuilder()
                .setColor('#ff3f3f')
                .setTitle('Role Members')
                .setDescription(`List of all roles in **${guild.name}**:\n\n` + roles)

                return interaction.reply({ embeds: [rolesEmbed] })

            }
        }
    }
}