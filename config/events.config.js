module.exports = {

    /* Channels */
    channelCreate: {
        notify: true,
        message: 'You have a new channel <#{{ channel.id }}> !'
    },
    channelDelete: {
        notify: true,
        message: 'The channel `{{ channel.name }}` has been deleted.'
    },
    channelUpdate: {
        notify: true,
        message: 'The channel <#{{ channel.id }}> has been updated.'
    },

    /* Emojis */
    emojiCreate: {
        notify: true,
        message: 'The emoji <:{{ emoji.name }}:{{ emoji.id }}> has been created!'
    },
    emojiUpdate: {
        notify: true,
        message: 'The emoji <:{{ emoji.name }}:{{ emoji.id }}> has been updated!'
    },
    emojiDelete: {
        notify: true,
        message: 'The emoji `{{ emoji.name }}` has been deleted!'
    },

    /* Bans */
    guildBanAdd: {
        notify: true,
        message: '<@{{ user.id }}> has been banned.'
    },
    guildBanRemove: {
        notify: true,
        message: '<@{{ user.id }}> is not banned anymore.'
    },

    /* Member */
    memberUpdate: {
        nickname: {
            notify: true,
            message: "<@{{ newMember.id }}>'s nickname has changed from {{ oldMember.displayName }} to {{ newMember.displayName }}"
        },
        avatar: {
            notify: true,
            message: "<@{{ newMember.id }}>'s avatar has changed."
        }
    },
    memberJoin: {
        notify: true,
        message: "<@{{ member.id }}> joined the server! He is the `{{ member.guild.memberCount }}` person to land here :fire:"
    },

    /* Roles */
    roleCreate: {
        notify: true,
        message: 'The role <@&{{ role.id }}> has been created!'
    },
    roleDelete: {
        notify: true,
        message: 'The role `{{ role.name }}` has been deleted'
    },
    roleUpdate: {
        notify: true,
        message: 'The role <@&{{ role.id }}> has been updated!'
    },

    /* Users */
    userUpdate: {
        avatar: {
            notify: true,
            message: '<@{{ newUser.id }}>\'s avatar changed.'
        }
    }
}