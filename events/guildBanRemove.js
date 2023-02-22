const { Events } = require("discord.js");
const config = require("../config");

module.exports = {
    event: Events.GuildBanRemove,
    callback: async (client, user) => {
        client.channels.cache.get(config.logs.channel).send(`<@${user.user.id}> is not banned anymore.`)
    }
};