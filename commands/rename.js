const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const wait = require('node:timers/promises').setTimeout;

module.exports = {
    command: new SlashCommandBuilder()
        .setDMPermission(false)
        .setName('rename')
        .setDescription('Rename a user')
        .addUserOption(option =>
            option
                .setName('user')
                .setDescription('The user')
                .setRequired(true)
        )
        .addStringOption(option =>
            option
                .setName('name')
                .setDescription('The new nickname')
                .setRequired(true)
                .setMaxLength(40)
                .setMinLength(2)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),
    async execute (client, interaction) {
        const userId = interaction.options.getUser('user').id;
        const name = interaction.options.getString('name');

        await (await interaction.guild.members.fetch(userId)).setNickname(name);
        
        await interaction.reply({ content: 'Done!', ephemeral: true });
        await wait(2000);
        interaction.deleteReply();
    }
}