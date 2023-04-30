const { Events } = require('discord.js');

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		if (!interaction.isChatInputCommand()) return;
        if (!interaction.isCommand()) return // return if it is not a slash command

		const command = interaction.client.commands.get(interaction.commandName);

		if (!command) {
			console.error(`No command matching ${interaction.commandName} was found.`);
			return;
		}

		try {
			await command.execute(interaction);
		} catch (error) {
			console.error(`Error executing ${interaction.commandName}`);
			console.error(error);

            if (interaction.deferred || interaction.replied) {
                interaction.editReply('There was an error while executing this command!')
            } else {
                interaction.reply('There was an error while executing this command!')
            }
		}
	},
};