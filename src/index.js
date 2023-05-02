require('dotenv').config();
const fs = require('fs');
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
	],
});

// Command Handler
client.commands = new Collection();
const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));
commandFiles.forEach((commandFile) => {
	const command = require(`./commands/${commandFile}`);
	client.commands.set(command.data.name, command);
	console.log(`Registered command: ${command.data.name}`);
});

// Event Handler
const eventFiles = fs.readdirSync('./src/events').filter(file => file.endsWith('.js'));
eventFiles.forEach((eventFile) => {
	const event = require(`./events/${eventFile}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	}
	else {
		client.on(event.name, (...args) => event.execute(...args));
	}
	console.log(`Registered event: ${event.name}`);
});

client.login(DISCORD_BOT_TOKEN);