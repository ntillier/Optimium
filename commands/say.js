const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
    command: new SlashCommandBuilder()
        .setName('say')
        .setDescription('Say something')
        .addStringOption(option =>
            option
                .setName('sentence')
                .setDescription('The sentence')
                .setRequired(true)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),
    async execute(client, interaction) {
        await interaction.channel.send(interaction.options.getString('sentence'));

        await interaction.reply({ content: 'Done!', ephemeral: true });
        await wait(2000);
        await interaction.deleteReply();
    },
};