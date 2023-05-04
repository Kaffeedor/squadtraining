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
		const messageID = msgObj.messageID;
		const channelID = msgObj.channelID;
		// const guildID = msgObj.guildID; not needed
		const role_names = msgObj.role_names;
		// const author = msgObj.author; not needed (yet)

		const guild = await client.guild;
		const channel = await guild.channels.fetch(`${channelID}`);
		const message = await channel.messages.fetch(`${messageID}`);
		const allMembers = await guild.members.fetch();
		const allRoles = await guild.roles.fetch();

		const images = ['https://cdn.discordapp.com/emojis/834562765514473493.webp?size=48&quality=lossless', 'https://cdn.discordapp.com/emojis/834902172264955916.webp?size=48&quality=lossless', 'https://cdn.discordapp.com/emojis/834562967172546590.webp?size=48&quality=lossless', 'https://cdn.discordapp.com/emojis/834564467961364531.webp?size=48&quality=lossless', 'https://cdn.discordapp.com/emojis/895689503585488897.webp?size=48&quality=lossless']; // change order maybe?
		const colors = [0x276f47, 0x7c4991, 0xbc5c34, 0x37a171, 0x709623]; // change order maybe?

		const role_embeds = [];
		let temp_embed;
		let temp_role_id;
		let temp_role_members;

		for (let i = 0; i < 5; i++) {
			temp_embed = new EmbedBuilder()
				.setColor(colors[i]).setThumbnail(`${images[i]}`)
				.setTitle(role_names[i])
				.setTimestamp().setFooter({
					text: 'Last Updated:',
				});

			temp_role_id = await allRoles.find(role => role.name === role_names[i]).id;
			temp_role_members = await allMembers.filter(member => member._roles.some(role => role === temp_role_id)).map(m => nick_or_username(m));

			for (let y = 0; y < temp_role_members.length; y++) {
				if (temp_role_members[y] != undefined && temp_role_members[y] != null) {
					if ((y + 1) % 2 == 0) {
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