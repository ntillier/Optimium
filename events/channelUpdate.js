const { Events } = require("discord.js");

const { logs, events } = require('../config');
const createLogger = require('with-simple-logger');

const logger = createLogger(events.channelUpdate.message);

module.exports = {
    event: Events.ChannelUpdate,
    callback: async (client, channel) => {
        if (events.channelUpdate.notify) {
            client.guilds.cache.get(logs.guild).channels.cache.get(logs.channel).send(logger({ channel }));
        }
    }
};