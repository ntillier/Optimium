const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    command: new SlashCommandBuilder()
        .setName('gif')
        .setDescription('Send a random gif.')
        .addStringOption(option =>
            option
                .setName('query')
                .setDescription('A query for the gif.')
                .setRequired(false)
        ),
    async execute(client, interaction) {
        const query = interaction.options.getString('query');
        const url = query
            ? `https://g.tenor.com/v1/search?key=${process.env.TENOR_TOKEN}&contentfilter=medium&media_filter=basic&limit=50&q=${query}`
            : `https://g.tenor.com/v1/trending?key=${process.env.TENOR_TOKEN}&contentfilter=medium&media_filter=basic&limit=50`;

        await interaction.deferReply();
        
        fetch(url)
            .then(res => res.json())
            .then(({ results }) => {
                if (results && results.length > 0) {
                    interaction.editReply(results[Math.floor(Math.random() * results.length)].itemurl);
                } else {
                    interaction.editReply('We don\'t have any result O.o');
                }
            });
    },
};