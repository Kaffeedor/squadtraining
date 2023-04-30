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
			const allMembers = await interaction.guild.members.fetch();
			const allRoles = await interaction.guild.roles.fetch();

			const { options } = interaction;

			let role_names = [`${options.getString('role1')}`, `${options.getString('role2')}`, `${options.getString('role3')}`, `${options.getString('role4')}`, `${options.getString('role5')}`];
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
						text: 'Last updated:',
					});

				temp_role_id = await allRoles.find(role => role.name === role_names[i]).id;
				temp_role_members = await allMembers.filter(member => member._roles.some(role => role === temp_role_id)).map(m => nick_or_username(m));

				for (let y = 0; y < temp_role_members.length; y++) {
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
				role_embeds.push(temp_embed);
			}

			const message = await channel.send({
				embeds: role_embeds,
				fetch: true,
			});
			fileOps.write0('./src/data/RoleListMessages.json', message.id, role_names, author_id);
		}
	},
};