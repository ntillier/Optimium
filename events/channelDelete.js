const { Events } = require("discord.js");

const { logs, events } = require('../config');
const createLogger = require('with-simple-logger');

const logger = createLogger(events.channelDelete.message);

module.exports = {
    event: Events.ChannelDelete,
    callback: async (client, channel) => {
        if (events.channelDelete.notify) {
            client.guilds.cache.get(logs.guild).channels.cache.get(logs.channel).send(logger({ channel }));
        }
    }
};