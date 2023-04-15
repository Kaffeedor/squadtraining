require("dotenv").config() // Import dotenv and run the config() method to load the .env file
const fs = require("fs")
const { Client, Collection } = require("discord.js") // Import Client from discord.js

const client = new Client({intents:[]}) // Initialize the client

client.commands = new Collection()  // Add client.commands to a new collection (so you can get the commmands in every client instance)

const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js')); // Get all files which end with ".js" from the "commands" folder

commandFiles.forEach((commandFile) => {
	const command = require(`./commands/${commandFile}`);
	client.commands.set(command.data.name, command);
})

client.once("ready", () => { // Get the ready event once (when the bot logged in) and output the tag of the bot if login was succesfull
    console.log(`Ready! Logged in as ${client.user.tag}!`)
    client.user.setActivity("your every move.", {type:3, url:"https://www.youtube.com/watch?v=dQw4w9WgXcQ"}) // Sets the Activity, URL only works for 1, 0=Playing, 1=Streaming, 2=Listening, 3=Watching, 4=Custom, 5=Competing
})

client.on("interactionCreate", async (interaction) => { // listen to the interactionCreate event and add a paramter with async mit einer async function

    if(!interaction.isCommand()) return // return if it is not a slash command

    const command = client.commands.get(interaction.commandName)

    if(command) { // test if the command exists
        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);

            if(interaction.deferred || interaction.replied) {
                interaction.editReply('There was an error while executing this command!')
            }else {
                interaction.reply('There was an error while executing this command!')
            }
        }
    }
})

client.login(process.env.DISCORD_BOT_TOKEN) // Client logs in with the token from the .env file