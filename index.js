require('dotenv').config();
const { Client, Events, GatewayIntentBits, IntentsBitField, Collection, Partials, ContextMenuCommandBuilder, ApplicationCommandType } = require('discord.js');
const config = require('./config');
const fs = require('fs');
const database = require('./database');
const filter = require('./util/scan');

console.log('Working with', Object.keys(database).join(', '));
console.log(filter.clean('The filter is working.'));

const client = new Client({
    intents: new IntentsBitField(3276799),
    partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});

// settings the modals
client.modals = new Collection();
fs.readdirSync(`${__dirname}/modals`)
    .map((i) => {
        const m = require(`./modals/${i}`);
        client.modals.set(m.id, m.execute);
    });

// settings the commands
client.commands = new Collection();
const commands = fs.readdirSync(`${__dirname}/commands`)
    .map((i) => {
        const c = require(`./commands/${i}`);
        if (c.disabled) return;
        client.commands.set(c.command.name, c.execute);
        return c.command.toJSON();
    }).filter(Boolean);

// creating the events
const events = fs.readdirSync(`${__dirname}/events`).map((i) => require(`./events/${i}`));

client.once(Events.ClientReady, bot => {
    console.log(`Ready! Logged in as ${bot.user.tag}`);

    // for slash commands
    bot.on(Events.InteractionCreate, async (interaction) => {
        if (!interaction.isChatInputCommand() && !interaction.isContextMenuCommand()) return;

        const command = client.commands.get(interaction.commandName);

        if (!command) return interaction.reply('I can\'t find this command.');

        try {
            await command(client, interaction);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    });

    // for modals
    bot.on(Events.InteractionCreate, async (interaction) => {
        if (!interaction.isModalSubmit()) return;

        const modal = client.modals.get(interaction.customId);

        if (!modal) return;
        try {
            await modal(client, interaction);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    });

    // for context menus
    /*client.on(Events.InteractionCreate, interaction => {
        if (!interaction.isUserContextMenuCommand()) return;

        const { username } = interaction.targetUser;
        console.log(username);
    });*/

    events.forEach((i) => {
        bot.on(i.event, i.callback.bind(null, client));
    });

    client.guilds.cache.forEach((guild) => {
        guild.commands.set(commands);
    });
});

client.login(process.env.BOT_TOKEN);