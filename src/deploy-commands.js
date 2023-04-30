require('dotenv').config();
const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;
const DISCORD_APPLICATION_ID = process.env.DISCORD_APPLICATION_ID;
const DISCORD_GUILD_ID = process.env.DISCORD_GUILD_ID;
const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const commands = [];

const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));
commandFiles.forEach((commandFile) => {
	const command = require(`./commands/${commandFile}`);
	commands.push(command.data.toJSON());
});

const restClient = new REST({
	version: '9',
}).setToken(DISCORD_BOT_TOKEN);

// for Global Commands remove the Guild ID and use Routes.applicationCommands instead
restClient.put(Routes.applicationGuildCommands(DISCORD_APPLICATION_ID, DISCORD_GUILD_ID), {
	body: commands,
})
	.then(() => console.log('Sucessfully registered Commands!'))
	.catch(console.error);