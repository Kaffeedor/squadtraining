// status working but activity not???
require('dotenv').config();
const ADMIN_USERID_1 = process.env.ADMIN_USERID_1;
const ADMIN_USERID_2 = process.env.ADMIN_USERID_2;
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder().setName('setpresence').setDescription('as the name says')
		.addStringOption(option => option.setName('content')
			.setDescription('as the name says').setMaxLength(128).setRequired(true))
		.addStringOption(option => option.setName('type')
			.setDescription('as the name says')
			.addChoices({ name:'Playing', value:`${0}` }, { name:'Streaming', value:`${1}` }, { name:'Listening', value:`${2}` }, { name:'Watching', value:`${3}` }, { name:'Competing', value:`${5}` }).setRequired(true))
		.addStringOption(option => option.setName('url')
			.setDescription('as the name says').setRequired(true))
		.addStringOption(option => option.setName('status')
			.setDescription('as the name says')
			.addChoices({ name:'Online', value:'online' }, { name:'Idle/AFK', value:'idle' }, { name:'DND', value:'dnd' }, { name:'Invisible', value:'invisible' }).setRequired(true)),

	async execute(interaction) {
		const { options } = interaction;
		const content = options.getString('content');
		const type = options.getString('type');
		const url = options.getString('url');
		const status = options.getString('status');

		if (interaction.user.id != ADMIN_USERID_1 && interaction.user.id != ADMIN_USERID_2) {return await interaction.reply({ content:'This Command is only for bot-devs/-admins.', ephemeral:true });}
		else {
			interaction.client.user.setPresence({ status:`${status}` });
			interaction.client.user.setActivity({
				name: `${content}`,
				type: `${type}`,
				url:`${url}`,
			});
			await interaction.reply({ content:'This seemed to work.', ephemeral:true });
		}
	},
};
