const { MessageReaction, User } = require('discord.js')
const client = require('../index')

module.exports = {
    name: 'messageReactionAdd',
    /**
    * @param {client} client
    * @param {MessageReaction} reaction
    * @param {User} user
    */
    async execute(reaction, user, client) {
        if(user.bot) return

        const reactionRoleSchema = require('../../database/reaction-roles')
        const reactionRoleData = await reactionRoleSchema.findOne({ messageId: reaction.message.id })

        if(reactionRoleData) reactionRoleData.reactions.forEach(item => {
            const role = reaction.message.guild.roles.cache.get(item.role)
            if(role.editable && item.emoji == reaction.emoji.name) reaction.message.guild.members.cache.get(user.id).roles.add(role, 'Used reaction role')
        })
        
    }
}