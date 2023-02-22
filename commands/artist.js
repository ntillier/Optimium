const { SlashCommandBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');
const { search } = require('../util/spotify');

module.exports = {
    command: new SlashCommandBuilder()
        .setName('artist')
        .setDescription('Search for an artist on Spotify')
        .addStringOption(option =>
            option
                .setName('artist')
                .setDescription('The artist\'s name')
                .setRequired(true)
        ),
    async execute(client, interaction) {
        const artist = interaction.options.getString('artist');

        search(artist, 'artist')
            .then(({ artists }) => {
                let arr = [];

                artists.items.forEach((item) => {
                    arr.push({
                        label: (item.name).substring(0, 90),
                        description: `${item.followers.total} followers & ${item.popularity} of popularity`,
                        value: item.external_urls.spotify
                    });
                });

                const row = new ActionRowBuilder()
                    .addComponents(
                        new StringSelectMenuBuilder()
                            .setCustomId('select_music')
                            .setPlaceholder('Nothing selected')
                            .addOptions(arr),
                    );

                interaction.reply({ content: `Results for \`${artist}\``, components: [row] });
            })
            .catch((err) => {
                interaction.reply(` **An error occured:** \`${err}\``);
            });
    },
};