const { RoleSelectMenuBuilder, SlashCommandBuilder } = require("@discordjs/builders");
const { Messages } = require("../database");
const { ContextMenuCommandBuilder, ApplicationCommandType, PermissionFlagsBits, ActionRowBuilder, TextInputBuilder, StringSelectMenuBuilder, ModalBuilder, TextInputStyle } = require("discord.js");

module.exports = {
    command: new SlashCommandBuilder()
        .setName('add_auto_role')
        .setDescription('When a user react with an emoji, he will have a new role!')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)
        .setDMPermission(false)
        .addStringOption(option =>
            option
                .setName('message')
                .setDescription('The message id')
                .setRequired(true)
        )
        .addRoleOption(option =>
            option
                .setName('role')
                .setDescription('The role')
                .setRequired(true)
        )
        .addStringOption(option =>
            option
                .setName('emoji')
                .setDescription('The emoji')
                .setRequired(true)
        ),
    async execute(client, interaction) {
        await interaction.deferReply({ ephemeral: true });

        const message = interaction.options.getString('message');
        const role = interaction.options.getRole('role');
        const emoji = interaction.options.getString('emoji').trim();

        const msg = await interaction.channel.messages.fetch(message);

        if (!msg) {
            return interaction.reply({
                content: 'Invalid message id',
                ephemeral: true
            });
        } else {
            const reaction = await msg.react(emoji);
            const ref = await Messages.get(message);
            const o = ref.emojis || {};
            o[reaction.emoji.name] = role.id;

            await Messages.set(message, {
                type: 0,
                emojis: o
            });

            interaction.editReply({
                content: 'Reaction role created!',
                ephemeral: true
            });
        }
    }
}