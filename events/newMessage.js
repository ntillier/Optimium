const { Events } = require("discord.js");
const config = require("../config");

module.exports = {
    event: Events.MessageCreate,
    callback: (client, message) => {
        // console.log(message.guildId);
        // console.log(Object.keys(message));
        if (message.author.bot) return;
        
        if (message.mentions.has(client.user.id)) {
            message.reply(config.sentences.hello[Math.floor(Math.random() * config.sentences.hello.length)]);
        }
    }
};