const { Events } = require("discord.js");
const config = require("../config");
const { Messages } = require("../database");

module.exports = {
    event: Events.MessageReactionAdd,
    async callback(client, reaction, user) {
        if (!reaction.me) {
            const msg = await Messages.get(reaction.message.id);
            if (msg) {
                const emoji = reaction._emoji.name;

                if (msg.emojis[emoji]) {
                    if (msg.type === 0) {
                        const role = reaction.message.guild.roles.cache.get(msg.emojis[emoji]);
                        if (!role) return;
                        (await reaction.message.guild.members.cache.get(user.id)).roles.add(role);
                    }
                } else {
                    reaction.remove();
                }
            }
        }
    }
};