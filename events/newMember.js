const { Events } = require("discord.js");
const { Users } = require("../database");

const { logs, events } = require('../config');
const createLogger = require('with-simple-logger');

const logger = createLogger(events.memberJoin.message);

module.exports = {
    event: Events.GuildMemberAdd,
    callback: async (client, member) => {

        if (events.memberJoin.notify) {
            client.channels.cache.get(logs.channel).send(logger({ member }));
        }

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