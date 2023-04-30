const { Events } = require('discord.js');
const fileOps = require('../data/FileOperations.js');

module.exports = {
	name: Events.GuildRoleUpdate,
	once: true,
	execute(client) {
		console.log('Role got updated.');
		const data = fileOps.read0('../data/RoleListMessages.json');
		console.log(data);
	},
};