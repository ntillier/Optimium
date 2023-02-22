const { Events } = require("discord.js");
const config = require("../config");

module.exports = {
    event: Events.InteractionCreate,
    callback: (client, interaction) => {
        if (!interaction.isStringSelectMenu()) return;

        if (interaction.customId === 'select_music') {
            interaction.reply(interaction.values[0]);
        }
    }
};