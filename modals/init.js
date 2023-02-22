const { Guilds, Users, Messages, Settings } = require("../database");

module.exports = {
    id: 'init',
    async execute (client, interaction) {
        const res = interaction.fields.getTextInputValue('verify_init').trim().toLowerCase();

        if (res === 'yes') {
            await interaction.reply({ content: 'Beginning...', ephemeral: true });
            const guilds = client.guilds.cache.map(guild => guild.id);
            Guilds.clear();
            Users.clear();
            Messages.clear();
            Settings.clear();

            guilds.forEach(async (i) => {
                const g = await client.guilds.cache.get(i);
                await Guilds.set(i, {
                    icon: g.iconURL(),
                    owner: g.ownerId,
                    language:  'en',
                    maxWarns: 5
                });

                (await g.members.fetch()).forEach(async (j) => {
                    if (!j.user.bot) {
                        await Users.set(j.id, {
                            warnsCount: 0,
                            xp: 0,
                            last: null,
                            cookies: 0
                        });
                    }
                });
            });
            
            interaction.editReply('Finished!');

        } else {
            interaction.reply({ content: 'Failed.', ephemeral: true });
        }
    }
}