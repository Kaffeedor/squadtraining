const { Events } = require('discord.js');
const { EmbedBuilder } = require('@discordjs/builders');
const fileOps = require('../data/FileOperations.js');

function nick_or_username(m) {
	if (m.nickname != null) { return m.nickname; }
	else { return m.user.username; }
}

module.exports = {
	name: Events.GuildMemberUpdate,
	async execute(client) {
		const msgObj = fileOps.getObjWithHighestIndex('./src/data/RoleListMessages.json');
		console.log(msgObj);
		const messageID = msgObj.messageID;
		const channelID = msgObj.channelID;
		// const guildID = msgObj.guildID; not needed
		const role_names = msgObj.roleList;
		// const author = msgObj.author; not needed

		const channel = await client.channels.fetch(`${channelID}`);
		const guild = await channel.guild.fetch();
		const message = channel.messages.fetch(messageID);
		const allMembers = await guild.members.fetch();
		const allRoles = await guild.roles.fetch();

		const images = []; // fill up with strings of image links, or make it a subcommand or something idk
		const colors = []; // fill up with HEX colors, or make it a subcommand or something idk

		const role_embeds = [];
		let temp_embed;
		let temp_role_id;
		let temp_role_members;

		for (let i = 0; i < 5; i++) {
			temp_embed = new EmbedBuilder()
				.setColor(0x267509).setThumbnail('https://cdn.discordapp.com/attachments/703142463392448532/1102188329824432229/image.png') // Replace with colorsi] images[i]
				.setTitle(role_names[i]).setAuthor({
					name: `Shows all Members with the '${role_names[i]}' Role`,
				})
				.setTimestamp().setFooter({
					text: 'Last Updated:',
				});

			temp_role_id = await allRoles.find(role => role.name === role_names[i]).id;
			temp_role_members = await allMembers.filter(member => member._roles.some(role => role === temp_role_id)).map(m => nick_or_username(m));

			for (let y = 0; y < temp_role_members.length; y++) {
				if (temp_role_members[y] != undefined && temp_role_members[y] != null) {
					if ((y + 1) % 3 == 0) {
						temp_embed.addFields({
							name: ' ',
							value: `${temp_role_members[y]}`,
							inline: false,
						});
					}
					else {
						temp_embed.addFields({
							name: ' ',
							value: `${temp_role_members[y]}`,
							inline: true,
						});
					}
				}
			}
			role_embeds.push(temp_embed);
		}

		await message.edit({ embeds: role_embeds });
		console.log(`Updated Message ${messageID}`);
	},
};