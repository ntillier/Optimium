const { Events } = require("discord.js");

const { logs, events } = require('../config');
const createLogger = require('with-simple-logger');

const logger = createLogger(events.emojiDelete.message);

module.exports = {
    event: Events.GuildEmojiDelete,
    callback: async (client, emoji) => {
        if (events.emojiDelete.notify) {
            client.channels.cache.get(logs.channel).send(logger({ emoji }))
        }
    }
};