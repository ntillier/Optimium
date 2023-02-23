const bcd = require('@mdn/browser-compat-data');
const { SlashCommandBuilder, EmbedBuilder, Colors } = require('discord.js');
const { getChoices, keys } = require('../util/mdn');

const labels = {
    chrome: 'Chrome',
    chrome_android: 'Chrome Android',
    edge: 'Edge',
    firefox: 'Firefox',
    firefox_android: 'Firefox Android',
    ie: 'Internet Explorer',
    oculus: 'Meta Quest Browser',
    opera: 'Opera',
    opera_android: 'Opera Android',
    safari: 'Safari',
    safari_ios: 'Safari on IOS',
    samsunginternet_android: 'Samsung Internet',
    webview_android: 'Webview Android',
    deno: 'Deno',
    nodejs: 'Node.js'
}

function getEmbed(name, mdn, status, support) {
    const fields = Object.keys(support).map((i) => ({ name: labels[i], value: support[i].version_added, inline: true }));
    return new EmbedBuilder()
        .setTitle(name)
        .setURL(mdn)
        .setColor(Colors.White)
        .setDescription('> **Browser compatibility**')
        .addFields(...fields);
}

function getErrorEmbed(message) {
    return new EmbedBuilder()
        .setTitle(`Error`)
        .setColor(Colors.Red)
        .setDescription(message);
}

function unFormat(str) {
    return str.replace(/`/g, '').replace(/([*_~])/g, (m) => '\\' + m);
}

module.exports = {
    command: new SlashCommandBuilder()
        .setName('support')
        .setDescription('Check the support of a programming feature')
        .addSubcommand(option =>
            option
                .setName('css')
                .setDescription('Check some css feature')
                .addStringOption(type =>
                    type.setName('type')
                        .setDescription('CSS feature type')
                        .setRequired(true)
                        .addChoices(...getChoices('css'))
                )
                .addStringOption(name =>
                    name.setName('name')
                        .setDescription('Feature name')
                        .setRequired(true)
                )
        )
        .addSubcommand(option =>
            option
                .setName('javascript')
                .setDescription('Check some javascript feature')
                .addStringOption(type =>
                    type.setName('type')
                        .setDescription('Javascript feature type')
                        .setRequired(true)
                        .addChoices(...getChoices('javascript'))
                )
                .addStringOption(name =>
                    name.setName('name')
                        .setDescription('Feature name')
                        .setRequired(true)
                )
        ),
    execute(client, interaction) {
        const part = interaction.options.getSubcommand();
        const type = interaction.options.getString('type');
        const name = interaction.options.getString('name');

        if (keys[part][type].includes(name)) {
            switch (part) {
                case 'css':
                    const item = bcd.css[type][name].__compat;
                    interaction.reply({
                        embeds: [
                            getEmbed(name, item.mdn_url, item.status, item.support)
                        ]
                    });
                    break;
            }
        } else {
            interaction.reply({
                embeds: [
                    getErrorEmbed(`I can\'t find something called \`${unFormat(name)}\` in \`${unFormat(type)}\``)
                ]
            });
        }
    }

}