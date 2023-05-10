const { Events } = require("discord.js");

const { logs, events } = require('../config');
const createLogger = require('with-simple-logger');

const logger = createLogger(events.guildBanAdd.message);

module.exports = {
    event: Events.GuildBanAdd,
    callback: async (client, user) => {
        if (events.guildBanAdd.notify) {
            client.channels.cache.get(logs.channel).send(logger({ user: user.user }));
        }
    }
};