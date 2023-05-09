const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    command: new SlashCommandBuilder()
        .setDMPermission(false)
        .setName('unlockthread')
        .setDescription('Unlock, unclose and unarchive this thread')
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),
    async execute (client, interaction) {
        if (interaction.channel.isThread()) {
            await interaction.reply({
                content: ':white_check_mark: Thread unlocked'
            });

            await interaction.channel.setLocked(false);
            await interaction.channel.setArchived(false);
        } else {
            await interaction.reply({
                content: 'Not a thread',
                ephemeral: true
            });
        }
    }
}