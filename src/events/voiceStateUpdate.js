const { Events } = require('discord.js');
const fileOps = require('../data/FileOperations.js');

module.exports = {
	name: Events.VoiceStateUpdate,
	async execute(client, oldMember, newMember) {
		const newUserChannel = newMember.voiceChannel;
		const oldUserChannel = oldMember.voiceChannel;
		console.log('Helllo');
		if ((oldUserChannel === undefined || oldUserChannel === null) && (newUserChannel !== undefined && newUserChannel !== null) && newUserChannel.name !== '💤 AFK') {
			let count = parseInt(fileOps.read('../data/VCCount'));
			count++;

			client.user.setActivity({
				name: `with ${count} people`,
				type: parseInt(0),
			});
			fileOps.write('VCCount', count);
		}
		else if (newUserChannel === undefined) {
			let count = parseInt(fileOps.read('../data/VCCount'));
			count--;

			client.user.setActivity({
				name: `with ${count} people`,
				type: parseInt(0),
			});
			fileOps.write('VCCount', count);
		}
	},
};