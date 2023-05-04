require('dotenv').config();
const ADMIN_USERID_1 = process.env.ADMIN_USERID_1;
const ADMIN_USERID_2 = process.env.ADMIN_USERID_2;

const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('@discordjs/builders');
const fileOps = require('../data/FileOperations.js');

function nick_or_username(m) {
	if (m.nickname != null) { return m.nickname; }
	else { return m.user.username; }
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('rolelist').setDescription('Create role-list in the current channel. Need 5 Roles!')
		.addStringOption(option => option.setName('role1').setDescription('Input the name of the first Role').setMaxLength(128).setRequired(true))
		.addStringOption(option => option.setName('role2').setDescription('Input the name of the second Role').setMaxLength(128).setRequired(true))
		.addStringOption(option => option.setName('role3').setDescription('Input the name of the third Role').setMaxLength(128).setRequired(true))
		.addStringOption(option => option.setName('role4').setDescription('Input the name of the fourth Role').setMaxLength(128).setRequired(true))
		.addStringOption(option => option.setName('role5').setDescription('Input the name of the fifth Role').setMaxLength(128).setRequired(true)),
	async execute(interaction) {
		const author_id = interaction.user.id;
		if (interaction.user.id != ADMIN_USERID_1 && interaction.user.id != ADMIN_USERID_2) {
			return await interaction.reply({
				content: 'This Command is only for bot-devs/-admins.',
				ephemeral: true,
			});
		}
		else {
			const i_reply = await interaction.reply({
				content: 'Okay! Creating the role list right here',
				fetchReply: true,
				ephemeral: true,
			});
			const channel = await interaction.client.channels.fetch(i_reply.channelId);
			const guildID = channel.guild.id;
			const allMembers = await interaction.guild.members.fetch();
			const allRoles = await interaction.guild.roles.fetch();

			const { options } = interaction;

			const role_names = [`${options.getString('role1')}`, `${options.getString('role2')}`, `${options.getString('role3')}`, `${options.getString('role4')}`, `${options.getString('role5')}`];
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

			const message = await channel.send({
				embeds: role_embeds,
				fetch: true,
			});
			fileOps.appendRoleListMessage('./src/data/RoleListMessages.json', message.id, message.id, i_reply.channelId, guildID, role_names, author_id);
		}
	},
};