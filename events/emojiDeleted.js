const { Events } = require("discord.js");
const config = require("../config");

module.exports = {
    event: Events.GuildEmojiDelete,
    callback: async (client, emoji) => {
        client.channels.cache.get(config.logs.channel).send(`The emoji <:${emoji.name}:${emoji.id}> has been deleted!`)
    }
};