const { SlashCommandBuilder } = require("discord.js");
const player = require('../util/music');

module.exports = {
    disabled: true,
    command: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Add a music to the queue')
        .setDMPermission(false)
        .addStringOption(option =>
            option
                .setName('query')
                .setRequired(true)
                .setDescription('The query to find the music')
        ),
    async execute (client, interaction) {
        await interaction.deferReply({ ephemeral: true });
        const query = interaction.options.getString('query');

        if (!interaction.member.voice.channelId) {
            return await interaction.editReply({ content: 'You are not in a voice channel!', ephemeral: true });
        } else if (interaction.guild.members.me.voice.channelId && interaction.member.voice.channelId !== interaction.guild.members.me.voice.channelId) {
            return await interaction.editReply({ content: "You are not in my voice channel!", ephemeral: true });
        }

        const queue = player.createQueue(interaction.guild, {
            metadata: {
                channel: interaction.channel
            }
        });
        
        try {
            if (!queue.connection) await queue.connect(interaction.member.voice.channel);
        } catch {
            queue.destroy();
            return await interaction.editReply({ content: "Could not join your voice channel!", ephemeral: true });
        }
        
        const track = await player.search(query, {
            requestedBy: interaction.user
        }).then(x => x.tracks[0]);
        if (!track) return await interaction.editReply({ content: `❌ | Track **${query}** not found!` });

        queue.play(track);

        return await interaction.editReply({ content: `⏱️ | Loading track **${track.title}**!` });
    }
}