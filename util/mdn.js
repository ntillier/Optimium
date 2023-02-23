const bcd = require('@mdn/browser-compat-data');
const { EmbedBuilder, Colors, ButtonStyle, ActionRowBuilder, ButtonBuilder } = require('discord.js');

const RESULTS_PER_PAGE = 30;

const names = {
    css: {
        properties: 'Properties (e.g. background, color)',
        selectors: 'Selectors (basic selectors, combinators or pseudo elements)',
        types: 'Types (Value types for rule value)',
        'at-rules': 'At-rules (e.g. @media)',
    },
    javascript: {
        builtins: 'Built-in objects',
        classes: 'Class definition features',
        functions: 'Function features',
        grammar: 'Language grammar',
        operators: 'Mathematical and logical operators',
        statements: 'Language statements and expressions',
    },
    mathml: {
        elements: 'Elements'
    },
    http: {
        headers: 'Request and response headers',
        methods: 'Request methods',
        status: 'Status codes'
    },
    svg: {
        attributes: 'Attributes',
        elements: 'Elements'
    },
    webextensions: {
        api: 'WebExtension-specific APIs',
        manifest: 'manifest.json keys'
    }
}

const keys = {};
const choices = {};

Object.keys(names)
    .forEach((part) => {
        keys[part] = {};
        choices[part] = [];
        Object.keys(names[part])
            .forEach((type) => {
                keys[part][type] = Object.keys(bcd[part][type]);
                choices[part].push({ name: names[part][type], value: type });
            });
    });

exports.getChoices = function (part) {
    return choices[part];
}

function listKeys ({ part, type, page = 1 }) {
    let items = [];
    if (!type) {
        let count = 0, total = (page - 1) * RESULTS_PER_PAGE;
        let type = Object.keys(keys[part]).find((i) => {
            if (keys[part][i].length > total - count) {
                return true;
            }
            count += Math.ceil(keys[part][i].length / RESULTS_PER_PAGE) * RESULTS_PER_PAGE;
            return false;
        });

        items = keys[part][type].slice(total - count, total - count + RESULTS_PER_PAGE).map((i) => ({ label: i }));

        if (total === count) {
            items.splice(0, 0, { label: names[part][type], type: 'title' });
        }
        return items;
    }
    if (page === 1) {
        items.push({ label: names[part][type], type: 'title' });
    }
    return keys[part][type].slice((page - 1) * RESULTS_PER_PAGE, page * RESULTS_PER_PAGE).map((i) => ({ label: i }));
}

function getListPages ({ part, type }) {
    if (type) {
        return Math.ceil(keys[part][type].length / RESULTS_PER_PAGE);
    }
    let pages = 0;
    for (var i in keys[part]) {
        pages += Math.ceil(keys[part][i].length / RESULTS_PER_PAGE);
    }
    return pages;
}

exports.getListEmbed = function ({ part, type, page }) {
    return new EmbedBuilder()
        .setTitle(path.join(' / '))
        .setColor(Colors.White)
        .setFooter({ text: 'Page 1 / 3' })
        .setDescription(`**Features**\n\n${items.map((i) => i.type === 'title' ? `\n**${i.label}**` : ` - \`${i.label}\``).join('\n')}`);
}

exports.getListReply = function ({ part, type, page, ephemeral }) {
    let pages = getListPages({ part, type }), k = listKeys({ part, type, page }), title = null;

    if (k[0].type === 'title') {
        title = k[0].label;
        k.shift();
    }

    return {
        ephemeral,
        embeds: [
            new EmbedBuilder()
                .setTitle(type ? `${part} / ${type}` : part)
                .setColor(Colors.White)
                .setFooter({  text: `Page ${page} / ${pages}`})
                .setDescription(`${ title ? `**${title}**` : '' }\`\`\`${k.map((i) => ` - ${i.label}`).join('\n')}\`\`\``)
        ],
        components: [
            new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setLabel('First')
                        .setCustomId('list_first')
                        .setStyle(ButtonStyle.Primary),
                    new ButtonBuilder()
                        .setLabel('Previous')
                        .setCustomId('list_prev')
                        .setDisabled(page === 1)
                        .setStyle(ButtonStyle.Danger),
                    new ButtonBuilder()
                        .setLabel('Next')
                        .setDisabled(page === pages)
                        .setCustomId('list_next')
                        .setStyle(ButtonStyle.Success),
                    new ButtonBuilder()
                        .setLabel('Last')
                        .setCustomId('list_last')
                        .setStyle(ButtonStyle.Primary),
                )
        ]
    };
}

exports.keys = keys;