const { Events } = require("discord.js");

const { logs, events } = require('../config');
const createLogger = require('with-simple-logger');

const logger = createLogger(events.emojiUpdate.message);

module.exports = {
    event: Events.GuildEmojiUpdate,
    callback: async (client, emoji) => {
        if (events.emojiUpdate.notify) {
            client.channels.cache.get(logs.channel).send(logger({ emoji }));
        }
    }
};