require("dotenv").config();
const fs = require('fs');
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers] });

client.commands = new Collection();
const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));
commandFiles.forEach((commandFile) => {
    const command = require(`./commands/${commandFile}`);
    client.commands.set(command.data.name, command);
})

const eventFiles = fs.readdirSync('./src/events').filter(file => file.endsWith('.js'));
eventFiles.forEach((eventFile) => {
    const event = require(`./events/${eventFile}`);
    if (event.once) { client.once(event.name, (...args) => event.execute(...args)); }
    else { client.on(event.name, (...args) => event.execute(...args)); }
  });


client.login(DISCORD_BOT_TOKEN);

//!! const role_message_id = require('commands/rolelist.js');

//!! on role update, check if it is one of the wanted roles, then get the message id from the file, then update the list and update the embed(s)
//!! on member leave/kick/ban remove that member from the list