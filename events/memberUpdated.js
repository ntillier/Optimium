const { Events, EmbedBuilder } = require("discord.js");

const { logs, events } = require('../config');
const createLogger = require('with-simple-logger');

const loggers = {
    avatar: createLogger(events.memberUpdate.avatar.message),
    nickname: createLogger(events.memberUpdate.nickname.message)
};

module.exports = {
    event: Events.GuildMemberUpdate,
    callback: async (client, oldUser, newUser) => {
        let newKeys = Object.keys(newUser);
        let changes = [];

        for (var i of newKeys) {
            if (oldUser[i] !== newUser[i]) {
                changes.push({
                    key: i,
                    old: oldUser[i],
                    new: newUser[i]
                });
            }
        }

        function send(content) {
            client.channels.cache.get(logs.channel).send(content);
        }

        for (let change of changes) {
            switch (change.key) {
                case 'nickname':
                    if (events.memberUpdate.nickname.notify) {
                        send(loggers.nickname({ oldMember: oldUser, newMember: newUser }));
                    }
                    break;
                case 'avatar':
                    if (events.memberUpdate.avatar.notify) {
                        send({
                            content: loggers.avatar({ oldMember: oldUser, newMember: newUser }),
                            embeds: [
                                new EmbedBuilder()
                                    .setDescription('from')
                                    .setImage(oldUser.avatarURL() || oldUser.user.displayAvatarURL()),
                                new EmbedBuilder()
                                    .setDescription('to')
                                    .setImage(newUser.avatarURL() || newUser.user.displayAvatarURL())
                            ]
                        });
                    }

            }
        }
    }
};