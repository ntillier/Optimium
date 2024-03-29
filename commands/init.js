const { ModalBuilder } = require("@discordjs/builders");
const { SlashCommandBuilder, PermissionFlagsBits, ActionRowBuilder, TextInputBuilder, TextInputStyle } = require("discord.js");

module.exports = {
    command: new SlashCommandBuilder()
        .setName('init')
        .setDescription('Init the guild and databases')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .setDMPermission(false)
    ,
    execute(client, interaction) {
        const modal = new ModalBuilder()
            .setCustomId('init')
            .setTitle('Tnit');
        
        modal.addComponents(
            new ActionRowBuilder()
                .addComponents(
                    new TextInputBuilder()
                        .setCustomId('verify_init')
                        .setPlaceholder('Yes')
                        .setLabel('Are you sure? Some data will be lost (yes/no)')
                        .setStyle(TextInputStyle.Short)
                )
        );

        interaction.showModal(modal);
    }
};