const { SlashCommandBuilder, EmbedBuilder, Attachment } = require("discord.js");
const { getLinkPreview } = require("link-preview-js");
const parsePath = require("parse-path");
const { getDomain } = require("tldts");

module.exports = {
    command: new SlashCommandBuilder()
        .setName('preview')
        .setDescription('Preview a website from discord!')
        .addStringOption(option =>
            option
                .setName('url')
                .setRequired(true)
                .setDescription('The url to preview')
        ),
    async execute(client, interaction) {
        await interaction.deferReply();
        const reply = await interaction.fetchReply();
        const u = interaction.options.getString('url');

        const parsed = parsePath(u);
        const domain = getDomain(u);

        if (!domain) {
            return interaction.editReply(`Failed to parse ${u}.`);
        }

        const newUrl = Object.assign(new URL('https://www.google.com/'), {
            protocol: 'https',
            hostname: domain,
            port: parsed.port,
            pathname: parsed.pathname || '/',
            query: parsed.query || {},
            hash: parsed.hash || ''
        });

        getLinkPreview(newUrl.toString(), { followRedirects: 'follow' })
            .then((data) => {
                if (data.contentType === 'text/html' || data.mediaType === 'website') {
                    interaction.editReply({
                        embeds: [
                            new EmbedBuilder()
                                .setURL(data.url)
                                .setAuthor({ name: data.siteName || data.title || u, iconURL: data.favicons[0] })
                                .setTitle(data.title)
                                .setDescription(data.description)
                                .setImage(data.images[0])
                        ]
                    });
                } else if (data.mediaType === 'image') {
                    interaction.editReply({
                        embeds: [
                            new EmbedBuilder()
                                .setURL(data.url)
                                .setImage(data.url)
                        ]
                    })
                } else if (data.mediaType === 'audio') {// https://ondemand.npr.org/anon.npr-mp3/npr/atc/2007/12/20071231_atc_13.mp3
                    interaction.editReply({
                        content: 'This is an audio',
                        files: [
                            {
                                attachment: data.url,
                                name: data.title || data.url
                            }
                        ]
                    });
                } else if (data.mediaType === 'video') {
                    interaction.editReply({
                        content: 'This is a video',
                        files: [
                            {
                                attachment: data.url,
                                name: data.title || data.url
                            }
                        ]
                    });
                } else {
                    interaction.editReply('I can\'t preview this url: ' + data.url);
                }
            })
            .catch(() => {
                interaction.editReply(`I cannot fetch the ressource located at ${u}`);
            });
    }
}