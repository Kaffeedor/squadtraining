// Import the SlashCommandBuilder from Discordjs Builders for easier command building
const {
	SlashCommandBuilder,
} = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder().setName('ping').setDescription('Pong!'),
	async execute(interaction) {
		await interaction.reply({
			content: '🏓Pong!',
			ephemeral: true,
		});
	},
};