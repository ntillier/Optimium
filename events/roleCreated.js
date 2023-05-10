const { Events } = require("discord.js");

const { logs, events } = require('../config');
const createLogger = require('with-simple-logger');

const logger = createLogger(events.roleCreate.message);

module.exports = {
    event: Events.GuildRoleCreate,
    callback: async (client, role) => {
        if (events.roleCreate.notify) {
            client.channels.cache.get(logs.channel).send(logger({ role }));
        }
    }
};