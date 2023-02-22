const { Events } = require("discord.js");
const config = require("../config");

module.exports = {
    event: Events.ChannelDelete,
    callback: async (client, channel) => {
        client.guilds.cache.get(config.logs.guild).channels.cache.get(config.logs.channel).send(`The channel <#${channel.id}> has been deleted.`)
    }
};