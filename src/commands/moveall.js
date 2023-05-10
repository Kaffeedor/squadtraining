// Import the SlashCommandBuilder from Discordjs Builders for easier command building
const {
	SlashCommandBuilder,
} = require('@discordjs/builders');

// const EndVC_ID = '905846677179609128';
// const AFKVC_ID = '832644058391248916';
const EndVC_ID = '943806578115637268';
const AFKVC_ID = '943946094398808084';


module.exports = {
	data: new SlashCommandBuilder().setName('endround').setDescription('Move all members to one VC.'),
	async execute(interaction) {
		const guildChannels = await interaction.guild.channels.fetch();
		const endVoiceChannel = guildChannels.find(channel => channel.type == 2 && String(channel.id) == EndVC_ID);
		const allVoiceChannels = guildChannels.filter(channel => channel.type == 2 && String(channel.id) !== AFKVC_ID);

		allVoiceChannels.forEach(channel =>
			channel.members.forEach(member =>
				member.voice.setChannel(endVoiceChannel),
			),
		);

		return interaction.reply({ content: `Moved all members to ${endVoiceChannel.name}.`, ephemeral: true });
	},
};