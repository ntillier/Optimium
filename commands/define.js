const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const wd = require('word-definition');

function getEmbed(result) {
    return new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle(`**This is the definition of** \`${result.word.replace(/`/g, '\\`')}\``)
        .setDescription(
            result.err
            ? `**The word** \\\`${result.err.replace(/`/g, '\\`')}\\\` **doesn't exists.**`
            : `${result.definition}\n\n**Category:** ${result.category}`
        );
}

module.exports = {
    command: new SlashCommandBuilder()
        .setName('define')
        .setDescription('Retrieve the definition of a word.')
        .addStringOption(option =>
            option
                .setName('word')
                .setDescription('The word to define')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('language')
                .setDescription('The language (default to english)')
                .setRequired(false)
                .addChoices(
                    { name: 'English', value: 'en' },
                    { name: 'French', value: 'fr' },
                    { name: 'German', value: 'de' },
                )),
    execute(client, interaction) {
        const word = interaction.options.getString('word');
        const lang = interaction.options.getString('language') ?? 'en';

        interaction.channel.sendTyping();

        wd.getDef(
            word,
            ['fr', 'de', 'en'].includes(lang) ? lang : 'en',
            {
                exact: false
            },
            (result) => {
                interaction.reply({ embeds: [getEmbed(result)] });
            }
        )
    },
};