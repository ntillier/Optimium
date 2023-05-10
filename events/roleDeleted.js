const { Events } = require("discord.js");

const { logs, events } = require('../config');
const createLogger = require('with-simple-logger');

const logger = createLogger(events.roleDelete.message);

module.exports = {
    event: Events.GuildRoleDelete,
    callback: async (client, role) => {
        if (events.roleDelete.notify) {
            client.channels.cache.get(logs.channel).send(logger({ role }));
        }
    }
};