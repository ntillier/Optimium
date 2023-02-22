const { Events } = require("discord.js");
const config = require("../config");
const { Users } = require("../database");

module.exports = {
    event: Events.GuildMemberAdd,
    callback: async (client, member) => {
        client.channels.cache.get(config.logs.channel).send(`Welcome <@${member.id}>!\nIt's great to see you here :wink: Btw, you are the ${member.guild.memberCount} person to land here :fire:`);
        Users.get(member.id)
            .then((m) => {
                if (!m) {
                    Users.set(member.id, {
                        warnsCount: 0,
                        xp: 0,
                        last: null,
                        cookies: 0
                    });
                }
            })
    }
};