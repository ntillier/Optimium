const { Events } = require("discord.js");
const config = require("../config");

module.exports = {
    event: Events.GuildRoleUpdate,
    callback: async (client, role) => {
        client.channels.cache.get(config.logs.channel).send(`The role <@&${role.id}> has been updated!`)
    }
};