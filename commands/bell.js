/*
let percent = (Math.floor(Math.random()*100));
    let msg = ` *Result:* ${percent}\n` + '░\n'.repeat(5-Math.floor(percent/20)) + '█\n'.repeat(Math.floor(percent/20))
    resolve({
      content: msg,
      type: 'info'
    })
*/

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    command: new SlashCommandBuilder()
        .setName('bell')
        .setDescription('Test your strenght!'),
    execute(client, interaction) {
        let percent = (Math.floor(Math.random()*100));
        let msg = `**Your score is ${percent}**\n\n:bell:\n` + ' ░\n'.repeat(5-Math.floor(percent/20)) + ' █\n'.repeat(Math.floor(percent/20))
        interaction.reply(msg);
    },
};