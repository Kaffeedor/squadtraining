// Import the SlashCommandBuilder from Discordjs Builders for easier command building 
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
	data: new SlashCommandBuilder().setName('ping').setDescription('Pong!'),  	// create the slash command
	async execute(interaction) { // method for getting our interaction
		await interaction.reply({content:"🏓Pong!", ephemeral:true}); // reply	
	}
}
