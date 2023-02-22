const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	command: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(client, interaction) {
		await interaction.reply('Pong!');
	},
};