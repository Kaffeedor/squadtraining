require('dotenv').config();
const DISCORD_MAIN_CHANNEL_ID = process.env.DISCORD_MAIN_CHANNEL_ID;
const DISCORD_AFK_CHANNEL_ID = process.env.DISCORD_AFK_CHANNEL_ID;

const {
	SlashCommandBuilder,
} = require('@discordjs/builders');


module.exports = {
	data: new SlashCommandBuilder().setName('endround').setDescription('Move all members to one VC.'),
	async execute(interaction) {
		const guildChannels = await interaction.guild.channels.fetch();
		const endVoiceChannel = guildChannels.find(channel => channel.type == 2 && String(channel.id) == DISCORD_MAIN_CHANNEL_ID);
		const allVoiceChannels = guildChannels.filter(channel => channel.type == 2 && String(channel.id) !== DISCORD_AFK_CHANNEL_ID);

		allVoiceChannels.forEach(channel =>
			channel.members.forEach(member =>
				member.voice.setChannel(endVoiceChannel),
			),
		);

		return interaction.reply({ content: `Moved all members to ${endVoiceChannel.name}.`, ephemeral: true });
	},
};