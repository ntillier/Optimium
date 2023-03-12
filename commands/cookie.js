const { Users } = require("../database");
const { SlashCommandBuilder, time } = require("discord.js");
const wait = require('node:timers/promises').setTimeout;

module.exports = {
    command: new SlashCommandBuilder()
        .setName('cookie')
        .setDescription('Send a cookie to a friend')
        .setDMPermission(false)
        .addUserOption(option =>
            option
                .setName('user')
                .setDescription('The user who will receive the cookie!')
                .setRequired(true)
        ),
    async execute(client, interaction) {
        await interaction.deferReply();

        const user = interaction.options.getUser('user').id;
        const member = interaction.member.id;

        Users.get(member)
            .then(async (data) => {
                let diff = Math.ceil(Math.abs((new Date(data.last) - new Date()) / 60000));
                if (data.last && diff < 60) {
                    return interaction.editReply(`:no_entry: | You sent a cookie for now, because you sent your last cookie ${diff} minutes ago. You have to wait ${60 - diff} minutes.`)
                } else if (member === user) {
                    return interaction.editReply(`:no_entry: | You can't send a cookie to yourself <@${member}>`);
                }
                
                await Users.set(member, { last: new Date() });

                if (client.user.id === user) {
                    interaction.editReply(`:cookie: Thank's for the cookie!`);
                } else {
                    interaction.editReply(`:cook: | Baking the cookie for <@${user}>`);
                    const msg = await interaction.fetchReply();
                    await wait(Math.random(1, 4) * 1000);
                    msg.edit(`:cookie: Enjoy your meal <@${user}>! You got a cookie from <@${member}> yum yum yum :yum:`);
                }
            })
    }
}