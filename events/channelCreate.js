const { Events } = require("discord.js");

const { logs, events } = require('../config');
const createLogger = require('with-simple-logger');

const logger = createLogger(events.channelCreate.message);

module.exports = {
    event: Events.ChannelCreate,
    callback: async (client, channel) => {
        if (events.channelCreate.notify) {
            client.guilds.cache.get(logs.guild).channels.cache.get(logs.channel).send(logger({ channel }));
        }
    }
};