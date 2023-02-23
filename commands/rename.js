const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const wait = require('node:timers/promises').setTimeout;

module.exports = {
    command: new SlashCommandBuilder()
        .setName('rename')
        .setDescription('Rename myself!')
        .addStringOption(option =>
            option
                .setName('name')
                .setDescription('The new name!')
                .setRequired(true)
                .setMaxLength(40)
                .setMinLength(2)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute (client, interaction) {
        await interaction.guild.members.me.setNickname(interaction.options.getString('name'));
        await interaction.reply({ content: 'Done!', ephemeral: true });
        await wait(2000);
        interaction.deleteReply();
    }
}