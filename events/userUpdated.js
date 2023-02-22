const { Events, EmbedBuilder } = require("discord.js");
const config = require("../config");

module.exports = {
    event: Events.UserUpdate,
    callback: async (client, oldUser, newUser) => {
        let newKeys = Object.keys(newUser);
        let changes = [];

        for (var i of newKeys) {
            if (oldUser[i] !== newUser[i]) {
                changes.push({
                    key: i,
                    old: oldUser[i],
                    new: newUser[i]
                });
            }
        }

        function send (content) {
            client.channels.cache.get(config.logs.channel).send(content);
        }

        function unFormat (str) {
            return str.replace(/`/g, '').replace(/([*_~])/g, (m) => '\\' + m);
        }

        for (let i of changes) {
            switch (i.key) {
                case 'avatar':
                    send({
                        content: `<@${newUser.id}>'s avatar changed.`,
                        embeds: [
                            new EmbedBuilder()
                                .setDescription('from')
                                .setThumbnail(oldUser.displayAvatarURL()),
                            new EmbedBuilder()
                                .setDescription('to')
                                .setThumbnail(newUser.displayAvatarURL())
                        ]
                    });

            }
        }
    }
};