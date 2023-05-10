const { Events } = require("discord.js");

const { logs, events } = require('../config');
const createLogger = require('with-simple-logger');

const logger = createLogger(events.roleUpdate.message);

module.exports = {
    event: Events.GuildRoleUpdate,
    callback: async (client, role) => {
        if (events.roleUpdate.notify) {
            client.channels.cache.get(logs.channel).send(logger({ role }));
        }
    }
};