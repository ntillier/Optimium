const { SlashCommandBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');
const { search } = require('../util/spotify');

module.exports = {
    command: new SlashCommandBuilder()
        .setName('album')
        .setDescription('Search for an album on Spotify')
        .addStringOption(option =>
            option
                .setName('album')
                .setDescription('The album\'s name')
                .setRequired(true)
        ),
    async execute(client, interaction) {
        const album = interaction.options.getString('album');

        search(album, 'album')
            .then(({ albums }) => {
                let arr = [];

                albums.items.forEach((item) => {
                    arr.push({
                        label: (item.name).substring(0, 90),
                        description: item.artists.map(i=> i.name).join(', ').substring(0, 90),
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

                interaction.reply({ content: `Results for \`${album}\``, components: [row] });
            })
            .catch((err) => {
                interaction.reply(` **An error occured:** \`${err}\``);
            });
    },
};