const { ChatInputCommandInteraction, PermissionFlagsBits, ApplicationCommandOptionType, EmbedBuilder } = require('discord.js')
const client = require('../../index')

module.exports = {
    name: 'role',
    description: 'role',
    defaultMemeberPermissions: PermissionFlagsBits.ManageRoles,
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
            name: 'delete',
            description: 'Delete a role',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'role',
                    description: 'The role you want to delete',
                    type: ApplicationCommandOptionType.Role,
                    required: true
                },
                {
                    name: 'reason',
                    description: 'Why you want to delete it',
                    type: ApplicationCommandOptionType.String
                }
            ]
        },
        {
            name: 'create',
            description: 'Create a role',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'name',
                    description: 'The name of the role',
                    type: ApplicationCommandOptionType.String,
                    required: true
                },
                {
                    name: 'color',
                    description: 'The color of the role',
                    type: ApplicationCommandOptionType.String,
                    required: true
                },
                {
                    name: 'mentionable',
                    description: 'If everyone can mention the role',
                    type: ApplicationCommandOptionType.Boolean,
                    required: true
                },
                {
                    name: 'separate',
                    description: 'If the role is displayed separately',
                    type: ApplicationCommandOptionType.Boolean,
                    required: true
                },
                {
                    name: 'reason',
                    description: 'Why you want to delete it',
                    type: ApplicationCommandOptionType.String
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
                .setTitle('Add Failed')
                .setDescription('Role add failed because the user already has that role.')

                const addedEmbed = new EmbedBuilder()
                .setColor('#ff3f3f')
                .setTitle('Added Role')
                .setDescription(`Role was added successfully! 🎉\n\n**Role:** ${role.name}\n**User:** ${member.user.username}`)

                const hierarchyEmbed = new EmbedBuilder()
                .setColor('#ff3f3f')
                .setTitle('Add Failed')
                .setDescription(`Role add failed because the \`Omega Bot\` role is below \`${role.name}\` role in this server's role hierarchy. Bit rude but okay..`)

                const noPermsEmbed = new EmbedBuilder()
                .setColor('#ff3f3f')
                .setTitle('Add Failed')
                .setDescription('Role add failed because you do not have the required permissions to add that role to that member.. Whatchu tryna do huh? 🤨')

                if(interaction.member.roles.highest.position < role.position) return interaction.reply({ embeds: [noPermsEmbed] })
                if(!role.editable) return interaction.reply({ embeds: [hierarchyEmbed] })
                if(member.roles.cache.find(r=>r.id==role.id)) return interaction.reply({ embeds: [hasRoleEmbed] })
                return interaction.reply({ embeds: [addedEmbed] }), member.roles.add(role)

            }

            case 'remove': {

                const role = options.getRole('role')
                const member = options.getMember('user')

                const noRoleEmbed = new EmbedBuilder()
                .setColor('#ff3f3f')
                .setTitle('Remove Failed')
                .setDescription('Role remove failed because the user does not have that role.')

                const removedEmbed = new EmbedBuilder()
                .setColor('#ff3f3f')
                .setTitle('Removed Role')
                .setDescription(`Role was removed successfully! 🎉\n\n**Role:** ${role.name}\n**User:** ${member.user.username}`)

                const hierarchyEmbed = new EmbedBuilder()
                .setColor('#ff3f3f')
                .setTitle('Remove Failed')
                .setDescription(`Role remove failed because the \`Omega Bot\` role is below \`${role.name}\` role in this server's role hierarchy. Bit rude but okay..`)

                const noPermsEmbed = new EmbedBuilder()
                .setColor('#ff3f3f')
                .setTitle('Remove Failed')
                .setDescription('Role remove failed because you do not have the required permissions to remove that role from that member.. Whatchu tryna do huh? 🤨')

                if(interaction.member.roles.highest.position < role.position) return interaction.reply({ embeds: [noPermsEmbed] })
                if(!role.editable) return interaction.reply({ embeds: [hierarchyEmbed] })
                if(member.roles.cache.find(r=>r.id==role.id)) return interaction.reply({ embeds: [removedEmbed] }), member.roles.remove(role)
                return interaction.reply({ embeds: [noRoleEmbed] })

            }

            case 'delete': {

                const role = options.getRole('role')
                const reason = options.getString('reason')

                const deletedEmbed = new EmbedBuilder()
                .setColor('#ff3f3f')
                .setTitle('Role Deleted')
                .setDescription(`Role was deleted successfully! 🎉\n\n**Name:** ${role.name}\n**Color:** ${role.hexColor}\n**Members:** ${role.members.size}`)

                const hierarchyEmbed = new EmbedBuilder()
                .setColor('#ff3f3f')
                .setTitle('Delete Failed')
                .setDescription(`Role delete failed because the \`Omega Bot\` role is below \`${role.name}\` role in this server's role hierarchy. Bit rude but okay..`)

                const noPermsEmbed = new EmbedBuilder()
                .setColor('#ff3f3f')
                .setTitle('Delete Failed')
                .setDescription('Role delete failed because you do not have the required permissions to delete that role.. Whatchu tryna do huh? 🤨')

                if(interaction.member.roles.highest.position < role.position) return interaction.reply({ embeds: [noPermsEmbed] })
                if(!role.editable) return interaction.reply({ embeds: [hierarchyEmbed] })

                guild.roles.delete(role, reason)

                return interaction.reply({ embeds: [deletedEmbed] })

            }

            case 'create': {

                const name = options.getString('name')
                const colour = options.getString('color')
                const mentionable = options.getBoolean('mentionable')
                const separate = options.getBoolean('separate')
                const reason = options.getString('reason')

                const createEmbed = new EmbedBuilder()
                .setColor('#ff3f3f')
                .setTitle('Role Created')
                .setDescription(`Role was created successfully! 🎉\n\n**Name:** ${name}\n**Color:** ${colour}\n**Mentionable:** ${mentionable}\n**Separate:** ${separate}`)

                const hexEmbed = new EmbedBuilder()
                .setColor('#ff3f3f')
                .setTitle('Create Failed')
                .setDescription('Role create failed because the specified colour is an invalid hex code.')

                if(!/^#[0-9A-F]{6}$/i.test(colour)) return interaction.reply({ embeds: [hexEmbed] })

                guild.roles.create({
                    name: name,
                    color: colour,
                    mentionable: mentionable,
                    hoist: separate,
                    reason: reason
                })

                return interaction.reply({ embeds: [createEmbed] })

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