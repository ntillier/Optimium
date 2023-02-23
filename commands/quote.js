const { EmbedBuilder, quote } = require("@discordjs/builders");
const { SlashCommandBuilder, Colors } = require("discord.js");

module.exports = {
    command: new SlashCommandBuilder()
        .setName('quote')
        .setDMPermission(false)
        .setDescription('I want a random quote!'),
    async execute (client, interaction) {
        await interaction.channel.sendTyping();
        const res = await fetch('https://zenquotes.io/api/random');
        const quote = await res.json();

        interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setTitle(quote[0].q)
                    .setDescription(quote[0].a)
                    .setColor(Colors.White)
            ]
        });
    }
}