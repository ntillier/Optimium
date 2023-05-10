const { Events } = require("discord.js");

const { logs, events } = require('../config');
const createLogger = require('with-simple-logger');

const logger = createLogger(events.emojiCreate.message);

module.exports = {
    event: Events.GuildEmojiCreate,
    callback: async (client, emoji) => {
        if (events.emojiCreate.notify) {
            client.channels.cache.get(logs.channel).send(logger({ emoji }));
        }
    }
};