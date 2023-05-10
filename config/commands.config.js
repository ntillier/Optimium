const { PermissionFlagsBits } = require("discord.js");

module.exports = {
    actionRole: {
        enabled: true,
        name: 'add_auto_role',
        description: 'When a user reacts with an emoji, he will have a new role!',
        memberPermission: PermissionFlagsBits.ManageRoles,
        enabledInDms: false,
        options: {
            message: {
                name: 'message',
                description: 'The message id'
            },
            role: {
                name: 'role',
                description: 'The role'
            },
            emoji: {
                name: 'emoji',
                description: 'The emoji'
            }
        },
        errors: {
            messageNotExists: 'Invalid message id.'
        },
        success: {
            ephemeral: true,
            message: 'Reaction role created!'
        }
    }
};