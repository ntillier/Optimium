const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    command: new SlashCommandBuilder()
        .setDMPermission(false)
        .setName('lock_thread')
        .setDescription('Lock, close and archive this thread')
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),
    async execute (client, interaction) {
        if (interaction.channel.isThread()) {
            await interaction.reply({
                content: ':white_check_mark: Thread locked'
            });

            await interaction.channel.setLocked(true);
            await interaction.channel.setArchived(true);
        } else {
            await interaction.reply({
                content: 'Not a thread',
                ephemeral: true
            });
        }
    }
}