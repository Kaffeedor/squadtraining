require("dotenv").config();
const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;
const DISCORD_APPLICATION_ID = process.env.DISCORD_APPLICATION_ID;
const DISCORD_GUILD_ID = process.env.DISCORD_GUILD_ID;
const fs = require("fs")
const { REST } = require("@discordjs/rest") // REST client for registering commands
const { Routes } = require('discord-api-types/v9'); // API Types to get the ApplicationCommands for the REST Route
const commands = []

const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js')); // Go throught the "commands" folder and only accept JS files
commandFiles.forEach((commandFile) => { // Go throught the command-files, load the command with require and add it to our array (toJSON because of Discordjs Builders)
    const command = require(`./commands/${commandFile}`)
    commands.push(command.data.toJSON())
})

const restClient = new REST({
    version: "9"
}).setToken(DISCORD_BOT_TOKEN) // Register the RestClient for the creation of commands

// Sending PUT Webrequest with Route and the ApplicationID and the GuildID to Discord Senden, if succesfull it outputs a message to the terminal
// for Global Commands remove the Guild ID and use Routes.applicationCommands instead
restClient.put(Routes.applicationGuildCommands(DISCORD_APPLICATION_ID, DISCORD_GUILD_ID), {
        body: commands
    })
    .then(() => console.log("Sucessfully registered Commands!"))
    .catch(console.error)