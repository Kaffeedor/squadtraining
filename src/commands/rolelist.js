// Import the SlashCommandBuilder from Discordjs Builders for easier command building 
const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()   	// create the slash command
        .setName('rolelist').setDescription('Create role-list in the current channel.'),
		async execute(interaction, client) { // method for getting our interaction
			if (interaction.user.id != process.env.ADMIN_USERID_1 && interaction.user.id != process.env.ADMIN_USERID_2) return await interaction.reply({ content:"This Command is only for Bot- devs/admins.", ephemeral:true});
        	else {
//!!				const guild = interaction.guild;
//!!				if (!guild) return console.log("Couldn't get the guild.");
//!!				const members_ROLE1 = guild.members.cache.filter(member => member.roles.cache.find(role => role.name === "ROLE_NAME")).map(member => member.id);
//!!				do this for each of the 5 roles

				const exampleEmbed = new EmbedBuilder() 
					.setColor(0x267509)
					.setTitle('Squad Leaders').setAuthor({name:"Shows all Members with the 'Squad Leader' Role"})
					.setThumbnail('https://i.imgur.com/AfFp7pu.png') // Replace with according Image
					//!! pseudocode: for member in members add a field with inline=true except every third one (starting from the first)
						.addFields({name: " ", value: "here the members with that role should be listed", inline: true})
					.setTimestamp().setFooter({text: 'Last updated:'});
				//!! when this works add it copy and change it up for each role, or make it dynamic/flexible in the first place xd

					await interaction.reply({ embeds: [exampleEmbed] }) //!! add each embed! also change from reply to new message in the channel!

				//!! save reply message id to some file (.env?)
			}
		}
}

//IGNORE: members = client.guild.roles.cache.find(role => role.name === 'role name').members.map(m=>m.user.tag);