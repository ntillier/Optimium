const { Events } = require("discord.js");

const { logs, events } = require('../config');
const createLogger = require('with-simple-logger');

const logger = createLogger(events.guildBanRemove.message);

module.exports = {
    event: Events.GuildBanRemove,
    callback: async (client, user) => {
        if (events.guildBanRemove.notify) {
            client.channels.cache.get(logs.channel).send(logger({ user: user.user }));
        }
    }
};